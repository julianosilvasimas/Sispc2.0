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
       return  this.http.get(`${API_CONFIG}/indicadores/${projetosId}`) 
       .pipe(map((res : Projetos[]) => res, catchError(ErrorHandler.handleError)))
    }

}