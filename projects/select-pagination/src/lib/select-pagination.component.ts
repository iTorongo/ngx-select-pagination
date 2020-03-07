import { Component, OnInit, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-select-pagination',
  templateUrl: './select-pagination.component.html',
  styleUrls: ['./select-pagination.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectPaginationComponent),
      multi: true

    }
  ]
})
export class SelectPaginationComponent implements OnInit, ControlValueAccessor {

  /**
   * Page changed emmiter, fired when page selection changes
   */
  @Output()
  pageChanged: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Page range separator
   */
  @Input() rangeSeparator = '-';

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
    this.generatePageArray();
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
    this.generatePageArray();
  }

  get totalItems(): number {
    return this._items;
  }

  /**
   * Total calculated totalPages
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
    // TODO Have to investigate why totalPages value not updated
    // this.pageNumber = value > this.totalPages ? this.totalPages : value;
    this.pageNumber = value;
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
   * Total totalPages
   */
  private _totalPages: number;

  /**
   * Defatuls page
   */
  private pageNumber = 1;

  /**
   * Control value accessor on change and touched
   */
  onChange = Function.prototype;
  onTouched = Function.prototype;

  /**
   * Constructor
   */
  constructor(
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {
    this.itemsPerPage =
    typeof this.itemsPerPage !== 'undefined'
      ? this.itemsPerPage
      : this.displayItemsArray[0];
    this.totalPages = this.calculateTotalPages();
  }

  /***
   * Write value for control value accessor
   */
  writeValue(value: number): void {
    this.page = value;
    this.onChange(this.page);
  }

  /**
   * Listend control value accessor on change
   * @param fn
   */
  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  /**
   * Listend control value accessor on touch
   * @param fn
   */
  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
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
    this.writeValue(this.page);
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
    this.createRange();
  }

  /**
   * Create custom range for page array
   */
  private createRange() {
    this.pageArray.forEach((option, index) => {
      option.startRange = this.getStartRange(index);
      option.endRange = this.getEndRange(index);
      option.range  = `${option.startRange}${this.rangeSeparator}${option.endRange}`;
    });
  }

  /**
   * Get start range value
   * @param index
   */
  private getStartRange(index: number) {
    return index === 0 ? this.pageArray[index].value : this.pageArray[index - 1].endRange + 1;
  }

  /**
   * Get end range value
   * @param index
   */
  private getEndRange(index: number) {
    let end: number;
    if (index === 0) {
      end = this.pageArray[index].value + this.itemsPerPage - 1;
      return end;
    }
    end = this.pageArray[index - 1].endRange + this.itemsPerPage;
    if (end >= this.totalItems) {
      end = this.totalItems;
    }
    return end;
  }

}
