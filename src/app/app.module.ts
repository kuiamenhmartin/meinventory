import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MyApp } from './app.component';

import { TabsPageModule } from '../pages/tabs/tabs.module';

import { ItemPageModule } from '../pages/item/item.module';
import { HomePageModule } from '../pages/home/home.module';
import { AboutPageModule } from '../pages/about/about.module';
import { ItemDetailsPageModule } from '../pages/item-details/item-details.module';
import { ItemEditPageModule } from '../pages/item-edit/item-edit.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    ItemPageModule,
    TabsPageModule,
    HomePageModule,
    AboutPageModule,
    ItemDetailsPageModule,
    ItemEditPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
