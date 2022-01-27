import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Cart} from "../model/cart";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() cart!:Cart
  listCart!:[Cart]
  total!:number

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.listCart){
      this.listCart.push(this.cart)
      this.total=this.total+(this.cart.product.price * this.cart.qty)
    }else{
      if (this.cart){
        this.listCart=[this.cart];
        this.total=(this.cart.product.price * this.cart.qty)
      }
    }
  }

}
