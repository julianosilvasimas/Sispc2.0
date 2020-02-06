import { Component, OnInit } from '@angular/core';

import {MenuItem, SelectItem, MessageService} from 'primeng/api';

import { TransporteService } from '../../transporte.service';
import { Veiculo, Agendamento } from '../../transporte.model';

@Component({
  selector: 'app-agendar-veiculo',
  templateUrl: './agendar-veiculo.component.html',
  styleUrls: ['./agendar-veiculo.component.css']
})
export class AgendarVeiculoComponent implements OnInit {

  private ArrCondutores: any[];
  private ArrTipoVeiculo: any[];
  private ArrDestinos:any[];

  private OpcSolicitante: any;
  private OpcCondutores: any;
  private OpcQtd: any;
  private OpcTipoVeiculo: any;
  private OpcDestinos: any;
  private OpcDe: string;
  private OpcAte: string;


  constructor(private transporteService: TransporteService,
    private messageService: MessageService) {
     }


  ngOnInit() {
    this.OpcSolicitante = sessionStorage.getItem('nome');
    this.ArrCondutores= [
      {label: ''},
      {label: 'Albert Einstein', value: 'Albert Einstein'},
      {label: 'Fred Mercury', value: 'Fred Mercury'},
      {label: 'José Vicente', value: 'José Vicente'},
      {label: 'Hermes e Renato', value: 'Hermes e Renato'}
    ];
    this.ArrTipoVeiculo = [
      {label: ''},
      {label: 'AMAROK', value: 'AMAROK'},
      {label: 'COROLLA', value: 'COROLLA'},
      {label: 'COROLLA GLI', value: 'COROLLA GLI'},
      {label: 'CAMINHAO', value: 'CAMINHAO'},
      {label: 'MONTANA LS - MT', value: 'MONTANA LS - MT'},
      {label: 'ONIX 1.0 LS - MT', value:'ONIX 1.0 LS - MT'},
      {label: 'PRISMA LT - AT', value: 'PRISMA LT - AT'},
      {label: 'RETRO CATERPILLAR', value: 'RETRO CATERPILLAR'},
      {label: 'STRADA', value: 'STRADA'},
      {label: 'S-10 LS - MT', value: 'S-10 LS - MT'}
    ];
    this.ArrDestinos = [
      {label: '', value:''},
      {label: 'ARMAÇÃO DOS BÚZIOS', value:'ARMAÇÃO DOS BÚZIOS'},
      {label: 'ARRAIAL DO CABO', value:'ARRAIAL DO CABO'},
      {label: 'CABO FRIO', value:'CABO FRIO'},
      {label: 'CABO FRIO TAMOIOS', value:'CABO FRIO TAMOIOS'},
      {label: 'SÃO PEDRO DA ALDEIA', value:'SÃO PEDRO DA ALDEIA'},
      {label: 'IGUABA GRANDE', value:'IGUABA GRANDE'}
    ]
  }
  SalvarAgendamento(){
    var agendamento : Agendamento;

    agendamento={
      agendamentoId: null,
      solicitante: this.OpcSolicitante,
      qtdPessoas: this.OpcQtd,
      agendadoate: this.OpcAte,
      tipoVeiculo: this.OpcTipoVeiculo,
      agendadode:this.OpcDe,
      placa:null,
      aprovador: null,
      aprovacao: null,
      justificativa: null,
      destino: this.OpcDestinos,
      condutor: this.OpcCondutores,
      dataAgendamento: null,
    }
    this.transporteService.InputAgendamento(agendamento).subscribe(
      response => {
        console.log(response);
      });
  }
}
