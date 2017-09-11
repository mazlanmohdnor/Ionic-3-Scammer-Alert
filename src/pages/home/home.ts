import { CcidProvider } from './../../providers/ccid/ccid';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  args: number;
  data = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private ccid:CcidProvider) {
  }

  check() {
    this.ccid.getDetail(this.args).subscribe((result) => {
      console.log(result);
      this.data = result;
    })
  }

}
