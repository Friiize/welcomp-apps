import { Component, OnInit } from '@angular/core';
import {CameraPreview, CameraPreviewOptions} from '@capacitor-community/camera-preview';

@Component({
  selector: 'app-facture-modeling',
  templateUrl: './facture-modeling.component.html',
  styleUrls: ['./facture-modeling.component.scss'],
})
export class FactureModelingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const cameraPreviewOptions: CameraPreviewOptions = {
    position: 'rear',
    height: window.screen.height,
    width: window.screen.width
  };
    CameraPreview.start(cameraPreviewOptions).then();
  }

}
