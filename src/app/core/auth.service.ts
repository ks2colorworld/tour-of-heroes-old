import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(
   public afAuth: AngularFireAuth
 ) {}

  doFacebookLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider =
        new firebase.auth.FacebookAuthProvider();
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  doTwitterLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider =
        new firebase.auth.TwitterAuthProvider();
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  doGoogleLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider =
        new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  doRegister(value: { email: string; password: string; }): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // firebase.auth().
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  doLogin(value: { email: string; password: string; }) {
    return new Promise<any>((resolve, reject) => {
      // firebase.auth().
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (// firebase.auth().
      this.afAuth.currentUser) {
        this.afAuth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }


}
