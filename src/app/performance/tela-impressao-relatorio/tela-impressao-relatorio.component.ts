import { Component, OnInit } from '@angular/core';
import { PerformanceService } from './../../performance/performance.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tela-impressao-relatorio',
  templateUrl: './tela-impressao-relatorio.component.html',
  styleUrls: ['./tela-impressao-relatorio.component.css']
})
export class TelaImpressaoRelatorioComponent implements OnInit {



  public items: any[];
  public referencia = '';
  public valor;
  constructor(private messageService: MessageService, private performanceService: PerformanceService) { }
  
  ngOnInit() {
    this.performanceService.gerencias()
    .subscribe(
      response => {

        this.items = []
        this.items = response.splice(2, Number.MAX_VALUE)
        for(var i=0; i<this.items.length;i++){

          this.items[i]['routerLink'] = '/printPerformance';
          
        }
      }
    );
  }

  retirarDados(i){
    

        
  }

  novoRelatorio(valor){
    this.performanceService.classindicadores(valor)
      .subscribe(
        response2=>{
          var qtd = response2.length; 
          if(qtd>0 && this.referencia.length>0){
            this.messageService.add({severity:'success', summary:'', detail:'Gerando relatório', life: 5000});
            var win = window.open('#/printPerformance/'+valor+'/'+this.referencia
            ,'_blank'
            ,"width=1050,height=1050")
            win.focus();
          }else if(this.referencia == ''){
            this.messageService.add({severity:'info', summary:'Referência', detail:'Favor selecionar a referência.', life: 5000});
          }else{
            this.messageService.add({severity:'info', summary:'Ausência de Indicadores', detail:'Sem indicadores para essa gerência.', life: 5000});
          }
      }
    );
  }




  
  onChangeTime($event:any){
    console.log(this.convertTime($event));
    this.referencia = this.convertTime($event);
  }
  convertTime(str:string) {
    var date = new Date(str),
    year = ("0" + (date.getFullYear())).slice(-4),
    mnth = ("0" + (date.getMonth()+1)).slice(-2),
    day  = ("0" + date.getDate()).slice(-2);
    return year+"-"+mnth+"-"+day;
}
}
