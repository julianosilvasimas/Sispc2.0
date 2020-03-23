import{Injectable} from '@angular/core'


import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable()
export class EnergiaService {

  constructor(private http: HttpClient){}
  
  cadastroMedidores(): Observable<any[]>{
    return  this.http.get(`${API_CONFIG}/energia/cadastro`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  cadastroMedidoresAtualizar(bodyObj, tarifa): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/energia/cadastro/${bodyObj.idEquipamento}`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }
  
  statusMedidores(id){
    return this.http.get(`${API_CONFIG}/energia/item/paraaprovar/${id}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  realizadoKw(dataini, datafim, id){
    return this.http.get(`${API_CONFIG}/energia/data/${dataini}/${datafim}/${id}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  statusMedidoresAtualizar(bodyObj): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/energia/item/${bodyObj.idEnergia}`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }

  InserirStatus(bodyObj): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.post(`${API_CONFIG}/energia/item`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }
  


//CENARIOS

  LerCenario(id){
    return this.http.get(`${API_CONFIG}/cenariosenergia/${id}`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
  LerCenarios(){
    return this.http.get(`${API_CONFIG}/cenariosenergia`) 
    .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }

  InserirCenario(bodyObj): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.post(`${API_CONFIG}/cenariosenergia`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }

  UpdateCenario(bodyObj): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/cenariosenergia/${bodyObj.id}`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }

  atualizarIndicadores(bodyObj, idkw, idrs, idkwm3, idrsm3): Observable<any[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json",);
    return this.http.put(`${API_CONFIG}/cenariosenergia/atualizarIndicadores/${idkw}/${idrs}/${idkwm3}/${idrsm3}`,JSON.stringify(bodyObj) , {headers},)
    .pipe(map(this.extractData),
    catchError(ErrorHandler.handleError))
  }



  private extractData(res: Response[]) {
    let body = res;
    return body;
  }

}
