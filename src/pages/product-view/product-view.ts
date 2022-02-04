import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ShareService } from "../../app/services/share.service";
import { Product } from "../../app/models/models";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { ModalPage } from "../modal/modal";
import { FullScreenPdf } from "../full-screen-pdf/full-screen-pdf";

@Component({
  selector: "product-view",
  templateUrl: "product-view.html"
})
export class ProductView {
  // the passed in productId
  private productId: string;
  // the product we're fetching
  private fetchedProduct: Product;
  // the name to send email to
  private emailName: string;
  // the email address to send to
  private emailAddress: string;
  // reusable path for static website files
  private sitePath: string = "http://sharecorp.com/sites/default/files/";

  constructor(
    public navCtrl: NavController,
    public shareService: ShareService,
    public navParams: NavParams,
    private inAppBrowser: InAppBrowser
  ) {
    // grab passed in product
    this.productId = navParams.get("productId");

    // fetch product
    this.shareService.getProduct(this.productId).subscribe(res => {
      this.fetchedProduct = res;
    });
  }

  viewPdf(url) {
    this.navCtrl.push(FullScreenPdf, { pdf: url });
  }

  enlargePicture() {
    this.navCtrl.push(ModalPage, { product: this.fetchedProduct });
  }

  public includeNecessaryLabel(): string {
    var labelString = [
      this.fetchedProduct.specLabel,
      this.fetchedProduct.productLabel,
      this.fetchedProduct.safetyLabel
    ]
      .filter(e => e)
      .map(e => this.sitePath + e + "%0D%0A")
      .join(",");

    labelString = labelString.replace(",", "").replace(" ", "");
    return labelString.replace(" ", "%20");
  }

  parsedEmailToLink() {
    // generates a html email with subject, images, and body content filled in
    this.fetchedProduct.safeEmailBody = this.fetchedProduct.body
      .replace("</h5>", ":%0D%0A")
      .replace("<li>", "%0D%0A- ")
      .replace("·", "%0D%0A- ")
      .replace(/<(?:.|\n)*?>/gm, "")
      .replace(/(\r\n\t|\n|\r\t)/gm, "")
      .replace("&nbsp;", "")
      .replace("&nbsp", "")
      .replace("&amp", "%0D%0A")
      .replace("&", "and")
      .replace(";", "");
    return `mailto:${this.emailAddress}
        ?subject=${this.fetchedProduct.title}&body=Hello ${
      this.emailName
    },%0D%0A%0D%0A${
      this.fetchedProduct.safeEmailBody
    }%0D%0A%0D%0A Please view the product here with even more information!%0D%0A http://sharecorp.com/node/${
      this.fetchedProduct.nid
    }%0D%0A%0D%0A Resources:%0D%0A ${this.includeNecessaryLabel()}`;
  }

  // get a quote
  getAQuote(url) {
    this.inAppBrowser.create(
      `http://sharecorp.com/node/${this.fetchedProduct.nid}#getaquote`,
      "_system"
    );
  }
}
