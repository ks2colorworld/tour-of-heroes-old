import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable()
export class UserService {

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth
 ) { }


  getCurrentUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // const user = firebase.auth().onAuthStateChanged
      this.afAuth.onAuthStateChanged
      (rUser => {
        if (rUser) {
          resolve(rUser);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(value: { name: any; }): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const user =
        firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }
}
