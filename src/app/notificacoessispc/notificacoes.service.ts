import { Injectable } from '@angular/core';
import {API_CONFIG} from '../app.api'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';


@Injectable()
export class NotificacoesService {

  constructor(private http: HttpClient){}

  enviarNotificacao(Assunto : string, Texto: string): Observable<any>{
    let headers = new HttpHeaders();
    var envio={ assunto: Assunto, texto: Texto};
    headers = headers.set('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST');
    return this.http.post<any>(`${API_CONFIG}/notificacao`,envio,{ observe: 'response'})
      .pipe(
        map((response) => ({data: response.headers, 
                            status: response.status,
                            statusTexto: response.statusText,
                            })) 
      );
  }

}
