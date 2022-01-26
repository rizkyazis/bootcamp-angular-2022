import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {DepartmentFormComponent} from "./department-form/department-form.component";
import {DepartmentComponent} from "./department/department.component";
import {CategoryComponent} from "./category/category.component";
import {CategoryFormComponent} from "./category-form/category-form.component";
import {MessageParentComponent} from "./message-parent/message-parent.component";

const routes: Routes =[
  {path:'home',component:HomeComponent},
  {path:'departments',component:DepartmentComponent},
  {path:'departments/add',component:DepartmentFormComponent},
  {path:'departments/edit/:id',component:DepartmentFormComponent},
  {path:'categories',component:CategoryComponent},
  {path:'categories/add',component:CategoryFormComponent},
  {path:'categories/edit/:id',component:CategoryFormComponent},
  {path:'message',component:MessageParentComponent},

];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
