import { Injectable } from '@angular/core';


import {API_CONFIG} from '../../app.api'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
import { Indicadores } from '../performance.model';
import { CadIndicador } from './admin-indicadores.model';


@Injectable()
export class AdminIndicadoresService {

  constructor(private http: HttpClient){}
  
  

  gerencias(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/gerencias`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
 }


  listaIndicadores(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/cadindicadores`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  UnicoIndicadores(id): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/cadindicadores/${id}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  cadastroIndicadoresInserir(bodyObj: any): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.post(`${API_CONFIG}/cadindicadores`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }
  cadastroIndicadoresAtt(bodyObj: CadIndicador): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/cadindicadores/${bodyObj.indicadorId}`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }
  atualizarCampos(bodyObj: any, id): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/cadindicadoresgraficos/${id}`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }
  deletarCampos(id): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.delete(`${API_CONFIG}/cadindicadoresgraficos/${id}`)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }


  indicadoresByMonth(referencia : string,indicador : number): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/indicadores/pormes/${indicador}/${referencia}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  listaIndicadoresgerenc(gerenc:number): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/cadindicadores/gerencia/${gerenc}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  indicadoresAtt(bodyObj: Indicadores): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/indicadores/${bodyObj.exeindicadorId}`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }

  importarIndicador(bodyObj: any, fkindic:number): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return  this.http.put(`${API_CONFIG}/indicadores/updateCsv/${fkindic}`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }
  private extractData(res: Response[]) {
    let body = res;
    return body;
  }


  statusBots(robo:number):any{
    return  this.http.get(`${API_CONFIG}/cadrpa/statusbot/${robo}`)
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  startBot(robo:number):any{
    return  this.http.get(`${API_CONFIG}/cadrpa/startbot/${robo}`)
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
}
