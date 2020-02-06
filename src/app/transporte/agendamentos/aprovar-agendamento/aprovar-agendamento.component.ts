import { Component, OnInit } from '@angular/core';
import { TransporteService } from '../../transporte.service';
import { Veiculo, Agendamento } from '../../transporte.model';

@Component({
  selector: 'app-aprovar-agendamento',
  templateUrl: './aprovar-agendamento.component.html',
  styleUrls: ['./aprovar-agendamento.component.css']
})
export class AprovarAgendamentoComponent implements OnInit {

  public Agendamentos;

  public displayAprove; 
  public displayRecuse; 
  public displaySelect; 
  
  public veiculos:any[] = [];
  public veiculosNaoDisponiveis: any[] =[];
  public veiculosDisponiveis: any[]=[];
  public AgendamentoSelecionado: Agendamento;
  public AgendamentoAlterado: Agendamento;


  constructor(private transporteService: TransporteService) { }


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
      tipoVeiculo: this.AgendamentoSelecionado.tipoVeiculo,
      agendadode: this.AgendamentoSelecionado.agendadode,
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
    this.transporteService.UpdateAgendamento(this.AgendamentoAlterado).subscribe();
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
