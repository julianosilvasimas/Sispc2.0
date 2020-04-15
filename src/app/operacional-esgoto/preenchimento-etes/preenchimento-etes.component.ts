import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OperacionalEsgotoService } from '../operacional-esgoto.service';
import { PerformanceService } from 'src/app/performance/performance.service';

@Component({
  selector: 'app-preenchimento-etes',
  templateUrl: './preenchimento-etes.component.html',
  styleUrls: ['./preenchimento-etes.component.css']
})
export class PreenchimentoEtesComponent implements OnInit {

  constructor( private esg:OperacionalEsgotoService, private perf:PerformanceService, private messageService: MessageService) { }

  ListaDeUnidades
  VisibleListaDeUnidades:boolean = true
  VisibleListaDeIndicadores:boolean = false

  ngOnInit() {
    this.Lancamentos();
    this.esg.getunidadesporUser(sessionStorage.getItem('email')).subscribe(
      response=>{
        this.ListaDeUnidades = response
        this.VisibleListaDeUnidades = true
        //=============================================
        // this.Ete = response[0]
        // this.VisibleListaDeUnidades = false
        // this.VisibleListaDeIndicadores = true
        //=============================================
      }
    )
  }

  Ete
  selectEte(linha){
    this.VisibleListaDeUnidades = false
    this.Ete = linha;
    this.VisibleListaDeIndicadores = true
    // this.esg.getunidade(linha.id).subscribe(
      // response=>{
        // this.Ete = response;
        // this.VisibleListaDeIndicadores = true
      // }
    // )
  }  
  voltar(){
    this.VisibleListaDeUnidades = true
    this.VisibleListaDeIndicadores = false
  }
  
  //==========================================================================================================================================
  //LANCAMENTOS DO OPERADOR
  listaDeLancamentos

  Lancamentos(){
    this.carregando = true
    this.listaDeLancamentos = null
    this.esg.getIndicadoresNaoAprovadosUser(sessionStorage.getItem('nome')).subscribe(
      resp=>{
        this.listaDeLancamentos = resp.map(function(obj) {
          obj.dataDaImportacao = obj.dataDaImportacao.substr(8,2)+"/"+obj.dataDaImportacao.substr(5,2)+"/"+obj.dataDaImportacao.substr(0,4)+" "+obj.dataDaImportacao.substr(11,8)
          obj.dataIndicador = obj.dataIndicador.substr(8,2)+"/"+obj.dataIndicador.substr(5,2)+"/"+obj.dataIndicador.substr(0,4)+" "+obj.dataIndicador.substr(11,8)
          return obj
        });
        this.carregando = false
      }
    )
  }


  Lancamento
  visibleCrud:boolean = false
  carregando: boolean = false

  Deletar(lanc){
    this.carregando = true
    this.esg.DeleteLancamento(lanc.id).subscribe(
      resp=>{
        this.Lancamentos();
        this.messageService.add({severity: 'success', summary: 'Deletado com sucesso', detail: 'Deletado com sucesso o id '+lanc.id});
        this.visibleCrud = false
        this.Lancamento = null
        this.carregando = false
      },
      error=>{
        this.messageService.add({severity: 'error', summary: "Erro ao Deletar", detail: 'Erro ao deletar o registro '+lanc.id});
        this.carregando = false
      }
    )
  }
  
  OpenEditar(lanc){
    this.Lancamento = lanc
    this.visibleCrud = true
  }

  Editar(lanc){
    this.carregando = true
    if(lanc.valor != undefined){
      var valor = lanc.valor
      var maximo = lanc.indicador.maximo
      var minimo = lanc.indicador.minimo

      if(minimo!=0 && maximo !=0){
        if(valor>=minimo && valor<=maximo){
          this.salvar1(lanc)
          this.salvar2(lanc)
        }else{
          this.messageService.add({severity: 'error', summary: lanc.nome, detail: 'os valores dessa medição devem estar entre '+minimo+' e '+maximo});
        }

      }else if(maximo != 0){
        if(valor<=maximo){
          this.salvar1(lanc)
          this.salvar2(lanc)
        }else{
          this.messageService.add({severity: 'error', summary: lanc.nome, detail: 'os valores dessa medição devem ser menor do que '+maximo});
        }

      }else if(minimo != 0){
        if(valor>=minimo){
          this.salvar1(lanc)
          this.salvar2(lanc)
        }else{
          this.messageService.add({severity: 'error', summary: lanc.nome, detail: 'os valores dessa medição devem ser maior do que '+minimo});
        }
      }else{
        this.salvar1(lanc)
        this.salvar2(lanc)
      }
    }
  }
  salvar1(lanc){
    this.visibleCrud = false
    lanc.dataDaImportacao = lanc.dataDaImportacao.substr(6,4)+"-"+lanc.dataDaImportacao.substr(3,2)+"-"+lanc.dataDaImportacao.substr(0,2)+" "+lanc.dataDaImportacao.substr(11,8)
    lanc.dataIndicador = lanc.dataIndicador.substr(6,4)+"-"+lanc.dataIndicador.substr(3,2)+"-"+lanc.dataIndicador.substr(0,2)+" "+lanc.dataIndicador.substr(11,8)
  }
  salvar2(novoarray){
    this.esg.EditarLancamento(novoarray).subscribe(
      resp=>{
        this.Lancamentos();
        this.messageService.add({severity: 'success', summary: novoarray.nome, detail: 'Salvo com sucesso'});
        this.Lancamento = null
      },
      error=>{
        this.messageService.add({severity: 'error', summary: "Erro ao enviar", detail: 'Erro ao enviar'});
        this.carregando = false
      }
    )
  }




  EnviarLancamentos(){
    for(var i =0; i < this.listaDeLancamentos.length; i++){
      var lanc = this.listaDeLancamentos[i]
      lanc.dataDaImportacao = lanc.dataDaImportacao.substr(6,4)+"-"+lanc.dataDaImportacao.substr(3,2)+"-"+lanc.dataDaImportacao.substr(0,2)+" "+lanc.dataDaImportacao.substr(11,8)
      lanc.dataIndicador = lanc.dataIndicador.substr(6,4)+"-"+lanc.dataIndicador.substr(3,2)+"-"+lanc.dataIndicador.substr(0,2)+" "+lanc.dataIndicador.substr(11,8)

      this.esg.AprovarLancamento(lanc).subscribe(
        resp=>{
          this.messageService.add({severity: 'success', summary: lanc.nome, detail: 'Salvo com sucesso'});
          this.Lancamento = null
          this.Lancamentos()
        },
        error=>{
          this.messageService.add({severity: 'error', summary: "Erro ao enviar", detail: 'Erro ao enviar'});
          this.carregando = false
        }
      )
    }
  }
  

  converterdata(date:Date){
    var ano = date.getFullYear() 
    var mes = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1) 
    var dia = date.getDate() < 10 ? "0"+date.getDate() : date.getDate() 
    var hora = date.getHours() < 10 ? "0"+date.getHours() : date.getHours() 
    var minuto = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes() 
    var segundo = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds() 
    return ano+"-"+mes+"-"+dia + " "+hora+":"+minuto+":"+segundo;
  }
}
