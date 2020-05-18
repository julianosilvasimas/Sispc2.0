import{Injectable} from '@angular/core'


import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
import { Combos, Produtividade } from './produtividade.model';

@Injectable()
export class ProdutividadeService{

    constructor(private http: HttpClient){}

    getResumao() {
        return this.http.get<any>('assets/data/dados-modulo-produtividade.json')
        .toPromise()
        .then(res => res.resumao as Produtividade[])
        .then(data => data);  
    }

}