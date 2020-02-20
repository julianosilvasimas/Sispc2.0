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

  ngOnInit() {

  }
  atualizar() {
    this.ControlePagamento.Aprovando(this.Nivel, this.CentrosdeCustos).subscribe(
      response => {
        this.pagamentos = response
        console.log(response)
      }
    );
  }
}
