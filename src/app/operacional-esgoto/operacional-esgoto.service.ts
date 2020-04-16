import { Injectable } from '@angular/core';


import {API_CONFIG} from '../app.api'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable()
export class OperacionalEsgotoService {


  constructor(private http: HttpClient){}
  

  //===============================================================================================================================
  //CLASSIFICAÇÕES
  
  getclassificacoes(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appclassificacoesesgoto`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  DeleteClassificacao(id): Observable<any[]>{
    return  this.http.delete(`${API_CONFIG}/appclassificacoesesgoto/${id}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  EditarClassificacao(unidade: any, id): Observable<any[]>{
    const headers = new HttpHeaders()
        .set("Content-Type", "application/json",
        );
    return this.http.put(`${API_CONFIG}/appclassificacoesesgoto/${id}`,JSON.stringify(unidade) , {headers},)
        .pipe(map(this.extractData),
        catchError(ErrorHandler.handleError))
  }



  //===============================================================================================================================
  //INDICADORES
  
  getindicadorporUnidade(id): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appindicadoresesgoto/porunidade/${id}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  getindicadorporclassificaco(id:any): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appclassificacoesesgoto/porclassficacao/${id}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  getIndicadoresNaoAprovados(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appesgoto/naoaprovados`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  getIndicadoresNaoAprovadosUser( usuario:string): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appesgoto/naoaprovados/${usuario}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  EditarIndicador(bodyObj): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    var id = bodyObj.id === null ? 0 : bodyObj.id
    return this.http.put(`${API_CONFIG}/appindicadoresesgoto/${id}`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }
  DeleteIndicador(id): Observable<any[]>{
    return  this.http.delete(`${API_CONFIG}/appesgoto/${id}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }



  //===============================================================================================================================
  //LANÇAMENTOS
  
  InserirLancamento(bodyObj): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.post(`${API_CONFIG}/appesgoto`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }
  EditarLancamento(bodyObj): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/appesgoto/${bodyObj.id}`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }
  DeleteLancamento(id): Observable<any[]>{
    return  this.http.delete(`${API_CONFIG}/appesgoto/${id}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  AprovarLancamento(bodyObj): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/appesgoto/aprovarLancamento/${bodyObj.id}`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }



  //===============================================================================================================================
  //UNIDADES

  getIndicadoresUnidade(Unidade, de, ate, usuario:string): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appesgoto/unidades/${Unidade}/${de}/${ate}/${usuario}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  getunidades(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appunidadesesgoto`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  getunidadesporUser(email): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appunidadesesgoto/porusuario/${email}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  getunidade(id): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appunidadesesgoto/${id}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  updateunidade(unidade: any, id): Observable<any[]>{
    const headers = new HttpHeaders()
        .set("Content-Type", "application/json",
        );
    return this.http.put(`${API_CONFIG}/appunidadesesgoto/${id}`,JSON.stringify(unidade) , {headers},)
        .pipe(map(this.extractData),
        catchError(ErrorHandler.handleError))
  }
  DeleteUnidade(id): Observable<any[]>{
    return  this.http.delete(`${API_CONFIG}/appunidadesesgoto/${id}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  updateOperadores(unidade: any){
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json",
    );
    return this.http.put(`${API_CONFIG}/appunidadesesgoto/operadores/${unidade.id}`,JSON.stringify(unidade) , {headers},)
      .pipe(map(this.extractData),
      catchError(ErrorHandler.handleError))
  }
  private extractData(res: Response[]) {
      let body = res;
      return body;
  }


  //===========================================================================================================================
  //NOTIFICAÇÕES

  getNotificacao(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/appesgotoocorrencias/findlimit`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  InserirNotificacao(bodyObj): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.post(`${API_CONFIG}/appesgotoocorrencias`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }
  
}