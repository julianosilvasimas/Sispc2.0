import { Component, OnInit } from "@angular/core";

import { MessageService } from 'primeng/api';
import { ControledepagamentosjuridicoService } from '../controledepagamentosjuridico.service';
import { Pagamento } from '../controledepagamentosjuridico.model';

@Component({
  selector: 'app-listapendentes',
  templateUrl: './listapendentes.component.html',
  styleUrls: ['./listapendentes.component.css']
})
export class ListapendentesComponent implements OnInit {
  sentencas = [];
  sentencaSelect;
  sentencaSelectDate;
  displayEditSentenca= false;

  constructor(private ControlePagamento: ControledepagamentosjuridicoService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.AtualizarLista()
  }

  AtualizarLista(){
    this.sentencas=[];
    this.ControlePagamento.Pagamentos().subscribe(
      response => {
        this.sentencas = response
        console.log(response)
      }
    );
  }

  showSentenca(sentenca){
    this.sentencaSelectDate = null;
    this.sentencaSelect = sentenca;
    this.displayEditSentenca = true;
    event.preventDefault();
  }

  Salvar(sentencas){
    console.log(sentencas)
    this.ControlePagamento.UpdatePagamento(sentencas).subscribe(
      response => {
        this.sentencas = response
        console.log(response)
        this.displayEditSentenca = false
        this.sentencaSelect= null;
        this.AtualizarLista()
      }
    );
  }

  Aprovar(){

  }

}
