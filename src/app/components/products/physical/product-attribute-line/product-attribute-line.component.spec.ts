import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributeLineComponent } from './product-attribute-line.component';

describe('ProductAttributeLineComponent', () => {
  let component: ProductAttributeLineComponent;
  let fixture: ComponentFixture<ProductAttributeLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAttributeLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
