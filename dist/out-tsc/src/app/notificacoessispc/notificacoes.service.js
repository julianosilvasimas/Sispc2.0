import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';
let NotificacoesService = class NotificacoesService {
    constructor(http) {
        this.http = http;
    }
    ListaDeModelos() {
        return this.http.get(`${API_CONFIG}/notificacao`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
    ListaDeModelosNovo(nomeTemplate, Usuarios, Assunto, Texto) {
        let headers = new HttpHeaders();
        var envio = { id: null, nomeDoTemplate: nomeTemplate, usuarios: Usuarios, assunto: Assunto, texto: Texto };
        console.log(envio);
        headers = headers.set('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Methods', 'POST');
        return this.http.post(`${API_CONFIG}/notificacao`, envio, { observe: 'response' })
            .pipe(map((response) => ({ data: response.headers,
            status: response.status,
            statusTexto: response.statusText,
        })));
    }
    enviarNotificacao(Usuarios, Assunto, Texto) {
        let headers = new HttpHeaders();
        var envio = { usuarios: Usuarios, assunto: Assunto, texto: Texto };
        console.log(envio);
        headers = headers.set('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Methods', 'POST');
        return this.http.post(`${API_CONFIG}/notificacao/enviarEmail`, envio, { observe: 'response' })
            .pipe(map((response) => ({ data: response.headers,
            status: response.status,
            statusTexto: response.statusText,
        })));
    }
    UsuariosSispc() {
        return this.http.get(`${API_CONFIG}/usuarios`)
            .pipe(map((res) => res, catchError(ErrorHandler.handleError)));
    }
};
NotificacoesService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], NotificacoesService);
export { NotificacoesService };
//# sourceMappingURL=notificacoes.service.js.map