import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EventEmitterService } from '../../demo/service/EventEmitterService';
import { PerformanceService } from './../performance.service';
let InputindicadoresComponent = class InputindicadoresComponent {
    constructor(messageService, performanceService) {
        this.messageService = messageService;
        this.performanceService = performanceService;
        this.hoje = new Date();
        this.ontem = new Date(this.hoje.getFullYear(), this.hoje.getMonth(), this.hoje.getDate() - 1);
        this.referencia = new Date(this.hoje.getFullYear(), this.hoje.getMonth(), 1);
        this.refer = this.referencia.toISOString().substr(0, 10);
        this.setor = 'app works!';
        this.classtemp = new Array();
        this.resumo = new Array();
        this.barraAtiva = false;
        this.ind = [];
        this.mostrarMenu = false;
        this.classificacoes = new Array();
        this.dadosIndicador = [];
        this.indicador1 = [];
        this.comparar = [];
        this.idgerencias = [];
        this.setores = [];
        this.testeIni = true;
        EventEmitterService.get('textChange').subscribe(data => {
            this.indicador1 = [],
                this.comparar = [],
                this.idgerencias = [],
                this.resumo = [],
                this.classificacoes = [],
                this.idgerenciasretornado = 0,
                this.classtemp = [],
                this.setor = data;
            this.codSetor(data);
            //this.indicador(this.idgerenciasretornado),
            //console.log(this.idgerenciasretornado)
        });
    }
    ngOnInit() {
        this.date = this.ontem;
        this.cols = [
            { field: 'vin', header: 'Indicador' },
            { field: 'year', header: 'Realizado' },
            { field: 'orcado', header: 'Orçado' },
            { field: 'color', header: 'Forecast' }
        ];
        this.pt = {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
            dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
            dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
            monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
            monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
            today: 'Hoje',
            clear: 'Limpar'
        };
        this.dadosIndicador = [
            { label: 'Orçado', valor: this.orcado },
            { label: 'Realizado', valor: this.realizado },
            { label: 'Pecld', valor: this.pecld },
            { label: 'Forecast', valor: this.forecast },
            { label: 'Mínimo', valor: this.minimo },
            { label: 'Máximo', valor: this.maximo },
            { label: 'Meta', valor: this.meta },
            { label: 'Previsão', valor: this.previsao },
            { label: 'DP', valor: this.dentroprazo },
            { label: 'FP', valor: this.foraprazo },
            { label: 'DP Reguladas', valor: this.dentroprazoreg },
            { label: 'FP Reguladas', valor: this.foraprazoreg },
            { label: 'Atendente', valor: this.atendente },
            { label: 'Atendimento', valor: this.atendimento },
        ];
    }
    // aqui  tem um bug na hora de 
    onTabOpen($event) {
        this.testeIni = false;
        var regex = /(inserted"> )(.*)( <)/;
        var textoini = $event.originalEvent['target'].outerHTML;
        var texto = '';
        //console.log(textoini)
        if (textoini.length >= 15) {
            texto = regex.exec(textoini)[2];
        }
        else if (textoini.length < 15) {
            texto = textoini;
        }
        else {
            texto = 'Não Encontrado Resultado';
        }
        //console.log(texto) 
        //console.log(this.setor)
        this.indicador(texto);
    }
    onTabClose($event) {
        this.desativaBarra();
    }
    codSetor(dado) {
        this.performanceService.gerencias().subscribe(response => {
            var ger = response.splice(2, Number.MAX_VALUE);
            //console.log("PROCURAR GERENCIAS")
            for (var i = 0; i < ger.length; i++) {
                this.comparar.push(ger[i]['icon'] + ger[i]['label']);
                this.idgerencias.push(ger[i]['gerenciaId']);
                this.setores.push(ger[i]['label']);
            }
            this.gerencia2 = dado;
            //console.log("PROCURAR INDICADOR")
            for (var i = 0; i < this.comparar.length; i++) {
                if (this.comparar[i].includes(this.gerencia2)) {
                    this.idgerenciasretornado = this.idgerencias[i];
                    this.setor = this.setores[i];
                    //requisição pra definir a classificação dos indicadores
                    this.performanceService.classindicadores(this.idgerenciasretornado)
                        .subscribe(response => {
                        response.forEach(element => {
                            this.classtemp.push(element['classificacao']);
                        });
                        this.classificacoes = this.classtemp.filter((este, i) => this.classtemp.indexOf(este) === i);
                    });
                }
            }
        });
    }
    indicador(header) {
        console.log(header);
        this.classificacoes.forEach(classe => {
            if (classe === header) {
                this.performanceService.classindicadores(this.idgerenciasretornado)
                    .subscribe(response => {
                    response.forEach(res => {
                        if (classe === res['classificacao']) {
                            console.log(res);
                            this.resumo = [];
                            this.performanceService.indicadores(this.refer, res['indicadorId'])
                                .subscribe(Indicadores => {
                                this.realacum = parseFloat(Indicadores[3][3]).toLocaleString(), //'pt-BR', { style: 'currency', currency: 'BRL' }),
                                    this.orcadoacum = parseFloat(Indicadores[3][2]).toLocaleString(),
                                    this.previsao = parseFloat(Indicadores[3][4]).toLocaleString(),
                                    this.resumo.push({
                                        'vin': res['indicador'],
                                        'year': this.realacum,
                                        'orcado': this.orcadoacum,
                                        'color': this.previsao,
                                        'id': res['indicadorId'],
                                        'classe': ['classificacao']
                                    });
                            });
                        }
                    });
                });
            }
        });
    }
    selectIndicador(indicador) {
        // bug no primeiro clique dá undefined por tempo de execução
        this.performanceService.classindicadores(this.idgerenciasretornado)
            .subscribe(Indicadores => {
            this.indicatore = Indicadores.filter(item => item.indicadorId === parseInt(indicador.id));
            console.log(this.ind);
        });
        this.indicatore.forEach(res => {
            if (this.indicatore[0]) {
                this.ind = res;
            }
        });
        console.log(this.refer);
        this.selectedIndicador = indicador;
        this.indi = indicador.vin;
        //console.log(this.indi)
        this.nind = indicador.id;
        //console.log(this.nind)
        this.barraAtiva = true;
        this.messageService.add({ severity: 'info', summary: 'Indicador Selecionado', detail: 'Indicador: ' + indicador.vin });
    }
    desativaBarra() {
        this.barraAtiva = false;
    }
    recebeDados(n) {
        var virg = /,/gi;
        return n.replace(virg, ".");
    }
    entregaDados(n) {
        var virg = /./gi;
        console.log(n);
        if (n != undefined || n != null) {
            return n.replace(virg, ",");
        }
        else {
            return null;
        }
    }
    pesquisarIndicador(data) {
        this.performanceService.indicadoresByDay(this.nind, data.toISOString().substr(0, 10))
            .subscribe(indicadores => {
            this.indica = indicadores;
            this.exeindicadorId = indicadores['exeindicadorId'],
                this.datareferencia = indicadores['datareferencia'],
                this.dataindicador = indicadores['dataindicador'],
                this.ciclo = indicadores['ciclo'],
                this.periodicidade = indicadores['periodicidade'],
                this.orcado = indicadores['orcado'] === null ? indicadores['orcado'] : indicadores['orcado'].toLocaleString(),
                this.realizado = indicadores['realizado'] === null ? indicadores['realizado'] : indicadores['realizado'].toLocaleString(),
                //this.realizadokg = indicadores['realizadokg'].toLocaleString(),
                this.pecld = indicadores['pecld'] === null ? indicadores['pecld'] : indicadores['pecld'].toLocaleString(),
                this.forecast = indicadores['forecast'] === null ? indicadores['forecast'] : indicadores['forecast'].toLocaleString(),
                this.minimo = indicadores['minimo'] === null ? indicadores['minimo'] : indicadores['minimo'].toLocaleString(),
                this.maximo = indicadores['maximo'] === null ? indicadores['maximo'] : indicadores['maximo'].toLocaleString(),
                this.meta = indicadores['meta'] === null ? indicadores['meta'] : indicadores['meta'].toLocaleString(),
                this.dentroprazo = indicadores['dentroprazo'] === null ? indicadores['dentroprazo'] : indicadores['dentroprazo'].toLocaleString(),
                this.foraprazo = indicadores['foraprazo'] === null ? indicadores['foraprazo'] : indicadores['foraprazo'].toLocaleString(),
                this.dentroprazoreg = indicadores['dentroprazoreg'] === null ? indicadores['dentroprazoreg'] : indicadores['dentroprazoreg'].toLocaleString(),
                this.foraprazoreg = indicadores['foraprazoreg'] === null ? indicadores['foraprazoreg'] : indicadores['foraprazoreg'].toLocaleString(),
                this.atendente = indicadores['atendente'],
                this.atendimento = indicadores['atendimento'],
                this.comentario = indicadores['comentario'],
                this.acao = indicadores['acao'],
                this.analise = indicadores['analise'],
                this.colaborador = indicadores['colaborador'],
                this.indicadorId = indicadores['indicadorId'].indicadorId,
                this.undcodigo = indicadores['undcodigo'].unidadeId,
                console.log("requisicao bem sucedida!", indicadores);
        }, error => {
            console.log("Erro: ", error);
            this.messageService.add({ severity: 'error', summary: "Falha na Consulta!", detail: error.message, life: 5000 });
        });
    }
    // recebe formato hora e converte em segundos
    horaSeg(hora) {
        this.hora = parseInt(hora.substring(0, 3)) * 3600;
        this.minuto = parseInt(hora.substring(3, 6)) * 60;
        this.segundo = parseInt(hora.substring(6, 9));
        this.convertido = this.hora.valueOf() + this.minuto.valueOf() + this.segundo.valueOf();
    }
    // recebe segundos e converte formato hora
    segHora(seg) {
        this.segundo = parseInt(seg) % 60;
        this.segundo = parseInt(this.segundo.toString());
        this.minutos = parseInt(seg) / 60;
        this.minuto = this.minutos % 60;
        this.minuto = parseInt(this.minuto.toString());
        this.hora = this.minutos / 60;
        this.hora = parseInt(this.hora.toString());
        var reserv = new Date(0, 0, 0, this.hora, this.minuto, this.segundo);
        this.hms = reserv.toTimeString().substring(0, 8);
        console.log("Aqui agora: ", this.hms); // deve mostrar "01:16:07"
    }
    abreInput() {
        this.pesquisarIndicador(this.ontem);
    }
    atualizaDados() {
        this.orcado = this.recebeDados(this.orcado);
        this.realizado = this.recebeDados(this.realizado);
        this.realizadokg = this.recebeDados(this.realizadokg);
        this.pecld = this.recebeDados(this.pecld);
        this.forecast = this.recebeDados(this.forecast);
        this.minimo = this.recebeDados(this.minimo);
        this.maximo = this.recebeDados(this.maximo);
        this.meta = this.recebeDados(this.meta);
        this.dentroprazo = this.recebeDados(this.dentroprazo);
        this.foraprazo = this.recebeDados(this.foraprazo);
        this.dentroprazoreg = this.recebeDados(this.dentroprazoreg);
        this.foraprazoreg = this.recebeDados(this.foraprazoreg);
        this.performanceService.indicadoresAtt(this.exeindicadorId, this.datareferencia, this.dataindicador, this.ciclo, this.orcado, this.realizado, this.pecld, this.atendente, this.atendimento, this.comentario, this.forecast, this.minimo, this.maximo, this.meta, this.previsao, this.dentroprazo, this.foraprazo, this.dentroprazoreg, this.foraprazoreg, this.acao, this.analise, this.colaborador, this.indicadorId, this.undcodigo)
            .subscribe(response => {
            if (response === null) {
                console.log("OK!!!!!!"),
                    console.log(this.orcado);
                this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Dados enviados corretamente!!!', life: 5000 });
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!", detail: error.message, life: 5000 });
            console.log(error);
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], InputindicadoresComponent.prototype, "indicad", void 0);
InputindicadoresComponent = tslib_1.__decorate([
    Component({
        selector: 'app-inputindicadores',
        templateUrl: './inputindicadores.component.html',
    }),
    tslib_1.__metadata("design:paramtypes", [MessageService, PerformanceService])
], InputindicadoresComponent);
export { InputindicadoresComponent };
//# sourceMappingURL=inputindicadores.component.js.map