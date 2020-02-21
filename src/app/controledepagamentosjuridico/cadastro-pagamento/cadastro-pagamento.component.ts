import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ControledepagamentosjuridicoService } from '../controledepagamentosjuridico.service';
import { Pagamento } from '../controledepagamentosjuridico.model';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';

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
  ListaEscritorios;
  ListaContas;
  ListaFornecedores;
  ngOnInit() {
    this.ListaCentroDeCusto =
    [
      { label: null, value: null },
      { label: 'PR10200005 - Jurídico Estratégico', value: 'PR10200005' , aprovador: 'niella.cancado@prolagos.com.br' },
      { label: 'PR10600007  - Gerência Operacional', value: 'PR10600007 ' , aprovador: 'jose.marino@aegea.com.br;  mario.goncalves@serraambiental.com.br ' },
      { label: 'PR10700007  - Gerência Comercial', value: 'PR10700007 ' , aprovador: 'vitor.gabriel@aguasdomirante.com.br' },
      { label: 'PR10500002  - Administração', value: 'PR10500002 ' , aprovador: 'andre.pires@aegea.com.br' },
      { label: 'PR10800004  - Gerência De Serviços', value: 'PR10800004 ' , aprovador: 'wellington.blanck@aegea.com.br ' },
      { label: 'PR10400008  - Planejamento', value: 'PR10400008 ' , aprovador: 'aline.povoas@prolagos.com.br' },
      { label: 'PR10300001 - Diretoria Executiva', value: 'PR10300001' , aprovador: 'jose.almeida@prolagos.com.br' },
      { label: 'PR10200001  - Presidência', value: 'PR10200001 ' , aprovador: 'sergio.braga@prolagos.com.br' }
    ];
    this.ListaEscritorios = [
      { label: null, value: null },
      { label: 'Bergqvist & Alvarez Advogados' , value: 'Bergqvist & Alvarez Advogados' },
      { label: 'Campos Chagas & Ferrari Advogados' , value: 'Campos Chagas & Ferrari Advogados' },
      { label: 'Carlos Magno Advogados Associados' , value: 'Carlos Magno Advogados Associados' },
      { label: 'Chamon Santana Sociedade De Advogados' , value: 'Chamon Santana Sociedade De Advogados' },
      { label: 'Guimarães Irmes E Araújo Advogados' , value: 'Guimarães Irmes E Araújo Advogados' },
      { label: 'Lacaz, Pereira, Gurevich & Schoueri' , value: 'Lacaz, Pereira, Gurevich & Schoueri' },
      { label: 'Luciane Pinheiro Pedro Sociedade Individual De Advocacia' , value: 'Luciane Pinheiro Pedro Sociedade Individual De Advocacia' },
      { label: 'Mannheimer, Perez e Lyra Advogados' , value: 'Mannheimer, Perez e Lyra Advogados' },
      { label: 'Mattos Filho; Veiga Filho; Marrey Jr E Quiroga Advogados' , value: 'Mattos Filho; Veiga Filho; Marrey Jr E Quiroga Advogados' },
      { label: 'Vieira & Britto Advogados Associados' , value: 'Vieira & Britto Advogados Associados' }
    ]
    this.ListaContas = [
      { label: null, value: null },
      { label: '412600011-CUSTAS JUDICIAIS' , value: '412600011' },
      { label: '512600011-CUSTAS JUDICIAIS' , value: '512600011' },
      { label: '412300001-INDENIZAÇÕES CÍVEIS' , value: '412300001' },
      { label: '512300001-INDENIZAÇÕES CÍVEIS' , value: '512300001' },
      { label: '412300002-INDENIZAÇÕES TRABALHISTAS' , value: '412300002' },
      { label: '512300002-INDENIZAÇÕES TRABALHISTAS' , value: '512300002' },
      { label: '126100001-DEPOSITOS JUDICIAIS' , value: '126100001' },
      { label: '126100002-BLOQUEIOS JUDICIAIS' , value: '126100002' }
    ]

    this.ListaFornecedores = [
      { label: null, value: null },
      { label: 'BANCO DO BRASIL S.A - SETOR PUBLICO' , value: '820330' },
      { label: 'TRIBUNAL DE JUSTICA DO ESTADO DO RJ' , value: '820248' },
      { label: 'SUPREMO TRIBUNAL FEDERAL' , value: '107280' },
      { label: 'SECRETARIA DO SUPERIOR TRIBUNAL DE JUSTICA' , value: '820162' },
      { label: 'TRIBUNAL REGIONAL DO TRABALHO DA 1ª REGIAO' , value: '820178' }
    ]
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
      enviadoParaAprovacao: 0,
      aprovador1: null,
      aprovacao1: null,
      aprovador2: null,
      aprovacao2: null,
      aprovador3: null,
      aprovacao3: null
    }

    console.log(objeto)
    this.ControlePagamento.InputPagamento(objeto).subscribe(
      response => {
        this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', life: 5000, 
        detail:'Dados enviados com sucesso!'});
        console.log('Dados enviados com sucesso!')
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail: error.message, life: 5000});
        console.log(error)
      });
      this.limpar();
  }


  limpar(){
    this.CadEmpresa=null;
    this.CadAutor=null;
    this.CadProcesso=null;
    this.CadNatureza=null;
    this.CadDataProgramada=null;
    this.CadValor=null;
    this.CadEscritorio=null
    this.CadContaContabil=null; 
    this.CadContaContabil=null; 
    this.CadCentroDeCusto=null;
    this.CadFornecedor=null;
    this.CadSentenca=null;
    this.CadMotivoPagamento=null;
    this.CadFalhaConcessao = null;
  }
}
