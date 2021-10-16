import { Component, OnInit, Input } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  outputText: string;
  ocrResult = 'Recognizing...';
  captureProgess = 0;
  image;
  worker;
  constructor() {
    this.doOCR();
  }

  ngOnInit() {
  }

  async doOCR() {
    const worker = createWorker({
      logger: m => {
        console.log(m);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (m.status === 'reconizing text') ? this.captureProgess = parseInt('' + m.progress * 100, 10): null;
      },
    });
    await this.worker.load();
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
  };

  async captureImage() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      console.log(image);
      this.image = image.dataUrl;
  }

  async recognizeImage() {
    const {data: {text}} = await this.worker.recognize(this.image);
    this.ocrResult = text;
    console.log(text);
    await this.worker.terminate();
  }
}
