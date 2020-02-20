import { Component, OnInit } from '@angular/core';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';

import { MessageService } from 'primeng/api';
import { ControledepagamentosjuridicoService } from '../controledepagamentosjuridico.service';
import { Pagamento } from '../controledepagamentosjuridico.model';

@Component({
  selector: 'app-acompanharaprovacao',
  templateUrl: './acompanharaprovacao.component.html',
  styleUrls: ['./acompanharaprovacao.component.css']
})

export class AcompanharaprovacaoComponent implements OnInit {
  sentencas = [];
  aprovations;
  sentencaSelect;
  displayStatusSentenca;
  sentencaSelectDate;

  constructor(private ControlePagamento: ControledepagamentosjuridicoService,
  private messageService: MessageService) { }
  value: any;

  ngOnInit() {
    this.ControlePagamento.emAprovacao().subscribe(
      response => {
        this.sentencas = response
        console.log(response)
      }
    );

  }
  showSentenca(sentenca){
    this.sentencaSelectDate = null;
    this.sentencaSelect = sentenca;
    this.displayStatusSentenca = true;
    event.preventDefault();
  }

}
