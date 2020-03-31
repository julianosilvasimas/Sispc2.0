import { Injectable } from '@angular/core';


import {API_CONFIG} from '../app.api'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable()
export class OperacionalEsgotoService {


  constructor(private http: HttpClient){}
  

  getunidades(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appunidadesesgoto`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  getclassificacoes(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appclassificacoesesgoto`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  getindicadorporclassificaco(id:any): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appclassificacoesesgoto/porclassficacao/${id}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  getindicadores(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appclassificacoesesgoto`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  getIndicadoresUnidade(Unidade, de, ate, classi): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appesgoto/unidades/${Unidade}/${de}/${ate}/${classi}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }


  
  updateunidade(unidade: any): Observable<any[]>{
    const headers = new HttpHeaders()
        .set("Content-Type", "application/json",
        );
    return this.http.put(`${API_CONFIG}/appunidadesesgoto/${unidade.id}`,JSON.stringify(unidade) , {headers},)
        .pipe(map(this.extractData),
        catchError(ErrorHandler.handleError))
  }
  private extractData(res: Response[]) {
      let body = res;
      return body;
  }
}
