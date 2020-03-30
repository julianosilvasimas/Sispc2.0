import{Injectable} from '@angular/core'


import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable()
export class RpaService {
  
  constructor(private http: HttpClient){}

  cadastroBots(): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/cadrpa`) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  
  statusBots(id){
    return this.http.get(`${API_CONFIG}/statusbot/bot/${id}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
 }
}
