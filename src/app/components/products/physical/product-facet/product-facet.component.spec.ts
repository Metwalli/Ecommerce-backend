import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFacetComponent } from './product-facet.component';

describe('ProductFacetComponent', () => {
  let component: ProductFacetComponent;
  let fixture: ComponentFixture<ProductFacetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFacetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFacetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
