import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Message} from "../model/message";
import {Product} from "../model/product";
import {ProductService} from "../services/product.service";
import {Cart} from "../model/cart";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  form!: FormGroup;
  product!: Product;
  message!: any[];
  cart!: Cart;

  constructor(private formBuild: FormBuilder, private ps: ProductService) {
    this.form = this.formBuild.group({
      'id': new FormControl(null, [Validators.required]),
      'qty': new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  findById(): void {
    this.ps.getById(this.form.controls["id"].value).subscribe({
      next: hasil => {
        this.product = hasil;
      }, error: err => {
        this.message = err.error.status;
      }, complete: () => {
        console.log("Loaded data product")
      }
    })
  }

  addCart(): void {
    let c = <Cart>{};
    c.product = this.product;
    c.qty = this.form.controls["qty"].value;
    this.cart = c;
    console.log(c)

    this.form.controls["id"].setValue("");
    this.form.controls["qty"].setValue("")
    this.product = <Product>{};
  }

}
