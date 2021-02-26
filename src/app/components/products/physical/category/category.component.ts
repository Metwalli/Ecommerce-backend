import { Component, OnInit } from '@angular/core';
import { categoryDB } from '../../../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { ProductService } from '../../../../core/services/product.service';
import { Category } from '../../../../shared/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categories = [];
  public closeResult: string;
  public categoryList: Observable<any[]>;
  category: Category = new Category();
  
  constructor(private ps :ProductService, private modalService: NgbModal) {
    this.categoryList = ps.getCategoryList();
    this.categories = categoryDB.category;
  }

  addCategory() {
    if (this.category.id == ""){
      this.category.id = this.ps.addCategory(this.category);
      this.category = new Category();
    }
    else {
      this.ps.updateCategory(this.category);
      this.category = new Category();
    }
    
  }

  onParentSelect(event: any){
    if (event.target.value != "none"){
      this.category.parent = event.target.value;
    }    
  }
  onCategorySelect(cat: Category){
    this.category = cat;
  }
  
 
  ngOnInit() {
    
  }

}
