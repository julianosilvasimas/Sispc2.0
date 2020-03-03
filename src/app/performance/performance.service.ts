import{Injectable} from '@angular/core'


import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
import { Indicadores } from './performance.model';

@Injectable()
export class PerformanceService{

    constructor(private http: HttpClient){}

     classindicadores(gerencia : number): Observable<any[]>{
        return  this.http.get(`${API_CONFIG}/cadindicadores/gerencia/${gerencia}`) 
        .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
     }

     gerencias(): Observable<any[]>{
        return  this.http.get(`${API_CONFIG}/gerencias`) 
        .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
     }

     indicadores(referencia : string, indicadorId : number): Observable<any[]>{
        return  this.http.get(`${API_CONFIG}/indicadores/grafico/${referencia}/${indicadorId}`) 
        .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
     }
     indicadoresResumo(referencia : string, indicadorId : number): Observable<any[]>{
        return  this.http.get(`${API_CONFIG}/indicadores/graficoResumo/${referencia}/${indicadorId}`) 
        .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
     }

     indicadoresByDay(indicador : number, referencia : string): Observable<Indicadores[]>{
        return  this.http.get(`${API_CONFIG}/indicadores/${indicador}/${referencia}`) 
        .pipe(map((res : Indicadores[]) => res, catchError(ErrorHandler.handleError)))
     }

     indicadoresAtt(exeindicadorId: any,  datareferencia: Date,  dataindicador: Date, ciclo: Number, orcado: Number, realizado: Number, pdd: Number, atendente: Number, atendimento: Number, coment: string, 
        forecast: Number, minimo: number, maximo:number, meta: number, previsao: number, vlrretido:number ,  dentroprazo: number, foraprazo: number,
        dentroprazoreg: number, foraprazoreg: number, acao: string, analise, colaborador: string, indicadorId: number, unidadeId: number): Observable<any[]>{
            const headers = new HttpHeaders()
            .set("Content-Type", "application/json",
            );
            let bodyObj = {
                        "exeindicadorId": exeindicadorId,
                        "datareferencia": datareferencia,
                        "dataindicador": dataindicador,
                        "ciclo": ciclo,
                        "periodicidade": "DIARIO",
                        "orcado": orcado,
                        "realizado": realizado,
                        "relizadokg":0.0,
                        "pecld": pdd,
                        "forecast": forecast,
                        "minimo": minimo,
                        "maximo": maximo,
                        "meta": meta,
                        "previsao": previsao,
                        "valorretido": vlrretido,
                        "dentroprazo": dentroprazo,
                        "foraprazo": foraprazo,
                        "dentroprazoreg": dentroprazoreg,
                        "foraprazoreg": foraprazoreg,
                        "atendente": atendente,
                        "atendimento": atendimento,
                        "comentario": coment,
                        "analise": analise,
                        "acao": acao,
                        "colaborador": colaborador,
                        "indicadorId": {
                            "indicadorId": indicadorId
                        },
                        "undcodigo": {
                            "unidadeId": unidadeId
                        }
              };
           
        return this.http.put(`${API_CONFIG}/indicadores/${exeindicadorId}`,JSON.stringify(bodyObj) , {headers},)
                            .pipe(map(this.extractData),
                            catchError(ErrorHandler.handleError))
          }

    private extractData(res: Response[]) {
        let body = res;
        return body;
        }
    /*
     indicadoresAtt(indicadores: Indicadores[]): Observable<Indicadores[]>{
            const headers = new HttpHeaders()
            .set("Content-Type", "application/json",
            );
            let bodyObj = indicadores
            let id = 1 
           
        return throwError(this.http.put(`${API_CONFIG}/indicadores/${id}`,bodyObj , {headers},)
                            .pipe(map(this.extractData),
                            catchError(ErrorHandler.handleError)))
          }

    private extractData(res: Indicadores[]) {
        let body = res;
        return body;
        }
    */

}