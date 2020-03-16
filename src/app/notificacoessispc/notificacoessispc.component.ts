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
  ArrEmails
  ngOnInit() {
    this.not.UsuariosSispc().subscribe(
      response=>{
        this.ArrEmails = response
      }
    );
  }
  
  Assunto
  Texto
  OpcEmails
  email:any[]=[];
  carregando: boolean = false
  AoSalvar(){
    this.carregando = true
    this.email=[];
    for(var i=0;i<this.OpcEmails.length;i++){
      this.email.push(this.OpcEmails[i]["email"])
    }
    this.not.enviarNotificacao(this.email, this.Assunto, this.Texto).subscribe(
      response => {
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Dados enviados com sucesso!'});
          console.log('Dados enviados com sucesso!')
          this.Assunto = "";
          this.Texto=""
          this.OpcEmails=null
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail: error.message, life: 500});
        console.log(error)
      }
    );
    this.carregando = false
  }

  //MODELOS
  //=================================================================================================
  modelos:boolean = false
  modelosCadastrados


  Modelos(){
    this.modelos = true
    this.not.ListaDeModelos().subscribe(
      resp=>{
        this.modelosCadastrados = resp;
      }
    );
  }
    
  selecionarModelo(i){
    this.Texto = i.texto
    this.Assunto = i.assunto
    this.modelos = false
  }


  //NOVO MODELO
  //=================================================================================================
  novoModeloP: boolean = false
  NomeDoModelo
  novoModelo(){
    this.novoModeloP = true
  }
    
  SalvarNovoModelo(){
    this.not.ListaDeModelosNovo(0,this.NomeDoModelo,this.Assunto, this.Texto).subscribe(
      response => {
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Dados enviados com sucesso!'});
          console.log('Dados enviados com sucesso!')
          this.Assunto = "";
          this.Texto=""
          this.OpcEmails=null
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail: error.message, life: 500});
        console.log(error)
      }
    );
    this.novoModeloP = false
  }

  //DELETAR MODELO
  //=================================================================================================

  deletarModelo(i){
    this.not.ListaDeletar(i.id).subscribe(
      response => {
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Dados enviados com sucesso!'});
          console.log('Dados enviados com sucesso!')
          this.Assunto = "";
          this.Texto=""
          this.OpcEmails=null
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail: error.message, life: 500});
        console.log(error)
      }
    );
    this.modelos = false
  }
}
