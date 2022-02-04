import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FullScreenPdf } from './full-screen-pdf';

@NgModule({
  declarations: [
    FullScreenPdf,
  ],
  imports: [
    IonicPageModule.forChild(FullScreenPdf),
  ],
})
export class FullScreenPdfModule {}
