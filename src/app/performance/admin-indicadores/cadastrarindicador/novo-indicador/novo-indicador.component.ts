import { Component, OnInit } from '@angular/core';
import { AdminIndicadoresService } from '../../admin-indicadores.service';
import { Indicadores } from '../../../performance.model';
import { MessageService, MenuItem } from 'primeng/api';
import { CadIndicador } from '../../admin-indicadores.model';

@Component({
  selector: 'app-novo-indicador',
  templateUrl: './novo-indicador.component.html',
  styleUrls: ['./novo-indicador.component.css']
})
export class NovoIndicadorComponent implements OnInit {

  constructor(private adminindic: AdminIndicadoresService,  private messageService: MessageService) {
  }

 
  visualizargrafico: boolean = false

  FiltroListaIndicadores: CadIndicador[] = []
  IndicadorSelect: CadIndicador

  FiltroListaGerencia
  FiltroGerenciaSelecionada: any;

  //DROPDOWNS
  classificacoesLista: any[] = []
  tendenciaLista: any[] = []
  tiporotuloLista: any[] = []
  gerenciasLista: any[] = []


  ngOnInit() {
    this.adminindic.gerencias().subscribe(
      gerencias  =>  {
        this.gerenciasLista = gerencias
      }
    )
    
    this.classificacoesLista = 
    [
      {label: "Atendimento", value: "ATENDIMENTO"},
      {label: "Serviços Comerciais", value: "SERVCOMERCIAL"},
      {label: "Comparativo", value: "CORPORATIVO"},
      {label: "Energia", value: "ENERGIA"},
      {label: "Volumes", value: "VOLUMES"},
      {label: "Produtos Químicos", value: "PRODUTOSQUÍMICOS"},
      {label: "Comerciais", value: "FATURAMENTO"},
      {label: "Indicador Operacional", value: "INDICADOROPERACIONAL"},
      {label: "Cobrança", value: "COBRANCA"},
      {label: "Assertividade", value: "ASSERTIVIDADE"},
      {label: "Produtivade", value: "PRODUTIVIDADE"},
      {label: "Prazos", value: "PRAZOS"}
    ]


    this.tiporotuloLista = [
      {label: "Com Virgula", value: 1},
      {label: "Sem Virgula", value: 2},
      {label: "Horas", value: 3},
      {label: "Porcentagem", value: 4},
    ] 

    this.tendenciaLista = 
    [
      {label: "Melhor Positivo", value: "MELHORPOSITIVO"},
      {label: "Melhor Negativo", value: "MELHORNEGATIVO"},
      {label: "Melhor Entre Faixas", value: "MELHORENTREFAIXAS"}
    ]
  }

  editarIndicadorNome
  editarIndicadorGerencia
  editarIndicadorTipoRotulo
  editarIndicadorTendencia
  editarIndicadorClassificacao
  editarIndicadorAtivo = false

  limpartudo(){
    this.editarIndicadorNome = null
    this.editarIndicadorGerencia= null
    this.editarIndicadorTipoRotulo= null
    this.editarIndicadorTendencia= null
    this.editarIndicadorClassificacao= null
    this.editarIndicadorAtivo= null
  }
  salvarIndicador(){
    var indicador = {
      indicadorId: null,
      classificacao: this.editarIndicadorClassificacao.value,
      indicador: this.editarIndicadorNome,
      gerencia: this.editarIndicadorGerencia.gerenciaId,
      ordem: 0,
      tipoGrafico: 0,
      tendencia: this.editarIndicadorTendencia.value,
      produtos: [ ],
      ativo: this.editarIndicadorAtivo === true ? 1 : 0,
      campoDoGraficoId: [],
      rotuloVirgula: this.editarIndicadorTipoRotulo.value
    }
    console.log(indicador)
    this.adminindic.cadastroIndicadoresInserir(indicador).subscribe(
      indicadors  =>  {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Indicador '+indicador['indicador']+' criado'});
      },error=>{
        this.messageService.add({severity: 'warn', summary: 'Erro', detail: 'Erro'});
      }
    );
  }

}
