import { Component, OnInit } from '@angular/core';
import { AdminIndicadoresService } from '../../../performance/admin-indicadores/admin-indicadores.service';
import { EnergiaService } from '../../energia.service';
import { MessageService } from 'primeng/api';
import { CsvDataService } from 'src/app/csv-data.service';

@Component({
  selector: 'app-forecastenergiaagua',
  templateUrl: './forecastenergiaagua.component.html',
  styleUrls: ['./forecastenergiaagua.component.css']
})
export class ForecastenergiaaguaComponent implements OnInit {

  constructor(private messageService: MessageService,private service: AdminIndicadoresService, private service2: EnergiaService) { }
  
  carregando:boolean = false
  referencia
  UnidadesDaClasse
  classificacao =1
  classificacaoXindicadorkW = this.classificacao== 1 ? 12 : 13


  ngOnInit() {
  }

  onChangeTime(event){
    this.referencia = this.referencia.toISOString().substr(0,10)
  }

  //TODAS AS EEATS 12 kwh
  //TODAS AS ETES 13 kwh
  //TODAS AS EEATS 14 R$
  //TODAS AS ETES 15 R$

  indicadoresVolume
  indicadoresKWHAgua
  indicadoresKWHAguaGestalTotal:any[]=[]
  indicadoresKWHAguaGestal:any[]=[]

  indicadoresRSAgua

  aumento = 1.1858484872
  tarifa = 0.84

  consultar(){
    this.carregando = true
    this.indicadoresVolume = []
    this.indicadoresKWHAgua = []
    this.indicadoresKWHAguaGestalFiltrados = []
    this.service.indicadoresByMonth(this.referencia,this.classificacaoXindicadorkW).subscribe(
      response=>{
        this.indicadoresKWHAgua = response
        var i = response.length-1
        var dateini = this.indicadoresKWHAgua[0].dataindicador
        var datefim = this.indicadoresKWHAgua[i].dataindicador
            
        this.service.indicadoresByRange(dateini,datefim,this.classificacao).subscribe(
          response=>{
            this.indicadoresVolume = response
          }
        )
        this.service2.realizadoKw(dateini,datefim,this.classificacao).subscribe(
          response=>{
            this.MontarArraySomandoKwPorDia(this.indicadoresKWHAgua, response);
            this.carregando = false
          }
        )
      }
    )
  }


  ArrayGigante:any[] = []

  MontarArraySomandoKwPorDia(eixo, arr){
    this.indicadoresKWHAguaGestalTotal = []
    this.indicadoresKWHAguaGestal = []
    var result: any[] = [];
    var valor = 0
    this.indicadoresKWHAguaGestal = arr

    for(var i =0;i<eixo.length;i++){
      valor = 0 
      var paraEstaData = arr.filter((unidades) => {
        return unidades.dataIndicador.includes(eixo[i].dataindicador)
      })

      for(var j =0;j<paraEstaData.length;j++){
        valor = valor + paraEstaData[j].ativoConsumido
      }
      this.indicadoresKWHAguaGestalTotal.push(valor)

      
    }

    
  }

