import { Component, OnInit } from '@angular/core';
import { TransporteService } from '../../transporte.service';
import { Veiculo, Agendamento } from '../../transporte.model';
import { MessageService, SelectItem } from 'primeng/api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-aprovar-agendamento',
  templateUrl: './aprovar-agendamento.component.html',
  styleUrls: ['./aprovar-agendamento.component.css']
})
export class AprovarAgendamentoComponent implements OnInit {

  public Agendamentos;
  public Agendamentos2;
  public Justificativa;

  public displayAprove; 
  public displayRecuse; 
  public displaySelect; 
  
  public veiculos:Veiculo[] = [];
  public veiculosNaoDisponiveis: any[] =[];
  public veiculosDisponiveis: any[]=[];
  public AgendamentoSelecionado: Agendamento;
  public AgendamentoAlterado: Agendamento;


  constructor(private transporteService: TransporteService,
    private messageService: MessageService) {
     }


  ngOnInit() {
    this.AtualizarLista();
  }
  AtualizarLista(){
    this.veiculos=[];
    this.Agendamentos=[];
    this.transporteService.veiculos()
    .subscribe(
      Veiculos  =>  {
        this.veiculos = Veiculos
      });

    this.transporteService.ParaAprovar()
      .subscribe(
      Agendamento  =>  {
        this.Agendamentos2 = Agendamento
        this.Agendamentos = Agendamento
        this.Filter()
      });
    this.Agendamentos2.array.forEach(element => {
      element['agendamentode']
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

  Aprovar(Agendamento){
    this.AgendamentoSelecionado = Agendamento;
    this.displayAprove = true;
    event.preventDefault();
  }

  Escolher(car: Veiculo){
    this.AgendamentoAlterado = 
    {
      agendamentoId: this.AgendamentoSelecionado.agendamentoId,
      dataAgendamento: this.AgendamentoSelecionado.dataAgendamento,
      agendadode: this.AgendamentoSelecionado.agendadode,
      agendadoate: this.AgendamentoSelecionado.agendadoate,
      solicitante: this.AgendamentoSelecionado.solicitante,
      fksolicitante: this.AgendamentoSelecionado.fksolicitante,
      emailsolicitante: this.AgendamentoSelecionado.emailsolicitante,
      condutor: this.AgendamentoSelecionado.condutor,
      qtdPessoas: this.AgendamentoSelecionado.qtdPessoas,
      tipoVeiculoSolicitado: this.AgendamentoSelecionado.tipoVeiculoSolicitado,
      destino: this.AgendamentoSelecionado.destino,
      placa: car.placa,
      tipoVeiculoDisponibilizado: car.modelo,
      aprovador: sessionStorage.getItem('nome'),
      emailaprovador: sessionStorage.getItem('email'),
      aprovacao: 1,
      justificativa: "",
      emergencial: this.AgendamentoSelecionado.emergencial,
      justificativasolicitacao: this.AgendamentoSelecionado.justificativasolicitacao,

    }
    this.onSelectHide();
  }

  async Aprovando(){
    this.transporteService.UpdateAgendamento(this.AgendamentoAlterado).subscribe(
      response => {
        if(response.status === 201){
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Aprovado!'});
          console.log('Aprovado!')
        }
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", 
        detail:error.message, life: 500});
        console.log(error)
      }
    );
    this.onDialogHide();
    await new Promise(r => setTimeout(r, 500));
    this.AtualizarLista();
  }



  
  //==========================================================================================
  Reprovar(Agendamento){
    this.AgendamentoSelecionado = Agendamento;
    this.displayRecuse = true;
    event.preventDefault();
  }


  onDialogHide() {
    this.Agendamentos = null;
    this.displayAprove = false;
    this.AtualizarLista();
  }
  onSelectHide() {
    this.veiculosDisponiveis = null;
    this.displaySelect = false;
    this.AtualizarLista();
  }

  async Reprovando(){

    this.AgendamentoAlterado = 
    {
      agendamentoId: this.AgendamentoSelecionado.agendamentoId,
      dataAgendamento: this.AgendamentoSelecionado.dataAgendamento,
      agendadode: this.AgendamentoSelecionado.agendadode,
      agendadoate: this.AgendamentoSelecionado.agendadoate,
      solicitante: this.AgendamentoSelecionado.solicitante,
      fksolicitante: this.AgendamentoSelecionado.fksolicitante,
      emailsolicitante: this.AgendamentoSelecionado.emailsolicitante,
      condutor: this.AgendamentoSelecionado.condutor,
      qtdPessoas: this.AgendamentoSelecionado.qtdPessoas,
      tipoVeiculoSolicitado: this.AgendamentoSelecionado.tipoVeiculoSolicitado,
      placa: this.AgendamentoSelecionado.placa,
      destino: this.AgendamentoSelecionado.destino,
      tipoVeiculoDisponibilizado: this.AgendamentoSelecionado.tipoVeiculoDisponibilizado,
      aprovador: sessionStorage.getItem('nome'),
      emailaprovador: sessionStorage.getItem('email'),
      aprovacao: 0,
      justificativa:this.Justificativa,
      emergencial: this.AgendamentoSelecionado.emergencial,
      justificativasolicitacao: this.AgendamentoSelecionado.justificativasolicitacao,
    }
    this.displayRecuse = true;
    this.transporteService.UpdateAgendamento(this.AgendamentoAlterado).subscribe(
      response => {
        if(response.status === 201){
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Reprovado!'});
          console.log('Reprovado!')
        }
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", 
        detail:error.message, life: 500});
        console.log(error)
      }
    );
    this.onDialogHide();
    await new Promise(r => setTimeout(r, 500));
    this.AtualizarLista();
    this.Justificativa=null;
  }
  //==========================================================================================
  VerificarDisponibilidade(de, ate){
    this.transporteService.Disponiveis(de,ate).subscribe( Agendados  =>  {
      this.PreencherDisponiveis(Agendados);
    });
  }


  PreencherDisponiveis(Agendados: any[]){
    var todos = this.veiculos;
    this.veiculosDisponiveis = [];
    this.veiculosNaoDisponiveis = Agendados;


    if(this.veiculosNaoDisponiveis.length<1){
      this.veiculosDisponiveis = todos

    }else{
      for(var i=0; i<todos.length;i++){
        var placaVeiculo= todos[i].placa
        var pool= todos[i].pool

        var placaAgendado = null;
        
        for(var j=0; j<this.veiculosNaoDisponiveis.length; j++){
          placaAgendado = this.veiculosNaoDisponiveis[j].placa
          if(placaVeiculo==placaAgendado){
            break;
          }
        }

        if(placaAgendado != placaVeiculo && pool == true){
          this.veiculosDisponiveis.push(todos[i])
        }
      }
    }
    this.displaySelect = true;
  }

  
  //==========================================================================================
  dataAtualFormatada(datareceb){
    var data = datareceb,
        dia2  = data.getDate().toString().padStart(2, '0'),
        mes2  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano2  = data.getFullYear(),
        hora2  = data.getHours(),
        minuto2  = data.getMinutes();
    return ano2+"-"+mes2+"-"+dia2;
  }
  dataHoraFormatada(datareceb){
    var data = datareceb,
        dia2  = data.getDate().toString().padStart(2, '0'),
        mes2  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano2  = data.getFullYear(),
        hora2  = data.getHours(),
        minuto2  = data.getMinutes();
    return dia2+"/"+mes2+"/"+ano2+" "+hora2+":"+minuto2+":00";
  }
}
