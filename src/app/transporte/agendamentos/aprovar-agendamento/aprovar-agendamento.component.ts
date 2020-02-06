import { Component, OnInit } from '@angular/core';
import { TransporteService } from '../../transporte.service';
import { Veiculo, Agendamento } from '../../transporte.model';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-aprovar-agendamento',
  templateUrl: './aprovar-agendamento.component.html',
  styleUrls: ['./aprovar-agendamento.component.css']
})
export class AprovarAgendamentoComponent implements OnInit {

  public Agendamentos;
  public Justificativa;

  public displayAprove; 
  public displayRecuse; 
  public displaySelect; 
  
  public veiculos:any[] = [];
  public veiculosNaoDisponiveis: any[] =[];
  public veiculosDisponiveis: any[]=[];
  public AgendamentoSelecionado: Agendamento;
  public AgendamentoAlterado: Agendamento;


  constructor(private transporteService: TransporteService,
    private messageService: MessageService) { }


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
        this.Agendamentos = Agendamento
        console.log(Agendamento)
      });
  }


  //==========================================================================================
  Aprovar(Agendamento){
    this.AgendamentoSelecionado = Agendamento;
    this.displayAprove = true;
    event.preventDefault();
  }

  Escolher(car: Veiculo){
    this.AgendamentoAlterado = 
    {
      agendamentoId: this.AgendamentoSelecionado.agendamentoId,
      solicitante: this.AgendamentoSelecionado.solicitante,
      qtdPessoas: this.AgendamentoSelecionado.qtdPessoas,
      agendadoate: this.AgendamentoSelecionado.agendadoate,
      tipoVeiculoSolicitado: this.AgendamentoSelecionado.tipoVeiculoSolicitado,
      agendadode: this.AgendamentoSelecionado.agendadode,
      tipoVeiculoDisponibilizado: car.modelo,
      placa: car.placa,
      justificativa: "",
      aprovador: sessionStorage.getItem('nome'),
      aprovacao: 1,
      destino: this.AgendamentoSelecionado.destino,
      condutor: this.AgendamentoSelecionado.condutor,
      dataAgendamento: this.AgendamentoSelecionado.dataAgendamento,

    }
    this.onSelectHide();
  }

  async Aprovando(){
    this.transporteService.UpdateAgendamento(this.AgendamentoAlterado).subscribe(
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
      solicitante: this.AgendamentoSelecionado.solicitante,
      qtdPessoas: this.AgendamentoSelecionado.qtdPessoas,
      agendadoate: this.AgendamentoSelecionado.agendadoate,
      tipoVeiculoSolicitado: this.AgendamentoSelecionado.tipoVeiculoSolicitado,
      agendadode: this.AgendamentoSelecionado.agendadode,
      tipoVeiculoDisponibilizado: this.AgendamentoSelecionado.tipoVeiculoDisponibilizado,
      placa: this.AgendamentoSelecionado.placa,
      justificativa:this.Justificativa,
      aprovador: sessionStorage.getItem('nome'),
      aprovacao: 0,
      destino: this.AgendamentoSelecionado.destino,
      condutor: this.AgendamentoSelecionado.condutor,
      dataAgendamento: this.AgendamentoSelecionado.dataAgendamento,
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
        detail:error.message, life: 5000});
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
    console.log(Agendados)
    var todos = this.veiculos;
    this.veiculosDisponiveis = [];
    this.veiculosNaoDisponiveis = Agendados;


    if(this.veiculosNaoDisponiveis.length<1){
      this.veiculosDisponiveis = todos

    }else{
      for(var i=0; i<todos.length;i++){
        var placaVeiculo= todos[i].placa
        var placaAgendado = null;
        
        for(var j=0; j<this.veiculosNaoDisponiveis.length; j++){
          placaAgendado = this.veiculosNaoDisponiveis[j].placa
          if(placaVeiculo==placaAgendado){
            break;
          }
        }

        if(placaAgendado != placaVeiculo){
          this.veiculosDisponiveis.push(todos[i])
        }
      }
    }
    this.displaySelect = true;
  }

  
  //==========================================================================================
}
