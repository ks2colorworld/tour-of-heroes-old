import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth,
   public authService: AuthService,
   private location: Location,
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

  updateCurrentUser(value: { name: string; }): Promise<any> {
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


  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log('Logout error', error);
    });
  }
}
