import {Component, OnInit} from '@angular/core';
import {DepartmentService} from "../services/department.service";
import {Department} from "../model/department";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DepartmentService]
})
export class HomeComponent implements OnInit {

  list!: [Department];

  constructor(private department: DepartmentService) {
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
        this.list = departments;
      },
      error: e => {
        console.log(e)
      },
      complete: () => {
        alert("Loaded")
      }
    })
  }

}
