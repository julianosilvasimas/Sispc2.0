import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjetosService } from '../projetos.service';
import { ProjCompletos } from '../projetos.model';

@Component({
  selector: 'app-sesuiteproject',
  templateUrl: './sesuiteproject.component.html'
})
export class SesuiteprojectComponent implements OnInit {

  nvProjEngenharia: any;
  respExecProjeto: any;
  principalMotivacao: any;
  selecaoCesta: any;
  delineado: any;
  selectedCity4: any;
  selectedCity5: any;
  selectedCity6: any;
  selectedCity7: any;
  selectedCity8: any;
  selectedCity9: any;
  selectedCity10: any;
  selectedCity11: any;
  selectedCity12: any;
  selectedCity13: any;
  selectedCity14: any;
  selectedCity15: any;
  selectedCity16: any;
  selectedCity17: any;
  selectedCity18: any;
  selectedCity19: any;
  selectedCity20: any;
  selectedCity21: any;
  selectedCity22: any;
  selectedCity23: any;
  selectedCity24: any;
  selectedCity25: any;
  selectedCity26: any;
  selectedCity27: any;
  selectedCity28: any;
  selectedCity29: any;
  selectedCity30: any;
  selectedCity31: any;
  selectedCity32: any;
  selectedCity33: any;
  selectedCity34: any;
  selectedCity35: any;
  selectedCity36: any;
  selectedCity37: any;
  selectedCity38: any;
  selectedCity39: any;
  selectedCity40: any;
  selectedCity41: any;
  selectedCity42: any;
  selectedCity43: any;
  selectedCity44: any;
  selectedCity45: any;

  impactoAgua: any;
  impactoEsgoto: any;
  maturidade: any;
  modeloMercado: any;
  diferencialCompetitivo: any;
  modeloConcessao: any;
  sinergia: any;
  maturidadeRegiao: any;

  clausulaContratual: any;
  tipoMeta: any;
  penalidade12meses: any;
  penalidadeAplicavel: any;
  probabilidadePenalidade: any;
  postergacao: any;
  impactoPolitico: any;
  
  
  impactoInterrupcao: any;
  probabilidadeImpactoInterrupcao: any;
  custoInterrupcao: any;
  complexidadeExecucao: any;
  impactoSubstituacao: any;
  probabilidadeImpactoSubstituacao: any;
  impactoAmbiental: any;
  probabilidadeImpactoAmbiental: any;
  impactoIntegridade: any;
  probabilidadeImpactoiIntegridade: any;
  riscoAtraso: any;
  possuiLicenca: any;
  emissaoLicenca: Date;
  validadeLicenca: Date;
  prazoLicenca: any;
  condicionanteLicenca: boolean;


  impactoSocial: any;
  relacionamentoPolitico: any;
  relacionamentoSociedade: any;
  impactoImagem: any;
  probabilidadeImpactoImagem: any;
  impactoReputacional: any;

  impactoGestao: any;
  impactoMotivacao: any;
  impactoSeguranca: any;
  impactoSustentabilidade: any;
  outraMelhoria: any;
  
  coreBusiness: any;
  investimentoRealizado: any;
  objetivoIndepende: any;
  projetoEnvolve: any;
  melhoraEmpresa: any;
  radioValue4: any;
  negocioExistente: any;

  idProjeto: number;
  nprojeto: string;
  projeto: ProjCompletos[] = [];
  sesuite: [] = [];
  direcionamento: [] = [];
  beneficios: [] = [];
  licenca: [] = [];
  riscoscontratual: [] = [];
  riscosoperacionais: [] = [];

  constructor(private messageService: MessageService, private projetosService: ProjetosService) { }

