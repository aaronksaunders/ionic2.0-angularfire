import { CHECK_AUTH, CHECK_AUTH_SUCCESS, CHECK_AUTH_FAILED, CHECK_AUTH_NO_USER, LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED, LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, CREATE_USER_SUCCESS, CREATE_USER_FAILED } from './mainReducer';
import { CREATE_USER } from './mainReducer';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Effect, Actions, toPayload } from "@ngrx/effects";

import { AuthProviders, AuthMethods, AngularFireAuth } from 'angularfire2';

@Injectable()
export class MainEffects {

    constructor(private action$: Actions, public auth$: AngularFireAuth, ) {
        console.log(this.auth$.getAuth())
    }

    @Effect() checkAuth$ = this.action$
        .ofType(CHECK_AUTH)
        .switchMap(() => this.auth$)
        .map((_result) => {
            //this.auth$.unsubscribe()
            if (_result) {
                console.log("in auth subscribe", _result)
                return { type: CHECK_AUTH_SUCCESS, payload: _result }
            } else {
                return { type: CHECK_AUTH_NO_USER, payload: null }
            }

        }).catch((res: any) => Observable.of({ type: CHECK_AUTH_FAILED, payload: res }))

    @Effect() logout$ = this.action$
        // Listen for the 'LOGOUT' action
        .ofType(LOGOUT)
        .switchMap(() => this.auth$.logout())
        // If successful, dispatch success action with result
        .map((res: any) => ({ type: LOGOUT_SUCCESS, payload: null }))
        // If request fails, dispatch failed action
        .catch((res: any) => Observable.of({ type: LOGOUT_FAILED, payload: res }))


    @Effect() login$ = this.action$
        // Listen for the 'LOGOUT' action
        .ofType(LOGIN)
        .map(toPayload)
        .switchMap(payload => {
            console.log("in login$", payload)
            return this.doAuth(payload)
        })



    @Effect() createUser$ = this.action$
        // Listen for the 'LOGOUT' action
        .ofType(CREATE_USER)
        .map(toPayload)
        .switchMap(payload => {
            console.log("in createUser$", payload)
            return this.doCreateUser(payload)
        })

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // MOVE ALL OF THIS TO A SEPERATE SERVICE
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    doAuth(_creds) {
        return Observable.create((observer) => {
            this.auth$.login(_creds, {
                provider: AuthProviders.Password,
                method: AuthMethods.Password
            }).then((_result) => {
                console.log("_result", _result)
                return observer.next({ type: LOGIN_SUCCESS, payload: _result })
            }, (error) => {
                console.log("error", error)
                return observer.next({ type: LOGIN_FAILED, payload: error })
            })
        })
    }

    doCreateUser(_creds) {
        return Observable.create((observer) => {
            this.auth$.createUser(_creds).then((_result) => {
                console.log("_result", _result)
                return observer.next({ type: CREATE_USER_SUCCESS, payload: _result })
            }, (error) => {
                console.log("error", error)
                return observer.next({ type: CREATE_USER_FAILED, payload: error })
            })
        })
    }
}