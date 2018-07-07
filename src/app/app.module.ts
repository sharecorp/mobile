import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ShareService } from './services/share.service';
import { DataPrepService } from './services/data-prep.service';

import { ProductList } from '../pages/product-list/product-list';
import { ShareTv } from '../pages/share-tv/share-tv';
import { HomePage } from '../pages/home/home';
import { ProductLines } from '../pages/product-lines/product-lines';
import { ProductView } from '../pages/product-view/product-view';
import { TabsPage } from '../pages/tabs/tabs';

import { OrderByPipe } from '../pipes/orderByPipe';
import { FilterPipe } from '../pipes/filterByPipe';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DocumentViewer } from '@ionic-native/document-viewer';


@NgModule({
  declarations: [
    MyApp,
    ProductList,
    ShareTv,
    HomePage,
    TabsPage,
    ProductLines,
    ProductView,
    OrderByPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProductList,
    ShareTv,
    HomePage,
    ProductView,
    ProductLines,
    TabsPage
  ],
  providers: [
    StatusBar,
    DataPrepService,
    ShareService,
    InAppBrowser,
    SplashScreen,
    DocumentViewer,
    StreamingMedia,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
