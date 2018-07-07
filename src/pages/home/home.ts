import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareService } from '../../app/services/share.service';
import { Category, Product } from '../../app/models/models';
import { ProductView } from '../product-view/product-view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {
  // the list of categories
  private categoryList: Category[];

  constructor(public navCtrl: NavController, private shareService: ShareService) {
  }

  ngOnInit() {

    // grab all product categories
    this.shareService.getCategories().subscribe(res => {
      this.categoryList = res;
    });
    this.shareService.getCategories().subscribe(res => {
      this.categoryList = res;
    });
  }

  // When a user a clicks a category
  categoryClick(category) {
    category.clicked = !category.clicked;
    if (category.subCategory && category.subCategory.length) {
      // reset the account contents []
      category.subCategory = [];
      return;
    }
    // get all products under the account
    this.shareService.getProductsInCategory(category.tid).subscribe((res) => {
      category.subCategory = res;
    });
  }

  // On product select navigate to product view
  goToProduct(product: Product): void {
    // pass in productId to product view page 
    this.navCtrl.push(ProductView, { "productId": product.nid });
  }
}
