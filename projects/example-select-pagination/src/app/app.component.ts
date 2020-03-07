import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-select-pagination';
  currentPage = 1;
  itemsPerPage = 10;
  pageObj: any;

  constructor() {
    this.pageObj = {
      page: this.currentPage,
      itemsPerPage: this.itemsPerPage
    };
  }

  doPaginate(e) {
    this.pageObj = e;
  }
}
