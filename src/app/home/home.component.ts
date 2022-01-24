import {Component, OnInit} from '@angular/core';
import {DepartmentService} from "../services/department.service";
import {Department} from "../model/department";
import {CategoryService} from "../services/category.service";
import {Category} from "../model/category";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DepartmentService, CategoryService]
})
export class HomeComponent implements OnInit {

  listDepartment!: [Department];
  listCategory!: [Category];

  constructor(private department: DepartmentService, private category: CategoryService) {
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
    this.department.list().subscribe({
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

}
