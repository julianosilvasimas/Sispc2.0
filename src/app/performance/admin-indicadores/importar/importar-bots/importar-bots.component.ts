import { Component, OnInit } from '@angular/core';
import { AdminIndicadoresService } from '../../admin-indicadores.service';
import { Bots } from 'src/app/performance/performance.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-importar-bots',
  templateUrl: './importar-bots.component.html',
  styleUrls: ['./importar-bots.component.css']
})
export class ImportarBotsComponent implements OnInit {

  constructor(private adminindic: AdminIndicadoresService,  private messageService: MessageService) {
    
    
  }

  bots: Bots[]=[]
  botsLista: Bots[]=[]
  responsiveOptions;

  ngOnInit() {
    this.bots =[
      { label: "Inserir Orçados", value: 1 , funcao: "Carregar volume produzido", status: "S/I"},
      { label: "Calculos Energia", value: 1 , funcao: "kW/m³, R$/m³ ", status: "S/I"},
      { label: "Inserir Orçados", value: 1 , funcao: "Carregar volume produzido", status: "S/I"},
    ] 
    this.botsLista = this.bots
    console.log(this.botsLista)
    this.StatusBot();
  }
  
  StatusBot(){
    for(var i =0; i<this.botsLista.length;i++){
      this.adminindic.statusBots(this.botsLista[i].value).subscribe(
        res => { 
          var dado = JSON.parse(res).status;
          this.bots[0].status = dado;
        }
      );
    }
  }
  
  StartBot(bot){
    this.adminindic.startBot(bot.value).subscribe();
    this.bots[0].status = "Executando";
    this.messageService.add({severity: 'success', summary: 'Informação', detail: 'Executando.'});
  }
}
