import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '@ks89/angular-modal-gallery';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Item } from '../../../../shared/models/item.model';
import { ProductService } from '../../../../core/services/product.service';
import { ProductVariant } from 'src/app/shared/models/product-variant.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [NgbRatingConfig]
})
export class ProductDetailComponent implements OnInit {
  public closeResult: string;
  public counter: number = 1;
  public ImageSrc: string;
  public item: Item = new Item(); 
  public imagesRect: Image[] ;
  public productVariantList: any[] = [];
  public avialableColorList: string[]=[];
  constructor(
    private ps: ProductService, 
    private route: ActivatedRoute,
    private modalService: NgbModal, 
    config: NgbRatingConfig) 
  {
    config.max = 5;
    config.readonly = false;
    
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
  }

  ngOnInit() {
    if (this.route.snapshot.params['id'] != "new-product") {
        this.ps.getItem(this.route.snapshot.params['id']).valueChanges()
          .subscribe(item => this.item = item)
        this.ps.getProductVariantList(this.route.snapshot.params['id'])
          .subscribe(vList => {
            this.productVariantList = vList;
            this.avialableColorList = this.getColorList();
            // debugger
            this.imagesRect = this.getImages();
          });
        // for(let variant of this.productVariantList) {
        //   for(let att of variant.attrs){
        //     // if(att['name'] == 'Color'){
        //     this.avialableColorList.push(att)
            
        //   }
        // }
    }
    // this.imagesRect = [
    //   new Image(0, { img: 'assets/images/pro3/27.jpg' }, { img: 'assets/images/pro3/27.jpg' }),
    //   new Image(1, { img: 'assets/images/pro3/2.jpg' }, { img: 'assets/images/pro3/2.jpg' }),
    //   new Image(2, { img: 'assets/images/pro3/1.jpg' }, { img: 'assets/images/pro3/1.jpg' }),
    //   new Image(3, { img: 'assets/images/pro3/4.jpg' }, { img: 'assets/images/pro3/4.jpg' })]
    // // this.getImages();
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
          // for(let color of colors){
          //   if(att['value'] == color )
          //     colorExist = true
          //     break
          // }
          // if(!colorExist){
            colors.push(att['value'])            
        }
      }
    }
    console.log(colors);
    // for(let v of this.productVariantList){
    //   colors.push(v['color']);
    // }
    return colors;
  }
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
}
