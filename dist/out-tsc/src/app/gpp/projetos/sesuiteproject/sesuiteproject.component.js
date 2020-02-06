import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let SesuiteprojectComponent = class SesuiteprojectComponent {
    constructor() { }
    ngOnInit() {
    }
    onRowEditCancel(index) {
        //this.cars[index] = this.clonedCars[car.nomeEmpresa];
        //delete this.clonedCars[car.nomeEmpresa];
    }
    onTabOpen($event) {
        if ($event.index === 4) {
            //his.selected = !this.selected;
        }
    }
    onTabClose($event) {
        if ($event.index === 4) {
            //this.selected = !this.selected;
        }
    }
};
SesuiteprojectComponent = tslib_1.__decorate([
    Component({
        selector: 'app-sesuiteproject',
        templateUrl: './sesuiteproject.component.html'
    }),
    tslib_1.__metadata("design:paramtypes", [])
], SesuiteprojectComponent);
export { SesuiteprojectComponent };
//# sourceMappingURL=sesuiteproject.component.js.map