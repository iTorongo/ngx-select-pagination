import { NgModule } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SelectPaginationComponent } from './select-pagination.component';



@NgModule({
  declarations: [SelectPaginationComponent],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  exports: [SelectPaginationComponent]
})
export class SelectPaginationModule { }
