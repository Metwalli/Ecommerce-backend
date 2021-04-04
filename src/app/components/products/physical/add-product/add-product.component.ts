import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Image } from '@ks89/angular-modal-gallery';

import { Product } from '../../../../shared/models/product.model';
import { ProductAttribute } from '../../../../shared/models/product-attribute.model';
import { ProductPrice } from '../../../../shared/models/product-price.model';
import { ProductVariant } from '../../../../shared/models/product-variant.model';
import { Item } from '../../../../shared/models/item.model';

import { ProductService } from '../../../../core/services/product.service';
import { UploadService } from '../../../../core/services/upload.service';
import { Upload } from '../../../../shared/models/upload';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit{

  public productPrice = new ProductPrice();
  public categoryList: Observable<any[]>;
  public attributeList: Observable<any[]>;
  public productVariantList : any[]=[];
  public variant: ProductVariant = new ProductVariant();
  public item: Item = new Item(); 
  public imagesRect: Image[] ;
  public avialableColorList: string[]=[];
  public itemAttributes: ProductAttribute[] = [];
  public uploadList: Upload[]=[];
  public tags: Observable<any[]>;
  public selectedTags: string[]=[];
  @ViewChild("categoryElement") categoryElement: ElementRef;

  public fileControl: FormControl = new FormControl();
  public productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      price: ['', [Validators.required]],
      code: ['', [Validators.required]],
      size: ['', Validators.required],
    
  });

  public counter: number = 1;
  
  constructor(
    private ps: ProductService, 
    private route: ActivatedRoute,
    private uploadService: UploadService, 
    private fb: FormBuilder) {
      debugger 
  }
  ngOnInit() {
    debugger
    this.categoryList = this.ps.getCategoryList(); 
    this.attributeList= this.ps.getAttributeList();
    this.tags = this.ps.getTags();    
    if (this.route.snapshot.params['id'] != "new-product") {
      this.ps.getItem(this.route.snapshot.params['id']).valueChanges()
        .subscribe(item =>{ 
          this.item = item
          this.uploadList = item.images
          // for(let img of item.images){
          //   const f: File = null
          //   this.uploadList.push(new Upload(null , img.id, img.alt, img.url));
          // }
          
        })      
      this.ps.getProductVariantList(this.route.snapshot.params['id'])
        .subscribe(vList => {
          this.productVariantList = vList;
          this.avialableColorList = this.getColorList();
          // debugger
          this.imagesRect = this.getImages();
        });     
    }
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
  changeTags(e: any){
    // debugger
    if (e.target.selected){
      this.item.tags.push(e.target.value);
    } else{
      const index =this.item.tags.indexOf(e.target.value);
      this.item.tags.splice(index,1);
    }
  }
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
    this.productVariantList.push(new ProductVariant());    
  }
  removeVariant(id: string){
    for(let i=0; i< this.productVariantList.length; i++){
      if(this.productVariantList[i].id == id){
        this.productVariantList.splice(i, 1)
        break
      }
    }
    
  }
  
  getImages(){
    const imgs: Image[] = [];
    for(let i = 0; i< this.productVariantList.length; i++){
      imgs.push(new Image(i, { img: this.productVariantList[i]['img'] }, { img: this.productVariantList[i]['img'] }))
    }
    return imgs  
  }
  getColorList() {
    const colors: string[]=[];
    let colorExist: boolean = false
    for(let variant of this.productVariantList) {
      for(let att of variant.attrs){
        if(att['name'] == 'Color' && colors.indexOf(att['value']) == -1){        
            colors.push(att['value'])            
        }
      }
    }
    return colors;
  }
  onSubmit(){
    this.item.images = []
    for (let upload of this.uploadList){        
      this.item.images.push({id: upload.id, url: upload.url, alt: upload.alt});
    }               
    if (this.item.id == ""){
      this.ps.addItem(this.item, this.productVariantList);        
    }else{                
      this.ps.updateItem(this.item, this.productVariantList);
    }                 
  }
  
}
