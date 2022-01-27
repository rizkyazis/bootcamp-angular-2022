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
    //untuk cart
    if (this.listCart){
      this.listCart.push(this.cart)
    }else{
      if (this.cart){
        this.listCart=[this.cart];
      }
    }

    //untuk total harga
    if (this.total){
      this.total=this.total+(this.cart.product.price * this.cart.qty)
    }else{
      this.total=(this.cart.product.price * this.cart.qty)
    }
  }

  //hapus cart
  delete(id:number):void{
    this.total = this.total - (this.listCart[id].product.price * this.listCart[id].qty)
    this.listCart.splice(id,1);
  }

}
