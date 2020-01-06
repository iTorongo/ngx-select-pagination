import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ngx-select-pagination',
  templateUrl: './select-pagination.component.html',
  styles: []
})
export class SelectPaginationComponent implements OnInit {


  /**
   * Page changed emmiter, fired when page selection changes
   */
  @Output()
  pageChanged: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Page label separator
   */
  @Input() labelSeparator = '-';

  /**
   * Previous button text
   */
  @Input() previousText = 'Previous';

  /**
   * Next button text
   */
  @Input() nextText = 'Next';

  /**
   * List of Items to display or size per page
   */
  @Input() displayItemsArray = [10, 50, 100];

  /**
   * Total number of items to show per page
   */
  @Input()
  set itemsPerPage(v: number) {
    this._itemsPerPage = v;
    this.totalPages = this.calculateTotalPages();
  }

  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  /**
   * Total number of items
   */
  @Input()
  set totalItems(v: number) {
    this._items = v;
    this.totalPages = this.calculateTotalPages();
  }

  get totalItems(): number {
    return this._items;
  }

  /**
   * Total calculated pages
   */
  set totalPages(v: number) {
    this._totalPages = v;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  /**
   * Current page
   */
  set page(value: number) {
    this.pageNumber = value > this.totalPages ? this.totalPages : value;
  }

  get page(): number {
    return this.pageNumber;
  }

  /**
   * Page array
   */
  pageArray = [];

  /**
   * Items to display per page
   */
  private _itemsPerPage: number;

  /**
   * Total items
   */
  private _items: number;

  /**
   * Total pages
   */
  private _totalPages: number;

  /**
   * Defatuls page
   */
  private pageNumber = 1;

  /**
   * Constructor
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() {
    this.generatePageArray();
  }

  /**
   * On change display _items per page
   * @param event
   */
  onChangeDisplayItemPerPage(event) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.generatePageArray();
    this.setDefaultPage();
    this.onPageChange();
  }

  /**
   * On change page
   */
  onPageChange() {
    this.pageChanged.emit({
      page: this.page,
      itemsPerPage: this.itemsPerPage
    });
  }

  /**
   * Previous page
   */
  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.onPageChange();
    }
  }

  /**
   * Next page
   */
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.onPageChange();
    }
  }

  /**
   * Set default page number
   */
  private setDefaultPage() {
    this.page = this.pageArray[0].value;
  }

  /**
   * Calculate total page for pagination
   */
  private calculateTotalPages(): number {
    const totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
    return Math.max(totalPages || 0, 1);
  }

  /**
   * Generate page array
   */
  private generatePageArray() {
    this.pageArray = [];
    let page = 1;
    while (page !== this.totalPages + 1 ) {
      const option = {
        value: page
      };
      this.pageArray.push(option);
      page++;
    }
    this.createLabel();
  }

  /**
   * Create custom label for page array
   */
  private createLabel() {
    this.pageArray.forEach((option, index) => {
      option.labelPrefix = this.getLabelPrefix(index);
      option.labelPostfix = this.getLabelPostfix(index);
      option.label  = `${option.labelPrefix}${this.labelSeparator}${option.labelPostfix}`;
    });
  }

  /**
   * Get label prefix value
   * @param index
   */
  private getLabelPrefix(index: number) {
    return index === 0 ? this.pageArray[index].value : this.pageArray[index - 1].labelPostfix + 1;
  }

  /**
   * Get label postfix value
   * @param index
   */
  private getLabelPostfix(index: number) {
    let postfix: number;
    if (index === 0) {
      postfix = this.pageArray[index].value + this.itemsPerPage - 1;
      return postfix;
    }
    postfix = this.pageArray[index - 1].labelPostfix + this.itemsPerPage;
    if (postfix >= this.totalItems) {
      postfix = this.totalItems;
    }
    return postfix;
  }

}
