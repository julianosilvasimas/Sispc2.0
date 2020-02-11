import{Injectable} from '@angular/core'


import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

import{ Veiculo, Agendamento } from './transporte.model';

@Injectable()
export class TransporteService {

  constructor(private http: HttpClient){}

  Gerencias(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/gerencias`) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  //CADASTRO
  //=============================================================================================
  veiculos(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/veiculos`).pipe(map((res : Veiculo[]) => res, catchError(ErrorHandler.handleError)))
  }

  InputVeiculo(veiculo: Veiculo): Observable<any>{

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST');
    return this.http.post<Veiculo>(`${API_CONFIG}/veiculos`,veiculo,{ observe: 'response'})
      .pipe(
        map((response) => ({data: response.headers, 
                            status: response.status,
                            statusTexto: response.statusText,
                            })) 
      );
  }

  UpdateVeiculo(veiculo: Veiculo): Observable<any>{
      const headers = new HttpHeaders()
      .set("Content-Type", "application/json",
      );
      
    return this.http.put(`${API_CONFIG}/veiculos/${veiculo.veiculoId}`,JSON.stringify(veiculo) , {headers})
                        .pipe(map(this.extractData),
                        catchError(ErrorHandler.handleError))
  }
  private extractData(res: Response[]) {
    let body = res;
    return body;
  }   

  //AGENDAMENTO
  //=============================================================================================
  ParaAprovar(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/agendamento/aprovar`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  Condutores(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/condutores`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  Aprovados(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/agendamento/aprovados`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  Disponiveis(datainicio: string, datafim: string): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/agendamento/disponiveis/${datainicio}/${datafim}/`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }


  InputAgendamento(agendamento: Agendamento): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST');
    return this.http.post<Agendamento>(`${API_CONFIG}/agendamento`,agendamento,{ observe: 'response'})
      .pipe(
        map((response) => ({data: response.headers, 
                            status: response.status,
                            statusTexto: response.statusText,
                            })) 
      );
  }

  UpdateAgendamento(agendamento: Agendamento): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST');
      
    return this.http.put(`${API_CONFIG}/agendamento/${agendamento.agendamentoId}`, agendamento, { observe: 'response'})
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

