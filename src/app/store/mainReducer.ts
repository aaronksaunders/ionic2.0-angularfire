import { ActionReducer, Action } from "@ngrx/store";


export const LOGIN: string = "LOGIN";
export const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
export const LOGIN_FAILED: string = "LOGIN_FAILED";
export const LOGOUT: string = "LOGOUT";
export const LOGOUT_SUCCESS: string = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: string = "LOGOUT_FAILED"

export const CREATE_USER: string = "CREATE_USER";
export const CREATE_USER_SUCCESS: string = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED: string = "CREATE_USER_FAILED"

export const GET_FIREBASE_ARRAY: string = "GET_FIREBASE_ARRAY";
export const GET_FIREBASE_ARRAY_SUCCESS: string = "GET_FIREBASE_ARRAY_SUCCESS";
export const GET_FIREBASE_ARRAY_FAILED: string = "GET_FIREBASE_ARRAY_FAILED"

export const CHECK_AUTH: string = "CHECK_AUTH";
export const CHECK_AUTH_SUCCESS: string = "CHECK_AUTH_SUCCESS";
export const CHECK_AUTH_NO_USER: string = "CHECK_AUTH_NO_USER";
export const CHECK_AUTH_FAILED: string = "CHECK_AUTH_FAILED";
//export const LOGIN_FAILED: string = "LOGIN_FAILED";

export const intitialState = {
  authChecked: false,
  currentUser: null,
}

export interface State {
  authChecked: boolean,
  currentUser: any,
  error?: any
};


export const mainAppStoreReducer: ActionReducer<State> =
  (state = intitialState, action: Action) => {

    console.log('Action came in! ', action);

    switch (action.type) {

      case LOGIN: {
        return Object.assign({}, state, { currentCreds: action.payload })
      }

      case LOGIN_SUCCESS: {
        return Object.assign({}, state, { currentUser: action.payload, currentCreds: null, error: null })
      }

      case LOGIN_FAILED: {
        return Object.assign({}, state, { error: action.payload, currentUser: null, authChecked: true })
      }

      case LOGOUT: {
        return Object.assign({}, state)
      }

      case LOGOUT_SUCCESS: {
        return Object.assign({}, state, intitialState)
      }

      case LOGOUT_FAILED: {
        return Object.assign({}, state, { error: action.payload })
      }
      case CHECK_AUTH: {
        return Object.assign({}, state)
      }

      case CHECK_AUTH_SUCCESS: {
        return Object.assign({}, state, { currentUser: action.payload, authChecked: true })
      }
      case CHECK_AUTH_FAILED: {
        return Object.assign({}, state, { error: action.payload, currentUser: null, authChecked: true })
      }
      case CHECK_AUTH_NO_USER: {
        return Object.assign({}, state, { currentUser: null, authChecked: true })
      }

      //
      case CREATE_USER: {
        return Object.assign({}, state, { currentCreds: action.payload })
      }

      case CREATE_USER_SUCCESS: {
        return Object.assign({}, state, { currentUser: action.payload, authChecked: true })
      }
      case CREATE_USER_FAILED: {
        return Object.assign({}, state, { error: action.payload, currentUser: null, authChecked: true })
      }

      case GET_FIREBASE_ARRAY: {
        return Object.assign({}, state, { queryParams: action.payload })
      }
      case GET_FIREBASE_ARRAY_SUCCESS: {
        return Object.assign({}, state, { data : action.payload })
      }
      case GET_FIREBASE_ARRAY_FAILED: {
        return Object.assign({}, state, { error: action.payload })
      }
      default: {
        return state;
      }
    }
  };