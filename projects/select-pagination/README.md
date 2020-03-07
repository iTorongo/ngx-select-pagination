# NgxSelectPagination

`ngx-select-pagination` is not a typical pagination component, it's a dropdown select pagination component for Angular. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Features
* Select display items per page
* Dropdown pager list with start and end range of items per page
* Can be used as an angular form control
* Customize functionality

## Demo
Simple example using `ngx-select-pagination`: https://stackblitz.com/github/itorongo/ngx-select-pagination

## Installation

* `npm install ngx-select-pagination --save`

## Usage

* import `SelectPaginationModule` into your app.module.ts

* add `SelectPaginationModule` to the imports of your NgModule

```ts
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { SelectPaginationModule } from 'ngx-select-pagination';

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

```

And you are good to go...

Use it in your template like this

````
<ngx-select-pagination
    [totalItems]="100" 
    [itemsPerPage]="10" 
    [(ngModel)]="currentPage">
</ngx-select-pagination>

````