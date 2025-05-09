import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ng-task-app-197f0',
        appId: '1:388789553982:web:36c590264a201f45e93a6f',
        storageBucket: 'ng-task-app-197f0.firebasestorage.app',
        apiKey: 'AIzaSyBAAMTk6uRkSXUHzpHkU9v8VW3RAWyElBo',
        authDomain: 'ng-task-app-197f0.firebaseapp.com',
        messagingSenderId: '388789553982',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
