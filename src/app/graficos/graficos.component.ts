import { Component, OnInit, Input } from '@angular/core';
import { PerformanceService } from '../performance/performance.service';
import { Indicador } from '../performance/performance.model';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {
  
  //GRAFICOS
  eixo: any;
  orcado: any;
  realiz: any;
  orcadoDiaAc: any;
  realizDiaAc: any;
  tipoGrafico: any ;
  Tendencia: any ;
  Cor1: any ;
  Cor2: any ;
  Cor3: any ;
  Cor4: any ;

  //DADOS
  public temp1: any;
  public temp2: any;
  public RotuloOrcadoAcum: any;
  public RotuloRealizAcum: any
  public RotuloOrcadoMedia: any;
  public RotuloRealMedia: any
  public RotuloDiferencaAcum: any;
  public RotuloDiferencaPerc: any;
  public RotuloOrcadoMensal: any;
  public RotuloPrevisaoMensal: any;
  public tipoGraph: any;

  //ROTULO DOS DADOS
  public campo1 = "Realizado Acumulado"
  public campo2 = "Orçado Acumulado"
  public campo3 = "Δ (Realizado-Orçado)"
  public campo4 = "Variação Percentual"
 
  //COMENTARIOS
  comentar1: any;
  responsaveis1: any;
  datas1: any;

  comentar2: any;
  responsaveis2: any;
  datas2: any;

  comentarCom: any[];
  responsaveisCom: any[];
  datasCom: any[];

  @Input() indicador : Indicador;
  @Input() refer;
  @Input() element;
  @Input() gerencia;

  indicadorId:number;
  tipoindicador:string;
  title = 'projeto';
  data: any;
  options: any;

    
    ngOnInit() {
      this.comentarCom = [];
      this.responsaveisCom = [];
      this.datasCom = [];
      this.Validador(this.element)
    }

    constructor(private performanceService: PerformanceService) {
    }

    // TIPOGRAPH 1 == Receitas (REALIZADO, ORÇADO, REALIZADO ACUMULADO, ORÇADO ACUMULADO)
    // TIPOGRAPH 2 == Acumulados (REALIZADO ACUMULADO, ORÇADO ACUMULADO)
    // TIPOGRAPH 3 == TemposMedia (REALIZADO MEDIA, ORÇADO MEDIA) Formato de HORA

    Validador(indic){
      this.performanceService.indicadores(this.refer, indic.indicadorId)
      .subscribe(
        indicador  =>  {
        //Consulta endpoint que possui os nomes dos indicadores
        //=======================================================================================
        this.tipoindicador = indic.indicador
        this.tipoGraph = indic.tipoGrafico
        this.indicadorId = indic.indicadorId
        this.Tendencia = indic.tendencia

        //Consulta do EIXO
        //=======================================================================================
      
        this.eixo =indicador[0]
        this.eixo = this.eixo.splice(1, Number.MAX_VALUE)
        this.eixo  = this.eixo.filter(item => item !== null)


        //ROTULOS DE COMENTARIOS
        //========================================================================================

        this.temp1 = indicador[1]
        this.temp1 = this.temp1.splice(1, Number.MAX_VALUE)

        var responsaveis: any
        responsaveis = indicador[2]
        responsaveis = responsaveis.splice(1, Number.MAX_VALUE)
        
        
        this.PreencherComentarios(this.temp1, responsaveis,this.eixo)



        //ROTULOS DE ACUMULADOS
        //========================================================================================
        this.temp1  = indicador[3]

        this.RotulosAcumulados(this.tipoGraph, this.temp1)

        var orcado: any; 
        orcado = indicador[4]
        orcado = orcado.splice(1, Number.MAX_VALUE)

        var realiz: any; 
        realiz = indicador[5]
        realiz = realiz.splice(1, Number.MAX_VALUE)

        var orcadoDiaAc: any; 
        orcadoDiaAc = indicador[6]
        orcadoDiaAc = orcadoDiaAc.splice(1, Number.MAX_VALUE)

        var realizDiaAc: any; 
        realizDiaAc = indicador[7]
        realizDiaAc = realizDiaAc.splice(1, Number.MAX_VALUE)

        var orcadoDiaMed: any; 
        orcadoDiaMed = indicador[8]
        orcadoDiaMed = orcadoDiaMed.splice(1, Number.MAX_VALUE)

        var realizDiaMed: any; 
        realizDiaMed = indicador[9]
        realizDiaMed = realizDiaMed.splice(1, Number.MAX_VALUE)

        var Minimo: any; 
        Minimo = indicador[10]
        Minimo = Minimo.splice(1, Number.MAX_VALUE)

        var Maximo: any; 
        Maximo = indicador[11]
        Maximo = Maximo.splice(1, Number.MAX_VALUE)

        var Meta: any; 
        Meta = indicador[12]
        Meta = Meta.splice(1, Number.MAX_VALUE)

        var MetaAcumulada: any; 
        MetaAcumulada = indicador[13]
        MetaAcumulada = MetaAcumulada.splice(1, Number.MAX_VALUE)

        var DentroPrazoReg: any; 
        DentroPrazoReg = indicador[14]
        DentroPrazoReg = DentroPrazoReg.splice(1, Number.MAX_VALUE)

        var DentroPrazo: any; 
        DentroPrazo = indicador[15]
        DentroPrazo = DentroPrazo.splice(1, Number.MAX_VALUE)

        this.EscolherTipoGrafico(this.tipoGraph,this.eixo,orcado,realiz,orcadoDiaAc,realizDiaAc,orcadoDiaMed,realizDiaMed, Minimo, Maximo,Meta,MetaAcumulada,DentroPrazoReg,DentroPrazo)
        });
  }


  EscolherTipoGrafico(TipoGraph,eixo,orcado, realiz,  orcadoDiaAc,realizDiaAc,orcadoDiaMed,realizDiaMed, Minimo, Maximo,Meta,MetaAcumulada,DentroPrazoReg,DentroPrazo){

  //REMOVER FINAIS DE SEMANA E ORÇADOS ZERADOS
  //========================================================================================
  let indice= 0
  // while(indice <33){     
  //   let soma =  (realiz[indice]+orcado[indice]+Minimo[indice]+Maximo[indice]+DentroPrazoReg[indice]+DentroPrazo[indice])
  //   if(soma==0){   
  //     eixo.splice(indice, 1)
  //     orcado.splice(indice, 1)
  //     realiz.splice(indice, 1)
  //     orcadoDiaAc.splice(indice, 1)
  //     realizDiaAc.splice(indice, 1)
  //     orcadoDiaMed.splice(indice, 1)
  //     realizDiaMed.splice(indice, 1)
  //     Minimo.splice(indice, 1)
  //     Maximo.splice(indice, 1)
  //     Meta.splice(indice, 1)
  //     MetaAcumulada.splice(indice, 1)
  //     DentroPrazoReg.splice(indice, 1)
  //     DentroPrazo.splice(indice, 1)
  //     indice=0
  //   }
  //   indice =indice+1
  // }
  // while(indice <34){     
  //   let soma =  (realiz[indice]+orcado[indice]+realizDiaAc[indice]+orcadoDiaAc[indice])
  //   if(soma==0){   
  //     Meta.splice(indice, 1)
  //     orcado.splice(indice, 1)
  //     Minimo.splice(indice, 1)
  //     Maximo.splice(indice, 1)
  //     indice=0
  //   }
  //   indice =indice+1
  // }

  //CORTAR REALIZADOS ZERADOS ATÉ A ULTIMA ATUALIZAÇÃO
  //========================================================================================
  // indice = 0
  // let soma = 0 
  // while(indice <33){  
  //   soma =0
  //   for(var i=indice; i<33;i++){
  //     var real = realiz[i]
  //     if(real=="-"){
  //     }
  //     soma = (real + soma)
  //   }
  //   if(soma==0){ 
  //     realizDiaAc.splice(indice, 1)
  //   }
  //   indice =indice+1
  // }

  //SEPARAR TIPOS DE GRAFICO
  //========================================================================================
  //ORCADO - REALIZADO - SUM ORCADO - SUM REALIZADO 
  if(TipoGraph==1){
    this.Tipo1(eixo,orcado,realiz,orcadoDiaAc,realizDiaAc);

  //MESMOGRAFICO DE CIMA SÓ QUE COM ROTULOS COLADOS EM QTD SEM VIRGULA
  }else if(TipoGraph==8){
      this.Tipo8(eixo,orcado,realiz,orcadoDiaAc,realizDiaAc);
      
  //SUM ORCADO - SUM REALIZADO 
  }else if(TipoGraph==2){
    this.Tipo2(eixo,orcadoDiaAc,realizDiaAc);

  //AVG ORCADO - AVG REALIZADO 
  }else if(TipoGraph==3){
    this.Tipo3(eixo,orcado,realiz);

  //AVG MAXIMO - AVG MINIMO - AVG MEDIA 
  }else if(TipoGraph==4){
    this.Tipo4(eixo, Minimo, Maximo,realiz);
  
  //META - DENTRO DO PRAZO - DENTRO DO PRAZO REGULADO
  }else if(TipoGraph==5){
    this.Tipo5(eixo, Meta, DentroPrazoReg, DentroPrazo);

  }else if(TipoGraph==6){
    this.Tipo679(eixo, orcadoDiaAc, realizDiaAc, MetaAcumulada);

  }else if(TipoGraph==7){
    this.Tipo679(eixo, orcado, realiz, Meta);
  
  }else if(TipoGraph==9){
    this.Tipo679(eixo, orcado, realiz, Meta);
  }
}






  //____________________________________________________________________________________________
  ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
  //TIPOS DE GRAFICOS


  //BARLINE TIPO RECEITADIRETA
  Tipo1(eixo,orcado,realiz,orcadoDiaAc,realizDiaAc){
    this.data = {
      labels: this.eixo,
      datasets: [
        {type: 'line',
          pointStyle: 'circle',
          yAxisID: 'y-axis-2',
          fill: false,
          borderDash: [2,2],
          pointRadius: 0,
          borderWidth: 1,
          borderColor: '#253f93',
          label: 'Orçado Acumulado',
          data: orcadoDiaAc
          
      },
      {
          type: 'line',
          yAxisID: 'y-axis-2',
          fill: false,
          borderWidth: 1,
          borderColor: '#253F93',
          backgroundColor: '#253f93',
          label: 'Realizado Acumulado',
          data: realizDiaAc
      },
      {
        label: 'Orçado',
        yAxisID: 'y-axis-1',
        backgroundColor: '#6C8CC7',
        borderColor: '#6C8CC7',
        data: orcado
    },
    {
        label: 'Realizado',
        yAxisID: 'y-axis-1',
        backgroundColor: '#88D1D1',
        borderColor: '#88D1D1',
        data: realiz
    }  
    ]
        
    }
    this.options = {
      responsive: true,
      stacked: false,
        title: {
          display: true,
          fontSize: 16
        },
        gridLines: {
          display: true,
          drawborder: true,
          drawOnChartArea:false
        },
        scales: {
          yAxes: [{
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: true,
              drawborder: true,
              drawOnChartArea:false
            },
            ticks: {
              beginAtZero: true
            },
          }, {
            type: 'linear', 
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: true,
              drawborder: true,
              drawOnChartArea:false
            },
            scales: {
              yAxes: [{
                ticks: {
                    beginAtZero: true
                }
              }]
            },
          }],
        },
        legend: {
            position: 'bottom'
        }
    }
  }

  //GRAFICOS DE QUANTIDADES
  Tipo8(eixo,orcado,realiz,orcadoDiaAc,realizDiaAc){
    this.data = {
      labels: this.eixo,
      datasets: [
        {type: 'line',
          pointStyle: 'circle',
          yAxisID: 'y-axis-2',
          fill: false,
          borderDash: [2,2],
          pointRadius: 0,
          borderWidth: 1,
          borderColor: '#253f93',
          label: 'Orçado Acumulado',
          data: orcadoDiaAc
          
      },
      {
          type: 'line',
          yAxisID: 'y-axis-2',
          fill: false,
          borderWidth: 1,
          borderColor: '#253F93',
          backgroundColor: '#253f93',
          label: 'Realizado Acumulado',
          data: realizDiaAc
      },
      {
        label: 'Orçado',
        yAxisID: 'y-axis-1',
        backgroundColor: '#6C8CC7',
        borderColor: '#6C8CC7',
        data: orcado
    },
    {
        label: 'Realizado',
        yAxisID: 'y-axis-1',
        backgroundColor: '#88D1D1',
        borderColor: '#88D1D1',
        data: realiz
    }  
    ]
        
    }
    this.options = {
      responsive: true,
      stacked: false,
        title: {
          display: true,
          fontSize: 16
        },
        gridLines: {
          display: true,
          drawborder: true,
          drawOnChartArea:false
        },
        scales: {
          yAxes: [{
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: true,
              drawborder: true,
              drawOnChartArea:false
            },
            ticks: {
              beginAtZero: true
            },
          }, {
            type: 'linear', 
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: true,
              drawborder: true,
              drawOnChartArea:false
            },
            scales: {
              yAxes: [{
                ticks: {
                    beginAtZero: true
                }
              }]
            },
          }],
        },
        legend: {
            position: 'bottom'
        }
    }
  }

  //TIPO TMA TME 2 EIXOS
  Tipo2(eixo,orcadoDiaAc,realizDiaAc){
    this.data = {
      labels: this.eixo,
      datasets: [
        {
        type: 'line',
        fill: false,
        borderDash: [2,2],
        pointRadius: 0,
        borderWidth: 1,
        label: 'Orçado',
        backgroundColor: '#6C8CC7',
        borderColor: '#6C8CC7',
        data: orcadoDiaAc
      },
      {
        type: 'line',
        fill: false,
        label: 'Realizado',
        borderWidth: 1,
        backgroundColor: '#253F93',
        borderColor: '#253F93',
        data: realizDiaAc
      }  
      ]
        
    }
    this.options = {
      responsive: false,
      stacked: false,
        title: {
          display: true,
          fontSize: 16
        },
        gridLines: {
          display: true,
          drawborder: true,
          drawOnChartArea:false
        },
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero: true
            }
          }]
        },
        legend: {
            position: 'bottom'
        }
      }
  }

  //TIPO TMA TME
  Tipo3(eixo,orcado,realiz){
    this.data = {
      labels: this.eixo,
      datasets: [
        {
        type: 'line',
        fill: false,
        borderDash: [2,2],
        pointRadius: 0,
        borderWidth: 1,
        label: 'Orçado',
        backgroundColor: '#6C8CC7',
        borderColor: '#6C8CC7',
        data: orcado
      },
      {
        type: 'line',
        fill: false,
        label: 'Realizado',
        borderWidth: 1,
        backgroundColor: '#253F93',
        borderColor: '#253F93',
        data: realiz
      }  
      ]
        
    }
    this.options = {
      responsive: false,
      stacked: false,
        title: {
          display: true,
          fontSize: 16
        },
        gridLines: {
          display: true,
          drawborder: true,
          drawOnChartArea:false
        },
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero: true
            }
          }]
        },
        legend: {
            position: 'bottom'
        }
    }
  }

  //tipo maximo minimo media
  Tipo4(eixo,minimo,maximo,realiz){
    this.data = {
      labels: this.eixo,
      datasets: [
        {
        type: 'line',
        fill: false,
        borderDash: [2,2],
        pointRadius: 0,
        borderWidth: 1,
        label: 'Maximo',
        backgroundColor: '#6C8CC7',
        borderColor: '#6C8CC7',
        data: maximo
      },{
        type: 'line',
        fill: false,
        borderDash: [2,2],
        pointRadius: 0,
        borderWidth: 1,
        label: 'Minimo',
        backgroundColor: '#6C8CC7',
        borderColor: '#6C8CC7',
        data: minimo
      },
      {
        type: 'line',
        fill: false,
        label: 'Realizado',
        borderWidth: 1,
        backgroundColor: '#253F93',
        borderColor: '#253F93',
        data: realiz
      }  
      ]
        
    }
    this.options = {
      scales: {
        yAxes: [{
          barPercentage: 0.5,
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true
          } 
       }]
      },
      responsive: false,
      stacked: false,
        title: {
          display: true,
          fontSize: 16
        },
        gridLines: {
          display: true,
          drawborder: true,
          drawOnChartArea:false
        },
        ticks: {
          beginAtZero: true
        },
        legend: {
            position: 'bottom'
        }   
    }
  }

  //tipo prazo serviços
  Tipo5(eixo, Meta, DentroPrazoReg, DentroPrazo){
    this.data = {
      labels: this.eixo,
      datasets: [
        {
          type: 'line',
          fill: false,
          borderDash: [2,2],
          pointRadius: 0,
          borderWidth: 2,
          label: 'Meta',
          borderColor: '#6C8CC7',
          data: Meta
        },
        {
        type: 'bar',
        fill: false,
        borderDash: [2,2],
        pointRadius: 0,
        borderWidth: 1,
        label: 'Regulados',
        backgroundColor: 'lightgreen',
        borderColor: 'lightgreen',
        data: DentroPrazoReg
      },{
        type: 'bar',
        fill: false,
        borderDash: [2,2],
        pointRadius: 0,
        borderWidth: 1,
        label: 'Não Regulados',
        backgroundColor: '#6C8CC7',
        borderColor: '#6C8CC7',
        data: DentroPrazo
      }         
      ]
        
    }
    this.options = {
      scales: {
        yAxes: [{
          barPercentage: 0.5,
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true
          } 
       }]
      },
      responsive: false,
      stacked: false,
        title: {
          display: true,
          fontSize: 16
        },
        gridLines: {
          display: true,
          drawborder: true,
          drawOnChartArea:false
        },
        legend: {
            position: 'bottom'
        }   
    }
  }

    //TIPO TMA TME 2 EIXOS
  Tipo679(eixo,orcadoDiaAc,realizDiaAc,metaDiaAc){
    this.data = {
      labels: this.eixo,
      datasets: [
        {
        type: 'line',
        fill: false,
        borderDash: [2,2],
        pointRadius: 0,
        borderWidth: 1,
        label: 'Orçado',
        backgroundColor: '#6C8CC7',
        borderColor: '#6C8CC7',
        data: orcadoDiaAc
      },
      {
        type: 'line',
        fill: false,
        label: 'Realizado',
        borderWidth: 1,
        backgroundColor: '#253F93',
        borderColor: '#253F93',
        data: realizDiaAc
      },
      {
        type: 'line',
        fill: false,
        borderDash: [2,2],
        pointRadius: 0,
        borderWidth: 1,
        label: 'Meta',
        backgroundColor: '#808080',
        borderColor: '#808080',
        data: metaDiaAc
      }  
      ]
        
    }
    this.options = {
      responsive: false,
      stacked: false,
        title: {
          display: true,
          fontSize: 16
        },
        gridLines: {
          display: true,
          drawborder: true,
          drawOnChartArea:false
        },
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero: true
            }
          }]
        },
        legend: {
            position: 'bottom'
        }
      }
  }
  

  //FIM DE TIPOS DE GRAFICOS
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/











  RotulosAcumulados(tipoGraph, linhaDeResumo){
    
    this.CondicionalDeGraficos(tipoGraph,linhaDeResumo)

    switch(this.Tendencia){
      case "MELHORPOSITIVO":{
        if(this.RotuloDiferencaPerc<0 && this.RotuloDiferencaPerc!=""){
          this.Cor1 = "Red"; 
          this.Cor2 = "Red"; 
          this.Cor3 = "Red"; 
          this.Cor4 = "Red"; 
        }        
        break;
      }
    
      case "MELHORNEGATIVO":{
        if(this.RotuloDiferencaPerc>0 && this.RotuloDiferencaPerc!=""){
          this.Cor1 = "Red"; 
          this.Cor2 = "Red"; 
          this.Cor3 = "Red"; 
          this.Cor4 = "Red"; 
        } 
        break;
      }

      case "MELHORENTREFAIXAS":{
        if(this.RotuloDiferencaAcum<0 || this.RotuloDiferencaAcum>0){
          this.Cor1 = "Red"; 
          this.Cor2 = "Red"; 
          this.Cor3 = "Red"; 
          this.Cor4 = "Red"; 
        } 
        break;
      }
    }
    
    

    if(tipoGraph==5){
      this.RotuloDiferencaPerc = this.RotuloDiferencaPerc+"%";
      this.RotuloDiferencaAcum = this.RotuloDiferencaAcum+"%";
      this.RotuloOrcadoMensal = this.RotuloOrcadoMensal+"%";
      this.RotuloPrevisaoMensal = this.RotuloPrevisaoMensal+"%";
      this.RotuloRealizAcum = this.RotuloRealizAcum+"%";
      this.RotuloOrcadoAcum = this.RotuloOrcadoAcum+"%";
    }else{
      this.RotuloDiferencaPerc = "Δ% " +this.RotuloDiferencaPerc;
      this.RotuloDiferencaAcum = "Δ " +this.RotuloDiferencaAcum;
    }
  }




  //SUPRIMIR COMENTÁRIOS VAZIOS E PREENCHER COM DATA
  //========================================================================================
  PreencherComentarios(temp1, responsaveis,eixos){
    // temp2.reverse();
    // responsaveis2.reverse();
    // eixo.reverse();
    let indice= 0
    var Comentarios1=[];
    var Nomes1=[];
    var Datas1=[];

    while(indice < temp1.length){
      if(temp1[indice] != null && temp1[indice] != ""){
        Comentarios1.push(temp1[indice])
        Nomes1.push(responsaveis[indice])
        Datas1.push(eixos[indice])
      }
      indice =indice+1
    }

    this.datasCom = Datas1;
    this.responsaveisCom = Nomes1;
    this.comentarCom = Comentarios1;
    
    this.datasCom.reverse();
    this.responsaveisCom.reverse();
    this.comentarCom.reverse();

    if(this.datasCom.length>10){
      this.datasCom.splice(10, Number.MAX_VALUE)
    }


  }







 
    //MESMA CLASSE DO QUE O graficos.component.ts
    CondicionalDeGraficos(tipoGraph, temp1){
      //RETIRAR DA PRIMEIRA LINHA OS ROTULOS
      //========================================================================================
      let orcadoMensal = parseFloat(temp1.splice(1, 1))
      let orcadoAcumulad = parseFloat(temp1.splice(1, 1)) 
      let realizadoAcumulad = parseFloat(temp1.splice(1, 1))
      let PrevisaoMensal = parseFloat(temp1.splice(1, 1))
      let OrcadoMedia = parseFloat(temp1.splice(1, 1))
      let RealMedia = parseFloat(temp1.splice(1, 1))
      let Minimo = parseFloat(temp1.splice(1, 1))
      let Maximo = parseFloat(temp1.splice(1, 1))
      let Meta = parseFloat(temp1.splice(1, 1))
      let MetaAcum = parseFloat(temp1.splice(1, 1))
      let ReguladoDp = parseFloat(temp1.splice(1, 1))
      let NaoReguladoDp = parseFloat(temp1.splice(1, 1))
      //========================================================================================

      let val1 = orcadoAcumulad
      let val2 = realizadoAcumulad
      
      //SEPARAR GRAFICOS 01 E 02 COM SOMATÓRIOS
      //========================================================================================
      if(tipoGraph==1 || tipoGraph==2 || tipoGraph==6){
        val1 = orcadoAcumulad
        val2 = realizadoAcumulad
        this.RotuloOrcadoMensal = converterComDecimal(orcadoMensal)
        this.RotuloOrcadoAcum = converterComDecimal(orcadoAcumulad)
        this.RotuloRealizAcum = converterComDecimal(realizadoAcumulad)
        this.RotuloDiferencaAcum = ((val2-val1)).toFixed(2)
        this.RotuloPrevisaoMensal = isNaN(PrevisaoMensal) ? 0 : converterComDecimal(PrevisaoMensal);
        this.RotuloDiferencaPerc = val1==0 ? 0 : ((-(1-(val2/val1)))*100).toFixed(2);

      }else if(tipoGraph==8 ){
        val1 = orcadoAcumulad
        val2 = realizadoAcumulad
        this.RotuloOrcadoMensal = converterSemDecimal(orcadoMensal)
        this.RotuloOrcadoAcum = converterSemDecimal(orcadoAcumulad)
        this.RotuloRealizAcum = converterSemDecimal(realizadoAcumulad)
        this.RotuloDiferencaAcum = ((val2-val1)).toFixed(2)
        this.RotuloPrevisaoMensal = isNaN(PrevisaoMensal) ? 0 : (PrevisaoMensal);
        this.RotuloDiferencaPerc = val1==0 ? 0 : ((-(1-(val2/val1)))*100).toFixed(2);

      //SEPARAR GRAFICO 03 COM MÉDIAS E CONVERTER PARA HORA
      //========================================================================================
      }else if(tipoGraph==3 ){      
        val1 = OrcadoMedia;
        val2 = RealMedia;
        this.RotuloOrcadoMensal =this.ConverterParaHora(OrcadoMedia);
        this.RotuloOrcadoAcum  = this.ConverterParaHora(OrcadoMedia);
        this.RotuloRealizAcum = this.ConverterParaHora(RealMedia);
        this.RotuloDiferencaAcum = this.ConverterParaHora((val2-val1));
        this.RotuloPrevisaoMensal = isNaN(PrevisaoMensal) ? 0 : (PrevisaoMensal.toFixed(0).toString());
        this.RotuloPrevisaoMensal= this.ConverterParaHora(this.RotuloPrevisaoMensal);
        this.RotuloDiferencaPerc = val1==0 ? 0 : ((-(1-(val2/val1)))*100).toFixed(2);

      }else if(tipoGraph==4){      
        val2 = RealMedia
        Minimo = Minimo > 60 ? parseFloat(Minimo.toFixed(0)) : Minimo;
        Maximo = Minimo > 60 ? parseFloat(Maximo.toFixed(0)) : Maximo;
        this.RotuloOrcadoMensal = Minimo+" - "+Maximo;
        this.RotuloOrcadoAcum  = Minimo+" - "+Maximo;
        this.RotuloRealizAcum = RealMedia;
        let val3 = RealMedia > Minimo ?  RealMedia < Maximo ? 0 :RealMedia-Maximo : RealMedia-Minimo ;
        this.RotuloDiferencaAcum = val3.toFixed(2);
        val1 = val3 > -1 ? val3 == 0 ? 0 : Maximo : Minimo;
        this.RotuloPrevisaoMensal = PrevisaoMensal;
        this.RotuloPrevisaoMensal = (isNaN(PrevisaoMensal))  ? 0 : PrevisaoMensal;
        this.RotuloDiferencaPerc = val1==0 ? 0 : ((-(1-(val2/val1)))*100).toFixed(2);
        
      }else if(tipoGraph==5){      
        this.RotuloPrevisaoMensal = (Meta*100) ;
        this.RotuloOrcadoMensal = (Meta*100);
        this.RotuloOrcadoAcum = (Meta*100);
        this.RotuloRealizAcum = ((NaoReguladoDp+ReguladoDp)/2)*100;
        this.RotuloDiferencaAcum  = "-";
        this.RotuloDiferencaPerc = "-";

      }else if(tipoGraph==7 || tipoGraph==9){      
        val1 = OrcadoMedia;
        val2 = RealMedia;
        this.RotuloOrcadoMensal = converterComDecimal(OrcadoMedia);
        this.RotuloOrcadoAcum  = converterComDecimal(OrcadoMedia);
        this.RotuloRealizAcum = converterComDecimal(RealMedia);
        this.RotuloDiferencaAcum = ((val2-val1)).toFixed(2);
        this.RotuloPrevisaoMensal =  converterComDecimal(PrevisaoMensal);
        this.RotuloDiferencaPerc = val1==0 ? 0 : ((-(1-(val2/val1)))*100).toFixed(2);

      }
      function converterComDecimal(z){
        let v = z.toFixed(2);
        v=v.replace(/\D/g,"") // permite digitar apenas numero
        v=v.replace(/(\d{1})(\d{14})$/,"$1.$2") // coloca ponto antes dos ultimos digitos
        v=v.replace(/(\d{1})(\d{11})$/,"$1.$2") // coloca ponto antes dos ultimos 13 digitos
        v=v.replace(/(\d{1})(\d{8})$/,"$1.$2") // coloca ponto antes dos ultimos 10 digitos
        v=v.replace(/(\d{1})(\d{5})$/,"$1.$2") // coloca ponto antes dos ultimos 7 digitos
        v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2") // coloca virgula antes dos ultimos 4 digitos
        return v;
      }
      function converterSemDecimal(z){
        let v = z.toFixed(0);
        v=v.replace(/\D/g,"") // permite digitar apenas numero
        v=v.replace(/(\d{1})(\d{12})$/,"$1.$2") // coloca ponto antes dos ultimos digitos
        v=v.replace(/(\d{1})(\d{9})$/,"$1.$2") // coloca ponto antes dos ultimos 13 digitos
        v=v.replace(/(\d{1})(\d{6})$/,"$1.$2") // coloca ponto antes dos ultimos 10 digitos
        v=v.replace(/(\d{1})(\d{3})$/,"$1.$2") // coloca ponto antes dos ultimos 7 digitos
        return v;
      }

  }
    ConverterParaHora(s){
      
      if(s<0){
        s=s*-1
      }
      function duas_casas(numero){
        if (numero <= 9){
          numero = "0"+parseInt(numero);
        }
        return numero;
      }
    
        var hora = Math.trunc(s/3600);
        var minuto = Math.trunc(s/60)-(hora*60);
        var segundo = Math.trunc(s)-(hora*3600)-(minuto*60);
  
        hora = duas_casas(hora);
        minuto = duas_casas(minuto);
        segundo = duas_casas(segundo);

        var formatado = hora+":"+minuto+":"+segundo;
                  
        return formatado;
    }
    
}
