import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let CarService = class CarService {
    constructor(http) {
        this.http = http;
    }
    getCarsSmall() {
        return this.http.get('assets/demo/data/cars-small.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }
    getCarsMedium() {
        return this.http.get('assets/demo/data/cars-medium.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }
    getCarsLarge() {
        return this.http.get('assets/demo/data/cars-large.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }
    getEngenharia() {
        return this.http.get('assets/demo/data/projetosEngenharia.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }
    getProjetos() {
        return this.http.get('assets/demo/data/projetos.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }
    getProcessos() {
        return this.http.get('assets/demo/data/processos.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }
    getLicencas() {
        return this.http.get('assets/demo/data/licencas.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }
    getIndicadores() {
        return this.http.get('assets/demo/data/demoindicadores.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }
};
CarService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], CarService);
export { CarService };
//# sourceMappingURL=carservice.js.map