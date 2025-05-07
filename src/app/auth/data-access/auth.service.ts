import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider }
from '@angular/fire/auth';
import { IUser } from '../../models/IUser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth = inject(Auth);

  signUp(user: IUser) {
    return createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    )
  }


  singIn(user: IUser){
    return signInWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    )
  }


  signInWithGoogle(){
    const provider = new GoogleAuthProvider();

    // provider.setCustomParameters({ prompt: 'select_account' });

    return signInWithPopup(this._auth, provider);
  }


}
