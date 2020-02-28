import{Injectable} from '@angular/core'


import {API_CONFIG} from '../app.api'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
import { Pagamento } from './controledepagamentosjuridico.model';

@Injectable()
export class ControledepagamentosjuridicoService {

  constructor(private http: HttpClient){}

  Pagamentos(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/pagamentoJuridico`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  editaveis(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/pagamentoJuridico/editaveis`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  emAprovacao(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/pagamentoJuridico/emaprovacao`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  Aprovando(nivel, centrosdecustos): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/pagamentoJuridico/aprovando/${nivel}/${centrosdecustos}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  InputPagamento(corpo: Pagamento): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST');
    console.log(corpo)
    return this.http.post(`${API_CONFIG}/pagamentoJuridico`,corpo,{ observe: 'response'})
      .pipe(
        map((response) => ({data: response.headers, 
                            status: response.status,
                            statusTexto: response.statusText,
                            })) 
      );
  }
  UpdatePagamento(agendamento: Pagamento): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST');
      
    return this.http.put(`${API_CONFIG}/pagamentoJuridico/${agendamento.idPagamento}`, agendamento, { observe: 'response'})
    .pipe(
      map((response) => (
        {
          data: response.headers, 
          status: response.status,
          statusTexto: response.statusText,
        }
      )) 
    );
  } 
  
}
