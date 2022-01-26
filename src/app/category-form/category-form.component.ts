import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Department} from "../model/department";
import {DepartmentService} from "../services/department.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../services/category.service";
import {Category} from "../model/category";

@Component({
  selector: 'app-categoryform',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  id!: String;
  category!: Category;
  listDepartment!:[Department];
  message!:any[];

  constructor(private formBuild: FormBuilder, private cs: CategoryService, private ds:DepartmentService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.form = this.formBuild.group({
      'id':new FormControl(null,[Validators.pattern("^[0-9]*$")]),
      'name':new FormControl(null, [Validators.required]),
      'description':new FormControl(null, [Validators.required]),
      'department':new FormControl(null,[Validators.required])
    })
  }

  ngOnInit(): void {
    this.ds.list().subscribe({
      next: departments => {
        this.listDepartment = departments;
      },
      error: e => {
        console.log(e)
      },
      complete: () => {
        console.log("Loaded list Departments");
      }
    })

    this.activatedRoute.params.subscribe(rute =>{
      this.id = rute['id'];
      if (this.id){
        this.cs.getById(this.id).subscribe({
          next:value => {
            this.form.controls['id'].setValue(this.id);
            this.form.controls['name'].setValue(value.name);
            this.form.controls['description'].setValue(value.description);
            this.form.controls['department'].setValue(value.department.id);
          }
        })
      }
    })
  }

  submit(): void {
    let dept = <Department>{};
    dept.id= this.form.controls['department'].value;

    let cat = <Category>{};
    cat.name=this.form.controls['name'].value;
    cat.description=this.form.controls['description'].value;
    cat.department = dept;

    if (this.id){
      cat.id = this.form.controls['id'].value;
      console.log(cat);
      this.cs.update(cat).subscribe({
        next: hasil => {
          this.category = hasil;
          this.router.navigateByUrl("categories")
        },
        error: e => {
          this.message = e.error.status;
        },
        complete: () => {
          console.log("Category Updated")
        }
      })
    }else {
      this.cs.save(cat).subscribe({
        next: hasil => {
          this.category = hasil;
          this.router.navigateByUrl("categories")
        },
        error: e => {
          this.message = e.error.status;
        },
        complete: () => {
          console.log("Category Created")
        }
      })
    }
  }

}
