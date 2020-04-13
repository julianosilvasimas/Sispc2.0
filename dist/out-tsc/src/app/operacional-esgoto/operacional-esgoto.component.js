import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { OperacionalEsgotoService } from './operacional-esgoto.service';
import { PerformanceService } from '../performance/performance.service';
import { MessageService } from 'primeng/api';
let OperacionalEsgotoComponent = class OperacionalEsgotoComponent {
    constructor(esg, perf, messageService) {
        this.esg = esg;
        this.perf = perf;
        this.messageService = messageService;
        this.displayDialog = false;
    }
    ngOnInit() {
        this.perf.cadindicadores().subscribe(response => {
            this.volumes = response;
        });
        this.esg.getunidades().subscribe(response => {
            this.ListaDeUnidades = response;
        });
        this.cols = [
            { field: 'id', header: 'id' },
            { field: 'dataDaCriacao', header: 'dataDaCriacao' },
            { field: 'unidade', header: 'unidade' },
            { field: 'tipoDeTratamento', header: 'tipoDeTratamento' },
            { field: 'volume', header: 'volume' },
        ];
    }
    showDialogToAdd() {
        this.novaUnidade = true;
        this.displayDialog = true;
    }
    save() {
        this.UnidadeSelected.volume = this.UnidadeSelected.volume.indicadorId;
        this.esg.updateunidade(this.UnidadeSelected).subscribe(indicadors => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Indicador ' + this.UnidadeSelected['indicador'] + ' Alterado' });
        }, error => {
            this.messageService.add({ severity: 'warn', summary: 'Erro', detail: 'Erro' });
        });
        this.displayDialog = false;
    }
    onRowSelect(event) {
        this.novaUnidade = false;
        this.displayDialog = true;
    }
    cloneCar(c) {
        let car = {};
        for (let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }
};
OperacionalEsgotoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-operacional-esgoto',
        templateUrl: './operacional-esgoto.component.html',
        styleUrls: ['./operacional-esgoto.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [OperacionalEsgotoService, PerformanceService, MessageService])
], OperacionalEsgotoComponent);
export { OperacionalEsgotoComponent };
//# sourceMappingURL=operacional-esgoto.component.js.map