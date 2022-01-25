import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Department} from "../model/department";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }

  list(): Observable<any>{
    return this.http.get(environment.baseUrl+'/departments')
      .pipe(map(data=>data))
  }

  getById(id:String): Observable<any>{
    return this.http.get(environment.baseUrl+'/departments/'+id)
      .pipe(map(data=>data))
  }

  save(department:Department):Observable<any>{
    return this.http.post(environment.baseUrl+'/departments/save',department).pipe(map(data=>data))
  }

  update(department:Department):Observable<any>{
    return this.http.put(environment.baseUrl+'/departments/update',department).pipe(map(data=>data))
  }
}
