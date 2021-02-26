import { Component, OnInit } from '@angular/core';
import { Router, Routes, Params, CanActivate, ActivatedRoute,
  RouterStateSnapshot, NavigationExtras, RouterModule } from '@angular/router';

import { Observable } from 'rxjs';

import { Product } from '../../../../shared/models/product.model';
import { Item } from '../../../../shared/models/item.model';

import { ProductVariant } from '../../../../shared/models/product-variant.model';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Observable<Item[]>;
  public ImageSrc : string

  constructor(private ps: ProductService, private router: Router, ) {
    this.productList = ps.products;
  }

  ngOnInit() {
  }

  
  // Get Product Color
  getColorList(avColors) {
    const colors: string = avColors;
    return colors.split(',')
  }

  // Change Variants
  ChangeVariants(color, product) {
    product.variants.map((item) => {
      if (item.color === color) {
        product.images.map((img) => {
          if (img.image_id === item.image_id) {
            this.ImageSrc = img.src;
          }
        })
      }
    })
  }

  // Change Variants Image
  ChangeVariantsImage(src) {
    this.ImageSrc = src;
  }
  addProduct(){        
    
    let link = ['/physical/product-list', "new-product"];
    this.router.navigate(link);
}
  editeProduct(product: any){   
    this.ps.currentProduct = product;              
    let link = ['/physical/product-list', product.id];
    //debugger;
    this.router.navigate(link);
  }

}
