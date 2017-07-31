import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }         from './app.component';
import { BoardComponent }       from './board/board.component';
import { TimerComponent }       from './board/timer.component';
import { LoginComponent }       from './login/login.component';

// fake backend
import { fakeBackendProvider } from "./helpers/index";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { BaseRequestOptions } from "@angular/http";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    BoardComponent, 
    TimerComponent,
    LoginComponent
  ],
  providers: [
    // fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
