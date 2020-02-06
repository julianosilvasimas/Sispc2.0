import { Component, OnInit } from '@angular/core';
import { TransporteService } from '../../transporte.service';
import { Veiculo, Agendamento } from '../../transporte.model';

@Component({
  selector: 'app-lista-agendamentos',
  templateUrl: './lista-agendamentos.component.html',
  styleUrls: ['./lista-agendamentos.component.css']
})
export class ListaAgendamentosComponent implements OnInit {

  constructor(private transporteService: TransporteService) { }

  Agendamentos;
  aprovacao;
  displayAgendamento:boolean;
  AgendamentoSelecionado;
  ngOnInit() {
    this.AtualizarLista();

    

  }
  AtualizarLista(){
    this.Agendamentos=[];
    this.transporteService.Aprovados()
    .subscribe(
      agendamentos  =>  {
        this.Agendamentos=agendamentos;
      });

  }

  showAgendamento(agendamento: Agendamento){
    this.displayAgendamento =true;
    this.AgendamentoSelecionado = agendamento;
  }
  onDialogHide() {
    this.Agendamentos = null;
    this.displayAgendamento = false;
    this.AtualizarLista();
  }

}
