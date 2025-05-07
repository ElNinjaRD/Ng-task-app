import { inject, Injectable } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateservice{

  private _auth = inject(Auth)

  //obtener el estado actual de nuestra applicación
  get authState$(): Observable<any>{
    return authState(this._auth)
  }

  logOut(){
    return signOut(this._auth)
  }

}
