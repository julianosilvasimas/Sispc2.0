import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PerformanceService } from './../../../../performance/performance.service';
let MenurelatorioComponent = class MenurelatorioComponent {
    constructor(performanceService) {
        this.performanceService = performanceService;
        this.qtd = 0;
    }
    ngOnInit() {
        this.preenchergerencias();
    }
    preenchergerencias() {
        this.performanceService.gerencias()
            .subscribe(response => {
            this.gerencias = [];
            this.items = [];
            this.gerencias = response.splice(2, Number.MAX_VALUE);
            for (var i = 0; i < this.gerencias.length; i++) {
                this.performanceService.classindicadores(this.gerencias[i]['gerenciaId'])
                    .subscribe(response2 => {
                    this.qtd = response2.length;
                    if (this.qtd == 0) {
                        this.gerencias.splice(i, 1);
                    }
                });
                this.gerencias[i]['routerLink'] = '/relatorio';
            }
            this.Preencheitems();
        });
    }
    Preencheitems() {
        this.items = [
            {
                label: 'Performance', icon: 'timeline',
                items: this.gerencias
            }
        ];
    }
};
MenurelatorioComponent = tslib_1.__decorate([
    Component({
        selector: 'app-menurelatorio',
        template: `
          <ul app-submenu [item]="items" root="true" id="items" class="navigation-menu" visible="true" parentActive="true"></ul>
          `
    }),
    tslib_1.__metadata("design:paramtypes", [PerformanceService])
], MenurelatorioComponent);
export { MenurelatorioComponent };
//# sourceMappingURL=menurelatorio.component.js.map