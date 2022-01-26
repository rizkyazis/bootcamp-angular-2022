import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DepartmentService} from "../services/department.service";
import {Department} from "../model/department";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-department',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  form!: FormGroup;
  id!: String;
  department!: Department;
  message!:any[];

  constructor(private formBuild: FormBuilder, private ds: DepartmentService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.form = this.formBuild.group({
      'id':new FormControl(null,[Validators.pattern("^[0-9]*$")]),
      'name':new FormControl(null, [Validators.required]),
      'description':new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(rute =>{
      this.id = rute['id'];
      if (this.id){
        this.ds.getById(this.id).subscribe({
          next:value => {
            this.form.controls['id'].setValue(this.id);
            this.form.controls['name'].setValue(value.name);
            this.form.controls['description'].setValue(value.description);
          }
        })
      }
    })
  }

  submit(): void {
    let dept = <Department>{};
    dept.name = this.form.controls['name'].value;
    dept.description = this.form.controls['description'].value;

    if (this.id){
      dept.id = this.form.controls['id'].value;
      this.ds.update(dept).subscribe({
        next: hasil => {
          this.department = hasil;
          this.router.navigateByUrl("home")
        },
        error: e => {
          this.message = e.error.status;
        },
        complete: () => {
          console.log("Department Updated")
        }
      })
    }else {
      this.ds.save(dept).subscribe({
        next: hasil => {
          this.department = hasil;
          this.router.navigateByUrl("home")
        },
        error: e => {
          this.message = e.error.status;
        },
        complete: () => {
          console.log("Department Created")
        }
      })
    }
  }

}
