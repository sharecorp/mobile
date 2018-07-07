import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareService } from '../../app/services/share.service';
import { Product } from '../../app/models/models';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-contact',
  templateUrl: 'share-tv.html'
})
export class ShareTv {
  // the list of share tv videos
  public shareTvList: Product[];
  constructor(
    public navCtrl: NavController,
    public shareService: ShareService,
    private inAppBrowser: InAppBrowser) {
  }

  ngOnInit() {
    this.shareService.getShareTvList().subscribe((res) => {
      this.shareTvList = res;
      console.error(this.shareTvList)
    });
  };

  // load video on click
  loadVideo(video): void {
    this.inAppBrowser.create(video, '_system');
  }
}



