import {Component, Input, OnInit} from '@angular/core';
import {createWorker} from 'tesseract.js';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
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
  ocrResult = 'Waiting for a picture...';
  captureProgress = 0;
  workerReady = false;
  image;
  worker: Tesseract.Worker;
  constructor(private readonly factureService: FactureService, private readonly base64Convertor: Base64ConvertorService) {
    this.loadWorker().then();
  }
  ngOnInit() {}

  async loadWorker() {
    this.ocrResult = 'Rechargement...';
    this.worker = createWorker({
      logger: progress => {
        if (progress.status === 'reconizing text') {this.captureProgress = parseInt('' + progress.progress, 10);}
      },
    });
    this.ocrResult = 'Prêt';
    await this.worker.load();
    await this.worker.loadLanguage('fra');
    await this.worker.initialize('fra');
  };

  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.image = this.factureService.getData(this.base64Convertor.convertToFile(image.dataUrl, 'factureImage')).subscribe();
    //console.log(this.base64Convertor.convertToFile(image.dataUrl, 'factureImage'));
    this.workerReady = true;
  }

  async recognizeImage() {
    this.ocrResult = 'Recognizing...';
    const result = await this.worker.recognize(this.image);
    this.ocrResult = result.data.text;
    console.log(this.ocrResult);
    await this.worker.terminate();
  }
}

/*structure Pos {
  int x, y;
  string nomCase;
}

class ModelFacture {
  Pos dst;
  Pos prix;
  Pos exp;
  Pos x;
  Pos y
}*/
