import { Component } from '@angular/core';

import { ProductList } from '../product-list/product-list';
import { ShareTv } from '../share-tv/share-tv';
import { HomePage } from '../home/home';
import { ProductLines } from '../product-lines/product-lines';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProductList;
  tab3Root = ShareTv;
  tab4Root = ProductLines;

  constructor() {

  }
}
