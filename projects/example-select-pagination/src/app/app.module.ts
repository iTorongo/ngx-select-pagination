import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SelectPaginationModule } from 'select-pagination';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SelectPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
