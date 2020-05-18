import { Component, OnInit } from '@angular/core';
import { OperacionalEsgotoService } from '../operacional-esgoto.service';
import { MessageService } from 'primeng/api';
import { CsvDataService } from 'src/app/csv-data.service';

@Component({
  selector: 'app-relatorios-esgoto',
  templateUrl: './relatorios-esgoto.component.html',
  styleUrls: ['./relatorios-esgoto.component.css']
})
export class RelatoriosEsgotoComponent implements OnInit {

  constructor(private esg:OperacionalEsgotoService, private messageService: MessageService) { }
  

  ngOnInit() {
    this.AtualizarUnidades()
  }

  Unidades
  AtualizarUnidades(){
    this.esg.getunidades().subscribe(
      response=>{
        this.Unidades = response
      }
    )
  }


  //===========================================================================================
  //UTILIZAÇÃO

  Data1:Date=null
  Data2:Date=null
  DataMax: Date=null

  datamax(){
    if(this.Data1 !== null){
      this.DataMax= new Date();
      this.DataMax.setDate(this.Data1.getDate());
      this.DataMax.setMonth(this.Data1.getMonth() + 1);
      this.DataMax.setFullYear(this.Data1.getFullYear());
    }
  }

  unidadeSelecionadaUtilizacao
  carregarutilizacao:boolean =false
  pesquisarUtilizacao(){
    this.carregarutilizacao =true
    this.unidadeSelecionadaUtilizacao

    this.esg.PesquisarLancamento(
      this.unidadeSelecionadaUtilizacao.id,
      this.converterdata(this.Data1),
      this.converterdata(this.Data2)
    ).subscribe(
      response=>{
        var array =  response
        array = array.map(
          function(e){
            e.indicador = e.indicador.nome
            e.unidade = e.unidade.unidade
            return e;
          }
        )
        this.carregarutilizacao =false
        this.salvarCSV(response, 'Relatório de Utilização Esgoto.csv')
      }
    )
  }

  //===========================================================================================
  //LIVRO DE OCORRÊNCIAS
  
  Data11:Date=null
  Data21:Date=null
  DataMax1: Date=null

  datamax2(){
    if(this.Data11 !== null){
      this.DataMax1= new Date();
      this.DataMax1.setDate(this.Data11.getDate());
      this.DataMax1.setMonth(this.Data11.getMonth() + 1);
      this.DataMax1.setFullYear(this.Data11.getFullYear());
    }
  }

  carregarocorrencia:boolean =false
  pesquisarOcorrencia(){
    this.carregarocorrencia =true

    this.esg.getNotificacaoData(
      this.converterdata(this.Data11),
      this.converterdata(this.Data21)
    ).subscribe(
      response=>{
        this.carregarocorrencia =false
        this.salvarCSV(response, 'Relatorio de Ocorrencias.csv')
      }
    )
  }








  //===========================================================================================
  salvarCSV(ArrayGigante,relatorio){
    CsvDataService.exportToCsv(relatorio,ArrayGigante);
  }
  
  converterdata(date:Date){
    var ano = date.getFullYear() 
    var mes = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1) 
    var dia = date.getDate() < 10 ? "0"+date.getDate() : date.getDate() 
    var hora = date.getHours() < 10 ? "0"+date.getHours() : date.getHours() 
    var minuto = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes() 
    var segundo = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds() 
    return ano+"-"+mes+"-"+dia;
  }
}
