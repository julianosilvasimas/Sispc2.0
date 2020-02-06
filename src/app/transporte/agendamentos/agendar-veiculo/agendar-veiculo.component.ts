import { Component, OnInit } from '@angular/core';

import {MenuItem, SelectItem, MessageService} from 'primeng/api';

import { TransporteService } from '../../transporte.service';
import { Veiculo, Agendamento, labels } from '../../transporte.model';

@Component({
  selector: 'app-agendar-veiculo',
  templateUrl: './agendar-veiculo.component.html',
  styleUrls: ['./agendar-veiculo.component.css']
})
export class AgendarVeiculoComponent implements OnInit {

  private ArrCondutores: labels[]= [];
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
    this.ArrCondutores= [];
    this.transporteService.Condutores().subscribe(
      response => {
        for(var i=0; i<response.length;i++){
          var array={label: response[i].nome, value: response[i].nome};
          this.ArrCondutores.push(array)
        }
      }
    );
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
      agendadoate: dataAtualFormatada(this.OpcAte),
      tipoVeiculoSolicitado: this.OpcTipoVeiculo,
      tipoVeiculoDisponibilizado: null,
      agendadode:dataAtualFormatada(this.OpcDe),
      placa:null,
      aprovador: null,
      aprovacao: null,
      justificativa: null,
      destino: this.OpcDestinos,
      condutor: this.OpcCondutores,
      dataAgendamento: null,
    }
    console.log(agendamento)
    this.transporteService.InputAgendamento(agendamento).subscribe(
      response => {
        if(response.status === 201){
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Dados enviados com sucesso!'});
          console.log('Dados enviados com sucesso!')
        }
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", 
        detail:error.message, life: 5000});
        console.log(error)
      });

      this.OpcSolicitante= null;
      this.OpcQtd = null;
      this.OpcTipoVeiculo=null;
      this.OpcAte=null;
      this.OpcDe=null;
      this.OpcDestinos=null;
      this.OpcCondutores=null;
      
    function dataAtualFormatada(datareceb){
      var data = datareceb,
          dia  = data.getDate().toString().padStart(2, '0'),
          mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
          ano  = data.getFullYear(),
          hora  = data.getHours(),
          minuto  = data.getMinutes();
      return ano+"-"+mes+"-"+dia+" "+hora+":"+minuto+":00";
    }
  }
}
