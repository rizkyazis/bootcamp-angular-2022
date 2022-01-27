import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  list(): Observable<any>{
    return this.http.get(environment.baseUrl+"/products")
      .pipe(map(data=>data))
  }

  getById(id:String): Observable<any>{
    return this.http.get(environment.baseUrl+'/products/'+id)
      .pipe(map(data=>data))
  }
}