  ngOnInit() {
    
    this.idProjeto = Number.parseInt(sessionStorage.getItem('idProjeto'))
    this.nprojeto = sessionStorage.getItem('nomeProjeto')
    this.projetosService.projetosId(this.idProjeto)
    .subscribe(res =>{
      //console.log(res)
      //Carregando Arrays das tabelas
      this.projeto = res
      this.sesuite = res['sesuite']
      this.direcionamento = this.sesuite['direcionamento']
      this.beneficios = this.sesuite['beneficios']
      this.licenca = this.sesuite['licenca']
      this.riscoscontratual = this.sesuite['riscoscontratual']
      this.riscosoperacionais = this.sesuite['riscosoperacionais']

      //Carregando Informações Gerais
      this.respExecProjeto = this.sesuite['nvengenharia']
      this.nvProjEngenharia = this.sesuite['responsavel']
      this.objetivoIndepende = this.sesuite['objetivoindepende'] != null ? this.sesuite['objetivoindepende'].toString() : this.sesuite['objetivoindepende']
      this.investimentoRealizado = this.sesuite['teveinvestimento'] != null ? this.sesuite['teveinvestimento'].toString() : this.sesuite['teveinvestimento']
      this.projetoEnvolve = this.sesuite['envolve']
      this.selecaoCesta = this.sesuite['tipo']
      this.coreBusiness = this.sesuite['corebusiness'] != null ? this.sesuite['corebusiness'].toString() : this.sesuite['corebusiness']
      this.negocioExistente = this.sesuite['negocioexistente'] != null ? this.sesuite['negocioexistente'].toString() : this.sesuite['negocioexistente']
      this.principalMotivacao = this.sesuite['principalmotivacao']
      this.melhoraEmpresa = this.sesuite['melhoraempresa'] != null ? this.sesuite['melhoraempresa'].toString() : this.sesuite['melhoraempresa']
      this.delineado = this.sesuite['delineado']
      //Carregando direcionamento
      this.impactoAgua = this.direcionamento['impactoagua'] != null ? this.direcionamento['impactoagua'].toString() : this.direcionamento['impactoagua']
      this.impactoEsgoto = this.direcionamento['impactoesgoto'] != null ? this.direcionamento['impactoesgoto'].toString() : this.direcionamento['impactoesgoto']
      this.maturidade = this.direcionamento['maturidade']
      this.modeloMercado = this.direcionamento['modelomercado']
      this.diferencialCompetitivo = this.direcionamento['diferencialcompetitivo']
      this.modeloConcessao = this.direcionamento['modeloconcessao']
      this.sinergia = this.direcionamento['sinergia']
      this.maturidadeRegiao = this.direcionamento['maturidaderegiao']
      //Carregando beneficios
      this.impactoGestao = this.beneficios['impactogestao']
      this.impactoMotivacao = this.beneficios['impactomotivacao']
      this.impactoSeguranca = this.beneficios['impactoseguranca']
      this.impactoSustentabilidade = this.beneficios['impactosustentabilidade']
      this.outraMelhoria = this.beneficios['outramelhoria'] != null ? this.beneficios['outramelhoria'].toString() : this.beneficios['outramelhoria']
      //Carregando licenca
      this.impactoSocial = this.licenca['impactosocial']
      this.relacionamentoPolitico = this.licenca['relacionamentopolitico']
      this.relacionamentoSociedade = this.licenca['relacionamentosociedade']
      this.impactoImagem = this.licenca['impactoimagem']
      this.probabilidadeImpactoImagem = this.licenca['probabilidadeimpactoimagem']
      this.impactoReputacional = this.licenca['impactoreputacional']
      //Carregando risco contratual
      this.clausulaContratual = this.riscoscontratual['clausulacontratual']
      this.tipoMeta = this.riscoscontratual['tipometa']
      this.penalidade12meses = this.riscoscontratual['penalidade12meses']
      this.penalidadeAplicavel = this.riscoscontratual['penalidadeaplicavel']
      this.probabilidadePenalidade = this.riscoscontratual['probabilidadepenalidade']
      this.postergacao = this.riscoscontratual['postergacao']
      this.impactoPolitico = this.riscoscontratual['impactopolitico']
      //Carregando riscosoperacionais
      this.impactoInterrupcao = this.riscosoperacionais['impactointerrupcao']
      this.probabilidadeImpactoInterrupcao = this.riscosoperacionais['probabilidadeimpactointerrupcao']
      this.custoInterrupcao = this.riscosoperacionais['custointerrupcao']
      this.complexidadeExecucao = this.riscosoperacionais['complexidadeexecucao']
      this.impactoSubstituacao = this.riscosoperacionais['impactosubstituicao']
      this.probabilidadeImpactoSubstituacao = this.riscosoperacionais['probabilidadeimpactosubstituicao']
      this.impactoAmbiental = this.riscosoperacionais['impactoambiental']
      this.probabilidadeImpactoAmbiental = this.riscosoperacionais['probabilidadeimpactoambiental']
      this.impactoIntegridade = this.riscosoperacionais['impactointegridade']
      this.probabilidadeImpactoiIntegridade = this.riscosoperacionais['probabilidadeimpactointegridade']
      this.riscoAtraso = this.riscosoperacionais['riscoatraso']
      this.possuiLicenca = this.riscosoperacionais['possuilicenca']
      this.emissaoLicenca = this.parseDate(this.riscosoperacionais['emissaolicenca'])
      this.validadeLicenca = this.parseDate(this.riscosoperacionais['validadelicenca'])
      this.prazoLicenca = this.riscosoperacionais['prazolicenca']
      this.condicionanteLicenca = this.riscosoperacionais['condicionantelicenca'] ? this.riscosoperacionais['condicionantelicenca'].toString() : this.riscosoperacionais['condicionantelicenca'] 

    });


  }

