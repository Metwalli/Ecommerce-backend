import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { Product } from '../../../../shared/models/product.model';
import { ProductAttribute } from '../../../../shared/models/product-attribute.model';
import { ProductPrice } from '../../../../shared/models/product-price.model';
import { ProductVariant } from '../../../../shared/models/product-variant.model';
import { Item } from '../../../../shared/models/item.model';

import { ProductService } from '../../../../core/services/product.service';
import { UploadService } from '../../../../core/services/upload.service';
import { Upload } from '../../../../shared/models/upload';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public productPrice = new ProductPrice();
  public categoryList: Observable<any[]>;
  public attributeList: Observable<any[]>;
  public variantList : any[]=[];
  public variant: ProductVariant = new ProductVariant();
  public item: Item = new Item(); 
  public itemAttributes: ProductAttribute[] = [];
  public uploadList: Upload[]=[];
  public tags: Observable<any[]>;
  public selectedTags: string[]=[];
  public fileControl: FormControl = new FormControl();
  public productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      price: ['', [Validators.required]],
      code: ['', [Validators.required]],
      size: ['', Validators.required],
    
  });

  public counter: number = 1;
  
  constructor(private ps: ProductService, private uploadService: UploadService, private fb: FormBuilder) {
    
  }

  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
  }

  removeUpload(upload: Upload){
    this.uploadService.deleteUpload(upload);
    let index = this.uploadList.indexOf(upload);
    this.uploadList.splice(index, 1);
    if(this.item.images.length >= 0){
      this.item.images.splice(index, 1);
    }
    
  }
  // get attributes() {
  //   return this.productForm.get('attributes') as FormArray;
  // }
  changeCategory(e: any){
    if (e.target.checked){
      this.item.category.push(e.target.value);
    } else{
      const index =this.item.category.indexOf(e.target.value);
      this.item.category.splice(index,1);
    }
  }

  onSelectTag(item){
    this.selectedTags.push(item.name);
  }

  changeAttribute(e: any, att: any){
    if (e.target.checked){
      this.itemAttributes.push(att);
      this.item.attributes.push(e.target.value);
    } else{
      const index =this.item.attributes.indexOf(e.target.value);
      this.item.attributes.splice(index,1);
      this.itemAttributes.splice(index, 1);
    }

  }
  changeValue(event: any){
    if(event.target.checked){
      this.item.hasVariants = true;
    }
    else{
      this.item.hasVariants = false;
    }
  }
  addVariant(){
    this.variantList.push(new ProductVariant());    
  }
  
  ngOnInit() {
    this.categoryList = this.ps.getCategoryList(); 
    this.attributeList= this.ps.getAttributeList();
    this.tags = this.ps.getTags();    
  }
  onSubmit(){
    if (this.item.id == ""){
      for (let upload of this.uploadList){
        this.item.images.push({id: upload.$key, url: upload.url, alt: upload.alt});
      }
      this.ps.addItem(this.item);

      for(let v of this.variantList){
        v.itemId = this.item.id;
        this.ps.addVariant(v);
        this.item.variants.push(v.id);
      }
    }else{
      this.ps.updateItem(this.item);
    }         
  }
  
}
