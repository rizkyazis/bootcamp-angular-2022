import { Component, OnInit } from '@angular/core';
import {Department} from "../model/department";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DepartmentService} from "../services/department.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  formDeptDelete!: FormGroup;
  listDepartment!: [Department];
  department!: Department;
  message!: any[];

  constructor(private ds: DepartmentService, private formBuild: FormBuilder, private router: Router) {
    this.formDeptDelete = this.formBuild.group({
      'id': new FormControl(null, [Validators.pattern("^[0-9]*$")]),
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
      }
    )
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
