import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareService } from '../../app/services/share.service';
import { Product } from '../../app/models/models';
import { ProductView } from '../product-view/product-view';

@Component({
  selector: 'page-about',
  templateUrl: 'product-list.html'
})

export class ProductList implements OnInit {
  // the product list
  private productList: Product[];
  // filter object used to filter lists via search query
  private filterObject: Object;

  constructor(public navCtrl: NavController, private shareService: ShareService) {
    this.filterObject = '';
  }

  ngOnInit() {
    this.shareService.getProductList().subscribe((res) => {
      this.productList = res;
    });
  }

  // On product select navigate to product view
  goToProduct(product: Product): void {
    // pass in productId to product view page 
    this.navCtrl.push(ProductView, { "productId": product.nid });
  }
}
