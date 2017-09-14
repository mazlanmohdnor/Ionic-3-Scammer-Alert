import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';
import { CcidProvider } from '../providers/ccid/ccid';

//PLUGINS
import { SocialSharing } from "@ionic-native/social-sharing";
import { EmailComposer } from "@ionic-native/email-composer";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { AppRate } from "@ionic-native/app-rate";
import { Clipboard } from "@ionic-native/clipboard";
import { AdMobFree } from "@ionic-native/admob-free";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    // TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CcidProvider,
    SocialSharing,
    EmailComposer,
    InAppBrowser,
    AppRate,
    Clipboard,
    AdMobFree
  ]
})
export class AppModule {}
