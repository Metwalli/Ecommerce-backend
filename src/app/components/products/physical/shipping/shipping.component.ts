import { Component, OnInit, Input } from '@angular/core';
import { Shipping } from '../../../../shared/models/shipping.model';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  @Input() shipping: Shipping = new Shipping();
  constructor() { }

  ngOnInit(): void {
  }

}
