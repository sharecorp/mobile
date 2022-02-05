import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

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

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, private clipboard: Clipboard) {
    }

    ionViewDidLoad() {
        this.pdfUrl = this.navParams.data.pdf;
    }

    public copyToClipBoard() {
        const [,file] = this.pdfUrl.split("assets/data/imgs/");
        console.log(`http://sharecorp.com/sites/default/files/${file}`);
        this.clipboard.copy(`http://sharecorp.com/sites/default/files/${file}`);
    }

    public closeModal() {
        this.viewCtrl.dismiss();
    }
}
