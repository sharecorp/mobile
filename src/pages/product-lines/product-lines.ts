import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareService } from '../../app/services/share.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
    this.inAppBrowser.create(url, '_system');
  }
}