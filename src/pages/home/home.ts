import { Component, OnInit } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

declare var firebase: any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  //directives: [REACTIVE_FORM_DIRECTIVES]
})

export class HomePage {

  currentUser;
  error;
  authChecked = false
  submitted = false;
  loginForm: FormGroup;
  credentials: { email?: string, password?: string } = {};

  constructor(
    public af: AngularFire,
    private builder: FormBuilder,
    public navCtrl: NavController) {

  }


  ngOnInit() {

    // subscribe to the auth object to check for the login status
    // of the user, if logged in, save some user information and
    // execute the firebase query...
    // .. otherwise
    // show the login modal page

    firebase.auth().onAuthStateChanged((_currentUser) => {

      if (_currentUser) {
        console.log("in auth subscribe", _currentUser)
        this.currentUser = _currentUser;
      } else {
        this.currentUser = null
      }

      this.authChecked = true;

    })
  }

  doLogout() {
    this.af.auth.logout()
  }

  doLogin(_credentials) {
    this.submitted = true;
    this.error = null

    if (_credentials.valid) {
      this.af.auth.login(_credentials.value, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((authData) => {
        console.log("Logged In", authData)
        this.currentUser = authData;

      }).catch((error) => {
        this.error = error
        console.log(error)
      });
    }
  }

}
