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

export const GET_FIREBASE_OBJECT: string = "GET_FIREBASE_OBJECT";
export const GET_FIREBASE_OBJECT_SUCCESS: string = "GET_FIREBASE_OBJECT_SUCCESS";
export const GET_FIREBASE_OBJECT_FAILED: string = "GET_FIREBASE_OBJECT_FAILED"

export const CHECK_AUTH: string = "CHECK_AUTH";
export const CHECK_AUTH_SUCCESS: string = "CHECK_AUTH_SUCCESS";
export const CHECK_AUTH_NO_USER: string = "CHECK_AUTH_NO_USER";
export const CHECK_AUTH_FAILED: string = "CHECK_AUTH_FAILED";
//export const LOGIN_FAILED: string = "LOGIN_FAILED";

export const intitialState = {
  authChecked: false,
  currentUser: null,
  loading: false
}

export interface State {
  authChecked: boolean,
  currentUser: any,
  loading: boolean
  error?: any
  dataArray?: Array<any>
  dataObject?: Object
};


export const mainAppStoreReducer: ActionReducer<State> =
  (state = intitialState, action: Action) => {

    console.log('Action came in! ', action);

    switch (action.type) {

      case LOGIN: {
        return Object.assign({}, state, { currentCreds: action.payload, loading: true })
      }

      case LOGIN_SUCCESS: {
        return Object.assign({}, state, { currentUser: action.payload, currentCreds: null, error: null, loading: false })
      }

      case LOGIN_FAILED: {
        return Object.assign({}, state, { error: action.payload, currentUser: null, authChecked: true, loading: false })
      }

      case LOGOUT: {
        return Object.assign({}, state, { loading: true })
      }

      case LOGOUT_SUCCESS: {
        return Object.assign({}, intitialState, { authChecked: true })
      }

      case LOGOUT_FAILED: {
        return Object.assign({}, state, { error: action.payload, loading: false })
      }
      case CHECK_AUTH: {
        return Object.assign({}, state, { loading: true })
      }

      case CHECK_AUTH_SUCCESS: {
        return Object.assign({}, state, { currentUser: action.payload, authChecked: true, loading: false })
      }
      case CHECK_AUTH_FAILED: {
        return Object.assign({}, state, { error: action.payload, currentUser: null, authChecked: true, loading: false })
      }
      case CHECK_AUTH_NO_USER: {
        return Object.assign({}, state, { currentUser: null, authChecked: true, loading: false })
      }

      //
      case CREATE_USER: {
        return Object.assign({}, state, { currentCreds: action.payload, loading: true })
      }

      case CREATE_USER_SUCCESS: {
        return Object.assign({}, state, { currentUser: action.payload, authChecked: true, loading: false })
      }
      case CREATE_USER_FAILED: {
        return Object.assign({}, state, { error: action.payload, currentUser: null, authChecked: true, loading: false })
      }

      case GET_FIREBASE_ARRAY: {
        return Object.assign({}, state, { queryParams: action.payload, loading: true })
      }
      case GET_FIREBASE_ARRAY_SUCCESS: {
        return Object.assign({}, state, { dataArray: action.payload, loading: false })
      }
      case GET_FIREBASE_ARRAY_FAILED: {
        return Object.assign({}, state, { error: action.payload, loading: false })
      }
      case GET_FIREBASE_OBJECT: {
        return Object.assign({}, state, { queryParams: action.payload, loading: true })
      }
      case GET_FIREBASE_OBJECT_SUCCESS: {
        return Object.assign({}, state, { dataObject: action.payload, loading: false })
      }
      case GET_FIREBASE_OBJECT_FAILED: {
        return Object.assign({}, state, { error: action.payload, loading: false })
      }
      default: {
        return state;
      }
    }
  };