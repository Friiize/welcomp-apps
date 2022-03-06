import {Component, Input, OnInit} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {FactureService} from '../services/facture.service';
import {Base64ConvertorService} from '../services/base64-convertor.service';

@Component({
  selector: 'app-facture-recognition',
  templateUrl: './facture-recognition.component.html',
  styleUrls: ['./facture-recognition.component.scss'],
})
export class FactureRecognitionComponent implements OnInit {
  @Input() name: string;
  outputText: string;
  image;
  constructor(private readonly factureService: FactureService, private readonly base64Convertor: Base64ConvertorService) {}
  ngOnInit() {}

  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    const converted = await this.convertImage(image);
    const formData = new FormData();
    console.log(image);
    formData.append('image', converted);
    this.image = this.factureService.getData(formData).subscribe(data => {
      console.log(data);
    });
  }
  async convertImage(image: Photo) {
    return this.base64Convertor.convertToFile((image.dataUrl), 'factureImage');
  }
}