  salvarCSV(){
    this.carregando = true
    this.ArrayGigante = []
    for(var i =0;i<this.indicadoresKWHAgua.length;i++){

      this.ArrayGigante.push(
        {
          data: this.indicadoresKWHAgua[i].dataindicador,
          VolumeOrcado: this.indicadoresVolume[i].realizado.toFixed(2),
          VolumeRealizado: this.indicadoresVolume[i].realizado.toFixed(2),

          OrçadokWIndicador: this.indicadoresKWHAgua[i].orcado.toFixed(2).replace("\.","\,"),
          RealkWIndicador: this.indicadoresKWHAgua[i].realizado.toFixed(2).replace("\.","\,"),
          RealkWGestal:(this.indicadoresKWHAguaGestalTotal[i] * this.aumento).toFixed(2).replace("\.","\,") ,
          RealkWMaisPorcentagem:(this.indicadoresKWHAguaGestalTotal[i] * this.aumento).toFixed(2).replace("\.","\,"),
          OrcadokWm3: this.indicadoresVolume[i].orcado > 0 ? ((this.indicadoresKWHAgua[i].orcado)/this.indicadoresVolume[i].orcado).toFixed(2).replace("\.","\,") : 0,
          RealkWm3: this.indicadoresVolume[i].realizado > 0 ? ((this.indicadoresKWHAguaGestalTotal[i] * this.aumento)/this.indicadoresVolume[i].realizado).toFixed(2).replace("\.","\,") : 0 ,

          OrçadoRSIndicador: (this.indicadoresKWHAgua[i].orcado * this.tarifa).toFixed(2).replace("\.","\,"),
          RealRSIndicador: (this.indicadoresKWHAgua[i].realizado * this.tarifa).toFixed(2).replace("\.","\,"),
          RealRSGestal: (this.indicadoresKWHAguaGestalTotal[i] * this.tarifa).toFixed(2).replace("\.","\,"),
          RealRSGestalMaisPorcentagem: (this.indicadoresKWHAguaGestalTotal[i]  * this.aumento * this.tarifa).toFixed(2).replace("\.","\,"),
          OrcadoRSm3: this.indicadoresVolume[i].orcado > 0 ? ((this.indicadoresKWHAgua[i].orcado * this.tarifa)/this.indicadoresVolume[i].orcado).toFixed(2).replace("\.","\,") : 0,
          RealRSm3: this.indicadoresVolume[i].realizado > 0 ? ((this.indicadoresKWHAguaGestalTotal[i] * this.aumento * this.tarifa)/this.indicadoresVolume[i].realizado).toFixed(2).replace("\.","\,") : 0,
        }
      )
    }
    CsvDataService.exportToCsv('ForecastEnergia.csv', this.ArrayGigante);
    this.carregando = false
  }

  salvarCSV2(){
    this.carregando = true
    this.ArrayGigante = []
    for(var i =0;i<this.indicadoresKWHAguaGestal.length;i++){
    
      this.ArrayGigante.push(
        {
          data: this.indicadoresKWHAguaGestal[i].dataIndicador,
          unidade: this.indicadoresKWHAguaGestal[i].unidade.nomeDoEquipamento,
          ativoConsumido: this.indicadoresKWHAguaGestal[i].ativoConsumido.toFixed(2),
          reativo: this.indicadoresKWHAguaGestal[i].reativo.toFixed(2),
          modificacao: this.indicadoresKWHAguaGestal[i].aprovador
        }
      )
    }

    CsvDataService.exportToCsv('Relatorio_Detalhado.csv', this.ArrayGigante);
    this.carregando = false
  }
  //=============================================================================================================================
  dialog: boolean = false
  indicadoresKWHAguaGestalFiltrados: any[] = []
  listaDeMedidores

  destrinchar(data, valorTotal){
    console.log(data)
    if(this.indicadoresKWHAguaGestal.length>0){
      this.indicadoresKWHAguaGestalFiltrados = []
      this.indicadoresKWHAguaGestalFiltrados = this.indicadoresKWHAguaGestal.filter((unidades) => {
        return unidades.dataIndicador.substring(0,10) === data;
      })
      for(var i = 0;i<this.indicadoresKWHAguaGestalFiltrados.length;i++){
        valorTotal = valorTotal- this.indicadoresKWHAguaGestalFiltrados[i].ativoConsumido
      }
      this.indicadoresKWHAguaGestalFiltrados.push(
        {
          dataIndicador: data,
          unidade: {
            nomeDoEquipamento: "% das outras unidades"
          },
          ativoConsumido: valorTotal,
        }
      )

      this.service2.cadastroMedidores().subscribe(
        response=>{
          this.listaDeMedidores = response.filter((unidades) => {
              return unidades.classificacao === this.classificacao;
          })
        }
      )
      this.NovoRegistroMedidor = this.listaDeMedidores[0]
      this.dialog= true
    }else{
      this.messageService.add({severity: 'warn', summary: 'Ainda não carregamos', detail: 'Espere mais um pouco, até carregarmos'});
    }
  }


  crud: boolean = false

  NovoRegistroData
  NovoRegistroConsumo
  NovoRegistroMedidor

