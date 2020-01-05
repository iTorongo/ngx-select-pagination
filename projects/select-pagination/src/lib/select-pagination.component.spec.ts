import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPaginationComponent } from './select-pagination.component';

describe('SelectPaginationComponent', () => {
  let component: SelectPaginationComponent;
  let fixture: ComponentFixture<SelectPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
