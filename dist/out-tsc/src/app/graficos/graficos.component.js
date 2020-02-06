import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PerformanceService } from '../performance/performance.service';
let GraficosComponent = class GraficosComponent {
    constructor(performanceService) {
        this.performanceService = performanceService;
        this.title = 'projeto';
    }
    ngOnInit() {
        this.Validador(this.element);
        this.diferencaAcum = this.orcadoAcum - this.realizAcum;
    }
    // TIPOGRAPH 1 == Receitas (REALIZADO, ORÇADO, REALIZADO ACUMULADO, ORÇADO ACUMULADO)
    // TIPOGRAPH 2 == Acumulados (REALIZADO ACUMULADO, ORÇADO ACUMULADO)
    // TIPOGRAPH 3 == TemposMedia (REALIZADO MEDIA, ORÇADO MEDIA) Formato de HORA
    Validador(indic) {
        this.performanceService.indicadores(this.refer, indic.indicadorId)
            .subscribe(indicador => {
            //Consulta endpoint que possui os nomes dos indicadores
            //=======================================================================================
            this.tipoindicador = indic.indicador;
            this.tipoGraph = indic.tipoGrafico;
            this.indicadorId = indic.indicadorId;
            //Consulta do EIXO
            //=======================================================================================
            this.eixo = indicador[0];
            this.eixo = this.eixo.splice(1, Number.MAX_VALUE);
            this.eixo = this.eixo.filter(item => item !== null);
            //ROTULOS DE COMENTARIOS
            //========================================================================================
            this.temp1 = indicador[1];
            this.temp1 = this.temp1.splice(1, Number.MAX_VALUE);
            var responsaveis;
            responsaveis = indicador[2];
            responsaveis = responsaveis.splice(1, Number.MAX_VALUE);
            this.PreencherComentarios(this.temp1, responsaveis, this.eixo);
            //ROTULOS DE ACUMULADOS
            //========================================================================================
            this.temp1 = indicador[3];
            this.RotulosAcumulados(this.tipoGraph, this.temp1);
            //==========================================================================================
            var orcado;
            orcado = indicador[4];
            orcado = orcado.splice(1, Number.MAX_VALUE);
            var realiz;
            realiz = indicador[5];
            realiz = realiz.splice(1, Number.MAX_VALUE);
            var orcadoDiaAc;
            orcadoDiaAc = indicador[6];
            orcadoDiaAc = orcadoDiaAc.splice(1, Number.MAX_VALUE);
            var realizDiaAc;
            realizDiaAc = indicador[7];
            realizDiaAc = realizDiaAc.splice(1, Number.MAX_VALUE);
            var orcadoDiaMed;
            orcadoDiaMed = indicador[8];
            orcadoDiaMed = orcadoDiaMed.splice(1, Number.MAX_VALUE);
            var realizDiaMed;
            realizDiaMed = indicador[9];
            realizDiaMed = realizDiaMed.splice(1, Number.MAX_VALUE);
            if (this.tipoGraph == 1) {
                this.EscolherTipoGrafico(this.tipoGraph, this.eixo, orcado, realiz, orcadoDiaAc, realizDiaAc);
            }
            else if (this.tipoGraph == 2) {
                this.EscolherTipoGrafico(this.tipoGraph, this.eixo, orcadoDiaAc, realizDiaAc, orcadoDiaAc, realizDiaAc);
            }
            else if (this.tipoGraph == 3) {
                this.EscolherTipoGrafico(this.tipoGraph, this.eixo, orcadoDiaMed, realizDiaMed, orcadoDiaMed, realizDiaMed);
            }
        });
    }
    RotulosAcumulados(tipoGraph, temp1) {
        let orcadoMensal = parseInt(temp1.splice(1, 1));
        let orcadoAcumulad = parseInt(temp1.splice(1, 1));
        let val1 = orcadoAcumulad;
        let realizadoAcumulad = parseInt(temp1.splice(1, 1));
        let val2 = realizadoAcumulad;
        if (tipoGraph == 1 || tipoGraph == 2) {
            this.orcadoMensal = orcadoMensal.toLocaleString();
            this.orcadoAcum = orcadoAcumulad.toLocaleString();
            this.realizAcum = realizadoAcumulad.toLocaleString();
            this.diferencaAcum = (val2 - val1).toLocaleString();
            this.diferencaPerc = ((-(1 - (val2 / val1))) * 100).toFixed(1);
            this.previsaoMensal = parseInt(temp1.splice(1, 1));
            this.previsaoMensal = this.previsaoMensal.toLocaleString();
            if (this.previsaoMensal == 0) {
                this.previsaoMensal = this.orcadoMensal;
            }
        }
        else if (tipoGraph == 3) {
            this.previsaoMensal = parseInt(temp1.splice(1, 1));
            if (this.previsaoMensal == 0 || this.previsaoMensal == "NaN:NaN:NaN") {
                this.previsaoMensal = orcadoMensal;
            }
            val1 = parseInt(temp1.splice(1, 1));
            val2 = parseInt(temp1.splice(1, 1));
            this.orcadoMensal = val1;
            this.orcadoAcum = val1;
            this.realizAcum = val2;
            this.diferencaAcum = (val2 - val1);
            this.diferencaPerc = ((-(1 - (val2 / val1))) * 100).toFixed(1);
            this.previsaoMensal = this.previsaoMensal;
        }
    }
    ConverterParaHora(s) {
        function duas_casas(numero) {
            if (numero <= 9) {
                numero = "0" + numero;
            }
            return numero;
        }
        var hora = Math.floor(s / 3600);
        console.log(s + " | hora = " + hora);
        var minuto = Math.floor(s / 60) - (hora * 60);
        console.log(s + " | minuto = " + minuto);
        var segundo = s - Math.floor(minuto * 60) - Math.floor(hora * 3600);
        console.log(s + " | segundo = " + segundo);
        var formatado = hora + ":" + minuto + ":" + segundo;
        return formatado;
    }
    EscolherTipoGrafico(TipoGraph, eixo, orcado, realiz, orcadoDiaAc, realizDiaAc) {
        let indice = 0;
        while (indice < 33) {
            let soma = (realiz[indice] + orcado[indice]);
            if (soma == 0) {
                orcado.splice(indice, 1);
                realiz.splice(indice, 1);
                orcadoDiaAc.splice(indice, 1);
                realizDiaAc.splice(indice, 1);
                eixo.splice(indice, 1);
                indice = 0;
            }
            indice = indice + 1;
        }
        this.orcado = orcado;
        this.realiz = realiz;
        this.orcadoDiaAc = orcadoDiaAc;
        this.realizDiaAc = realizDiaAc;
        this.eixo = eixo;
        if (TipoGraph == 1) {
            this.Tipo1();
        }
        else if (TipoGraph == 2 || TipoGraph == 3) {
            this.Tipo2();
        }
    }
    PreencherComentarios(temp1, responsaveis, eixo) {
        let indice = 0;
        let indice2 = 0;
        var Comentarios1 = [];
        var Nomes1 = [];
        var Datas1 = [];
        var Comentarios2 = [];
        var Nomes2 = [];
        var Datas2 = [];
        while (indice < 31) {
            if (temp1[indice] != null && temp1[indice] != "") {
                indice2 = Comentarios1.length;
                if (indice2 < 13) {
                    var adicionar = Comentarios1.push(temp1[indice]);
                    var adicionar = Nomes1.push(responsaveis[indice]);
                    var adicionar = Datas1.push(eixo[indice]);
                }
                else {
                    var adicionar = Comentarios2.push(temp1[indice]);
                    var adicionar = Nomes2.push(responsaveis[indice]);
                    var adicionar = Datas2.push(eixo[indice]);
                }
            }
            indice = indice + 1;
        }
        indice2 = Comentarios2.length;
        this.comentar1 = Comentarios1;
        this.responsaveis1 = Nomes1;
        this.datas1 = Datas1;
        this.comentar2 = Comentarios2;
        this.responsaveis2 = Nomes2;
        this.datas2 = Datas2;
    }
    //BARLINE TIPO RECEITADIRETA
    Tipo1() {
        this.data = {
            labels: this.eixo,
            datasets: [
                { type: 'line',
                    pointStyle: 'circle',
                    yAxisID: 'y-axis-2',
                    fill: false,
                    borderDash: [2, 2],
                    pointRadius: 0,
                    borderWidth: 1,
                    backgroundColor: '#253f93',
                    borderColor: '#253f93',
                    label: 'Orçado Acumulado',
                    data: this.orcadoDiaAc
                },
                {
                    type: 'line',
                    yAxisID: 'y-axis-2',
                    fill: false,
                    borderWidth: 1,
                    backgroundColor: '#253F93',
                    borderColor: '#253F93',
                    label: 'Realizado Acumulado',
                    data: this.realizDiaAc
                },
                {
                    label: 'Orçado',
                    yAxisID: 'y-axis-1',
                    backgroundColor: '#6C8CC7',
                    borderColor: '#6C8CC7',
                    data: this.orcado
                },
                {
                    label: 'Realizado',
                    yAxisID: 'y-axis-1',
                    backgroundColor: '#88D1D1',
                    borderColor: '#88D1D1',
                    data: this.realiz
                }
            ]
        };
        this.options = {
            responsive: true,
            stacked: false,
            title: {
                display: true,
                fontSize: 16
            },
            gridLines: {
                display: true,
                drawborder: true,
                drawOnChartArea: false
            },
            scales: {
                yAxes: [{
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        gridLines: {
                            display: true,
                            drawborder: true,
                            drawOnChartArea: false
                        },
                    }, {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        gridLines: {
                            display: true,
                            drawborder: true,
                            drawOnChartArea: false
                        },
                    }],
            },
            legend: {
                position: 'bottom'
            }
        };
    }
    //TIPO TMA TME 2 EIXOS
    Tipo2() {
        this.data = {
            labels: this.eixo,
            datasets: [
                {
                    type: 'line',
                    fill: false,
                    borderDash: [2, 2],
                    pointRadius: 0,
                    borderWidth: 1,
                    label: 'Orçado',
                    backgroundColor: '#6C8CC7',
                    borderColor: '#6C8CC7',
                    data: this.orcado
                },
                {
                    type: 'line',
                    fill: false,
                    label: 'Reaizado',
                    borderWidth: 1,
                    backgroundColor: '#253F93',
                    borderColor: '#253F93',
                    data: this.realiz
                }
            ]
        };
        this.options = {
            responsive: false,
            stacked: false,
            title: {
                display: true,
                fontSize: 16
            },
            gridLines: {
                display: true,
                drawborder: true,
                drawOnChartArea: false
            },
            legend: {
                position: 'bottom'
            }
        };
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GraficosComponent.prototype, "refer", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GraficosComponent.prototype, "indicador", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GraficosComponent.prototype, "element", void 0);
GraficosComponent = tslib_1.__decorate([
    Component({
        selector: 'app-graficos',
        templateUrl: './graficos.component.html',
        styleUrls: ['./graficos.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [PerformanceService])
], GraficosComponent);
export { GraficosComponent };
//# sourceMappingURL=graficos.component.js.map