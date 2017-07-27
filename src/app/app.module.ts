import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';

import { AppComponent }         from './app.component';
import { BoardComponent }       from './board.component';
import { TimerComponent }       from './timer.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    BoardComponent, 
    TimerComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
