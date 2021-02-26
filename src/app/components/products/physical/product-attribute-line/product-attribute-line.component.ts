import { Component, OnInit, Input } from '@angular/core';

import { ProductAttributeLine } from '../../../../shared/models/product-attribute-line.model';

@Component({
  selector: 'product-attribute-line',
  templateUrl: './product-attribute-line.component.html',
  styleUrls: ['./product-attribute-line.component.scss']
})
export class ProductAttributeLineComponent implements OnInit {

  @Input() displyType: string = "";
  @Input() attributeLineList: any[];

  public attributeLine: ProductAttributeLine = new ProductAttributeLine();

  constructor() {
    
  }

  addValue(){
    this.attributeLineList.push({value: this.attributeLine.value, color: this.attributeLine.color});        
    this.attributeLine = new ProductAttributeLine();
  }

  selectLine(id: string){

  }
  deleteLine(index: number){
    this.attributeLineList.splice(index, 1);

  }



  ngOnInit(): void {
    

  }

}
