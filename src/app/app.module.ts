import { MainEffects } from './store/mainEffects';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


import {  FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';

import { mainAppStoreReducer } from '../app/store/mainReducer';


// Must export the config
export const firebaseConfig = {
//  apiKey: '<your-key>',
//  authDomain: '<your-project-authdomain>',
//  databaseURL: '<your-database-URL>',
//  storageBucket: '<your-storage-bucket>'

    apiKey: "AIzaSyC7XBiaPpX3tbmsO7oofWsNYK7ZP3fkkzU",
    authDomain: "new-web-project-45936.firebaseapp.com",
    databaseURL: "https://new-web-project-45936.firebaseio.com",
    storageBucket: "new-web-project-45936.appspot.com",
    messagingSenderId: "882846816313"
};

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,   
    AngularFireModule.initializeApp(firebaseConfig),
    StoreModule.provideStore({mainAppStoreReducer}),
        EffectsModule.run(MainEffects),
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
