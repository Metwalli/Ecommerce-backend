import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CKEditorModule } from 'ngx-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared/shared.module'
import { ProductsRoutingModule } from './products-routing.module';
import { CategoryComponent } from './physical/category/category.component';
import { SubCategoryComponent } from './physical/sub-category/sub-category.component';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { AddProductComponent } from './physical/add-product/add-product.component';
import { DigitalCategoryComponent } from './digital/digital-category/digital-category.component';
import { DigitalSubCategoryComponent } from './digital/digital-sub-category/digital-sub-category.component';
import { DigitalListComponent } from './digital/digital-list/digital-list.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';
import { ProductDetailComponent } from './physical/product-detail/product-detail.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { ImageUploaderModule } from '../../image-uploader/image-uploader.module';

import { ProductVariantComponent } from './physical/product-variant/product-variant.component';
import { ProductFacetComponent } from './physical/product-facet/product-facet.component';
import { ProductPriceComponent } from './physical/product-price/product-price.component';
import { ProductReviewComponent } from './physical/product-review/product-review.component';
import { ProductSummaryComponent } from './physical/product-summary/product-summary.component';
import { ProductAttributeComponent } from './physical/product-attribute/product-attribute.component';
import { CategoryListComponent } from './physical/category-list/category-list.component';
import { ShippingComponent } from './physical/shipping/shipping.component';
import { ProductAttributeLineComponent } from './physical/product-attribute-line/product-attribute-line.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};



@NgModule({
  declarations: [
    CategoryComponent, 
    SubCategoryComponent, 
    ProductListComponent, 
    AddProductComponent, 
    DigitalCategoryComponent, 
    DigitalSubCategoryComponent, 
    DigitalListComponent, 
    DigitalAddComponent, 
    ProductDetailComponent, 
    ProductVariantComponent, 
    ProductFacetComponent, 
    ProductPriceComponent, 
    ProductReviewComponent, 
    ProductSummaryComponent, 
    ProductAttributeComponent, 
    CategoryListComponent, 
    ShippingComponent, 
    ProductAttributeLineComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    ProductsRoutingModule,
    Ng2SmartTableModule,
    NgbModule,
    DropzoneModule,
    ImageUploaderModule,
    SharedModule,
    GalleryModule.forRoot(),

  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    NgbActiveModal
  ]
})
export class ProductsModule { }
