import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShareService } from '../../app/services/share.service';
import { Product } from '../../app/models/models';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'product-view',
  templateUrl: 'product-view.html'
})

export class ProductView {
  // the passed in productId
  private productId: string;
  // the product we're fetching
  private fetchedProduct: Product;

  constructor(public navCtrl: NavController,
    public shareService: ShareService,
    public navParams: NavParams,
    private inAppBrowser: InAppBrowser) {

    // grab passed in product
    this.productId = navParams.get("productId");
    

    // fetch product
    this.shareService.getProduct(this.productId).subscribe((res) => {
      this.fetchedProduct = res;
    });
  }

  // retrieves relevant pdf attachment on product
  viewPdf(url) {
    this.inAppBrowser.create(url, '_system');
  }

  // get a quote
  getAQuote(url) {
    this.inAppBrowser.create(`http://sharecorp.com/node/${this.fetchedProduct.nid}#getaquote`, '_system');
  }  
}
