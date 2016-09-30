import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {  FormsModule, Validators,FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
      apiKey: "AIzaSyBb0yc3UWwQPy_dvkcRLThNfQZuNx9jZ-g",
      authDomain: "fir-starterapp.firebaseapp.com",
      databaseURL: "https://fir-starterapp.firebaseio.com",
      storageBucket: "fir-starterapp.appspot.com",
    };

@NgModule({
  imports: [
    BrowserModule,
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
  providers: []
})
export class AppModule { }
