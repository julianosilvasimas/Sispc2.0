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

  Aprovando(){
    this.transporteService.UpdateAgendamento(this.AgendamentoAlterado).subscribe();
    this.onDialogHide();
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
      this.veiculosNaoDisponiveis = Agendados;
      this.PreencherDisponiveis();
    });
  }

  PreencherDisponiveis(){
    this.veiculosDisponiveis = [];
    var todos = this.veiculos;

    console.log(this.veiculosNaoDisponiveis)
    if(this.veiculosNaoDisponiveis.length<1){
      this.veiculosDisponiveis = todos

    }else{
      
      for(var j=0; j<todos.length; j++){
        var placaVeiculo = todos[j].placa

        this.veiculosNaoDisponiveis.indexOf(
          {
            veiculoId: todos[j].veiculoId,
            datCad: todos[j].datCad,
            placa: todos[j].placa,
            chassi: todos[j].chassi,
            modelo: todos[j].modelo,
            capacidadem3:todos[j].capacidadem3,
            responsavel: todos[j].responsavel,
            tipoVeiculo:todos[j].tipoVeiculo,
            gps:todos[j].gps,
            locadora: todos[j].locadora,
            gerencia: todos[j].gerencia,
            supervisao:todos[j].supervisao,
            pool: todos[j].pool,
            oficina: todos[j].oficina,
            devolvido: todos[j].devolvido,
          }
        );
      }
    }
    this.displaySelect = true;
  }

  
  //==========================================================================================
}
