import { Injectable } from '@angular/core';


import {API_CONFIG} from '../../app.api'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
import { Indicadores } from '../performance.model';


@Injectable()
export class AdminIndicadoresService {

  constructor(private http: HttpClient){}
  
  
  indicadoresByMonth(referencia : string,indicador : number): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/indicadores/pormes/${indicador}/${referencia}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
 }
  listaIndicadores(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/cadindicadores`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  indicadoresAtt(bodyObj: Indicadores): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/indicadores/${bodyObj.exeindicadorId}`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }

  private extractData(res: Response[]) {
    let body = res;
    return body;
  }
}
