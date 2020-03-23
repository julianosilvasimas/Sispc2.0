import { Component, OnInit, ɵConsole } from '@angular/core';
import { EnergiaService } from '../energia.service';
import { CsvDataService } from '../../csv-data.service';
import { MessageService } from 'primeng/api';
import { PerformanceService } from '../../performance/performance.service'

@Component({
  selector: 'app-cenarios',
  templateUrl: './cenarios.component.html',
  styleUrls: ['./cenarios.component.css']
})
export class CenariosComponent implements OnInit {

  constructor(private messageService: MessageService,private medServ: EnergiaService, private perf: PerformanceService) { }
  
  carregando = false

  ngOnInit() {
    this.carregar()
  } 
  carregar(){
    this.listaCenarios=[];
    this.carregando = true
    this.medServ.LerCenarios().subscribe(
      lista =>{
        this.listaCenarios = lista
        this.carregando = false
        this.dialogSelectTabela = false
        this.selecionadoCenario = null
        this.listaUnidadesDoCenario = null
        this.dialogSelectUnidade = false
        this.dialogSelectCenario = true
      }
    );
  }


  dialogSelectCenario: boolean = false
  listaCenarios: any[] = []
  selecionadoCenario: any = null

  dialogSelectTabela: boolean = false
  
  secionarCenario(cenario){
    this.carregando = true
    this.dialogSelectCenario = false
    this.selecionadoCenario = cenario
    this.medServ.LerCenario(this.selecionadoCenario.id).subscribe(
      cenario=>{
        this.selecionadoCenario = cenario
        this.dialogSelectTabela = true
        this.carregando = false
      }
    )
  }

  listaUnidadesDoCenario
  dialogSelectUnidade: boolean = false

  destrinchar(unidades){
    this.listaUnidadesDoCenario = unidades
    this.dialogSelectUnidade = true
  }

  outroCenario(){
    this.carregar()
  }

  //===================================================================================================================================================
  enviarParaIndicadores(){
    this.messageService.add({severity: 'info', summary: 'Aguarde', detail: 'Aguarde a mensagem de confirmação'});
    this.carregando = true
    this.dialogSelectTabela = false
    var indicadroDeKw   = this.selecionadoCenario.classificacao === 1 ? 12 : 13 
    var indicadroDeRS   = this.selecionadoCenario.classificacao === 1 ? 14 : 15 
    var indicadroDeKwM3 = this.selecionadoCenario.classificacao === 1 ? 74 : 78
    var indicadroDeRSM3 = this.selecionadoCenario.classificacao === 1 ? 75 : 79 

    this.medServ.atualizarIndicadores(this.selecionadoCenario,indicadroDeKw,indicadroDeRS,indicadroDeKwM3,indicadroDeRSM3).subscribe(
      resp=>{
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Dados enviados com Sucesso'});
        this.carregar()
      }
    );
  }
}
