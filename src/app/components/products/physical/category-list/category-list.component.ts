import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductService } from '../../../../core/services/product.service';
import { Category } from '../../../../shared/models/category.model';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @Input() categoryList: Observable<any[]>;
  @Output() categorySelected = new EventEmitter<Category>();

  constructor(private ps: ProductService ) { }

  ngOnInit(): void {
    // this.productService.getCategoryList()
    // .subscribe(res => (this.categoryList = res));
  }


  selectCategory(cat: Category){
    this.categorySelected.emit(cat);
  }

  deleteCategory(id: string){
    this.ps.deleteCategory(id);
  }
}
