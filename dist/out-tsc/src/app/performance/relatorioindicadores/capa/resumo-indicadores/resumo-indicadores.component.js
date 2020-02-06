import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PerformanceService } from '../../../performance.service';
let ResumoIndicadoresComponent = class ResumoIndicadoresComponent {
    constructor(indicadoresService) {
        this.indicadoresService = indicadoresService;
    }
    ngOnInit() {
        this.Validador(this.refer, this.element);
    }
    Validador(referencia, indic) {
        this.indicadoresService.indicadores(referencia, indic.indicadorId)
            .subscribe(indicador => {
            this.temp1 = indicador[3];
            this.orcadoMensal = parseInt(this.temp1.splice(1, 1));
            this.orcadoMensal = this.orcadoMensal.toLocaleString();
            this.orcadoAcum = parseInt(this.temp1.splice(1, 1));
            let val1 = this.orcadoAcum;
            this.orcadoAcum = this.orcadoAcum.toLocaleString();
            if (this.orcadoAcum == "0") {
                this.orcadoAcum = "-";
            }
            this.realizAcum = parseInt(this.temp1.splice(1, 1));
            let val2 = this.realizAcum;
            this.realizAcum = this.realizAcum.toLocaleString();
            if (this.realizAcum == "0") {
                this.realizAcum = "-";
            }
            this.diferencaAcum = "Δ " + (val2 - val1).toLocaleString();
            if (this.diferencaAcum == "Δ 0") {
                this.diferencaAcum = "-";
            }
            this.diferencaPerc = "Δ% " + ((-(1 - (val2 / val1))) * 100).toFixed(1);
            if (this.diferencaPerc == "Δ% Infinity" || this.diferencaPerc == "Δ% NaN") {
                this.diferencaPerc = "-";
            }
            this.previsaoMensal = parseInt(this.temp1.splice(1, 1));
            this.previsaoMensal = this.previsaoMensal.toLocaleString();
            if (this.previsaoMensal == "0") {
                this.previsaoMensal = "-";
            }
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ResumoIndicadoresComponent.prototype, "refer", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ResumoIndicadoresComponent.prototype, "indicador", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ResumoIndicadoresComponent.prototype, "element", void 0);
ResumoIndicadoresComponent = tslib_1.__decorate([
    Component({
        selector: 'app-resumo-indicadores',
        templateUrl: './resumo-indicadores.component.html',
        styleUrls: ['./resumo-indicadores.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [PerformanceService])
], ResumoIndicadoresComponent);
export { ResumoIndicadoresComponent };
//# sourceMappingURL=resumo-indicadores.component.js.map