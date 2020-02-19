import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ControledepagamentosjuridicoService } from '../controledepagamentosjuridico.service';
import { Pagamento } from '../controledepagamentosjuridico.model';

@Component({
  selector: 'app-cadastro-pagamento',
  templateUrl: './cadastro-pagamento.component.html',
  styleUrls: ['./cadastro-pagamento.component.css']
})
export class CadastroPagamentoComponent implements OnInit {

  constructor(private ControlePagamento: ControledepagamentosjuridicoService,
    private messageService: MessageService) { }

    
    CadEmpresa=null;
    CadAutor=null;
    CadProcesso=null;
    CadNatureza=null;
    CadDataProgramada=null;
    CadValor=null;
    CadEscritorio=null
    CadContaContabil=null; 
    CadCentroDeCusto=null;
    CadFornecedor=null;
    CadSentenca=null;
    CadMotivoPagamento=null;
    CadFalhaConcessao: boolean = false;
  

  ListaCentroDeCusto;
  ngOnInit() {
    this.ListaCentroDeCusto =
    [
      { label: '', value: '' },
      { label: '412600011-CUSTAS JUDICIAIS', value: '412600011-CUSTAS JUDICIAIS' },
      { label: '512600011-CUSTAS JUDICIAIS', value: '512600011-CUSTAS JUDICIAIS' },
      { label: '412300001-INDENIZAÇÕES CÍVEIS', value: '412300001-INDENIZAÇÕES CÍVEIS' },
      { label: '512300001-INDENIZAÇÕES CÍVEIS', value: '512300001-INDENIZAÇÕES CÍVEIS' },
      { label: '412300002-INDENIZAÇÕES TRABALHISTAS', value: '412300002-INDENIZAÇÕES TRABALHISTAS' },
      { label: '512300002-INDENIZAÇÕES TRABALHISTAS', value: '512300002-INDENIZAÇÕES TRABALHISTAS' },
      { label: '126100001-DEPOSITOS JUDICIAIS', value: '126100001-DEPOSITOS JUDICIAIS' },
      { label: '126100002-BLOQUEIOS JUDICIAIS', value: '126100002-BLOQUEIOS JUDICIAIS' }
    ];


  }

  salvar(){
    var objeto: Pagamento ={
      idPagamento: null,
      dataCadastro: null,
      usuarioInsert:  "",
      empresa: this.CadEmpresa,
      autor: this.CadAutor,
      processo:  this.CadProcesso,
      natureza: this.CadNatureza,
      dataProgramada: this.CadDataProgramada,
      valor: this.CadValor,
      escritorio: this.CadEscritorio,
      contaContabil: this.CadContaContabil,
      centroDeCusto: this.CadCentroDeCusto,
      fornecedor: this.CadFornecedor,
      sentenca: this.CadSentenca,
      motivoPagamento:  this.CadMotivoPagamento,
      falhaConcess: this.CadFalhaConcessao,
      enviadoParaAprovacao: false,
      aprovador1: null,
      aprovacao1: false,
      aprovador2: null,
      aprovacao2: false,
      aprovador3: null,
      aprovacao3: false
    }

    console.log(objeto)
    this.ControlePagamento.InputPagamento(objeto).subscribe(
      response => {
        if(response.status === 201){
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Dados enviados com sucesso!'});
          console.log('Dados enviados com sucesso!')
        }
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail: error.message, life: 5000});
        console.log(error)
      });
  }

}
