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
  minDate: Date;

  private IdSolicitante: any;
  private OpcSolicitante: any;
  private OpcCondutores: any;
  private OpcQtd: any;
  private OpcTipoVeiculo: any;
  private OpcDestinos: any;
  private OpcEmergencial: boolean = false;
  private OpcData: Date;
  private OpcDe: Date;
  private OpcAte: Date;
  private OpcJustificativa: string;


  constructor(private transporteService: TransporteService,
    private messageService: MessageService) {
     }


  ngOnInit() {
    this.IdSolicitante = sessionStorage.getItem('usuarioId');
    this.OpcSolicitante = sessionStorage.getItem('nome');
    this.ArrCondutores= [];
    this.ArrTipoVeiculo= [];
    this.ArrDestinos= [];

    this.transporteService.Condutores().subscribe(
      response => {
        for(var i=0; i<response.length;i++){
          var array={label: response[i].nome, value: response[i].nome};
          this.ArrCondutores.push(array)
        }
      }
    );

    this.ArrTipoVeiculo = [
      {label: 'AMAROK', value: 'AMAROK'},
      {label: 'VW EXPRESS DRC 4X2', value: 'VW EXPRESS DRC 4X2'},
      {label: 'STRADA', value: 'STRADA'},
      {label: 'S-10 LS - MT', value: 'S-10 LS - MT'},
      {label: 'RETRO CATERPILLAR', value: 'RETRO CATERPILLAR'},
      {label: 'PRISMA LT - AT', value: 'PRISMA LT - AT'},
      {label: 'ONIX LT - AT', value: 'ONIX LT - AT'},
      {label: 'ONIX 1.0 LS - MT', value: 'ONIX 1.0 LS - MT'},
      {label: 'MONTANA LS - MT', value: 'MONTANA LS - MT'},
      {label: 'HONDA 150', value: 'HONDA 150'},
      {label: 'HONDA 125', value: 'HONDA 125'},
      {label: 'COROLLA', value: 'COROLLA'},
      {label: 'COROLLA GLI', value: 'COROLLA GLI'},
      {label: 'CAMINHAO', value: 'CAMINHAO'},
      {label: 'AMAROK', value: 'AMAROK'}
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
    
    this.menorData()
  }
  checagem(){
    var campos = "Favor preencher os campos pendentes: ";
    if(this.OpcSolicitante==null){
      campos = campos + "Solicitante | "
    }
    if(this.OpcDe==null){
      campos = campos + "De | "
    }
    if(this.OpcAte==null){
      campos = campos + "Até | "
    }
    if(this.OpcQtd==null){
      campos = campos + "Qtd. Pessoas | "
    }
    if(this.OpcJustificativa==null){
      campos = campos + "Justificativa | "
    }
    if(this.OpcDestinos==null){
      campos = campos + "Destino | "
    }
    if(this.OpcCondutores==null){
      campos = campos + "Condutor | "
    }
    if(campos.length>36){
      this.messageService.add({sticky: true, severity:'info', summary: 'Incompleto!', 
        detail: campos});
      
    }else{
      this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
        detail:'Dados enviados com sucesso!'});
    }
    
  }
  SalvarAgendamento(){
    this.checagem();
    var agendamento : Agendamento;

    var data1 = this.OpcData.getFullYear + "-"+this.OpcData.getMonth+ "-"+this.OpcData.getDate+ " "+this.OpcDe.getHours+ ":"+this.OpcDe.getMinutes+ ":"+this.OpcDe.getSeconds;
    var data2 = this.OpcData.getFullYear+ "-"+this.OpcData.getMonth+ "-"+this.OpcData.getDate+ " "+this.OpcAte.getHours+ ":"+this.OpcAte.getMinutes+ ":"+this.OpcAte.getSeconds

    console.log(data1)
    console.log(data2)
    agendamento={
      agendamentoId: null,
      solicitante: this.OpcSolicitante,
      fksolicitante: this.IdSolicitante,
      qtdPessoas: this.OpcQtd,
      agendadoate: data2,
      agendadode: data1,
      tipoVeiculoSolicitado: this.OpcTipoVeiculo,
      tipoVeiculoDisponibilizado: null,
      placa:null,
      aprovador: null,
      aprovacao: null,
      justificativa: null,
      justificativaSolicitacao: this.OpcJustificativa,
      destino: this.OpcDestinos,
      condutor: this.OpcCondutores,
      dataAgendamento: null,
      emergencial: this.OpcEmergencial
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
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail: error.message, life: 5000});
        console.log(error)
      });

      this.OpcSolicitante= null;
      this.OpcQtd = null;
      this.OpcTipoVeiculo=null;
      this.OpcAte=null;
      this.OpcDe=null;
      this.OpcData=null;
      this.OpcDestinos=null;
      this.OpcCondutores=null;
      
    // function dataAtualFormatada(datareceb){
    //   var data = datareceb,
    //       dia  = data.getDate().toString().padStart(2, '0'),
    //       mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
    //       ano  = data.getFullYear(),
    //       hora  = data.getHours(),
    //       minuto  = data.getMinutes();
    //   return ano+"-"+mes+"-"+dia+" "+hora+":"+minuto+":00";
    // }
  }
  menorData(){
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    this.minDate = new Date();
    this.minDate.setDate(day);
    this.minDate.setMonth(month);
    this.minDate.setFullYear(year);
  }

  verificarEmergencial(){
    let today = String(Number(new Date())).substring(0,6);
    let data = String(Number(this.OpcData)).substring(0,6);

    if(today == data){
      this.OpcEmergencial = true
    }else{
      this.OpcEmergencial = false
    }
    
  }
}
