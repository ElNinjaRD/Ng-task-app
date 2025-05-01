import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import { IFormSignUp } from '../../../models/IFormSignUp';
import { IUser } from '../../../models/IUser';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export default class SignInComponent {

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


        await this._authServices.singIn(user)


        toast.success('Welcome to task page')

        this.form.reset();

        this._router.navigateByUrl('/task')
      }catch (error){
        toast.error("the user can't be created")
      }
    }

  }

}
