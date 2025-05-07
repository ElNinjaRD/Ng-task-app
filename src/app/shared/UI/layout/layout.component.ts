import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthStateservice } from '../../data-access/auth-state.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-layout',
  imports: [RouterModule],
  templateUrl: './layout.component.html'
})
export default class LayoutComponent implements OnInit {


  private _authState = inject(AuthStateservice)
  private _router = inject(Router)

  async logOut(){
    await this._authState.logOut();
    this._router.navigateByUrl("/auth/sign-in")
  }

  ngOnInit(): void {
      initFlowbite();
  }
}
