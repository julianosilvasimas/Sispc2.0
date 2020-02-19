import { Component, OnInit } from '@angular/core';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';

@Component({
  selector: 'app-acompanharaprovacao',
  templateUrl: './acompanharaprovacao.component.html',
  styleUrls: ['./acompanharaprovacao.component.css']
})

export class AcompanharaprovacaoComponent implements OnInit {
  sentencas = [];
  aprovations;
  constructor() { 
    
  }
  value: any;

  ngOnInit() {
    this.sentencas = [
      {Empresa: "PR00", 	Autor: "ARLINDO DOS SANTOS MARTINS", 	      Processo: "0248946-60.2013.8.19.0001", 	NaturezaPagamento: "CUSTAS ", DataPagamento: '21/02/2020',  Valor: "98,71", 	Escritorio: "VIEIRA E BRITTO ", 	ContaContabil: "412600011-CUSTAS JUDICIAIS", 	CentroDeCusto: "PR10700007", 	Fornecedor: "820248", 	Sentencas: "TESTE 1", 	MotivoPagamento: "TESTE MOTIVO 1", aprovJuridico:false, aprovGestao:false, aprovDiretoria:false},
      {Empresa: "PR00", 	Autor: "ARLINDO DOS SANTOS MARTINS", 	      Processo: "0248946-60.2013.8.19.0001", 	NaturezaPagamento: "CUSTAS ", DataPagamento: '21/02/2020', 	Valor: "529,35", 	Escritorio: "VIEIRA E BRITTO ", 	ContaContabil: "412600011-CUSTAS JUDICIAIS", 	CentroDeCusto: "PR10700007", 	Fornecedor: "820248", 	Sentencas: "TESTE 2", 	MotivoPagamento: "TESTE MOTIVO 2", aprovJuridico:false, aprovGestao:false, aprovDiretoria:false},
      {Empresa: "PR00", 	Autor: "LUIZ CARLOS DUARTE DA CONCEIÇÃO", 	Processo: "0031905-26.2018.8.19.0054", 	NaturezaPagamento: "CUSTAS ", 	DataPagamento: '21/02/2020', 	Valor: "2090", 	Escritorio: "VIEIRA E BRITTO ", 	ContaContabil: "412600011-CUSTAS JUDICIAIS", 	CentroDeCusto: "PR10700007", 	Fornecedor: "820330", 	Sentencas: "TESTE 3", 	MotivoPagamento: "TESTE MOTIVO 1", aprovJuridico:true, aprovGestao:false, aprovDiretoria:false}
    ]

  }

}
