import {Component, OnInit} from '@angular/core';
import {DepartmentService} from "../services/department.service";
import {Department} from "../model/department";
import {CategoryService} from "../services/category.service";
import {Category} from "../model/category";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BigInteger} from "@angular/compiler/src/i18n/big_integer";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DepartmentService, CategoryService]
})
export class HomeComponent implements OnInit {

  formDeptDelete!: FormGroup;
  listDepartment!: [Department];
  listCategory!: [Category];
  department!: Department;
  message!: any[];

  constructor(private ds: DepartmentService, private category: CategoryService, private formBuild: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    this.formDeptDelete = this.formBuild.group({
      'id': new FormControl(null, [Validators.pattern("^[0-9]*$")]),
    })
  }

  ngOnInit(): void {
    //The Old Way
    // this.department.list().subscribe(
    //   departments => {
    //     this.list = departments
    //   },
    //   err => {
    //     console.log(err)
    //   },
    //   () => {
    //     alert("Loaded !")
    //   }
    // )

    //The New Way
    this.ds.list().subscribe({
      next: departments => {
        this.listDepartment = departments;
      },
      error: e => {
        console.log(e)
      },
      complete: () => {
        console.log("Loaded list Departments");
        this.category.list().subscribe({
          next: categories => {
            this.listCategory = categories;
          },
          error: e => {
            console.log(e)
          },
          complete: () => {
            console.log("Loaded List Categories")
          }
        })
      }
    })
  }

  deleteDepartment(id: number): void {
    let dept = <Department>{};
    dept.id = id;
    console.log(dept);
    this.ds.delete(dept).subscribe({
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