  salvar(){
    //Salvando Informações Gerais
    this.sesuite['nvengenharia'] = this.respExecProjeto
    this.sesuite['responsavel'] = this.nvProjEngenharia
    this.sesuite['objetivoindepende'] = this.objetivoIndepende
    this.sesuite['teveinvestimento'] = this.investimentoRealizado
    this.sesuite['envolve'] = this.projetoEnvolve
    this.sesuite['tipo'] = this.selecaoCesta
    this.sesuite['corebusiness'] = this.coreBusiness
    this.sesuite['negocioexistente'] = this.negocioExistente
    this.sesuite['principalmotivacao'] = this.principalMotivacao 
    this.sesuite['melhoraempresa'] = this.melhoraEmpresa
    this.sesuite['delineado'] = this.delineado

    this.projeto['inicioprevisto'] = this.parseDate(this.projeto['inicioprevisto'])
    this.projeto['inicioreplanejado'] = this.parseDate(this.projeto['inicioreplanejado'])
    this.projeto['iniciorealizado'] = this.parseDate(this.projeto['iniciorealizado'])
    this.projeto['terminoprevisto'] = this.parseDate(this.projeto['terminoprevisto'])
    this.projeto['terminoreplanejado'] = this.parseDate(this.projeto['terminoreplanejado'])
    this.projeto['terminorealizado'] = this.parseDate(this.projeto['terminorealizado'])
    //Carregando direcionamento
    this.direcionamento['impactoagua'] = this.impactoAgua
    this.direcionamento['impactoesgoto'] = this.impactoEsgoto
    this.direcionamento['maturidade'] = this.maturidade
    this.direcionamento['modelomercado'] = this.modeloMercado
    this.direcionamento['diferencialcompetitivo'] = this.diferencialCompetitivo
    this.direcionamento['modeloconcessao'] = this.modeloConcessao
    this.direcionamento['sinergia'] = this.sinergia
    this.direcionamento['maturidaderegiao'] = this.maturidadeRegiao
      //Carregando beneficios
      this.beneficios['impactogestao'] = this.impactoGestao
      this.beneficios['impactomotivacao'] = this.impactoMotivacao
      this.beneficios['impactoseguranca'] = this.impactoSeguranca
      this.beneficios['impactosustentabilidade'] = this.impactoSustentabilidade
      this.beneficios['outramelhoria'] = this.outraMelhoria
      //Carregando licenca
      this.licenca['impactosocial'] = this.impactoSocial
      this.licenca['relacionamentopolitico'] = this.relacionamentoPolitico
      this.licenca['relacionamentosociedade'] = this.relacionamentoSociedade
      this.licenca['impactoimagem'] = this.impactoImagem
      this.licenca['probabilidadeimpactoimagem'] = this.probabilidadeImpactoImagem
      this.licenca['impactoreputacional'] = this.impactoReputacional
      //Carregando risco contratual
      this.riscoscontratual['clausulacontratual'] = this.clausulaContratual
      this.riscoscontratual['tipometa'] = this.tipoMeta
      this.riscoscontratual['penalidade12meses'] = this.penalidade12meses
      this.riscoscontratual['penalidadeaplicavel'] = this.penalidadeAplicavel
      this.riscoscontratual['probabilidadepenalidade'] = this.probabilidadePenalidade
      this.riscoscontratual['postergacao'] = this.postergacao
      this.riscoscontratual['impactopolitico'] = this.impactoPolitico
      //Carregando riscosoperacionais
      this.riscosoperacionais['impactointerrupcao'] = this.impactoInterrupcao
      this.riscosoperacionais['probabilidadeimpactointerrupcao'] = this.probabilidadeImpactoInterrupcao
      this.riscosoperacionais['custointerrupcao'] = this.custoInterrupcao
      this.riscosoperacionais['complexidadeexecucao'] = this.complexidadeExecucao
      this.riscosoperacionais['impactosubstituicao'] = this.impactoSubstituacao
      this.riscosoperacionais['probabilidadeimpactosubstituicao'] = this.probabilidadeImpactoSubstituacao
      this.riscosoperacionais['impactoambiental'] = this.impactoAmbiental
      this.riscosoperacionais['probabilidadeimpactoambiental'] = this.probabilidadeImpactoAmbiental
      this.riscosoperacionais['impactointegridade'] = this.impactoIntegridade
      this.riscosoperacionais['probabilidadeimpactointegridade'] = this.probabilidadeImpactoiIntegridade
      this.riscosoperacionais['riscoatraso'] = this.riscoAtraso
      this.riscosoperacionais['possuilicenca'] = this.possuiLicenca
      this.riscosoperacionais['emissaolicenca'] = this.emissaoLicenca
      this.riscosoperacionais['validadelicenca'] = this.validadeLicenca
      this.riscosoperacionais['condicionantelicenca'] = this.condicionanteLicenca
      this.riscosoperacionais['prazolicenca'] = this.prazoLicenca
    
    //Atualizando Arrays para envio
    this.sesuite['direcionamento'] = this.direcionamento
    this.sesuite['beneficios'] = this.beneficios
    this.sesuite['licenca'] = this.licenca
    this.sesuite['riscoscontratual'] = this.riscoscontratual
    this.sesuite['riscosoperacionais'] = this.riscosoperacionais
    this.projeto['sesuite'] = this.sesuite
    console.log(this.projeto)

    this.projetosService.projetosAtt(this.projeto, this.idProjeto)
    .subscribe(response => {
      if(response === null){
            this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!',
            detail:'Dados enviados com sucesso!'});
            console.log('Dados enviados com sucesso!')
          }
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!",
        detail:error.message, life: 5000});
        console.log(error)
      } 
    )

  }

  //Método que transforma data formato Json para date
  parseDate(value){
    if(value===null){}else{
      let year = value.year
      let month = value.monthValue
      if(month < 10){
      month = "0"+month
      }
      let day = value.dayOfMonth
      if(day < 10){
      day = "0"+day
      } 
      value = new Date(year+"-"+month+"-"+day+"T00:00:00")
    }
    return value;
  }

  teste(){
    console.log(this.delineado)
    console.log(typeof this.delineado)
  }

  onRowEditCancel( index: number) { 
    //car: Engenharia,
    //this.cars[index] = this.clonedCars[car.nomeEmpresa];
    //delete this.clonedCars[car.nomeEmpresa];

  }

  onTabOpen($event){
    if($event.index === 4){
        //his.selected = !this.selected;
    }
  }
  onTabClose($event){
    if($event.index === 4){
        //this.selected = !this.selected;
    }
  }

}
