import { Component, OnInit } from '@angular/core';
import { RpaService } from './rpa.service';



@Component({
  selector: 'app-rpa',
  templateUrl: './rpa.component.html',
  styleUrls: ['./rpa.component.css']
})
export class RpaComponent implements OnInit {
  cadastro;
  status

  bot=[];
  displayDialog;
  selectedBot;
  constructor(private rpaservice: RpaService) { }

  ngOnInit() {
    
    this.Arrayas();
    
    var i = 0
    // while(i===0){
    //   this.f3();
    // }
  }

  selectCar(bot: any) {
    this.selectedBot = bot;
    this.displayDialog = true;
    event.preventDefault();
  }

  onDialogHide() {
    this.selectedBot = null;
  }

  Arrayas(){
    // this.bot=[];
    this.cadastro=[];
    this.status = [];
    this.rpaservice.cadastroBots().subscribe(
      cadastro =>{
        for(var i =0; i<cadastro.length; i++){

          this.rpaservice.statusBots(cadastro[i].idCad).subscribe(
            status =>{
              this.bot.push(
                {
                  nomebot: status[0].bot.nomebot,
                  status: status[0].status,
                  descricao: status[0].bot.descricao,
                  historico: status
                }
              );
            } 
          )
        }
      }
    );
  }
  // PreencherBots(cadastro, status){
  // 
  //     console.log(
  //       {
  //         nomebot: cadastro[i].nomebot,
  //         status: cadastro[i].status,
  //         descricao: cadastro[i].descricao,
  //         hist: [this.FiltroBot(cadastro[i].idCad, status)]
  //       }
  //     )
  //   }
  // }

  FiltroBot(Bot, status){
    var statusbot = [];
    for(var i=0; i<status.length && statusbot.length<20;i++){
      if(status[i]["bot"]["idCad"] === Bot){
        statusbot.push(status[i])
      }
    }
    statusbot = statusbot.reverse();
    return statusbot;
  }
}

        
    