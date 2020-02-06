import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PerformanceService } from '../../performance.service';
let CapaComponent = class CapaComponent {
    constructor(indicadoresService) {
        this.indicadoresService = indicadoresService;
    }
    ngOnInit() {
        this.MontarArrayDeIndicadores(this.indicador);
    }
    MontarArrayDeIndicadores(indicador) {
        this.indicadoresService.classindicadores(indicador)
            .subscribe(Indicadores => {
            this.ind = Indicadores;
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CapaComponent.prototype, "refer", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CapaComponent.prototype, "indicador", void 0);
CapaComponent = tslib_1.__decorate([
    Component({
        selector: 'app-capa',
        templateUrl: './capa.component.html',
        styleUrls: ['./capa.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [PerformanceService])
], CapaComponent);
export { CapaComponent };
//# sourceMappingURL=capa.component.js.map