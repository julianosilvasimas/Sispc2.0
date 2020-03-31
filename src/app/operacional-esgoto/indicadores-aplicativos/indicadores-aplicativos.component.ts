import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import{ OperacionalEsgotoService } from '../operacional-esgoto.service';
import{ PerformanceService } from '../../performance/performance.service';
import{ AdminIndicadoresService } from '../../performance/admin-indicadores/admin-indicadores.service';
import { CsvDataService } from 'src/app/csv-data.service';

@Component({
  selector: 'app-indicadores-aplicativos',
  templateUrl: './indicadores-aplicativos.component.html',
  styleUrls: ['./indicadores-aplicativos.component.css']
})
export class IndicadoresAplicativosComponent implements OnInit {


  constructor(private esg:OperacionalEsgotoService, private perf:PerformanceService, private perf2:AdminIndicadoresService ,private messageService: MessageService) { }

  //LISTAS
  ListaDeUnidades
  ListaDeClassificacoes

  //SELECIONADOS
  UnidadeSelecionada
  ClassificacaoSelecionada
  referencia

  //CHAVES DE ATIVAÇÃO
  carregando: boolean = false


  ngOnInit() {
    this.esg.getunidades().subscribe(
      response=>{
        this.ListaDeUnidades = response
        this.UnidadeSelecionada = this.ListaDeUnidades[1]
      }
    )
    this.esg.getclassificacoes().subscribe(
      response=>{
        this.ListaDeClassificacoes = response
        this.ClassificacaoSelecionada = this.ListaDeClassificacoes[5]
        this.referencia = new Date('2020-03-01 00:00:00')
        this.consultar()
      }
    )
  
  }

  //==============================================================================================================================================================
  
  //LISTAS
  indicadoresVolume: any[] =[]
  arrayDePreenchimentos:any[] = []
  arrayZao:any[] = []
  
  cols
  cols2

  //SELECIONADOS
  frozenColumn
  scroolableColumn

  //CHAVES DE ATIVAÇÃO


  consultar(){
    this.frozenColumn = []
    this.scroolableColumn = []
    this.carregando = true
    this.arrayZao=[]
    this.cols =[]
    this.cols2 =[]
    if(this.ClassificacaoSelecionada===undefined || this.UnidadeSelecionada==undefined || this.referencia==undefined){
      this.messageService.add({severity: 'info', summary: 'Faltam campos', detail: 'Falta preencher alguns campos'});

    }else{
      this.cols2 = [
        { field: 'data', header: 'data' },
        { field: 'volOrca', header: 'volOrca' },
        { field: 'volReal', header: 'volReal' },
      ]
      this.esg.getindicadorporclassificaco(this.ClassificacaoSelecionada.id).subscribe(
        resp=>{
          this.cols = resp

          //---------------------------------------------------------------------------------------------------------------
          this.perf2.indicadoresByMonth(this.converterdata(this.referencia),this.UnidadeSelecionada.volume).subscribe(
            resp=>{
              this.indicadoresVolume = resp
              var datainicio = resp[0].dataindicador
              var datafim = resp[(resp.length-1)].dataindicador
              
              this.esg.getIndicadoresUnidade(this.UnidadeSelecionada.id,datainicio,datafim,this.ClassificacaoSelecionada.id).subscribe(
                response=>{
                  this.arrayDePreenchimentos = response
                  for(var i = 0; i<this.indicadoresVolume.length; i++){
                    this.arrayZao.push(
                      { 
                        data: this.indicadoresVolume[i].dataindicador, 
                        volOrca: this.indicadoresVolume[i].orcado,
                        volReal: this.indicadoresVolume[i].realizado
                      }
                    ) 
                    for(var j = 0; j<this.cols.length; j++){
                      var array = this.filtrararray(response,this.cols[j].tagIndicador,this.indicadoresVolume[i].dataindicador)
                      this.arrayZao[i][this.cols[j].tagIndicador] ={  valor: this.filtrarsomatorio(array),  array: array  }
                    }
                  }

                  for(var j = 0; j<this.cols.length; j++){
                    this.scroolableColumn.push({ field: this.cols[j].tagIndicador , header: this.cols[j].tagIndicador })
                    this.cols2.push({ field: this.cols[j].tagIndicador , header: this.cols[j].tagIndicador })
                  }
                  
                  this.carregando = false
                }
              )
              
            }
          )    
          //---------------------------------------------------------------------------------------------------------------
        }
      );


      
    }
  }
  
  filtrararray(dados, criterio,data){
    // console.log(criterio)
    // console.log(data)
    var valor = 0
    var paraEstaData = dados.filter((unidades) => {
      var dados = unidades.indicador.tagIndicador.includes(criterio)
      return dados
    })
    paraEstaData = paraEstaData.filter((unidades) => {
      var dados = unidades.dataIndicador.includes(data)
      return dados
    })

    return paraEstaData; 
  }

  filtrarsomatorio(dados){
    var valor=0;
    for(var j =0;j<dados.length;j++){
      valor = valor + dados[j].valor
    }

    return valor; 
  }

  salvarCSV(){
    this.carregando = true
    var array:any[]= this.arrayZao;


    for(var j = 0; j<array.length; j++){
      for(var i = 0; i<this.cols2.length; i++){
        if(i>0){
          if(i>2){
            array[j][this.cols2[i].header] = array[j][this.cols2[i].header].valor
          } 
          array[j][this.cols2[i].header] = array[j][this.cols2[i].header]
        }
      }     
    }
    CsvDataService.exportToCsv('Dados Esgoto.csv', array);
    this.carregando = false
  }
  salvarCSV2(){
    this.carregando = true
    for(var i = 0; i<this.arrayDePreenchimentos.length; i++){
      this.arrayDePreenchimentos[i].indicador=this.arrayDePreenchimentos[i].indicador.tagIndicador
      this.arrayDePreenchimentos[i].unidade=this.arrayDePreenchimentos[i].indicador.unidade 
      this.arrayDePreenchimentos[i].valor=this.arrayDePreenchimentos[i].valor
    }
    CsvDataService.exportToCsv('Dados Esgoto Detalhado.csv', this.arrayDePreenchimentos);
    this.carregando = false
  }
  //==============================================================================================================================================================
  
  displayDialog: boolean = false
  arrayDeUnidade: any[] = []

  onRowSelect(event) {
    this.arrayDeUnidade = []
    for(var j = 3; j<this.cols2.length; j++){ 
      var coluna = this.cols2[j].header
      var objarr = event.data[coluna].array
      for(var k = 0; k<objarr.length; k++){
        this.arrayDeUnidade.push(objarr[k])
      }
    }
    this.displayDialog = true;
  }



  //==============================================================================================================================================================
  converterdata(date:Date){
    var ano = date.getFullYear() 
    var mes = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1) 
    var dia = date.getDate() < 10 ? "0"+date.getDate() : date.getDate() 
    return ano+"-"+mes+"-"+dia
  }
}

