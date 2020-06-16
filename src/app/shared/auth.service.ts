import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model'; // optional

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { async } from '@angular/core/testing';

@Injectable({
   providedIn: 'root'
   })
export class AuthService {

    user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    ) }
    // Get the auth state, then fetch the Firestore user document or return null
    //function async(fn: Function): (done: any) => any
     async googleSignin(){
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    }
  
    private updateUserData(user:any) {
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
      const data = { 
        uid: user.uid,
        fullName:user.fullName,
        company: user.company,
        position: user.position,
        department: user.department,
        phone: user.phone,
        mobile: user.mobile,
        website:user.website,
        skype:user.skype,
        email: user.email,
        password:user.password,
        address: user.address,
        
      } 
  
      return userRef.set(data, { merge: true })
  
    }
  
    async signOut() {
      await this.afAuth.auth.signOut();
      this.router.navigate(['/']);
    }
  

}


