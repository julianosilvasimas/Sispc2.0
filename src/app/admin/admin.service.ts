import{Injectable} from '@angular/core'


import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
import { Usuarios,Usuario, Permissoes } from './usuarios.model';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient){}

  selecionarusuario(user: Usuarios): Observable<any>{
    return  this.http.get(`${API_CONFIG}/usuarios/${user.usuarioId}`) 
    .pipe(map((res : any) => res, catchError(ErrorHandler.handleError)))
 }

 //LISTAS
  listusers(): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/usuarios/page`) 
     .pipe(map((res : Usuarios[]) => res, catchError(ErrorHandler.handleError)))
  }
  listusers2(): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/usuarios/page2`) 
     .pipe(map((res : Usuarios[]) => res, catchError(ErrorHandler.handleError)))
  }
  listgerencias(): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/gerencias`) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  listsupervisoes(): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/supervisoes`) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  listunidades(): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/unidades`) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  listpermissoes(): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/perfis`) 
     .pipe(map((res : Permissoes[]) => res, catchError(ErrorHandler.handleError)))
  }



  //OPERAÇÕES
  indicadoresAtt(user: Usuarios): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/usuarios/${user.usuarioId}`,JSON.stringify(user) , {headers}).pipe(map(this.extractData), catchError(ErrorHandler.handleError))
  }
  resetSenha(user: Usuarios): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/usuarios/recupereSenhaUser/${user.usuarioId}`,JSON.stringify(user) , {headers}).pipe(map(this.extractData),catchError(ErrorHandler.handleError))
  }

  updateUsers(user: Usuarios): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/usuarios/${user.usuarioId}`,JSON.stringify(user) , {headers}).pipe(map(this.extractData),catchError(ErrorHandler.handleError))
  }

  //atualizarPermissões
  updateUser(user: any): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/usuarios/user/${user.usuarioId}`,JSON.stringify(user) , {headers}).pipe(map(this.extractData),catchError(ErrorHandler.handleError))
  }

  //INSERIR USUÁRIO
  InputUsuario(user: any): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST');
    return this.http.post<any>(`${API_CONFIG}/usuarios`,user,{ observe: 'response'})
      .pipe(
        map((response) => ({data: response.headers, 
                            status: response.status,
                            statusTexto: response.statusText,
                            })) 
      );
  }

  private extractData(res: Response[]) {
    let body = res;
    return body;
  } 
}
