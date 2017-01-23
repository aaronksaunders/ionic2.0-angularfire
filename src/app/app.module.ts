import { MainEffects } from './store/mainEffects';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';

import { mainAppStoreReducer } from '../app/store/mainReducer';


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
    StoreModule.provideStore({ mainAppStoreReducer }),
    EffectsModule.run(MainEffects),
    IonicModule.forRoot(MyApp),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
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
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
