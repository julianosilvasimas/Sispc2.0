import { Injectable } from '@angular/core';
import {API_CONFIG} from '../app.api'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';


@Injectable()
export class NotificacoesService {

  constructor(private http: HttpClient){}
  
  ListaDeModelos(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/notificacao`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  ListaDeModelosNovo(id, nomeTemplate,  Assunto : string, Texto: string): Observable<any>{
    let headers = new HttpHeaders();
    var envio={ id: id, nomeDoTemplate: nomeTemplate,assunto: Assunto, texto: Texto };
    console.log(envio);
    headers = headers.set('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'PUT');
    return this.http.put<any>(`${API_CONFIG}/notificacao/${id}`,envio,{ observe: 'response'})
      .pipe(
        map((response) => ({data: response.headers, 
                            status: response.status,
                            statusTexto: response.statusText,
                            })) 
      );
  }
  ListaDeletar(id): Observable<any>{
    return this.http.delete<any>(`${API_CONFIG}/notificacao/${id}`)
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  enviarNotificacao(Usuarios: any[], Assunto : string, Texto: string): Observable<any>{
    let headers = new HttpHeaders();
    var envio={ usuarios: Usuarios ,assunto: Assunto, texto: Texto };
    console.log(envio);
    headers = headers.set('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST');
    return this.http.post<any>(`${API_CONFIG}/notificacao/enviarEmail`,envio,{ observe: 'response'})
      .pipe(
        map((response) => ({data: response.headers, 
                            status: response.status,
                            statusTexto: response.statusText,
                            })) 
      );
  }

  UsuariosSispc(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/usuarios`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
}
