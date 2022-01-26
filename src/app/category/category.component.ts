import { Component, OnInit } from '@angular/core';
import {DepartmentService} from "../services/department.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Department} from "../model/department";
import {Category} from "../model/category";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [DepartmentService]
})
export class CategoryComponent implements OnInit {
  formCatDelete!: FormGroup;
  listCategory!: [Category];
  category!: Category;
  message!: any[];

  constructor(private ds: DepartmentService, private formBuild: FormBuilder, private router: Router) {
    this.formCatDelete = this.formBuild.group({
      'id': new FormControl(null, [Validators.pattern("^[0-9]*$")]),
    })
  }

  ngOnInit(): void {
  }

}
