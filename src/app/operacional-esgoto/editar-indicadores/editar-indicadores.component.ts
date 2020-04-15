import { Component, OnInit } from '@angular/core';
import { OperacionalEsgotoService } from '../operacional-esgoto.service';
import { PerformanceService } from 'src/app/performance/performance.service';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/admin/Admin.service';
import { Classificacao } from './classificacao-indicadores.model';

@Component({
  selector: 'app-editar-indicadores',
  templateUrl: './editar-indicadores.component.html',
  styleUrls: ['./editar-indicadores.component.css']
})
export class EditarIndicadoresComponent implements OnInit {

  constructor(private esg:OperacionalEsgotoService, private adminServ:AdminService, private messageService: MessageService) { }
  volumes 

  ngOnInit() {
    this.AtualizarUnidades();
  }

  AtualizarUnidades(){
    this.esg.getclassificacoes().subscribe(
      response=>{
        this.ListaDeClassificacoes = response
      }
    )
  }

  ListaDeClassificacoes
  ClassificacaoSelected: Classificacao
  novaUnidade
  cols
  displayDialog: boolean = false
  
  showDialogToAdd() {
    this.ClassificacaoSelected = {
      id: null,
      dataDaCriacao: null,
      icon: null,
      nome: null
    }
    this.novaUnidade = true;
    this.displayDialog = true;
  }

  saveClassificacao() {
    var id = this.ClassificacaoSelected.id == null ? 0 : this.ClassificacaoSelected.id 
    this.esg.EditarClassificacao(this.ClassificacaoSelected, id).subscribe(
      indicadors  =>  {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Classificação '+this.ClassificacaoSelected['nome']+' Alterado'});
        this.AtualizarUnidades()
      },error=>{
        this.messageService.add({severity: 'warn', summary: 'Erro', detail: 'Erro'});
      }
    )
    this.displayDialog = false;
  }

  onRowSelect(event) {
      this.novaUnidade = false;
      this.ClassificacaoSelected = event.data
      this.displayDialog = true;
  }

  cloneCar(c: any): any {
      let car = {};
      for (let prop in c) {
          car[prop] = c[prop];
      }
      return car;
  }

  deleteClassificacao(){
    this.esg.DeleteClassificacao(this.ClassificacaoSelected.id).subscribe(
      indicadors  =>  {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Classificação '+this.ClassificacaoSelected['nome']+' Deletado'});
        this.AtualizarUnidades()
        this.displayDialog = false;
      },error=>{
        this.messageService.add({severity: 'warn', summary: 'Erro', detail: 'Erro'});
      }
    )
  }
  //===================================================================================================================================
  //Gerenciar Indicadores

  ArrayDeIndicadores =[]
  displayIndicadores:boolean = false
  displayCarregando: boolean = null
  gerenciarIndicadores(){
    this.displayCarregando = true;
    this.esg.getindicadorporclassificaco(this.ClassificacaoSelected.id).subscribe(
      indicadors  =>  {
        this.displayIndicadores = true
        this.ArrayDeIndicadores = indicadors
        this.displayCarregando = null;
      }
    )

  }
  onGerenciarIndicadoresHide(){
    this.displayCarregando = null;
  }
  
  //===================================================================================================================================
  //Editar Indicadores

  IndicadorASerEditado
  ClassificacaoSelecionada
  displayEditarIndicador: boolean = false
  calculos=
  [
    { label: "SOMA", value: 1},
    { label: "MÉDIA", value: 2},
    { label: "ÚLTIMO", value: 3},
    { label: "MAIOR", value: 4},
    { label: "MENOR", value: 5},
  ]
  

  editarIndicador(Linha){
    this.IndicadorASerEditado=Linha
    this.ClassificacaoSelecionada = this.IndicadorASerEditado.classificacao
    this.displayEditarIndicador = true
  }
  novoIndicador(Linha){
    this.IndicadorASerEditado=Linha
    this.ClassificacaoSelecionada = null
    this.displayEditarIndicador = true
  }
  saveIndicador(){
    this.IndicadorASerEditado.classificacao = this.ClassificacaoSelecionada
    this.esg.EditarIndicador(this.IndicadorASerEditado).subscribe(
      indicadors  =>  {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Indicador '+this.IndicadorASerEditado['nome']+' Alterado'});
        this.displayEditarIndicador = false
      },error=>{
        this.messageService.add({severity: 'warn', summary: 'Erro', detail: 'Erro'});
      }
    )
  }
  delIndicador(){
    this.esg.DeleteIndicador(this.IndicadorASerEditado.id).subscribe(
      indicadors  =>  {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Indicador '+this.IndicadorASerEditado['nome']+' Deletado'});
        this.displayEditarIndicador = false
      },error=>{
        this.messageService.add({severity: 'warn', summary: 'Erro', detail: 'Erro'});
      }
    )
  }
}
