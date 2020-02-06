import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { EventEmitterService } from '../../demo/service/EventEmitterService';
import { PerformanceService } from './../../performance/performance.service';
let RelatorioindicadoresComponent = class RelatorioindicadoresComponent {
    constructor(performanceService) {
        this.performanceService = performanceService;
        this.refer = '2019-12-01';
        this.indicador = [];
        this.comparar = [];
        this.idgerencias = [];
    }
    ngOnInit() {
        EventEmitterService.get('indicador').subscribe(emiiterResult => {
            this.indicador = [],
                this.gerencia = emiiterResult,
                this.procurarGerencias();
        });
        console.log(this.indicador);
    }
    procurarGerencias() {
        this.performanceService.gerencias().subscribe(response => {
            var ger = response.splice(2, Number.MAX_VALUE);
            for (var i = 0; i < ger.length; i++) {
                this.comparar.push(ger[i]['icon'] + ger[i]['label']);
                this.idgerencias.push(ger[i]['gerenciaId']);
            }
            this.gerencia2 = this.gerencia;
            for (var i = 0; i < this.comparar.length; i++) {
                if (this.comparar[i].includes(this.gerencia2)) {
                    this.idgerenciasretornado = this.idgerencias[i];
                    this.indicador.push(this.idgerenciasretornado);
                }
            }
        });
    }
};
RelatorioindicadoresComponent = tslib_1.__decorate([
    Component({
        selector: 'app-relatorioindicadores',
        templateUrl: './relatorioindicadores.component.html',
        styleUrls: ['./relatorioindicadores.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [PerformanceService])
], RelatorioindicadoresComponent);
export { RelatorioindicadoresComponent };
//# sourceMappingURL=relatorioindicadores.component.js.map