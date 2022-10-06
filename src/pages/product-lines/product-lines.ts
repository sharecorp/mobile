import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareService } from '../../app/services/share.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FullScreenPdf } from '../full-screen-pdf/full-screen-pdf';

@Component({
  selector: 'product-lines',
  templateUrl: 'product-lines.html'
})

export class ProductLines implements OnInit {
  // the list of product lines
  private productLines = [];

  constructor(public navCtrl: NavController, private shareService: ShareService, public inAppBrowser: InAppBrowser) {
  }

  ngOnInit() {
    this.shareService.getProductLines().subscribe((res) => {
      this.productLines = res;
    });
  }

  // retrieves relevant pdf attachment on product line
  getProductLine(url) {
    url = url.replace("assets/data/imgs/", "");
    this.navCtrl.push(FullScreenPdf, { pdf: url });
  }
}