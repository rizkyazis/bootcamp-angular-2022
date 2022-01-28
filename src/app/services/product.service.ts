import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Datatablerequest} from "../model/datatablerequest";
import {Datatableresponse} from "../model/datatableresponse";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  list(datatablesParameter:any): Observable<Datatableresponse>{
    const dtReq =  new Datatablerequest();
    dtReq.draw = datatablesParameter.draw;
    dtReq.length = datatablesParameter.length;
    dtReq.start = datatablesParameter.start;
    dtReq.sortCol = datatablesParameter.order[0].column;
    dtReq.sortDir = datatablesParameter.order[0].dir;
    dtReq.extraParam = datatablesParameter.extraParam;
    return this.http.post(environment.baseUrl+"/products",dtReq)
      .pipe(map(data=>data as Datatableresponse))
  }

  getById(id:String): Observable<any>{
    return this.http.get(environment.baseUrl+'/products/'+id)
      .pipe(map(data=>data))
  }

}
