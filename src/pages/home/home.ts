import { StuffDetailPage } from './../stuff-detail/stuff-detail';
import { Component, OnInit } from '@angular/core';


import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store'
import { State, CHECK_AUTH, LOGOUT, LOGIN, CREATE_USER, GET_FIREBASE_ARRAY } from './../../app/store/mainReducer';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  //directives: [REACTIVE_FORM_DIRECTIVES]
})

export class HomePage implements OnInit {

  submitted = false;
  loginForm: FormGroup;
  storeInfo
  credentials: { email?: string, password?: string } = {};

  constructor(
    private builder: FormBuilder,
    public navCtrl: NavController,
    private store: Store<State>) {

    // use the object in the template since it is an observable
    this.storeInfo = this.store.select('mainAppStoreReducer');

    // here we are monitoring the authstate to do initial load of data
    this.storeInfo.subscribe((currentState: State) => {

      if (currentState.currentUser !== null && !currentState.dataArray && currentState.loading === false) {
        this.doQuery()
      }

    });
  }


  ngOnInit() {
    this.store.dispatch({ type: CHECK_AUTH });
  }

  ionViewWillUnload() {
    this.storeInfo.complete();
  }


  doLogout() {
    this.store.dispatch({ type: LOGOUT });
  }

  doLogin(_credentials) {
    this.submitted = true;

    if (_credentials.valid) {
      this.store.dispatch({ type: LOGIN, payload: _credentials.value });
    }
  }


  doCreateUser(_credentials) {
    this.submitted = true;

    if (_credentials.valid) {
      this.store.dispatch({ type: CREATE_USER, payload: _credentials.value });
    }
  }

  doQuery() {
    this.store.dispatch({ type: GET_FIREBASE_ARRAY, payload: { path: 'stuff' } });
  }

  // doItemQuery
  doItemQuery(_item) {
    this.navCtrl.push(StuffDetailPage, { itemId: _item.$key })
  }
}
