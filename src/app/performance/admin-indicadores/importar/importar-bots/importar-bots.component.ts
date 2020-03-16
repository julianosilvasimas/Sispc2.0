import { Component, OnInit } from '@angular/core';
import { AdminIndicadoresService } from '../../admin-indicadores.service';
import { Bots } from 'src/app/performance/performance.model';
import { MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-importar-bots',
  templateUrl: './importar-bots.component.html',
  styleUrls: ['./importar-bots.component.css']
})
export class ImportarBotsComponent implements OnInit {

  constructor(private adminindic: AdminIndicadoresService,  private messageService: MessageService, private comp: AppComponent) {
           
    
  }

  bots: Bots[]=[]
  botsLista: Bots[]=[]
  responsiveOptions;

  filtroListaIndicador
  filtroAno
  filtroCorteReferencia
  filtroUnidade
  filtroDiaDeCorte

  ngOnInit() {
      this.adminindic.listaIndicadores().subscribe(
        indicador  =>  {
          this.filtroListaIndicador = indicador
        }
      )
      this.adminindic.unidades().subscribe(
        indicador  =>  {
          this.filtroUnidade = indicador
        }
      )
    this.bots =[
      { label: "Inserir Orçados", value: 1 , funcao: "Carregar orçados.", status: this.comp.statusbot}
    ] 
    this.botsLista = this.bots
    console.log(this.botsLista)
  }
 

  displayDialog: boolean = false;
  botselecionado 

  indicadorselecionado
  unidadeselecionada
  anodoimport
  diadecortereferencia=30
  diadecorteciclo=0
  SelecionarBot(bot){
    this.botselecionado = bot
    this.displayDialog= true

  }

  StartBot(){
    this.messageService.add({severity: 'info', summary: 'Iniciando Tarefa', detail: 'Tarefa Iniciada .. Informaremos quando terminar'});
    this.adminindic.CarregarIndicadors(
      this.indicadorselecionado.indicadorId,
      this.anodoimport,
      this.diadecortereferencia,
      this.unidadeselecionada.unidadeId,
      this.diadecorteciclo
    ).subscribe();
    this.comp.statusbot = "Executando"
    this.botselecionado.status = "Executando"
    this.botselecionado.status=this.comp.resolveAfter5Seconds();
  }

  onDialogHide(){
    this.displayDialog= false
    this.botselecionado = null
  }

  
  aoAlterardiaDeCorteRef($event){
  }

  aoAlterardiaDeCorteCiclo($event){
  }

  habilitaCorteMes = true
  habilitaCorteCiclo = true
  naoseaplicadiaDeCorteMes(){
    if(this.habilitaCorteMes===true){
      this.diadecortereferencia = 30
    }else{
      this.diadecortereferencia = 0
      this.diadecorteciclo = 0
      this.habilitaCorteCiclo=true
    }
  }
  naoseaplicadiaDeCorteCiclo(){
    if(this.habilitaCorteCiclo===true){
      this.diadecorteciclo = 0
    }else{
      this.diadecorteciclo = 0
      this.diadecortereferencia = 30
      this.habilitaCorteMes=true
    }
  }
}
