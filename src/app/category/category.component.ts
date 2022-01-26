import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../model/category";
import {Router} from "@angular/router";
import {CategoryService} from "../services/category.service";
import {Department} from "../model/department";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  formCatDelete!: FormGroup;
  listCategory!: [Category];
  category!: Category;
  message!: any[];

  constructor(private cs: CategoryService, private formBuild: FormBuilder, private router: Router) {
    this.formCatDelete = this.formBuild.group({
      'id': new FormControl(null, [Validators.pattern("^[0-9]*$")]),
    })
  }

  ngOnInit(): void {
    this.cs.list().subscribe({
        next: categories => {
          this.listCategory = categories;
        },
        error: e => {
          console.log(e)
        },
        complete: () => {
          console.log("Loaded list Categories");
        }
      }
    )
  }

  deleteCategory(id: number): void {
    let cat = <Category>{};
    cat.id = id;
    console.log(cat);
    this.cs.delete(cat).subscribe({
      next: hasil => {
        console.log(hasil.status)
      },
      error: e => {
        this.message = e.error.status;
      },
      complete: () => {
        this.router.navigate([this.router.url])
      }
    })
  }

}
