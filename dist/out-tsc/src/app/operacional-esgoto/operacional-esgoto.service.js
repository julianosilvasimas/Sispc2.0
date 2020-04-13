import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
let OperacionalEsgotoService = class OperacionalEsgotoService {
    constructor(http) {
        this.http = http;
    }
    getunidades() {
        return this.http.get(`${API_CONFIG}/appunidadesesgoto`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    getclassificacoes() {
        return this.http.get(`${API_CONFIG}/appclassificacoesesgoto`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    getindicadorporclassificaco(id) {
        return this.http.get(`${API_CONFIG}/appclassificacoesesgoto/porclassficacao/${id}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    getindicadores() {
        return this.http.get(`${API_CONFIG}/appclassificacoesesgoto`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    getIndicadoresUnidade(Unidade, de, ate, classi) {
        return this.http.get(`${API_CONFIG}/appesgoto/unidades/${Unidade}/${de}/${ate}/${classi}`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    updateunidade(unidade) {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        return this.http.put(`${API_CONFIG}/appunidadesesgoto/${unidade.id}`, JSON.stringify(unidade), { headers })
            .pipe(map(this.extractData), catchError(ErrorHandler.handleError));
    }
    extractData(res) {
        let body = res;
        return body;
    }
};
OperacionalEsgotoService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], OperacionalEsgotoService);
export { OperacionalEsgotoService };
//# sourceMappingURL=operacional-esgoto.service.js.map