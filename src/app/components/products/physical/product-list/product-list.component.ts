import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../../../../shared/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { productDB } from 'src/app/shared/tables/product-list';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public product_list = [];
  productList: Observable<Product[]>;

  constructor(ps: ProductService) {
    this.productList = ps.products;
    this.product_list = productDB.product;
  }

  ngOnInit() {}


}
