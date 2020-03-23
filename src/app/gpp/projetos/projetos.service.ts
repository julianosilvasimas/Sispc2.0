import{Injectable} from '@angular/core'


import {API_CONFIG} from '../../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
import { Projetos, ProjCompletos, Combos, Engenharia, Processos, Licencas } from './projetos.model';

@Injectable()
export class ProjetosService{


    constructor(private http: HttpClient){}

      getFluxoInvestimento() {
        return this.http.get<any>('assets/data/dados-modulo-projeto.json')
        .toPromise()
        .then(res => res.fluxoinvestimento as Combos[])
        .then(data => data);  
    }

      getAnos() {
        return this.http.get<any>('assets/data/dados-modulo-projeto.json')
        .toPromise()
        .then(res => res.anos as Combos[])
        .then(data => data);  
    }

      getMeses() {
        return this.http.get<any>('assets/data/dados-modulo-projeto.json')
        .toPromise()
        .then(res => res.meses as Combos[])
        .then(data => data);  
    }

      getDias() {
        return this.http.get<any>('assets/data/dados-modulo-projeto.json')
        .toPromise()
        .then(res => res.dias as Combos[])
        .then(data => data);  
    }

      getFases() {
        return this.http.get<any>('assets/data/dados-modulo-projeto.json')
        .toPromise()
        .then(res => res.fasesprojetos as Combos[])
        .then(data => data);  
    }

      getStatusGlobal() {
        return this.http.get<any>('assets/data/dados-modulo-projeto.json')
        .toPromise()
        .then(res => res.statusglobal as Combos[])
        .then(data => data);  
    }

      getEngenharia(){
        return this.http.get<any>('assets/data/dados-modulo-projeto.json')
        .toPromise()
        .then(res => res.engenharia as Engenharia[])
        .then(data => data);
    }


    getProcessos(){
        return this.http.get<any>('assets/data/dados-modulo-projeto.json')
        .toPromise()
        .then(res => res.processos as Processos[])
        .then(data => data);
    }

    getLicencas(){
      return this.http.get<any>('assets/data/dados-modulo-projetos.json')
        .toPromise()
        .then(res => res.licencas as Licencas[])
        .then(data => data);
    }

    projetos(): Observable<any[]>{
       return  this.http.get(`${API_CONFIG}/projetos`) 
       .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
    }

    regulatorios(projetosId : number): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/projetos/${projetosId}/regulatorios`) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
    }

    delibregulatorios(revisaoId : number): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/regulatorios/${revisaoId}/delibregulatorios`) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
    }

    partesInteressadas(): Observable<any[]>{
      return  this.http.get(`${API_CONFIG}/partesinteressadas`) 
      .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
   }

    projetosId(projetosId : number): Observable<ProjCompletos[]>{
       return  this.http.get(`${API_CONFIG}/projetos/${projetosId}`) 
       .pipe(map((res : ProjCompletos[]) => res, catchError(ErrorHandler.handleError)))
    }

    projetosAdd(dados: ProjCompletos[]): Observable<any>{
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        console.log(dados)
      return this.http.post<ProjCompletos[]>(`${API_CONFIG}/projetos`,
      dados,
      { observe: 'response'})
      .pipe(
        map((response) => ({data: response.headers, 
                            status: response.status,
                            statusTexto: response.statusText
                            })
                            , catchError(ErrorHandler.handleError)) 
    );
  }

  projetosAtt(arrProjeto: any[], id: number): Observable<any[]>{
      const headers = new HttpHeaders()
      .set("Content-Type", "application/json",
      );
      let bodyObj = arrProjeto;
     
  return this.http.put(`${API_CONFIG}/projetos/${id}`,JSON.stringify(bodyObj) , {headers},)
                      .pipe(map(this.extractData),
                      catchError(ErrorHandler.handleError))
    }

private extractData(res: Response[]) {
  let body = res;
  return body;
  }

  regulatoriosAdd(dados: any[]): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      console.log(dados)
    return this.http.post<any[]>(`${API_CONFIG}/regulatorios`,
    dados,
    { observe: 'response'})
    .pipe(
      map((response) => ({data: response.headers, 
                          status: response.status,
                          statusTexto: response.statusText
                          })
                          , catchError(ErrorHandler.handleError)) 
  );
}

delibregulatoriosAdd(dados: any[]): Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    console.log(dados)
  return this.http.post<any[]>(`${API_CONFIG}/delibregulatorios`,
  dados,
  { observe: 'response'})
  .pipe(
    map((response) => ({data: response.headers, 
                        status: response.status,
                        statusTexto: response.statusText
                        })
                        , catchError(ErrorHandler.handleError)) 
);
}

  regulatoriosAtt(arrProjeto: any[], id: number): Observable<any[]>{
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json",
    );
    let bodyObj = arrProjeto;
   
return this.http.put(`${API_CONFIG}/regulatorios/${id}`,JSON.stringify(bodyObj) , {headers},)
                    .pipe(map(this.extractData),
                    catchError(ErrorHandler.handleError))
  }

  delibregulatoriosAtt(arrProjeto: any[], id: number): Observable<any[]>{
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json",
    );
    let bodyObj = arrProjeto;
   
return this.http.put(`${API_CONFIG}/delibregulatorios/${id}`,JSON.stringify(bodyObj) , {headers},)
                    .pipe(map(this.extractData),
                    catchError(ErrorHandler.handleError))
  }

        

}