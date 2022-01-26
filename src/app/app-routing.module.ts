import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {DepartmentformComponent} from "./departmentform/departmentform.component";
import {DepartmentComponent} from "./department/department.component";
import {CategoryComponent} from "./category/category.component";

const routes: Routes =[
  {path:'home',component:HomeComponent},
  {path:'departments',component:DepartmentComponent},
  {path:'departments/add',component:DepartmentformComponent},
  {path:'departments/edit/:id',component:DepartmentformComponent},
  {path:'categories',component:CategoryComponent},

];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
