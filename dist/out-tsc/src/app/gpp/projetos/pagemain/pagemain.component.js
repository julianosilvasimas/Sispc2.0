import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CarService } from '../../../demo/service/carservice';
let PagemainComponent = class PagemainComponent {
    constructor(carService, messageService) {
        this.carService = carService;
        this.messageService = messageService;
        this.clonedCars = {};
        this.uploadedFiles = [];
    }
    ngOnInit() {
        this.dia = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1314, 15, 16, 17, 18, 19, 10, 21, 22, 23, 24, 25, 26, 27, 28, 2, 3, 31];
        this.mes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.ano = [2019, 2020, 2021, 2022];
        this.stepsItems = [
            { label: 'Regulatório' },
            { label: 'Engenharia' },
            { label: 'Financeiro' },
            { label: 'Licenciamentos' },
            { label: 'Contratação' },
            { label: 'Execução(Obra)' },
            { label: 'Comissionamento' },
            { label: 'Comprovação' },
        ];
        this.localidades = [
            { label: 'Todas', value: null },
            { label: 'Arraial do Cabo', value: 'Audi' },
            { label: 'Cabo Frio', value: 'BMW' },
            { label: 'Iguaba Grande', value: 'Fiat' },
            { label: 'São Pedro da Aldeia', value: 'Honda' },
            { label: 'Armação dos Búzios', value: 'Jaguar' },
            { label: 'ETA', value: 'Mercedes' }
        ];
        this.files2 = [
            {
                label: "Produção",
                data: "Documents Folder",
                expandedIcon: "ui-icon-folder-open",
                collapsedIcon: "ui-icon-folder",
                children: [
                    { label: "Implantação do Sistema", icon: "ui-icon-insert-drive-file", data: "Expenses Document" },
                    { label: "Ampliação do Sistema", icon: "ui-icon-insert-drive-file", data: "Expenses Document" },
                    { label: "Melhoria do Sistema", icon: "ui-icon-insert-drive-file", data: "Resume Document" }
                ]
            },
            {
                label: "Adução",
                data: "Home Folder",
                expandedIcon: "ui-icon-folder-open",
                collapsedIcon: "ui-icon-folder",
                children: [
                    { label: "Implantação do Sistema", icon: "ui-icon-insert-drive-file", data: "Expenses Document" },
                    { label: "Ampliação do Sistema", icon: "ui-icon-insert-drive-file", data: "Expenses Document" },
                    { label: "Melhoria do Sistema", icon: "ui-icon-insert-drive-file", data: "Resume Document" }
                ]
            },
        ];
        this.carService.getEngenharia().then(cars => this.cars = cars);
        this.carService.getProcessos().then(processos => this.processos = processos);
        this.carService.getLicencas().then(licencas => this.licencas = licencas);
        this.municipio = [
            { label: 'All Brands', value: null },
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        this.status = [
            { label: 'Não Iniciado', value: null },
            { label: 'Em Andamento', value: 'Audi' },
            { label: 'Concluído', value: 'BMW' },
            { label: 'Paralisado', value: 'Fiat' },
            { label: 'Não se Aplica', value: 'Honda' },
        ];
        this.colors = [
            { label: 'White', value: 'White' },
            { label: 'Green', value: 'Green' },
            { label: 'Silver', value: 'Silver' },
            { label: 'Black', value: 'Black' },
            { label: 'Red', value: 'Red' },
            { label: 'Maroon', value: 'Maroon' },
            { label: 'Brown', value: 'Brown' },
            { label: 'Orange', value: 'Orange' },
            { label: 'Blue', value: 'Blue' }
        ];
        this.cols = [
            { field: 'nomeEmpresa', header: 'Empresa' },
            { field: 'respEmpresa', header: 'Responsável' },
            { field: 'status', header: 'Status' },
            { field: 'tipo', header: 'Tipo do Projeto' },
            { field: 'previsto', header: 'Previsto' },
            { field: 'replanejado', header: 'Replanejado' },
            { field: 'realizado', header: 'Realizado' },
            { field: 'realizado', header: 'Contrato Físico' },
            { field: 'realizado', header: 'Contrato Sistêmico' }
        ];
        this.cols2 = [
            { field: 'nProcesso', header: 'Numero do Processo' },
            { field: 'responsavel', header: 'Responsável' },
            { field: 'envio', header: 'Envio' },
            { field: 'retorno', header: 'Retorno' },
        ];
        this.cols3 = [
            { field: 'numeroLicenca', header: 'Número' },
            { field: 'tipoLicenca', header: 'Tipo' },
            { field: 'status', header: 'Status' },
            { field: 'orgao', header: 'Orgão' },
            { field: 'descricao', header: 'Descrição' },
            { field: 'protocolo', header: 'Protocolo' },
            { field: 'inicio', header: 'Início' },
            { field: 'termino', header: 'Término' }
        ];
    }
    onRowEditInit(car) {
        this.clonedCars[car.nomeEmpresa] = Object.assign({}, car);
    }
    onRowEditSave(car) {
        if (car.nomeEmpresa != null) {
            delete this.clonedCars[car.nomeEmpresa];
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Car is updated' });
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Year is required' });
        }
    }
    onRowEditCancel(car, index) {
        this.cars[index] = this.clonedCars[car.nomeEmpresa];
        delete this.clonedCars[car.nomeEmpresa];
    }
    onTabOpen($event) {
        if ($event.index === 4) {
            this.selected = !this.selected;
        }
    }
    onTabClose($event) {
        if ($event.index === 4) {
            this.selected = !this.selected;
        }
    }
    onUpload(event) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }
};
PagemainComponent = tslib_1.__decorate([
    Component({
        selector: 'app-pagemain',
        templateUrl: './pagemain.component.html',
        styleUrls: ['./pagemain.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [CarService, MessageService])
], PagemainComponent);
export { PagemainComponent };
//# sourceMappingURL=pagemain.component.js.map