import {Component, OnDestroy, OnInit} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {FactureInterface, FactureService} from '../services/facture.service';
import {Subscription} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {AlertController} from '@ionic/angular';

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
    factureNumber: ''
  });
  editFactureNumber: string;
  editIban: string;
  editSold: string;
  editDueDate: string;

  // eslint-disable-next-line max-len
  constructor(private alertController: AlertController, private formBuilder: FormBuilder, private readonly factureService: FactureService) {
  }

  ngOnInit() {
    this.isVisible = true;
    this.isValidating = false;
  }

  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    const converted = await this.factureService.convertImage(image);
    const formData = new FormData();
    formData.append('image', converted);
    this.postProcessDataSubscription = this.factureService.postprocessData(formData).subscribe(data => {
      this.data = data;
      console.log(data);
      if (this.data != null) {
        this.isVisible = (!this.isVisible);
      }
    });
  }

  onSubmit() {
    this.isValidating = (!this.isValidating);
  }

  ngOnDestroy(): void {
    this.postProcessDataSubscription.unsubscribe();
  }

  async onSendDueFacture() {
    console.log(this.editFactureNumber);
  }
}
