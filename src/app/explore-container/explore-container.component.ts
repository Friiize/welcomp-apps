import {Component, Input, OnInit} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {createWorker} from 'tesseract.js';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  outputText: string;
  ocrResult = 'Waiting for a picture...';
  captureProgess = 0;
  workerReady = false;
  image;
  worker: Tesseract.Worker;
  constructor() {
    this.loadWorker();
  }

  ngOnInit() {
  }

  async loadWorker() {
    this.worker = createWorker({
      logger: progress => {
        console.log(progress);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (progress.status === 'reconizing text') ? this.captureProgess = parseInt('' + progress.progress * 100, 10): null;
      },
    });
    await this.worker.load();
    await this.worker.loadLanguage('fra');
    await this.worker.initialize('fra');
    console.log('end');
    this.workerReady = true;
  };

  async captureImage() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      console.log('Image : ', image);
      this.image = image.dataUrl;
  }

  async recognizeImage() {
    this.ocrResult = 'Recognizing...';
    const result = await this.worker.recognize(this.image);
    console.log(result);
    this.ocrResult = result.data.text;
    console.log(this.ocrResult);
    await this.worker.terminate();
  }
}
