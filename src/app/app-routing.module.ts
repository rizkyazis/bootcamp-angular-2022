import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {DepartmentComponent} from "./department/department.component";

const routes: Routes =[
  {path:'home',component:HomeComponent},
  {path:'departments/add',component:DepartmentComponent},
  {path:'departments/edit/:id',component:DepartmentComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
