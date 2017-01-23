import { Component, OnInit } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState, AngularFireAuth } from 'angularfire2';

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

  currentUser;
  error;
  authState;
  authChecked = false
  submitted = false;
  loginForm: FormGroup;
  credentials: { email?: string, password?: string } = {};

  constructor(
    public af: AngularFire,
    private builder: FormBuilder,
    public navCtrl: NavController,
    private store: Store<State>) {

    this.store.select('mainAppStoreReducer').subscribe((data: State) => {
      console.log("mainAppStoreReducer store changed - ", data)
      if (data.authChecked === true) {
        this.currentUser = data.currentUser;
        this.authChecked = data.authChecked;
      }

      if (data.error) {
        this.error = data.error
      }
    });
  }


  ngOnInit() {
    this.store.dispatch({ type: CHECK_AUTH });
  }

  doLogout() {
    this.store.dispatch({ type: LOGOUT });
  }

  doLogin(_credentials) {
    this.submitted = true;
    this.error = null

    if (_credentials.valid) {
      this.store.dispatch({ type: LOGIN, payload: _credentials.value });
    }
  }


  doCreateUser(_credentials) {
    this.submitted = true;
    this.error = null

    if (_credentials.valid) {
      this.store.dispatch({ type: CREATE_USER, payload: _credentials.value });
    }
  }

  doQuery() {
    this.store.dispatch({ type: GET_FIREBASE_ARRAY, payload: { path: 'stuff' } });
  }
}
