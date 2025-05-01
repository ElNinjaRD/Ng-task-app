import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
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


}
