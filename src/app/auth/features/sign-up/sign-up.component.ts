import { Component, inject } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IFormSignUp } from '../../../models/IFormSignUp';
import { AuthService } from '../../data-access/auth.service';
import { user } from '@angular/fire/auth';
import { IUser } from '../../../models/IUser';
import { toast } from 'ngx-sonner';
import { GoogleButtonComponent } from '../../UI/google-button/google-button.component';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './sign-up.component.html',
  styles: ``
})
export default class SignUpComponent {

  private _formBuilder = inject(FormBuilder)
  private _authServices = inject(AuthService)
  private _router = inject(Router)

  form = this._formBuilder.group<IFormSignUp>({

      email: this._formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),

      password: this._formBuilder.control('',[
        Validators.required,
        Validators.minLength(8),
      ]),
  })

  async submit(){

    if(this.form.valid){

      console.log(this.form.value)

      try{

        const {email, password} = this.form.value

        const user: IUser = {
          email: email ?? '',
          password: password ?? ''
        };


        await this._authServices.signUp(user)


        toast.success('User created succesfull')

        this.form.reset();

        this._router.navigateByUrl('/auth/sing-in')
      }catch (error){
        toast.error("the user can't be created")
      }
    }

  }

  async submitWithGoogle(){
    try{
      await this._authServices.signInWithGoogle()

      toast.success('Welcome to task page')

      this._router.navigateByUrl('/task')
    }catch(error){
      toast.error("Error when starting with google")
    }
  }

}
