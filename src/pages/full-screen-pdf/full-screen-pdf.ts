import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'full-screen-pdf',
    templateUrl: 'full-screen-pdf.html',
})
export class FullScreenPdf {

    // the passed in productId
    private pdfUrl: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    }

    ionViewDidLoad() {
        console.log(this.navParams.data.pdf);
        this.pdfUrl = this.navParams.data.pdf;
    }

    public closeModal() {
        this.viewCtrl.dismiss();
    }
}
