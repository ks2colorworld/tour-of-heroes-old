import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { FirebaseUserModel } from '../classes/user.model';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService implements Resolve<FirebaseUserModel>  {

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth,
   private router: Router
  ) { }

  /**
   * implements Resolve<FirebaseUserModel> /
   * app-routing.module 에서 사용예시 :
   * { path: 'user', component: UserComponent,  resolve: { userData: UserService}}
   */
  resolve(route: ActivatedRouteSnapshot): Promise<FirebaseUserModel> {
    const user = new FirebaseUserModel();
    return new Promise((resolve, reject) => {
      this.getCurrentUser()
      .then(res => {
        if (res.providerData[0].providerId === 'password') {
          user.image = 'https://via.placeholder.com/400x300';
          user.name = res.displayName;
          user.provider = res.providerData[0].providerId;
          return resolve(user);
        } else {
          user.image = res.photoURL;
          user.name = res.displayName;
          user.provider = res.providerData[0].providerId;
          return resolve(user);
        }
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      });
    });
  }

  getUserInfo(): Promise<FirebaseUserModel> {
    const user = new FirebaseUserModel();
    return new Promise((resolve, reject) => {
      this.getCurrentUser()
      .then(res => {
        if (res.providerData[0].providerId === 'password') {
          user.image = 'https://via.placeholder.com/400x300'; // TODO : 기본 프로필 이미지 변경
          user.name = res.displayName;
          user.provider = res.providerData[0].providerId;
          return resolve(user);
        } else {
          user.image = res.photoURL;
          user.name = res.displayName;
          user.provider = res.providerData[0].providerId;
          return resolve(user);
        }
      }, err => {
        return reject(err);
      });
    });
  }

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
}
