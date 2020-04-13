import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjetosService } from '../projetos.service';
let PagemainComponent = class PagemainComponent {
    constructor(messageService, projetosService) {
        this.messageService = messageService;
        this.projetosService = projetosService;
        this.selectedCadFluxo = [];
        this.regIniDia = null;
        this.regIniMes = null;
        this.regIniAno = null;
        this.regFimDia = null;
        this.regFimMes = null;
        this.regFimAno = null;
        this.inicioprevisto = null;
        this.inicioreplanejado = null;
        this.iniciorealizado = null;
        this.terminoprevisto = null;
        this.terminoreplanejado = null;
        this.terminorealizado = null;
        this.clonedLines = {};
        this.uploadedFiles = [];
        this.cols3 = [{ field: null, header: null }];
        this.licencas = [];
        this.partesInteressadas = [];
        this.arrProjeto = [];
        this.arrRegulatorio = [];
        this.radar = [{ label: null, value: null }];
        this.indices = [{ label: null, value: null }];
        this.stats = [{ label: null, value: null }];
        this.partesInt = [];
        this.partes = [];
        this.fluxos = [];
        this.descrevendo = null;
        this.novaDelib = null;
        this.novaengenha = null;
        this.novacomprovacao = null;
        this.novalicenca = null;
        this.idProjeto = Number.parseInt(sessionStorage.getItem('idProjeto'));
        this.projeto = sessionStorage.getItem('nomeProjeto');
        this.projetosService.getFluxoInvestimento().then(data => this.fluxoInvest = data);
        this.projetosService.getAnos().then(data => this.anos = data);
        this.projetosService.getMeses().then(data => this.meses = data);
        this.projetosService.getDias().then(data => this.dias = data);
        this.projetosService.getFases().then(data => this.fasesProjetos = data);
        this.projetosService.getStatusGlobal().then(data => this.status = data);
        this.projetosService.getEngenharia().then(data => this.cars = data);
        this.projetosService.getProcessos().then(data => this.processos = data);
        this.projetosService.getLicencas().then(data => this.licencas = data);
        this.oFluxo = {
            "regulatorioId": null,
            "fluxoinvestimento": null,
            "inicio": null,
            "termino": null,
            "valorprojeto": null,
            "descricao": null,
            "aprovacao": null,
            "moeda": null,
            "projetoId": {
                "projetoId": this.idProjeto
            }
        };
        this.attFluxo = {
            "regulatorioId": null,
            "fluxoinvestimento": null,
            "inicio": null,
            "termino": null,
            "valorprojeto": null,
            "descricao": null,
            "aprovacao": null,
            "moeda": null,
            "projetoId": {
                "projetoId": this.idProjeto
            }
        };
        this.novaDelib = {
            "deliberacaoId": null,
            "ndeliberacao": null,
            "assunto": null,
            "tipo": null,
            "envio": null,
            "retorno": null,
            "aprovado": null,
            "link": null,
            "regulatorio": { "regulatorioId": null }
        };
        this.novacomprovacao = {
            "comprovacaoarquivoId": null,
            "nomearquivo": null,
            "caminho": null,
            "tipoarquivo": null,
            "envio": null,
            "comprovacaoId": {
                "comprovacaoId": this.idProjeto
            }
        };
        this.novaengenha = {
            "engenhariaId": null,
            "empresa": null,
            "tipo": null,
            "responsavel": null,
            "status": null,
            "previsto": null,
            "replanejado": null,
            "realizado": null,
            "contsistemico": null,
            "contfisico": null,
            "projetoId": {
                "projetoId": this.idProjeto
            }
        };
        this.novalicenca = {
            "licencaId": null,
            "licenca": null,
            "descricao": null,
            "tipo": null,
            "orgao": null,
            "status": null,
            "protocolo": null,
            "inicio": null,
            "termino": null,
            "projetoId": { "projetoId": 1 }
        };
        this.novacomprovacao = {
            "comprovacaoarquivoId": null,
            "nomearquivo": null,
            "caminho": null,
            "tipoarquivo": null,
            "envio": null,
            "comprovacaoId": {
                "comprovacaoId": this.idProjeto
            }
        };
    }
    ngOnInit() {
        this.projetosService.projetosId(this.idProjeto)
            .subscribe(res => {
            this.arrProjeto = res;
            console.log(this.arrProjeto);
            this.selectedLocal = this.arrProjeto['localidade'];
            this.selectedRadar = this.arrProjeto['radar'];
            this.selectedStatusGlobal = this.arrProjeto['statusgloblal'];
            this.selectedGravidade = this.arrProjeto['gravidade'];
            this.selectedTendencia = this.arrProjeto['tendencia'];
            this.selectedUrgencia = this.arrProjeto['urgencia'];
            this.inicioprevisto = this.parseDate(this.arrProjeto['inicioprevisto']);
            this.inicioreplanejado = this.parseDate(this.arrProjeto['inicioreplanejado']);
            this.iniciorealizado = this.parseDate(this.arrProjeto['iniciorealizado']);
            this.terminoprevisto = this.parseDate(this.arrProjeto['terminoprevisto']);
            this.terminoreplanejado = this.parseDate(this.arrProjeto['terminoreplanejado']);
            this.terminorealizado = this.parseDate(this.arrProjeto['terminorealizado']);
            this.partesInteressadas = this.arrProjeto['partestinteressadas'];
            //em outros forms
            this.arrProjeto['comprovacao'].envio = this.parseDate(this.arrProjeto['comprovacao'].envio);
            this.arrProjeto['comprovacao'].retorno = this.parseDate(this.arrProjeto['comprovacao'].retorno);
            this.arrProjeto['comprovacao'].moeda = this.arrProjeto['comprovacao'].moeda.toString();
            this.projetosService.partesInteressadas()
                .subscribe(response => {
                this.partesInt = response;
                for (var i = 0; i < response.length + 1; i++) {
                    this.partes.push(false);
                }
                this.partesInteressadas.forEach((parte, index) => {
                    this.partes[parte['orgaoId']] = true;
                });
            });
            try {
                this.projetosService.regulatorios(this.idProjeto)
                    .subscribe(res => {
                    res.forEach(flux => {
                        this.fluxoInvest.forEach(elem => {
                            if (elem['value'] === flux['fluxoinvestimento']) {
                                this.fluxos.push(elem);
                            }
                        });
                    });
                    this.selectedFluxo = res[res.length - 1]['fluxoinvestimento'];
                    this.idRevisao = res.length - 1;
                    this.atualizarRevisao(this.selectedFluxo);
                });
            }
            catch (_a) {
                this.atualizarRevisao(this.attFluxo);
            }
        });
        this.projetosService.licenciamentos(this.idProjeto)
            .subscribe(response => {
            this.licenciamentos = response;
            this.licenciamentos.forEach(lic => {
                lic.inicio = this.parseResumoDate(lic.inicio);
                lic.termino = this.parseResumoDate(lic.termino);
            });
        });
        this.projetosService.engenharia(this.idProjeto)
            .subscribe(response => {
            this.engenharia = response;
            console.log(this.engenharia[0]);
            this.engenharia.forEach(eng => {
                eng.previsto = this.parseResumoDate(eng.previsto);
                eng.replanejado = this.parseResumoDate(eng.replanejado);
                eng.realizado = this.parseResumoDate(eng.realizado);
            });
        });
        this.projetosService.comprovacaoarquivos(this.idProjeto)
            .subscribe(response => {
            this.comprovacaoarquivos = response;
            //console.log(this.comprovacaoarquivos[0])
            this.comprovacaoarquivos.forEach(arq => {
                arq.envio = this.parseResumoDate(arq.envio);
            });
        });
        this.indices = [
            { label: '01', value: 1 },
            { label: '02', value: 2 },
            { label: '03', value: 3 },
            { label: '04', value: 4 },
            { label: '05', value: 5 },
        ];
        this.localidades = [
            { label: 'Todas', value: null },
            { label: 'Arraial do Cabo', value: 'Arraial do Cabo' },
            { label: 'Cabo Frio', value: 'Cabo Frio' },
            { label: 'Iguaba Grande', value: 'Iguaba Grande' },
            { label: 'São Pedro da Aldeia', value: 'São Pedro da Aldeia' },
            { label: 'Armação dos Búzios', value: 'Armação dos Búziosr' },
            { label: 'ETA', value: 'ETA' }
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
            { field: 'previsto', header: 'Previsto' },
            { field: 'previsto', header: 'Previsto' },
            { field: 'previsto', header: 'Previsto' },
            { field: 'previsto', header: 'Previsto' },
            { field: 'previsto', header: 'Previsto' },
            { field: 'previsto', header: 'Previsto' },
            { field: 'replanejado', header: 'Replanejado' },
            { field: 'realizado', header: 'Realizado' },
            { field: 'contfisico', header: 'Contrato Físico' },
            { field: 'contsistemico', header: 'Contrato Sistêmico' }
        ];
        this.cols2 = [
            { field: 'ndeliberacao', header: 'Nº Documento' },
            { field: 'assunto', header: 'Assunto' },
            { field: 'tipo', header: 'Tipo' },
            { field: 'envio', header: 'Envio' },
            { field: 'retorno', header: 'Retorno' },
            { field: 'aprovado', header: 'Aprovação' },
            { field: 'link', header: 'Link Documento' }
        ];
        this.colsarqcomp = [
            { field: 'nomearquivo', header: 'Nome do arquivo' },
            { field: 'tipoarquivo', header: 'Tipo do arquivo' },
            { field: 'envio', header: 'Data de envio' },
            { field: 'link', header: 'Link Documento' }
        ];
        this.cols3 = [
            { field: 'licenca', header: 'Licença' },
            { field: 'tipo', header: 'Tipo' },
            { field: 'status', header: 'Status' },
            { field: 'orgao', header: 'Orgão' },
            { field: 'descricao', header: 'Descrição' },
            { field: 'protocolo', header: 'Protocolo' },
            { field: 'inicio', header: 'Início' },
            { field: 'termino', header: 'Término' }
        ];
    }
    aprovarRev() {
        this.oFluxo['aprovacao'] = 'Aprovada';
        //console.log(this.oFluxo)
        this.atualizarRegulatorio();
    }
    atualizarRevisao(fluxo) {
        this.oFluxo = [];
        this.regIniDia = null;
        this.regIniMes = null;
        this.regIniAno = null;
        this.regFimDia = null;
        this.regFimMes = null;
        this.regFimAno = null;
        this.projetosService.regulatorios(this.idProjeto)
            .subscribe(res => {
            let aux = [];
            //==================================================================//
            // * Definindo que só apareça revisões cadastradas para o projeto * //
            //==================================================================//
            res.forEach(flu => aux.push(flu['fluxoinvestimento']));
            this.oFluxo = res[aux.indexOf(fluxo, 0)];
            this.selectedFluxo = this.oFluxo['fluxoinvestimento'];
            this.selectedMoedaReg = this.oFluxo['moeda'];
            if (this.oFluxo['aprovacao'] === 'Aprovada') {
                this.aprov = false;
            }
            else {
                this.aprov = true;
            }
            //console.log(this.oFluxo)
            if (this.oFluxo.inicio === null && this.oFluxo.termino === null) { }
            else {
                //console.log(this.oFluxo.inicio)
                //===============================================================//
                // * Aqui melhorar esse condicional para as diversas hipóteses * //
                //===============================================================//
                try {
                    this.regIniDia = this.oFluxo.inicio.dayOfMonth < 10 ? "0" + this.oFluxo.inicio.dayOfMonth : this.oFluxo.inicio.dayOfMonth.toString();
                    this.regIniMes = this.oFluxo.inicio.monthValue < 10 ? "0" + this.oFluxo.inicio.monthValue : this.oFluxo.inicio.monthValue.toString();
                    this.regIniAno = this.oFluxo.inicio.year.toString();
                    this.regFimDia = this.oFluxo.termino.dayOfMonth < 10 ? "0" + this.oFluxo.termino.dayOfMonth : this.oFluxo.termino.dayOfMonth.toString();
                    this.regFimMes = this.oFluxo.termino.monthValue < 10 ? "0" + this.oFluxo.termino.monthValue : this.oFluxo.termino.monthValue.toString();
                    this.regFimAno = this.oFluxo.termino.year.toString();
                }
                catch (_a) {
                    this.regIniDia = null;
                    this.regIniMes = null;
                    this.regIniAno = null;
                    this.regFimDia = null;
                    this.regFimMes = null;
                    this.regFimAno = null;
                }
            }
            //===============================================================//
            //============ * chamando endpoint de deliberações * ============//
            //===============================================================//
            this.projetosService.delibregulatorios(this.oFluxo['regulatorioId'])
                .subscribe(res => {
                //console.log('tentando aqui ó => '+ res)
                this.delib = res;
                this.delib.forEach(dl => {
                    dl.envio = this.parseResumoDate(dl.envio);
                    dl.aprovado = this.parseResumoDate(dl.aprovado);
                    dl.retorno = this.parseResumoDate(dl.retorno);
                });
                //console.log('mudando data =>'+this.delib)
            });
        });
    }
    insereDelib() {
        this.novaDelib.regulatorio['regulatorioId'] = this.oFluxo['regulatorioId'];
        //console.log(this.novaDelib)
        this.projetosService.delibregulatoriosAdd(this.novaDelib)
            .subscribe(response => {
            if (response.status === 201) {
                this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                    detail: 'Dados enviados com sucesso!' });
                console.log('Dados enviados com sucesso!');
                this.cadDelibVisible = false;
                this.projetosService.delibregulatorios(this.oFluxo['regulatorioId'])
                    .subscribe(res => {
                    //console.log('tentando aqui ó => '+ res)
                    this.delib = res;
                    this.delib.forEach(dl => {
                        dl.envio = this.parseResumoDate(dl.envio);
                        dl.aprovado = this.parseResumoDate(dl.aprovado);
                        dl.retorno = this.parseResumoDate(dl.retorno);
                    });
                    //console.log('mudando data =>'+this.delib)
                });
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                detail: error.message, life: 5000 });
            console.log(error);
        });
    }
    insereComprovacaoArq() {
        this.novacomprovacao['comprovacaoId'].comprovacaoId = this.idProjeto;
        this.projetosService.comprovacaoarquivosAdd(this.novacomprovacao)
            .subscribe(response => {
            if (response.status === 201) {
                this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                    detail: 'Dados enviados com sucesso!' });
                console.log('Dados enviados com sucesso!');
                this.cadArqComp = false;
                this.projetosService.comprovacaoarquivos(this.idProjeto)
                    .subscribe(response => {
                    this.comprovacaoarquivos = response;
                    this.comprovacaoarquivos.forEach(arq => {
                        arq.envio = this.parseResumoDate(arq.envio);
                    });
                });
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                detail: error.message, life: 5000 });
            console.log(error);
        });
    }
    insereLicenciamento() {
        this.novalicenca['projetoId'].projetoId = this.idProjeto;
        this.projetosService.licenciamentosAdd(this.novalicenca)
            .subscribe(response => {
            if (response.status === 201) {
                this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                    detail: 'Dados enviados com sucesso!' });
                console.log('Dados enviados com sucesso!');
                this.cadArqComp = false;
                this.projetosService.licenciamentos(this.idProjeto)
                    .subscribe(response => {
                    this.licenciamentos = response;
                    this.licenciamentos.forEach(lic => {
                        lic.inicio = this.parseResumoDate(lic.inicio);
                        lic.termino = this.parseResumoDate(lic.termino);
                    });
                });
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                detail: error.message, life: 5000 });
            console.log(error);
        });
    }
    insereengenharia() {
        this.novaengenha.projetoId = { "projetoId": this.idProjeto };
        //console.log(this.novaengenha)
        this.projetosService.engenhariaAdd(this.novaengenha)
            .subscribe(response => {
            if (response.status === 201) {
                this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                    detail: 'Dados enviados com sucesso!' });
                console.log('Dados enviados com sucesso!');
                this.cadengenharia = false;
                this.projetosService.engenharia(this.idProjeto)
                    .subscribe(response => {
                    this.engenharia = response;
                    console.log(this.engenharia[0]);
                    this.engenharia.forEach(eng => {
                        eng.previsto = this.parseResumoDate(eng.previsto);
                        eng.replanejado = this.parseResumoDate(eng.replanejado);
                        eng.realizado = this.parseResumoDate(eng.realizado);
                    });
                });
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                detail: error.message, life: 5000 });
            console.log(error);
        });
    }
    enviarReg(cad) {
        this.attFluxo = {
            "regulatorioId": null,
            "fluxoinvestimento": cad,
            "inicio": null,
            "termino": null,
            "valorprojeto": null,
            "descricao": this.descrevendo,
            "aprovacao": "Em Andamento",
            "moeda": null,
            "projetoId": {
                "projetoId": this.idProjeto
            }
        };
        this.projetosService.regulatoriosAdd(this.attFluxo)
            .subscribe(response => {
            if (response.status === 201) {
                this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                    detail: 'Dados enviados com sucesso!' });
                console.log('Dados enviados com sucesso!');
                //this.atualizarRevisao(this.oFluxo)
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                detail: error.message, life: 5000 });
            console.log(error);
        });
    }
    salvainfoEngenharia() {
        this.projetosService.projetosAtt(this.arrProjeto, this.idProjeto)
            .subscribe(response => {
            if (response === null) {
                this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                    detail: 'Dados enviados com sucesso!' });
                console.log('Dados enviados com sucesso!');
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                detail: error.message, life: 5000 });
            console.log(error);
        });
    }
    atualizarRegulatorio() {
        this.attFluxo = {
            "regulatorioId": this.oFluxo.regulatorioId,
            "fluxoinvestimento": this.oFluxo.fluxoinvestimento,
            "inicio": this.oFluxo.inicio,
            "termino": this.oFluxo.termino,
            "valorprojeto": this.oFluxo.valorprojeto,
            "descricao": this.oFluxo.descricao,
            "aprovacao": this.oFluxo.aprovacao,
            "moeda": this.oFluxo.moeda,
            "projetoId": {
                "projetoId": this.idProjeto
            }
        };
        console.log(this.attFluxo);
        this.projetosService.regulatoriosAtt(this.attFluxo, this.oFluxo.regulatorioId)
            .subscribe(response => {
            if (response === null) {
                this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                    detail: 'Dados enviados com sucesso!' });
                console.log('Dados enviados com sucesso!');
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                detail: error.message, life: 5000 });
            console.log(error);
        });
    }
    salvainfoLicenca() {
    }
    salvarComprovacao() {
        this.projetosService.projetosAtt(this.arrProjeto, this.idProjeto)
            .subscribe(response => {
            if (response === null) {
                console.log(this.arrProjeto);
                this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                    detail: 'Dados enviados com sucesso!' });
                console.log('Dados enviados com sucesso!');
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                detail: error.message, life: 5000 });
            console.log(error);
        });
    }
    salvarGerais() {
        //console.log(this.partes)
        this.partesInteressadas = [];
        this.partes.forEach((parte, index) => {
            if (parte === true) {
                this.partesInteressadas.push(this.partesInt[index - 1]);
            }
        });
        //console.log(this.partesInteressadas)
        this.arrProjeto['radar'] = this.selectedRadar;
        this.arrProjeto['statusgloblal'] = this.selectedStatusGlobal;
        this.arrProjeto['tendencia'] = this.selectedGravidade;
        this.arrProjeto['gravidade'] = this.selectedTendencia;
        this.arrProjeto['urgencia'] = this.selectedUrgencia;
        this.arrProjeto['localidade'] = this.selectedLocal;
        this.arrProjeto['inicioprevisto'] = this.inicioprevisto;
        this.arrProjeto['inicioreplanejado'] = this.inicioreplanejado;
        this.arrProjeto['iniciorealizado'] = this.iniciorealizado;
        this.arrProjeto['terminoprevisto'] = this.terminoprevisto;
        this.arrProjeto['terminoreplanejado'] = this.terminoreplanejado;
        this.arrProjeto['terminorealizado'] = this.terminorealizado;
        this.arrProjeto['partestinteressadas'] = this.partesInteressadas;
        console.log(this.arrProjeto);
        this.projetosService.projetosAtt(this.arrProjeto, this.idProjeto)
            .subscribe(response => {
            if (response === null) {
                console.log(this.arrProjeto);
                this.messageService.add({ sticky: true, severity: 'success', summary: 'Dados Salvos!',
                    detail: 'Dados enviados com sucesso!' });
                console.log('Dados enviados com sucesso!');
            }
        }, error => {
            this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                detail: error.message, life: 5000 });
            console.log(error);
        });
    }
    //====================================================================================================//
    //================================= * Métodos Auxiliares * ===========================================//
    //====================================================================================================//
    //Método que transforma data formato Json para date
    parseDate(value) {
        if (value === null) { }
        else {
            let year = value.year;
            let month = value.monthValue;
            if (month < 10) {
                month = "0" + month;
            }
            let day = value.dayOfMonth;
            if (day < 10) {
                day = "0" + day;
            }
            value = new Date(year + "-" + month + "-" + day + "T00:00:00");
        }
        return value;
    }
    parseResumoDate(value) {
        if (value === null) { }
        else {
            let year = value.year;
            let month = value.monthValue;
            if (month < 10) {
                month = "0" + month;
            }
            let day = value.dayOfMonth;
            if (day < 10) {
                day = "0" + day;
            }
            value = day + "/" + month + "/" + year;
        }
        return value;
    }
    modelaData(dia, mes, ano, discriminador) {
        let vdia;
        let vmes;
        let resultado;
        if (ano === null) {
            resultado = null;
        }
        else {
            mes === null ? vmes = '12' : vmes = mes;
            if (dia === null) {
                if (vmes === '02') {
                    vdia = '28';
                }
                else if (vmes === '04' || vmes === '06' || vmes === '09' || vmes === '11') {
                    vdia = '30';
                }
                else {
                    vdia = '31';
                }
            }
            else {
                vdia = dia;
                //console.log(vdia)
                //console.log(typeof  vdia)
            }
            resultado = new Date(ano + "-" + vmes + "-" + vdia + "T00:00:00.000");
        }
        if (discriminador === 'ri') {
            this.oFluxo.inicio = resultado;
        }
        else if (discriminador === 'rt') {
            this.oFluxo.termino = resultado;
        }
    }
    toDate(dateStr) {
        var parts = dateStr.split("/");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    onRowEditInit(dados) {
        this.clonedLines[dados.ndeliberacao] = Object.assign({}, dados);
    }
    onRowEditInitArq(dados) {
        this.clonedLines[dados.comprovacaoarquivoId] = Object.assign({}, dados);
    }
    onRowEditInitLic(dados) {
        this.clonedLines[dados.licencaId] = Object.assign({}, dados);
    }
    onRowEditSave(dados) {
        if (dados.ndeliberacao != null || dados.ndeliberacao != '') {
            dados.regulatorio = null;
            dados.regulatorio = { regulatorioId: this.oFluxo['regulatorioId'] };
            dados.tipo = this.selectedTipo;
            try {
                dados.envio = this.toDate(dados.envio);
                dados.retorno = this.toDate(dados.retorno);
                dados.aprovado = this.toDate(dados.aprovado);
            }
            catch (_a) {
                console.log('Data sem alteração pois é nula');
            }
            this.projetosService.delibregulatoriosAtt(dados, dados.deliberacaoId)
                .subscribe(response => {
                if (response === null) {
                    delete this.clonedLines[dados.ndeliberacao];
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Os dados foram atualizados!' });
                    this.projetosService.delibregulatorios(this.oFluxo['regulatorioId'])
                        .subscribe(res => {
                        //console.log('tentando aqui ó => '+ res)
                        this.delib = res;
                        this.delib.forEach(dl => {
                            dl.envio = this.parseResumoDate(dl.envio);
                            dl.aprovado = this.parseResumoDate(dl.aprovado);
                            dl.retorno = this.parseResumoDate(dl.retorno);
                        });
                        //console.log('mudando data =>'+this.delib)
                    });
                    console.log('Dados enviados com sucesso!');
                }
            }, error => {
                this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                    detail: error.message, life: 5000 });
                console.log(error);
            });
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'O código da deliberação é obrigatório!' });
        }
    }
    onRowEditSaveArq(dados) {
        console.log(dados);
        dados.comprovacaoId = { comprovacaoId: dados['comprovacaoId'].comprovacaoId };
        if (dados.nomearquivo != null || dados.nomearquivo != '') {
            try {
                dados.envio = this.toDate(dados.envio);
            }
            catch (_a) {
                console.log('Data sem alteração pois é nula');
            }
            this.projetosService.comprovacaoarquivosAtt(dados, dados.comprovacaoarquivoId)
                .subscribe(response => {
                if (response === null) {
                    delete this.clonedLines[dados.comprovacaoarquivoId];
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Os dados foram atualizados!' });
                    this.projetosService.comprovacaoarquivos(this.idProjeto)
                        .subscribe(response => {
                        this.comprovacaoarquivos = response;
                        this.comprovacaoarquivos.forEach(arq => {
                            arq.envio = this.parseResumoDate(arq.envio);
                        });
                    });
                    console.log('Dados enviados com sucesso!');
                }
            }, error => {
                this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                    detail: error.message, life: 5000 });
                console.log(error);
            });
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'O nome do arquivo é obrigatório!' });
        }
    }
    onRowEditSaveLic(dados) {
        console.log(dados);
        dados.projetoId = { projetoId: dados['projetoId'].projetoId };
        if (dados.licenca != null || dados.licenca != '') {
            try {
                dados.inicio = this.toDate(dados.inicio);
                dados.termino = this.toDate(dados.termino);
            }
            catch (_a) {
                console.log('Data sem alteração pois é nula');
            }
            this.projetosService.licenciamentosAtt(dados, dados.licencaId)
                .subscribe(response => {
                if (response === null) {
                    delete this.clonedLines[dados.licencaId];
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Os dados foram atualizados!' });
                    this.projetosService.licenciamentos(this.idProjeto)
                        .subscribe(response => {
                        this.licenciamentos = response;
                        this.licenciamentos.forEach(lic => {
                            lic.inicio = this.parseResumoDate(lic.inicio);
                            lic.termino = this.parseResumoDate(lic.termino);
                        });
                    });
                    console.log('Dados enviados com sucesso!');
                }
            }, error => {
                this.messageService.add({ severity: 'error', summary: "Dados não Enviados!",
                    detail: error.message, life: 5000 });
                console.log(error);
            });
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'O nome do arquivo é obrigatório!' });
        }
    }
    onRowEditCancel(dados, index) {
        this.cars[index] = this.clonedLines[dados.nomeEmpresa];
        delete this.clonedLines[dados.nomeEmpresa];
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
    tslib_1.__metadata("design:paramtypes", [MessageService, ProjetosService])
], PagemainComponent);
export { PagemainComponent };
//# sourceMappingURL=pagemain.component.js.map