import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductPrice } from '../../../../shared/models/product-price.model';

@Component({
  selector: 'product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent implements OnInit {

  @Input() productPrice: ProductPrice = new ProductPrice();
  priceForm = this.fb.group({
    productID: ['', Validators.required],
    price: ['', Validators.required],
    sale: this.fb.group({
      salePrice: ['', Validators.required],
      saleEndDate: ['']
    }),
    lastUpdate: ['']
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