  listonafiltradaclone
  inserirRegistro(indicadoresKWHAguaGestalFiltrados){
    this.NovoRegistroConsumo = null
    this.NovoRegistroMedidor = null
    this.listonafiltradaclone = indicadoresKWHAguaGestalFiltrados
    this.NovoRegistroData = this.indicadoresKWHAguaGestalFiltrados[0].dataIndicador
    this.crud = true
  }

  inserirRegistroSalvar(){
    var registro = {
        timestamp: null,
        ativoConsumido: this.NovoRegistroConsumo,
        ativoConsumidoRS: null,
        unidade: this.NovoRegistroMedidor,
        comentario: null,
        aprovador:  sessionStorage.getItem('nome'),
        dataIndicador: this.NovoRegistroData,
        aprovacao: null,
        idEnergia: null,
        reativo: null,        
        ativoFornecido: 0,
    }


    this.service2.InserirStatus(registro).subscribe(
      response=>{
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Dados enviados com Sucesso'});
        this.indicadoresVolume = []
        this.indicadoresKWHAgua = []
        this.consultar()

        this.edicaoDeRegistrosGestal = false
        this.dialog = false
        this.crud = false
      },
      erro=>{
        this.messageService.add({severity: 'danger', summary: 'Erro', detail: 'Ocorreu algum problema'});
      }
    )

    this.indicadoresVolume = []
    this.indicadoresKWHAgua = []
    this.consultar()
  }

  //=========================================================================
  //EDITAR UMA LINHA DO GESTAL
  edicaoDeRegistrosGestal: boolean = false
  linhaSelecionada: any

  abrirpraeditarlinha(linha){
    this.linhaSelecionada = linha
    this.edicaoDeRegistrosGestal = true
  }


  editarRegistroDoGestal(){
    this.linhaSelecionada.aprovador = sessionStorage.getItem('nome')
    this.service2.statusMedidoresAtualizar(this.linhaSelecionada).subscribe(
      response=>{
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Dados enviados com Sucesso'});
        this.indicadoresVolume = []
        this.indicadoresKWHAgua = []
        this.consultar()
        this.edicaoDeRegistrosGestal = false
        this.dialog = false
        this.linhaSelecionada = null
      },
      erro=>{
        this.messageService.add({severity: 'danger', summary: 'Erro', detail: 'Ocorreu algum problema'});
      }
    )
  }

  //====================================================================================================================================
  //ÁREA DE MANIPULAÇÃO DE CENÁRIOS
    criacaoDeCenarios: boolean = false
    NomeCenario
    DataReferencia
    CadCenario:any
    CenarioLinhas:any[] = []


    AbrirSalvamentoDeCenarios(){
      this.DataReferencia = this.referencia
      this.criacaoDeCenarios = true
    }

