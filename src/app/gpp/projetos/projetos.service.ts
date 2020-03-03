import{Injectable} from '@angular/core'


import {API_CONFIG} from '../../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
import { Projetos, ProjCompletos } from './projetos.model';

@Injectable()
export class ProjetosService{


    constructor(private http: HttpClient){}

    projetos(): Observable<any[]>{
       return  this.http.get(`${API_CONFIG}/projetos`) 
       .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
    }

    projetosId(projetosId : number): Observable<Projetos[]>{
       return  this.http.get(`${API_CONFIG}/projetos/${projetosId}`) 
       .pipe(map((res : Projetos[]) => res, catchError(ErrorHandler.handleError)))
    }

    projetosAdd(dados: any[]): Observable<any>{
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        console.log(dados)
      return this.http.post<any[]>(`${API_CONFIG}/projetos`,
      dados,
      { observe: 'response'})
      .pipe(
        map((response) => ({data: response.headers, 
                            status: response.status,
                            statusTexto: response.statusText
                            })
                            , catchError(ErrorHandler.handleError)) 
    );
  }
        

}