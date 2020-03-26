import { Component, OnInit } from '@angular/core';
import{ OperacionalEsgotoService } from '../operacional-esgoto.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-aplicativo-etes',
  templateUrl: './aplicativo-etes.component.html',
  styleUrls: ['./aplicativo-etes.component.css']
})
export class AplicativoEtesComponent implements OnInit {

  constructor(private esg:OperacionalEsgotoService,  private messageService: MessageService) { }

  VisibleListaDeUnidades: boolean = false
  ListaDeUnidades
  ptbr = {
    firstDayOfWeek: 1,
    dayNames: [ "domingo","segunda","terça","quarta","quinta","sexta","sábado" ],
    dayNamesShort: [ "dom","seg","ter","qua","qui","sex","sab" ],
    dayNamesMin: [ "D","S","T","Q","Q","S","S" ],
    monthNames: [ "janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro" ],
    monthNamesShort: [ "jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez" ],
    today: 'Hoje',
    clear: 'Limpar'
}

  ngOnInit() {
    this.getOpcoes();
    this.esg.getunidades().subscribe(
      response=>{
        this.ListaDeUnidades = response
        this.VisibleListaDeUnidades = true

        // ===============================
        // Descomentar depois do teste
          // this.UnidadeSelecionada = this.ListaDeUnidades[1]
          // this.VisibleListaDeUnidades = false
          // this.VisibleUnidadeSelecionada = true
          // this.DATA1 = new Date(2020,2,10)
          // this.DATA2 = new Date(2020,2,14)
          // this.selecioanarIndicador(this.ListaOpcoes[1]);
        // ===============================
      }
    )
  }

  voltar(){
    this.VisibleListaDeUnidades = true
    this.VisibleUnidadeSelecionada = false
    this.VisibleListaDeIndicadores = false
    for(var i = 0 ; i<this.ListaOpcoes.length;i++){ this.ListaOpcoes[i].selected=0}
    this.DATA1 = null
    this.DATA2 = null
  }

  //===================================================================================================================================
  //SELECIONAR TIPO DE INDICADOR
  ListaOpcoes:any[]=[]
  DATA1 = null
  DATA2 = null
  getOpcoes(){
    this.ListaOpcoes=[]
    this.ListaOpcoes=[
      {value:1, selected: 0, label:"Produtos Químicos",         icon:"subject" },
      // {value:2, selected: 0, label:"Uso de Produtos Químicos",  icon:"" },
      {value:3, selected: 0, label:"Controle Diário",           icon:"insert_chart" },
      {value:4, selected: 0, label:"Qualidade do Efluente",     icon:"thumb_up_alt" },
      {value:5, selected: 0, label:"Resíduos Sólidos",          icon:"bubble_chart" },
      {value:6, selected: 0, label:"Consumo da ETE",            icon:"subject" },
      {value:7, selected: 0, label:"Energia",                   icon:"flash_on" },
    ]
  }
  UnidadeSelecionada
  VisibleUnidadeSelecionada: boolean = false
  selectEte(ete){
    this.UnidadeSelecionada =ete
    this.VisibleListaDeUnidades = false
    this.VisibleUnidadeSelecionada = true
    this.DATA1 = null
    this.DATA2 = null
  }
  

  //===================================================================================================================================
  //DADOS DO INDICADOR
  converterdata(date:Date){
    var ano = date.getFullYear() 
    var mes = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1) 
    var dia = date.getDate() < 10 ? "0"+date.getDate() : date.getDate() 
    return ano+"-"+mes+"-"+dia
  }

  ListaDeIndicadores
  VisibleListaDeIndicadores: boolean = false
  cols= [
    { field: 'usuario', header: 'usuario' },
    { field: 'dataIndicador', header: 'dataIndicador' },
    { field: 'indicador', header: 'indicador' },
    { field: 'valor', header: 'valor' },
    { field: 'observacao', header: 'observacao' },
  ];
  



  ListaFiltroUsuario: any[] =[]
  ListaFiltro2Usuario: any[] =[]
  ListaFiltroindicador: any[] =[]
  ListaFiltro2indicador: any[] =[]
  
  
  selecioanarIndicador(indicador){
    this.VisibleListaDeIndicadores = false
    for(var i = 0 ; i<this.ListaOpcoes.length;i++){ this.ListaOpcoes[i].selected=0}
    if(this.DATA1 === null || this.DATA2 === null){
      this.messageService.add({severity: 'info', summary: 'info', detail: 'Preencha as Datas'});
    }else{

      indicador.selected = 1;
      //=======================================================================
      console.log("============================================================")
      console.log(this.UnidadeSelecionada.unidade)
      console.log(this.converterdata(this.DATA1))
      console.log(this.converterdata(this.DATA2))
      console.log(indicador.value)
      this.esg.getIndicadoresUnidade(this.UnidadeSelecionada.unidade,this.converterdata(this.DATA1),this.converterdata(this.DATA2),indicador.value).subscribe(
        response=>{
          console.log(response)
          this.ListaDeIndicadores = response
          this.ListaFiltroUsuario = []
          this.ListaFiltro2Usuario = []
          this.ListaFiltroindicador = []
          this.ListaFiltro2indicador = []
          for(var i = 0 ; i<response.length;i++){ 
            if(this.ListaFiltro2indicador.indexOf(response[i].indicador)<0){
              this.ListaFiltroindicador.push({label: response[i].indicador, value: response[i].indicador})
              this.ListaFiltro2indicador.push(response[i].indicador)
            }
            if(this.ListaFiltro2Usuario.indexOf(response[i].usuario)<0){
              this.ListaFiltroUsuario.push({label: response[i].usuario, value: response[i].usuario})
              this.ListaFiltro2Usuario.push(response[i].usuario)
            }
          }
          this.VisibleListaDeIndicadores = true
        }
      )
    }
  }

}
