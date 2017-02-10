import { Store } from '@ngrx/store';
import { GET_FIREBASE_OBJECT, State } from './../../app/store/mainReducer';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the StuffDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stuff-detail',
  templateUrl: 'stuff-detail.html'
})
export class StuffDetailPage {

  storeInfo

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private store: Store<State>) {


    // use the object in the template since it is an observable
    this.storeInfo = this.store.select('mainAppStoreReducer');

    this.storeInfo.subscribe((data: any) => {
      console.log("mainAppStoreReducer store changed - ", data)

    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StuffDetailPage');
    let itemId = this.navParams.get('itemId');

    this.store.dispatch({ type: GET_FIREBASE_OBJECT, payload: { path: 'stuff/' + itemId } });
  }


  ionViewWillUnload() {
    this.storeInfo.complete();
  }



}
