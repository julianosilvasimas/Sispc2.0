import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Car, Engenharia, Projetos, Processos, Licencas} from '../domain/car';
import { Indicadores } from './../domain/car';

@Injectable()
export class CarService {

    constructor(private http: HttpClient) {}

    getCarsSmall() {
        return this.http.get<any>('assets/demo/data/cars-small.json')
                    .toPromise()
                    .then(res => res.data as Car[])
                    .then(data => data);
    }

    getCarsMedium() {
        return this.http.get<any>('assets/demo/data/cars-medium.json')
                    .toPromise()
                    .then(res => res.data as Car[])
                    .then(data => data);
    }

    getCarsLarge() {
        return this.http.get<any>('assets/demo/data/cars-large.json')
                    .toPromise()
                    .then(res => res.data as Car[])
                    .then(data => data);
    }

    getEngenharia(){
        return this.http.get<any>('assets/demo/data/projetosEngenharia.json')
                    .toPromise()
                    .then(res => res.data as Engenharia[])
                    .then(data => data);
    }

    getProjetos(){
        return this.http.get<any>('assets/demo/data/projetos.json')
                    .toPromise()
                    .then(res => res.data as Projetos[])
                    .then(data => data);
    }

    getProcessos(){
        return this.http.get<any>('assets/demo/data/processos.json')
                    .toPromise()
                    .then(res => res.data as Processos[])
                    .then(data => data);
    }

    getLicencas(){
        return this.http.get<any>('assets/demo/data/licencas.json')
                    .toPromise()
                    .then(res => res.data as Licencas[])
                    .then(data => data);
    }

    getIndicadores(){
        return this.http.get<any>('assets/demo/data/demoindicadores.json')
                    .toPromise()
                    .then(res => res.data as Indicadores[])
                    .then(data => data);
    }

}
