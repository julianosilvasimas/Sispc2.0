import { Component, OnInit } from '@angular/core';
import{ OperacionalEsgotoService } from './operacional-esgoto.service';
import{ PerformanceService } from '../performance/performance.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-operacional-esgoto',
  templateUrl: './operacional-esgoto.component.html',
  styleUrls: ['./operacional-esgoto.component.css']
})
export class OperacionalEsgotoComponent implements OnInit {


  constructor(private esg:OperacionalEsgotoService, private perf:PerformanceService, private messageService: MessageService) { }

  Usuario = sessionStorage.getItem('nome')

  ListaDeNotificacoes
  ngOnInit() {
    this.CarregarNotificacoes()
  }


  CarregarNotificacoes(){
    this.esg.getNotificacao().subscribe(
      resp=>{
        this.ListaDeNotificacoes = resp.map(
          function(obj) {
            obj.dataDaCriacao = obj.dataDaCriacao.substr(8,2)+"/"+obj.dataDaCriacao.substr(5,2)+"/"+obj.dataDaCriacao.substr(2,2)+" "+obj.dataDaCriacao.substr(11,8)
            return obj
          }
        );
      }
    )
  }


  NotificacaoTexto
  SalvarNotificacao(){
    var novoarray =
    {
      id: null,
      dataDaCriacao: null,
      unidade: "Administrador",
      admin: 1,
      usuario: sessionStorage.getItem('nome'),
      texto: this.NotificacaoTexto
    } 
    console.log(novoarray)
    this.esg.InserirNotificacao(novoarray).subscribe(
      resp=>{
        this.messageService.add({severity: 'success', summary: "Salvo", detail: 'Salvo com sucesso'});
        this.CarregarNotificacoes()
      },
      error=>{
        this.messageService.add({severity: 'error', summary: "Erro ao enviar", detail: 'Erro ao enviar'});
      }
    )
  }
}
