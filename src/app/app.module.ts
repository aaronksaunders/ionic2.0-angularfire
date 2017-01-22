import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {  FormsModule, Validators,FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
//  apiKey: '<your-key>',
//  authDomain: '<your-project-authdomain>',
//  databaseURL: '<your-database-URL>',
//  storageBucket: '<your-storage-bucket>'


};

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,   
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  declarations: [
    MyApp,
    HomePage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule { }
