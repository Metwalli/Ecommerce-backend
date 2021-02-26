import { Component, OnInit, Input, Attribute } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Upload } from '../../../../shared/models/upload';
import { UploadService } from '../../../../core/services/upload.service';

import { ProductVariant } from '../../../../shared/models/product-variant.model';
import { ProductAttribute } from '../../../../shared/models/product-attribute.model';
import { ProductPrice } from '../../../../shared/models/product-price.model';
import { ProductAttributeLine } from '../../../../shared/models/product-attribute-line.model';

import { ProductService } from '../../../../core/services/product.service';
import { ModalService } from '../../../../shared/service/modal.service';
declare var $ : any;

@Component({
  selector: 'product-variant',
  templateUrl: './product-variant.component.html',
  styleUrls: ['./product-variant.component.scss']
})
export class ProductVariantComponent implements OnInit {

  public attribute: ProductAttribute;
  @Input() uploadList: Upload[]=[];
  @Input() variant:ProductVariant = new ProductVariant();
  @Input() itemAttributes: ProductAttribute[] = [];
  public attributeValues: ProductAttributeLine[] = [];
  public variantAttributeList: any[] = [];
  public name: string;
  public value: string;
  public variantPrice: ProductPrice = new ProductPrice();
  public upload: Upload = new Upload();
  formdata;
  bodyText;
  constructor( private ps: ProductService, 
      private uploadService: UploadService, 
      private modalService: ModalService) { }

  readUrl(e: any){

  }

  

  onAttributeSelect(e: any){
    // this.attribute = this.ps.getAttribute(e.target.value);
    // this.attributeValues = attribute.attributeLines;
  }

  removeUpload(){
    this.uploadService.deleteUpload(this.upload);    
    
  }

  onValueSelect(e: any){

  }
  deleteAttribute(id: string){

  }
  addAttribute(){
    this.variantAttributeList.push({name: this.name, value: this.value});
    this.variant.attrs.push({name: this.name, value: this.value})
  }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
  }

  openModal(id: string) {
      this.modalService.open(id);
      console.log(this.modalService.modals);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  selectImage(img){
    this.variant.img = img.url;
    console.log(this.variant.img);
  }
}
