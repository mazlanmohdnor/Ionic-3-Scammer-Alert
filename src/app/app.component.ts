import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppRate } from '@ionic-native/app-rate';
import { Component } from '@angular/core';
import { App, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'HomePage';
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events, public app: App, public appRate: AppRate, public iab: InAppBrowser, private emailComposer: EmailComposer, public social: SocialSharing) {

    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString("#4766a7");
      splashScreen.hide();
    });
  }
  onMenuOpen(event) {
    this.events.publish('sidebar:open');
  }

  onMenuClose(event) {
    this.events.publish('sidebar:close');
  }

  presentModal() {
    this.app.getActiveNav().push('AboutPage');
  }

  ionViewDidLoad() {

  }
  rate() {
    //rate App
    this.appRate.preferences.storeAppURL = {
      android: 'market://details?id=my.mazlan.scammerdetectormy'
    }
    this.appRate.promptForRating(true);
    //rate end
  }

  moreapp() {
    this.iab.create('https://play.google.com/store/apps/dev?id=7340219747104934293&hl=en', '_system')

  }

  portfolio() {
    this.iab.create('https://play.google.com/store/apps/details?id=my.mazlan.myresume', '_system')

  }
  sendEmail() {


    this.emailComposer.addAlias('gmail', 'com.google.android.gm');

    this.emailComposer.open({
      app: 'gmail',
      to: 'lan.psis@gmail.com',

      subject: 'Hi dari Aplikasi Scammer Detector Malaysia',
      body: 'Semak akaun bank yang dikhuatiri terbabit dengan transaksi penipuan urus niaga dalam talian. Muat turun sekarang di Google Playstore: https://play.google.com/store/apps/details?id=my.mazlan.scammerdetectormy',
      isHtml: true
    });


  }


  share() {
    var options = {
      message: 'Semak akaun bank yang dikhuatiri terbabit dengan transaksi penipuan urus niaga dalam talian. Muat turun sekarang di Google Playstore:',
      subject: 'Aplikasi Scammer Detector Malaysia',
      url: 'https://play.google.com/store/apps/details?id=my.mazlan.scammerdetectormy',
      chooserTitle: 'Share via...'
    };



    this.social.shareWithOptions(options);
  }
}

