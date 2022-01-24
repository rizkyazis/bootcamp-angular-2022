import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DepartmentService} from "../services/department.service";
import {Department} from "../model/department";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  form!:FormGroup;

  department!:Department;

  constructor(private formBuild: FormBuilder, private ds: DepartmentService) { }

  ngOnInit(): void {
    this.form = this.formBuild.group({
      'id':[null],
      'name':[null],
      'description':[null]
    })
  }

  submit():void {
    let dept = <Department>{};
    dept.name = this.form.controls['name'].value;
    dept.description = this.form.controls['description'].value;

    this.ds.save(dept).subscribe({
      next: hasil => {
        this.department = hasil;
      },
      error: e => {
        console.log(e)
      },
      complete: () => {
        console.log("Department Created")
      }
    })
  }




}
