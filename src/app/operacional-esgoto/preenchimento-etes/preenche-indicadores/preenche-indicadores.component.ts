import { Component, OnInit, Input, Inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OperacionalEsgotoService } from '../../operacional-esgoto.service';
import { PerformanceService } from 'src/app/performance/performance.service';
import { PreenchimentoEtesComponent } from '../preenchimento-etes.component';

@Component({
  selector: 'app-preenche-indicadores',
  templateUrl: './preenche-indicadores.component.html',
  styleUrls: ['./preenche-indicadores.component.css']
})
export class PreencheIndicadoresComponent implements OnInit {

  constructor( private esg:OperacionalEsgotoService, private perf:PerformanceService, private messageService: MessageService, private ss:PreenchimentoEtesComponent) { }

  @Input() ETE;
  horario

  arrayDeClassificacoes:any[] = []
  ngOnInit() {
    this.esg.getindicadorporUnidade(this.ETE.id).subscribe(
      resp=>{
        // console.log(resp)
        var indicadores = resp
        for(var i = 0; i<indicadores.length; i++){
          var qualificador = true;
    
          for(var j=0 ; j<this.arrayDeClassificacoes.length ; j++){
            if(this.arrayDeClassificacoes[j].id === indicadores[i].classificacao.id){
              qualificador =false;
              break;
            }
          }
    
          if(qualificador){
            this.arrayDeClassificacoes.push(indicadores[i].classificacao)
          }
    
        }
    
        for(var i = 0; i<this.arrayDeClassificacoes.length; i++){
          this.arrayDeClassificacoes[i].indicador = []
          
          for(var j=0;j<indicadores.length;j++){
            if(indicadores[j].classificacao.id == this.arrayDeClassificacoes[i].id){
              this.arrayDeClassificacoes[i].indicador.push(indicadores[j])
            }
          }
        }
      }
    )


    
    // console.log(this.arrayDeClassificacoes)

    //=============================================
    // this.Classificacao = this.arrayDeClassificacoes[0]  
    // this.visibleSidebar = true
    // this.visibleNotificacoes=true
    //=============================================
  }


  voltar(){
    this.ss.voltar()
    this.ss.Lancamentos()
  }


  visibleSidebar:boolean = false
  verIndicadores(classificacao){
    this.Classificacao = classificacao
    // console.log(classificacao)
    this.visibleSidebar = true
  }

  //========================================================================================================================================
  Classificacao

  validarnumero(indicador){
    // console.log(indicador)
  }


  salvar(array){

    if(this.horario != undefined){

      for(var i = 0; i< array.length ; i++){
        if(array[i].valor != undefined){
          var valor = array[i].valor
          var maximo = array[i].maximo
          var minimo = array[i].minimo

          if(minimo!=0 && maximo !=0){
            if(valor>=minimo && valor<=maximo){
              this.salvar2(array[i])
              array[i].valor = undefined
            }else{
              this.messageService.add({severity: 'error', summary: array[i].nome, detail: 'os valores dessa medição devem estar entre '+minimo+' e '+maximo});
            }

          }else if(maximo != 0){
            if(valor<=maximo){
              this.salvar2(array[i])
              array[i].valor = undefined
            }else{
              this.messageService.add({severity: 'error', summary: array[i].nome, detail: 'os valores dessa medição devem ser menor do que '+maximo});
            }

          }else if(minimo != 0){
            if(valor>=minimo){
              this.salvar2(array[i])
              array[i].valor = undefined
            }else{
              this.messageService.add({severity: 'error', summary: array[i].nome, detail: 'os valores dessa medição devem ser maior do que '+minimo});
            }
          }else{
            this.salvar2(array[i])
            array[i].valor = undefined
          }
        }
      }

      this.visibleSidebar = false
    }else{
      this.visibleSidebar = false
      this.messageService.add({severity: 'warn', summary: 'HORÁRIO!!', detail: 'Preencha o campo de Horário'});
    }

  }

  salvar2(array){
    var novoarray =
    {
      id: null,
      dataDaImportacao: null,
      dataIndicador: this.converterdata(this.horario),
      usuario: sessionStorage.getItem('nome'),
      valor: array.valor,
      unidade: {
        id: this.ETE.id
      },
      indicador: {
        id: array.id,
      },
      aprovado: 0
    } 
    this.esg.InserirLancamento(novoarray).subscribe(
      resp=>{
        this.messageService.add({severity: 'success', summary: array.nome, detail: 'Salvo com sucesso'});
      },
      error=>{
        this.messageService.add({severity: 'error', summary: "Erro ao enviar", detail: 'Erro ao enviar'});
      }
    )
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

  //=====================================================================================================================
  //enviar notificacoes
  visibleNotificacoes:boolean=false
  NotificacaoTexto


  AbrirMural(){
    this.Notificacoes()
    this.visibleNotificacoes = true
    this.NotificacaoTexto = null
  }

  SalvarNotificacao(){
    var novoarray =
    {
      id: null,
      dataDaCriacao: null,
      unidade: this.ETE.unidade,
      admin: 0,
      usuario: sessionStorage.getItem('nome'),
      texto: this.NotificacaoTexto
    } 
    // console.log(novoarray)
    this.esg.InserirNotificacao(novoarray).subscribe(
      resp=>{
        this.messageService.add({severity: 'success', summary: "Salvo", detail: 'Salvo com sucesso'});
        this.visibleNotificacoes = false
        
      },
      error=>{
        this.messageService.add({severity: 'error', summary: "Erro ao enviar", detail: 'Erro ao enviar'});
      }
    )
  }

  ListaDeNotificacoes
  Notificacoes() {
    this.esg.getNotificacao().subscribe(
      resp=>{
        this.ListaDeNotificacoes = resp.map(function(obj) {
          obj.dataDaCriacao = obj.dataDaCriacao.substr(8,2)+"/"+obj.dataDaCriacao.substr(5,2)+"/"+obj.dataDaCriacao.substr(2,2)+" "+obj.dataDaCriacao.substr(11,8)
          return obj
        });
      }
    )
  }
}
