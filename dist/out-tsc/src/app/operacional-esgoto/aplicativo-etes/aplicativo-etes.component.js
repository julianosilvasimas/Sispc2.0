import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { OperacionalEsgotoService } from '../operacional-esgoto.service';
import { MessageService } from 'primeng/api';
let AplicativoEtesComponent = class AplicativoEtesComponent {
    constructor(esg, messageService) {
        this.esg = esg;
        this.messageService = messageService;
        this.VisibleListaDeUnidades = false;
        this.ptbr = {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
            dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sab"],
            dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
            monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
            monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
            today: 'Hoje',
            clear: 'Limpar'
        };
        //===================================================================================================================================
        //SELECIONAR TIPO DE INDICADOR
        this.ListaOpcoes = [];
        this.DATA1 = null;
        this.DATA2 = null;
        this.VisibleUnidadeSelecionada = false;
        this.VisibleListaDeIndicadores = false;
        this.cols = [
            { field: 'nome', header: 'nome' },
            { field: 'tagIndicador', header: 'tagIndicador' },
            { field: 'usuario', header: 'usuario' },
            { field: 'dataIndicador', header: 'dataIndicador' },
            { field: 'valor', header: 'valor' },
            { field: 'observacao', header: 'observacao' },
        ];
        this.ListaFiltroUsuario = [];
        this.ListaFiltro2Usuario = [];
        this.ListaFiltroindicador = [];
        this.ListaFiltro2indicador = [];
    }
    ngOnInit() {
        this.getOpcoes();
        this.esg.getunidades().subscribe(response => {
            this.ListaDeUnidades = response;
            this.VisibleListaDeUnidades = true;
            // ===============================
            // Descomentar depois do teste
            this.UnidadeSelecionada = this.ListaDeUnidades[1];
            this.VisibleListaDeUnidades = false;
            this.VisibleUnidadeSelecionada = true;
            this.DATA1 = new Date(2020, 2, 10);
            this.DATA2 = new Date(2020, 2, 14);
            this.selecioanarIndicador(this.ListaOpcoes[0]);
            // ===============================
        });
    }
    voltar() {
        this.VisibleListaDeUnidades = true;
        this.VisibleUnidadeSelecionada = false;
        this.VisibleListaDeIndicadores = false;
        for (var i = 0; i < this.ListaOpcoes.length; i++) {
            this.ListaOpcoes[i].selected = 0;
        }
        this.DATA1 = null;
        this.DATA2 = null;
    }
    getOpcoes() {
        this.ListaOpcoes = [];
        this.esg.getclassificacoes().subscribe(response => {
            this.ListaOpcoes = response;
            for (var i = 0; i < response.length; i++) {
                this.ListaOpcoes[i].selected = 0;
            }
        });
    }
    selectEte(ete) {
        this.UnidadeSelecionada = ete;
        this.VisibleListaDeUnidades = false;
        this.VisibleUnidadeSelecionada = true;
        this.DATA1 = null;
        this.DATA2 = null;
    }
    //===================================================================================================================================
    //DADOS DO INDICADOR
    converterdata(date) {
        var ano = date.getFullYear();
        var mes = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dia = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return ano + "-" + mes + "-" + dia;
    }
    selecioanarIndicador(indicador) {
        this.VisibleListaDeIndicadores = false;
        for (var i = 0; i < this.ListaOpcoes.length; i++) {
            this.ListaOpcoes[i].selected = 0;
        }
        if (this.DATA1 === null || this.DATA2 === null) {
            this.messageService.add({ severity: 'info', summary: 'info', detail: 'Preencha as Datas' });
        }
        else {
            indicador.selected = 1;
            //=======================================================================
            this.esg.getIndicadoresUnidade(this.UnidadeSelecionada.id, this.converterdata(this.DATA1), this.converterdata(this.DATA2), indicador.id).subscribe(response => {
                console.log(response);
                this.ListaDeIndicadores = response;
                this.ListaDeIndicadoresImodificada = response;
                this.ListaFiltroUsuario = [];
                this.ListaFiltro2Usuario = [];
                this.ListaFiltroindicador = [];
                this.ListaFiltro2indicador = [];
                for (var i = 0; i < response.length; i++) {
                    if (this.ListaFiltro2indicador.indexOf(response[i].indicador.tagIndicador) < 0) {
                        this.ListaFiltroindicador.push(response[i].indicador);
                        this.ListaFiltro2indicador.push(response[i].indicador.tagIndicador);
                    }
                    if (this.ListaFiltro2Usuario.indexOf(response[i].usuario) < 0) {
                        this.ListaFiltroUsuario.push({ label: response[i].usuario, value: response[i].usuario });
                        this.ListaFiltro2Usuario.push(response[i].usuario);
                    }
                }
                this.VisibleListaDeIndicadores = true;
            });
        }
    }
    pesquisar(ind, coluna) {
        this.ListaDeIndicadores = this.ListaDeIndicadoresImodificada;
        this.ListaDeIndicadores = this.ListaDeIndicadores.filter((animal) => {
            return animal.indicador[coluna] === ind[coluna];
        });
    }
};
AplicativoEtesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-aplicativo-etes',
        templateUrl: './aplicativo-etes.component.html',
        styleUrls: ['./aplicativo-etes.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [OperacionalEsgotoService, MessageService])
], AplicativoEtesComponent);
export { AplicativoEtesComponent };
//# sourceMappingURL=aplicativo-etes.component.js.map