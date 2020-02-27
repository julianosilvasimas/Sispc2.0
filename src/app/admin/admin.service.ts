import{Injectable} from '@angular/core'


import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
import { Usuarios, Usuario, Permissoes } from './usuarios.model';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient){}

  selecionarusuario(user: Usuarios): Observable<Usuario>{
    return  this.http.get(`${API_CONFIG}/usuarios/${user.usuarioId}`) 
    .pipe(map((res : Usuario) => res, catchError(ErrorHandler.handleError)))
 }
  listusers(): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/usuarios/page`) 
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

  listpermissoes(): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/perfis`) 
     .pipe(map((res : Permissoes[]) => res, catchError(ErrorHandler.handleError)))
  }


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

  updateUser(user: Usuario): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/usuarios/user/${user.usuarioId}`,JSON.stringify(user) , {headers}).pipe(map(this.extractData),catchError(ErrorHandler.handleError))
  }

  private extractData(res: Response[]) {
    let body = res;
    return body;
  } 
}
