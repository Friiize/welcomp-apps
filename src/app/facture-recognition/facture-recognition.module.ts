import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {FactureRecognitionComponent} from './facture-recognition.component';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [FactureRecognitionComponent],
  exports: [FactureRecognitionComponent]
})
export class FactureRecognitionComponentModule {}
