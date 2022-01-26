import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  list(): Observable<any>{
    return this.http.get(environment.baseUrl+"/categories")
      .pipe(map(data=>data))
  }

  getById(id:String): Observable<any>{
    return this.http.get(environment.baseUrl+'/categories/'+id)
      .pipe(map(data=>data))
  }

  save(category:Category):Observable<any>{
    return this.http.post(environment.baseUrl+'/categories/save',category).pipe(map(data=>data))
  }

  update(category:Category):Observable<any>{
    return this.http.put(environment.baseUrl+'/categories/update',category).pipe(map(data=>data))
  }

  delete(category:Category):Observable<any>{
    console.log(category.id)
    const options = {
      body: {
        id: category.id
      }
    }
    return this.http.delete(environment.baseUrl+'/categories/delete',options).pipe(map(data=>data))
  }
}


