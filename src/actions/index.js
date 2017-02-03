import {
  REQUEST_GIFS,
  OPEN_MODAL,
  CLOSE_MODAL,
  SIGN_OUT_USER,
  AUTH_USER,
  AUTH_ERROR,
  FETCH_FAVORITED_GIFS
} from './types';

import request from 'superagent';
import { browserHistory } from 'react-router';
import Firebase from 'firebase';
import firebaseConfig from '../config/firebase';

const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY_STRING = 'dc6zaTOxFJmzC';
const API_KEY = `&api_key=${API_KEY_STRING}`;

Firebase.initializeApp(firebaseConfig);

export function requestGifs(term = null) {
  return function(dispatch) {
    request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then(response => {
      dispatch({
        type: REQUEST_GIFS,
        payload: response
      });
    });
  }
}

export function openModal(gif) {
  return {
    type: OPEN_MODAL,
    payload: gif
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export function signUpUser(credentials) {
  return function(dispatch) {
    Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/favorites');
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      });
  }
}

export function signInUser(credentials) {
  return function(dispatch) {
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/favorites');
      })
      .catch(error => {
        dispatch(authError(error));
      });
  }
}

export function signOutUser() {
  browserHistory.push('/');
  Firebase.auth().signOut();

  return {
    type: SIGN_OUT_USER
  };
}

export function verifyAuth() {
  return function(dispatch) {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    })
  }
}

export function authUser() {
  return {
    type: AUTH_USER
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchFavoritedGifs() {
  const fetchFavorites = (uid, dispatch) => {
    Firebase.database().ref(uid).on('value', snapshot => {
      dispatch({
        type: FETCH_FAVORITED_GIFS,
        payload: snapshot.val()
      });
    });
  }

  return function(dispatch) {
    const userUid = Firebase.auth().currentUser && Firebase.auth().currentUser.uid;

    if (userUid != null) {
      fetchFavorites(userUid, dispatch);
    } else {
      Firebase.auth().onAuthStateChanged(user => {
        fetchFavorites(user.uid, dispatch);
      });
    }
  };
}
export function favoriteGif(selectedGif) {
  const userUid = Firebase.auth().currentUser.uid;
  const gifId = selectedGif.id;

  return dispatch => Firebase.database().ref(userUid).update({
    [gifId]: selectedGif
  });
}

export function unfavoriteGif(selectedGif) {
  const userUid = Firebase.auth().currentUser.uid;
  const gifId = selectedGif.id;

  return dispatch => Firebase.database().ref(userUid).child(gifId).remove();
}
