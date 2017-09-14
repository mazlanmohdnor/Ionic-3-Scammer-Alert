import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import { CcidProvider } from './../../providers/ccid/ccid';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  show: boolean = false;
  bankNum: string;
  data = {
    result: "",
    query: "",
    text: "",
    color: "primary",
    animation:"pop-in"
  };
  cartoon: string;
  input: boolean = true;
  masks: any;

  public loader;
  showLoading() {
    if (!this.loader) {
      this.loader = this.loadingCtrl.create({
        content: 'Checking...'
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
    public loadingCtrl: LoadingController,
    public toast:ToastController,
    public clipboard: Clipboard,
    public socialshare:SocialSharing
  ) { 
    this.masks = {
      bankNum: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
    };

   
   }

  enableInput() {
    var bankNum = this.bankNum.replace(/\D+/g, '');

    var bankNumLenght = ('' + bankNum).length;
    if (bankNumLenght > 7) {
      this.input = false;
    } else {
      this.input = true;
    }
  }

  check() {
    this.showLoading();
    var bankNum = this.bankNum.replace(/\D+/g, '');

    this.ccid.getDetail(bankNum).subscribe((result) => {
      if (result.code==200) {
        this.cartoon = 'assets/no2.png';
        this.data.text = result.data.text;
        this.data.query = result.data.query;
        this.data.result = result.data.result;
        this.data.animation = 'pop-in';
        this.data.color = 'danger';
        this.dismissLoading();
        this.show = true;
        console.log(result);
        
      } else if (result.code == 204) {
        this.cartoon = 'assets/ok2.png';
        this.data.text = "Tiada repot yang dilaporkan setakat ini.";
        this.data.query = this.bankNum.toString();
        this.data.result = "Tiada Repot";
        this.data.color = 'secondary';
        this.data.animation = 'pop-in';
        this.dismissLoading();
        this.show = true;
        
        console.log(this.cartoon);
      }
    })
  }

  reset() {
    this.show = false;
    
    this.bankNum = null;
    this.data = {
      result: "",
      query: "",
      text: "",
      color: "primary",
      animation: 'fadein-down'
    };
    this.cartoon = "";
    this.input = true;
  }

  copy() {
    this.clipboard.copy(this.data.query + " : " + this.data.text + " -via Scammer Detector Malaysia").then(() => {
      let toast = this.toast.create({
        message: 'Copied to clipboard',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  share() {
    var options = {
      message: this.data.query + " : " + this.data.text + " -via Scammer Detector Malaysia",
      subject: 'Account Number: ' + this.data.query,
      url: 'https://play.google.com/store/apps/details?id=my.mazlan.scammerdetectormy',
      chooserTitle: 'Share via...'
    };



    this.socialshare.shareWithOptions(options);
  }
}

