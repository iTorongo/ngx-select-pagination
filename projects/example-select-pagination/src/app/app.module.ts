import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SelectPaginationModule } from 'select-pagination';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SelectPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
