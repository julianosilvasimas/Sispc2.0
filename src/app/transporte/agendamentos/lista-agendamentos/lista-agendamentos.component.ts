import { Component, OnInit } from '@angular/core';
import { TransporteService } from '../../transporte.service';
import { Veiculo, Agendamento } from '../../transporte.model';
import { CsvDataService } from '../../../csv-data.service';


@Component({
  selector: 'app-lista-agendamentos',
  templateUrl: './lista-agendamentos.component.html',
  styleUrls: ['./lista-agendamentos.component.css']
})
export class ListaAgendamentosComponent implements OnInit {

  constructor(private transporteService: TransporteService) { }

  Agendamentos;
  Agendamentos2;
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
        this.Agendamentos2 = agendamentos
        this.Agendamentos = agendamentos
      });
  }

  //==========================================================================================
  VALOR1: string;
  VALOR2: string;
  VALOR3data: Date;
  VALOR3: string;

  Filter(){
    this.VALOR1 = this.VALOR1==undefined ? null : this.VALOR1=="" ? null : this.VALOR1;
    this.VALOR2 = this.VALOR2==undefined ? null : this.VALOR2=="" ? null : this.VALOR2;
    this.VALOR3 = this.VALOR3data==undefined ? null : this.dataAtualFormatada(this.VALOR3data);


    var agend = this.Agendamentos2;

    if(this.VALOR1!==null){
      console.log(this.VALOR1)
      agend = agend.filter(item => item.solicitante.toUpperCase().includes(this.VALOR1.toUpperCase()))
    }else if(this.VALOR2!==null){
      console.log(this.VALOR2)
      agend = agend.filter(item => item.condutor.toUpperCase().includes(this.VALOR2.toUpperCase()))
    }else if(this.VALOR3!==null){
      console.log(this.VALOR3)
      agend = agend.filter(item => item.agendadode.includes(this.VALOR3))
    }
    this.Agendamentos = agend
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

  dataAtualFormatada(datareceb){
    var data = datareceb,
        dia2  = data.getDate().toString().padStart(2, '0'),
        mes2  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano2  = data.getFullYear(),
        hora2  = data.getHours(),
        minuto2  = data.getMinutes();
    return ano2+"-"+mes2+"-"+dia2;
  }

  salvarCSV(){
    CsvDataService.exportToCsv('test.csv', this.Agendamentos);
  }
}
