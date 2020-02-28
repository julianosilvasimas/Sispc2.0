import { Component, OnInit, Input } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ControledepagamentosjuridicoService } from '../controledepagamentosjuridico.service';
import { Pagamento } from '../controledepagamentosjuridico.model';
@Component({
  selector: 'app-aprovar',
  templateUrl: './aprovar.component.html',
  styleUrls: ['./aprovar.component.css']
})
export class AprovarComponent implements OnInit {

  constructor(private ControlePagamento: ControledepagamentosjuridicoService,
    private messageService: MessageService) { }
  
  @Input() Nivel;
  @Input() CentrosdeCustos;

  pagamentos: Pagamento[];
  colunas;
  sentencaSelect
  displayEditPagamento = false;



  ngOnInit() {
    this.atualizar();

  }
  atualizar() {
    this.pagamentos=[]
    this.ControlePagamento.Aprovando(this.Nivel, this.CentrosdeCustos).subscribe(
      response => {
        this.pagamentos = response
        this.displayEditPagamento = false;
        console.log(response)
      }
    );
  }

  aprovar(pagamentos){
    pagamentos['aprovacao'+this.Nivel] = 1
    pagamentos['aprovador'+this.Nivel] = sessionStorage.getItem('nome')
    this.ControlePagamento.UpdatePagamento(pagamentos).subscribe(
      response => {
        this.atualizar()
      }
    );
  }
  reprovar(pagamentos){

    pagamentos['aprovacao'+this.Nivel] = 0
    pagamentos['aprovador'+this.Nivel] = sessionStorage.getItem('nome')
    this.ControlePagamento.UpdatePagamento(pagamentos).subscribe(
      response => {
        this.atualizar()
      }
    );
  }
  showPagamentos(pagamentos){
    this.sentencaSelect = pagamentos
    this.displayEditPagamento = true;
  }
}