    SalvarCenario(){
      this.carregando = true
      var reference: string = this.referencia
      this.criacaoDeCenarios = false
      this.CadCenario={
        id: null,
        importadoParaIndicadores: null,
        dataReferencia: reference,
        nomeDoCenario: this.NomeCenario,
        tarifa: this.tarifa,
        aumento: this.aumento,
        usuario: sessionStorage.getItem('nome'),
        classificacao: this.classificacao 
      }
      console.log(this.CadCenario)

      this.service2.InserirCenario(this.CadCenario).subscribe(
        response=>{

          this.CadCenario = response

          for(var i =0;i<this.indicadoresKWHAgua.length;i++){
            var linha = this.indicadoresKWHAgua[i]

            var unidades = []
            var valortotal = (this.indicadoresKWHAguaGestalTotal[i] * this.aumento)
          
            var unidadesBruto =  this.carregarUnidades(linha.dataindicador, valortotal)
            // console.log(unidadesBruto)

            for(var j =0;j<unidadesBruto.length;j++){
              unidades.push(
                {
                  id:null,
                  dataIndicador: linha.dataindicador,
                  nomeLocal: unidadesBruto[j].unidade.nomeDoEquipamento,
                  consumo: unidadesBruto[j].ativoConsumido

                }
              )
            }
            this.CenarioLinhas.push(
              {
                id: null,
                dataIndicador: linha.dataindicador,

                volumeOrcado: this.indicadoresVolume[i].orcado.toFixed(4),
                volumeRealizado: this.indicadoresVolume[i].realizado.toFixed(4), 

                orcadoIndkWh: linha.orcado.toFixed(4), 
                realIndkWh: linha.realizado.toFixed(4), 
                realGestalkWh: this.indicadoresKWHAguaGestalTotal[i].toFixed(4), 
                realGestalPorcentagemkWh: (this.indicadoresKWHAguaGestalTotal[i] * this.aumento).toFixed(4), 

                orcadoIndRS: (linha.orcado * this.tarifa) === 0 ? 0 : (linha.orcado * this.tarifa).toFixed(4), 
                realIndRS: (linha.realizado * this.tarifa) === Infinity ? 0 : (linha.realizado * this.tarifa).toFixed(4), 
                realGestalRS: (this.indicadoresKWHAguaGestalTotal[i] * this.tarifa) === Infinity ? 0 : (this.indicadoresKWHAguaGestalTotal[i] * this.tarifa).toFixed(4), 
                realGestalPorcentagemRS: (this.indicadoresKWHAguaGestalTotal[i]  * this.aumento * this.tarifa) === Infinity ? 0 : (this.indicadoresKWHAguaGestalTotal[i]  * this.aumento * this.tarifa).toFixed(4), 

                orcadokWhM3: ((linha.orcado)/this.indicadoresVolume[i].orcado) === Infinity ? 0 : ((linha.orcado)/this.indicadoresVolume[i].orcado).toFixed(4), 
                realizadokWhM3: ((this.indicadoresKWHAguaGestalTotal[i] * this.aumento)/this.indicadoresVolume[i].realizado) === Infinity ? 0 : ((this.indicadoresKWHAguaGestalTotal[i] * this.aumento)/this.indicadoresVolume[i].realizado).toFixed(4), 
                orcadoRSM3:  ((linha.orcado * this.tarifa)/this.indicadoresVolume[i].orcado) === Infinity ? 0 : ((linha.orcado * this.tarifa)/this.indicadoresVolume[i].orcado).toFixed(4), 
                realizadoRSM3: ((this.indicadoresKWHAguaGestalTotal[i] * this.aumento * this.tarifa)/this.indicadoresVolume[i].realizado) === Infinity ? 0 : ((this.indicadoresKWHAguaGestalTotal[i] * this.aumento * this.tarifa)/this.indicadoresVolume[i].realizado).toFixed(4), 
                
                unidades: unidades
              }
            )
          }
          this.CadCenario.cenariosLinhas = this.CenarioLinhas
          console.log(this.CadCenario)
          this.service2.UpdateCenario(this.CadCenario).subscribe(
            response=>{
              this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Dados enviados com Sucesso'});
              this.indicadoresVolume = []
              this.indicadoresKWHAgua = []
              this.criacaoDeCenarios = false
              this.carregando = false
            },
            erro=>{
              this.messageService.add({severity: 'danger', summary: 'Erro', detail: 'ERRO'});
              this.carregando = false
            }
          )
        }
      )
    }
    carregarUnidades(data, valorTotal):any[]{
      var indicadoresKWHAguaGestalFiltrados: any[] = []
      indicadoresKWHAguaGestalFiltrados = this.indicadoresKWHAguaGestal.filter((unidades) => {
        return unidades.dataIndicador.substring(0,10) === data;
      })
      for(var i = 0;i<indicadoresKWHAguaGestalFiltrados.length;i++){
        valorTotal = valorTotal- indicadoresKWHAguaGestalFiltrados[i].ativoConsumido
      }
      indicadoresKWHAguaGestalFiltrados.push(
        {
          dataIndicador: data,
          unidade: {
            nomeDoEquipamento: "% das outras unidades"
          },
          ativoConsumido: valorTotal,
        }
      )
      return indicadoresKWHAguaGestalFiltrados;
    }

  //====================================================================================================================================
}
// this.UnidadesDaClasse = response.filter((unidades) => {
//   return unidades.classificacao === this.classificacao;
// })

