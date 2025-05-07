import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxSonnerToaster} from 'ngx-sonner';
import { AuthStateservice } from './shared/data-access/auth-state.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    initFlowbite();
  }

}
