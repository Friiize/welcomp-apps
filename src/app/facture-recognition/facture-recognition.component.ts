import { Component, OnDestroy, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FactureInterface, FactureService } from '../services/facture.service';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IcsFileMakerService } from '../services/ics-file-maker.service';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-facture-recognition',
  templateUrl: './facture-recognition.component.html',
  styleUrls: ['./facture-recognition.component.scss'],
})
export class FactureRecognitionComponent implements OnInit, OnDestroy {
  data: FactureInterface;
  isVisible;
  isValidating;
  postProcessDataSubscription: Subscription;
  factureDataForm = this.formBuilder.group({
    dueDate: '',
    sold: '',
    iban: '',
    factureNumber: '',
  });
  editFactureForm = this.formBuilder.group({
    dueDate: '',
    sold: '',
    iban: '',
    factureNumber: '',
    email: '',
  });

  constructor(
    private router: Router,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private readonly factureService: FactureService,
    private readonly iCSFileMaker: IcsFileMakerService,
    private emailComposer: EmailComposer
  ) {}

  ngOnInit() {
    this.isVisible = true;
    this.isValidating = false;
  }

  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    const converted = await this.factureService.convertImage(image);
    const formData = new FormData();
    formData.append('image', converted);
    this.postProcessDataSubscription = this.factureService
      .postprocessData(formData)
      .subscribe((data) => {
        this.data = data;
        console.log(data);
        if (this.data != null) {
          this.isVisible = !this.isVisible;
        }
      });
  }

  onSubmit() {
    if (this.factureDataForm.invalid) {
      return alert('Form is invalid');
    }
    this.isValidating = !this.isValidating;
  }

  ngOnDestroy(): void {
    this.postProcessDataSubscription.unsubscribe();
  }

  async onSendDueFacture() {
    if (this.editFactureForm.invalid) {
      return alert('Form is invalid');
    }
    const formData = new FormData();
    formData.append('dueDate', this.editFactureForm.get(['dueDate']).value);
    formData.append('sold', this.editFactureForm.get(['sold']).value);
    formData.append('iban', this.editFactureForm.get(['iban']).value);
    formData.append(
      'factureNumber',
      this.editFactureForm.get(['factureNumber']).value
    );
    formData.append('email', this.editFactureForm.get(['email']).value);
    this.factureService.archiveFacture(formData).subscribe((res) => {
      console.log(res);
      const attachment = this.iCSFileMaker.convertToICS(res, 'reminder.ics');
      const email = {
        to: this.editFactureForm.get(['email']).value,
        attachments: ['file://' + attachment],
        subject: 'ROBOT: Facture a payer !',
      };
      this.emailComposer.open(email);
    });
  }
}
