import { Component, OnInit } from '@angular/core';
import { NotificacoesService } from './notificacoes.service' 
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-notificacoessispc',
  templateUrl: './notificacoessispc.component.html',
  styleUrls: ['./notificacoessispc.component.css']
})
export class NotificacoessispcComponent implements OnInit {

  constructor(private not:NotificacoesService,private messageService: MessageService) {}
  
  ngOnInit() {
  }
  
  Assunto
  Texto
  AoSalvar(){
    console.log(this.Assunto)
    console.log(this.Texto)
    this.not.enviarNotificacao(this.Assunto, this.Texto).subscribe(
      response => {
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Dados enviados com sucesso!'});
          console.log('Dados enviados com sucesso!')
          this.Assunto = "";
          this.Texto=""
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail: error.message, life: 500});
        console.log(error)
      });

  }
}
