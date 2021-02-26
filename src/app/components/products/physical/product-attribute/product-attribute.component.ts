import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Observable } from 'rxjs'

import { ProductAttribute } from '../../../../shared/models/product-attribute.model';
import { ProductService } from '../../../../core/services/product.service';
import { ProductAttributeLine } from '../../../../shared/models/product-attribute-line.model';


@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrls: ['./product-attribute.component.scss']
})
export class ProductAttributeComponent implements OnInit {
  public productAttribute: ProductAttribute = new ProductAttribute();
  public attributeLineValue: string;
  public attributeLineColor: string;
  
  constructor(private ps: ProductService, private fb: FormBuilder) {
    if (!this.productAttribute.attributeLines){
      this.productAttribute.attributeLines = [];
    }
  
  }
  
  ngOnInit(): void {
    if (this.productAttribute.attributeLines.length == 0){
      // this.productAttribute.attributeLines.push("");
    }
  }
  
    onSubmit(){
    this.ps.addAttribute(this.productAttribute);
    // this.productAttribute = new ProductAttribute();
  }
}
