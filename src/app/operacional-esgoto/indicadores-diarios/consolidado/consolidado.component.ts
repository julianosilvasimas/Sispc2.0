import { Component, OnInit } from '@angular/core';
import { OperacionalEsgotoService } from '../../operacional-esgoto.service';
import { MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { PerformanceService } from 'src/app/performance/performance.service';

@Component({
  selector: 'app-consolidado',
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.css']
})
export class ConsolidadoComponent implements OnInit {

  constructor(private esg:OperacionalEsgotoService, private adminServ:AppComponent,  private messageService: MessageService) {
    this.listaDeUnidades = this.adminServ.Unidades;
   }
 
  ngOnInit() {
    this.AtualizarUnidades();
    this.listaDeUnidades = this.adminServ.Unidades;
  }

  listaDeUnidades
  listaDeClassificacoes
  listaDeIndicadores
  listaCriada: any[] = []

  unidadeSelecionada
  classificacaoSelecionada
  IndicadorSelecionado
  Data
  checkbotao:boolean= true
  displayIndicador1:boolean= false
  displayIndicador:boolean= false


  //===================================================================================================
  //ATUALIZAR ARRAYS

  AtualizarUnidades(){
    this.esg.getclassificacoes().subscribe(
      response=>{
        this.listaDeClassificacoes = response
      }
    )
  }

  atualizaIndicadores(valor){
    this.listaDeIndicadores = null
    this.IndicadorSelecionado = null
    var classificacao = valor.toElement.innerText
    for(var x in this.listaDeClassificacoes) {
      if(this.listaDeClassificacoes[x].nome.indexOf(classificacao)>=0){
        this.classificacaoSelecionada = this.listaDeClassificacoes[x]
        this.esg.getindicadorporclassificaco(this.listaDeClassificacoes[x].id).subscribe(
          response=>{
            this.listaDeIndicadores = response
          }
        )
        break;  
      }
    }
    this.checkbotao=true
  }
  

  //===================================================================================================
  //HABILITAR OU DESABILITAR BOTÃO DE PESQUISA

  checarBotao(){
    if(this.classificacaoSelecionada.nome !=null && this.IndicadorSelecionado != undefined && this.Data !=null){
      this.checkbotao=false
    }
  }

  //===================================================================================================
  //BOTÃO DE ESCOLHER INDICADOR

  ListaDeIndicadoresDiarios

  IndicadorDiarioSelecionado
  Escolher(){
    this.IndicadorDiarioSelecionado = null
    this.ListaDeIndicadoresDiarios = this.adminServ.ListaDeIndicadoresDiarios;


    for(var i =0;i<this.adminServ.ListaDeIndicadoresDiarios.length;i++){
      console.log(this.adminServ.ListaDeIndicadoresDiarios[i])
      if(this.adminServ.ListaDeIndicadoresDiarios[i].indicadorId === this.IndicadorSelecionado.indicadoresDiarios){
        this.IndicadorDiarioSelecionado = this.adminServ.ListaDeIndicadoresDiarios[i]
        break;
      }
    }

    this.listaCriada = []
    var primeirodia = new Date(this.Data.getFullYear(), this.Data.getMonth(), this.Data.getDate())
    var ultimodia = new Date(primeirodia.getFullYear(), primeirodia.getMonth() + 1, 0)

    this.esg.PesquisarLancamentoUnidadeIndicador(this.unidadeSelecionada.id, this.IndicadorSelecionado.id,this.converterdata(primeirodia), this.converterdata(ultimodia)).subscribe(
      response=>{

        for(var dia = this.Data; dia<=ultimodia; dia.setDate(dia.getDate()+1)){
          this.calculo(this.IndicadorSelecionado.calculo,response,this.converterdata(dia))
        }
        this.displayIndicador = true
        // console.log(this.listaCriada)

      }
    )
  }


  //===================================================================================================
  //SEPARAR E CALCULAR ARRAY

  calculo(formadecalculo,array, data){
    var calculo = 0
    var TipoDecalculo
    var arrayfiltrado = array.filter(
      function(e){
        if(e.dataIndicador.indexOf(data)>=0){
          return e;
        }
      }
    )
    calculo = this.calcular(arrayfiltrado,formadecalculo)
    

    TipoDecalculo = formadecalculo == 1 ? "SOMA" : formadecalculo == 2 ? "MÉDIA" : formadecalculo == 3 ? "ÚLTIMO" : formadecalculo == 4 ? "MAIOR" : formadecalculo == 5 ? "MENOR" : ""


    var arrayMontado = {
      data: data,
      calculo: calculo,
      tipoDeCalculo: TipoDecalculo,
      array: arrayfiltrado
    }
    this.listaCriada.push(arrayMontado)
  }

  calcular(arrayfiltrado,formadecalculo){
    var calculo=0
    for(var i =0; i<arrayfiltrado.length;i++){
        
        //SOMA
      if(formadecalculo==1){
        calculo = arrayfiltrado[i].valor + calculo
      
        //MÉDIA
      }else if(formadecalculo==2){
        calculo = calculo == 0 ? arrayfiltrado[i].valor : arrayfiltrado[i].valor + calculo / 2

        //ÚLTIMO
      }else if(formadecalculo==3){
        calculo = arrayfiltrado[i].valor
      
        //MAIOR
      }else if(formadecalculo==4){
        calculo = arrayfiltrado[i].valor > calculo ? arrayfiltrado[i].valor : calculo

        //MENOR
      }else if(formadecalculo==5){
        calculo = calculo == 0 ? arrayfiltrado[i].valor  : arrayfiltrado[i].valor < calculo ? arrayfiltrado[i].valor : calculo
        
      }
    }
    return calculo
  }



  //===================================================================================================
  //ABRIR DETALHAMENTO DO DIA

  RegistroSelected
  abrirRegistros
  selecionar(unidade){
      this.RegistroSelected = unidade.data.array
      this.abrirRegistros = true
  }

  //===================================================================================================
  //EDITAR LANCAMENTOS DO OPERADOR

  edicao:boolean = false
  objetoEditadoId
  objetoEditadoValor
  objetoEditadoData
  novoregistro(){
    this.edicao = true
    this.objetoEditadoValor = 0
    this.objetoEditadoId = 0
    this.objetoEditadoData = null
  }
  adicionareditarregistros(event){
    this.edicao = true
    this.objetoEditadoId = event.data.id
    this.objetoEditadoValor = event.data.valor
    this.objetoEditadoData = new Date(event.data.dataIndicador)
  }
  salvaAlteracao(){
    var array = 
    {
      id: this.objetoEditadoId,
      valor: this.objetoEditadoValor,
      indicador: this.IndicadorSelecionado.id,
      unidade: this.unidadeSelecionada.id,
      data: this.converterdatahora(this.objetoEditadoData),
      usuario: sessionStorage.getItem('nome'),
    }

    this.esg.AlterarLancamento(array, this.objetoEditadoId).subscribe(
      response=>{
        this.messageService.add({severity: 'success', summary: 'Salvo com sucesso', detail: 'Salvo com sucesso'});
        this.edicao = false
      },
      error=>{
        this.messageService.add({severity: 'error', summary: "Erro ao Salvar", detail: 'Erro ao Salvar'});
        this.edicao = false
      }
    )
  }

  




  //===================================================================================================
  // ENVIAR PARA INDICADORES DIÁRIOS

  enviarparaindicadoresdiarios(){
    var indicadorDiario = this.IndicadorSelecionado.indicadoresDiarios
    for(var i = 0; i< this.listaCriada.length; i++){
      var array = {
        indicadordiario: indicadorDiario,
        datas: this.listaCriada[i].data,
        valor: this.listaCriada[i].calculo,
        usuario: sessionStorage.getItem('nome'),
      }
      console.log(array)
      this.esg.EnviarPraIndDiario(array).subscribe(
        response=>{
          this.messageService.add({severity: 'success', summary: 'Salvo com sucesso', detail: 'Salvo com sucesso a data '+array.datas});
          this.edicao = false
        },
        error=>{
          this.messageService.add({severity: 'error', summary: "Erro ao Salvar", detail: 'Erro ao Salvar'});
          this.edicao = false
        }
      )
    }
  }
  //===================================================================================================
  // CONVERTER DATA 

  converterdata(date:Date){
    var ano = date.getFullYear() 
    var mes = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1) 
    var dia = date.getDate() < 10 ? "0"+date.getDate() : date.getDate() 
    var hora = date.getHours() < 10 ? "0"+date.getHours() : date.getHours() 
    var minuto = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes() 
    var segundo = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds() 
    return ano+"-"+mes+"-"+dia;
  }
  converterdatahora(date:Date){
    var ano = date.getFullYear() 
    var mes = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1) 
    var dia = date.getDate() < 10 ? "0"+date.getDate() : date.getDate() 
    var hora = date.getHours() < 10 ? "0"+date.getHours() : date.getHours() 
    var minuto = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes() 
    var segundo = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds() 
    return ano+"-"+mes+"-"+dia+" "+hora+":"+minuto+":"+segundo;
  }
}