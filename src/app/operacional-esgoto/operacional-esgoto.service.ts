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
    return  this.http.get(`${API_CONFIG}/appesgoto/unidades`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  getIndicadoresUnidade(Unidade, de, ate, classi): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appesgoto/unidades/${Unidade}/${de}/${ate}/${classi}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
}
