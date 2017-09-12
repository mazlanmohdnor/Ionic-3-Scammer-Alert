import { CcidProvider } from './../../providers/ccid/ccid';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  bankNum: number;
  data = {
    result: "",
    query: "",
    text: "",
    color:"primary"
  };
  cartoon: string;
  input: boolean = true;

  public loader;
  showLoading() {
    if (!this.loader) {
      this.loader = this.loadingCtrl.create({
        content: 'Menyemak Data...'
      });
      this.loader.present();
    }
  }
  dismissLoading() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ccid: CcidProvider,
    public loadingCtrl: LoadingController
  ) {  }

  enableInput() {
    var bankNumLenght = ('' + this.bankNum).length;
    if (bankNumLenght > 7) {
      this.input = false;
    } else {
      this.input = true;
    }
  }

  check() {
    this.showLoading();

    this.ccid.getDetail(this.bankNum).subscribe((result) => {
      if (result.code==200) {
        this.cartoon = '../assets/no.png';
        this.data.text = result.data.text;
        this.data.query = result.data.query;
        this.data.result = result.data.result;
        this.data.color = 'danger';
        this.dismissLoading();
        console.log(result);
        
      } else if (result.code == 204) {
        this.cartoon = '../assets/ok.png';
        this.data.text = "Tiada Rekod";
        this.data.query = this.bankNum.toString();
        this.data.result = "result clean";
        this.data.color = 'secondary'
        this.dismissLoading();
        console.log(this.cartoon);
      }
    })
  }

  reset() {
    this.bankNum = null;
    this.data = {
      result: "",
      query: "",
      text: "",
      color:"primary"
    };
    this.cartoon = "";
  }

}
