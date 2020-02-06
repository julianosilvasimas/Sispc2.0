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

  //CADASTRO
  //=============================================================================================
  veiculos(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/veiculos`).pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  InputVeiculo(
    placa: string,chassi:string,modelo: string,capacidadem3: string,responsavel: string,tipoVeiculo: string,gerencia: string,
    gps: boolean,devolvido: boolean,supervisao: string,locadora: string,pool: boolean,oficina: boolean): Observable<any>{

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST');
    return this.http.post<Veiculo>(`${API_CONFIG}/veiculos`,
    {veiculoId: null, datCad:null, placa: placa, chassi: chassi,modelo: modelo, capacidadem3: capacidadem3, responsavel: responsavel, tipoVeiculo: tipoVeiculo, gerencia:gerencia, gps:gps, devolvido:devolvido, supervisao:supervisao, locadora:locadora, pool:pool,oficina:oficina},
      { observe: 'response'})
      .pipe(
        map((response) => ({data: response.headers, 
                            status: response.status,
                            statusTexto: response.statusText,
                            })) 
      );
  }

  UpdateVeiculo( veiculoId: number, datCad: Date,
    placa: string,chassi:string,modelo: string,capacidadem3: string,responsavel: string,tipoVeiculo: string,gerencia: string,
    gps: boolean,devolvido: boolean,supervisao: string,locadora: string,pool: boolean,oficina: boolean): Observable<any>{
      const headers = new HttpHeaders()
      .set("Content-Type", "application/json",
      );
      let bodyObj = {veiculoId: veiculoId, datCad:datCad, placa: placa, chassi: chassi,modelo: modelo, capacidadem3: capacidadem3, responsavel: responsavel, tipoVeiculo: tipoVeiculo, gerencia:gerencia, gps:gps, devolvido:devolvido, supervisao:supervisao, locadora:locadora, pool:pool,oficina:oficina};
       
    return this.http.put(`${API_CONFIG}/veiculos/${veiculoId}`,JSON.stringify(bodyObj) , {headers})
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
  Aprovados(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/agendamento/aprovados`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  Disponiveis(datainicio: string, datafim: string): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/veiculos/disponiveis/${datainicio}/${datafim}/`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  UpdateAgendamento(agendamento: Agendamento): Observable<any>{
      const headers = new HttpHeaders()
      .set("Content-Type", "application/json",
      );
      
    return this.http.put(`${API_CONFIG}/agendamento/${agendamento.agendamentoId}`,JSON.stringify(agendamento) , {headers})
                        .pipe(map(this.extractData),
                        catchError(ErrorHandler.handleError))
  } 
}

