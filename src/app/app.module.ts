import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentComponent } from './department/department.component';
import { CategoryComponent } from './category/category.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { MessageParentComponent } from './message-parent/message-parent.component';
import { MessageChildComponent } from './message-child/message-child.component';
import { ProductComponent } from './product/product.component';
import { ProductTableComponent } from './product-table/product-table.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DepartmentFormComponent,
    DepartmentComponent,
    CategoryComponent,
    CategoryFormComponent,
    MessageParentComponent,
    MessageChildComponent,
    ProductComponent,
    ProductTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
