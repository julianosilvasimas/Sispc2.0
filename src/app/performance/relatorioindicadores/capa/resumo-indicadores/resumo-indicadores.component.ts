import { Component, OnInit, Input} from '@angular/core';
import { Indicador } from '../../../performance.model';
import { PerformanceService } from '../../../performance.service';

@Component({
  selector: 'app-resumo-indicadores',
  templateUrl: './resumo-indicadores.component.html',
  styleUrls: ['./resumo-indicadores.component.css']
})
export class ResumoIndicadoresComponent implements OnInit {

 
  public Cora: any  = "black";


  @Input() indicador : Indicador
  @Input() element;
  @Input() refer;

  //DADOS
  temp1: any;
  temp2: any;
  RotuloOrcadoAcum: any;
  RotuloRealizAcum: any
  RotuloOrcadoMedia: any;
  RotuloRealMedia: any
  RotuloDiferencaAcum: any;
  RotuloDiferencaAcum2: any;
  RotuloDiferencaPerc: any;
  RotuloOrcadoMensal: any;
  RotuloPrevisaoMensal: any;
  tipoGraph: any;
  Tendencia: any;

  orcadoMensal: any;
  previsaoMensal: any;

  ngOnInit() {
    this.Validador(this.element, this.refer)
  }

  constructor(private indicadoresService: PerformanceService) {
  }


  Validador(indic, referencia){
    this.indicadoresService.indicadoresResumo(referencia,indic.indicadorId)
      .subscribe(
        indicador  =>  {
          let var1          
          this.temp1  = indicador[0]
          this.tipoGraph = indic.tipoGrafico
          this.Tendencia = indic.tendencia

          this.RotulosAcumulados(this.tipoGraph, this.temp1)
          // console.log("========================")
          // console.log(this.Tendencia)
          // console.log(this.Cora)
        });
      }
    
    
      RotulosAcumulados(tipoGraph, linhaDeResumo){
        this.CondicionalDeGraficos(tipoGraph,linhaDeResumo)

        // console.log(this.RotuloDiferencaPerc)
        switch(this.Tendencia){
          case "MELHORPOSITIVO":{
            if(this.RotuloDiferencaPerc<0 && this.RotuloDiferencaPerc!=""){
              this.Cora = "red"; 
            }        
            break;
          }
        
          case "MELHORNEGATIVO":{
            if(this.RotuloDiferencaPerc>0 && this.RotuloDiferencaPerc!=""){
              this.Cora = "red"; 
            } 
            break;
          }
  
          case "MELHORENTREFAIXAS":{
            if(this.RotuloDiferencaAcum<0 || this.RotuloDiferencaAcum>0){
              this.Cora = "red"; 
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
          this.RotuloDiferencaAcum2 = "Δ " +this.RotuloDiferencaAcum2;
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
        this.RotuloDiferencaAcum2 =converterComDecimal(val2-val1)
        this.RotuloPrevisaoMensal = isNaN(PrevisaoMensal) ? 0 : converterComDecimal(PrevisaoMensal);
        this.RotuloDiferencaPerc = val1==0 ? 0 : ((-(1-(val2/val1)))*100).toFixed(2);

      }else if(tipoGraph==8 ){
        val1 = orcadoAcumulad
        val2 = realizadoAcumulad
        this.RotuloOrcadoMensal = converterSemDecimal(orcadoMensal)
        this.RotuloOrcadoAcum = converterSemDecimal(orcadoAcumulad)
        this.RotuloRealizAcum = converterSemDecimal(realizadoAcumulad)
        this.RotuloDiferencaAcum = ((val2-val1)).toFixed(2)
        this.RotuloDiferencaAcum2 =converterSemDecimal(val2-val1)
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
        this.RotuloDiferencaAcum2 =this.ConverterParaHora(val2-val1);
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
        this.RotuloDiferencaAcum2 = val3==0 ? 0 : val3.toFixed(2);
        val1 = val3 > -1 ? val3 == 0 ? 0 : Maximo : Minimo;
        this.RotuloPrevisaoMensal = PrevisaoMensal;
        this.RotuloPrevisaoMensal = (isNaN(PrevisaoMensal))  ? 0 : PrevisaoMensal;
        this.RotuloDiferencaPerc = val1==0 ? 0 : ((-(1-(val2/val1)))*100).toFixed(2);
        
      }else if(tipoGraph==5){      
        this.RotuloPrevisaoMensal = (Meta*100) ;
        this.RotuloOrcadoMensal = (Meta*100);
        this.RotuloOrcadoAcum = (Meta*100);
        this.RotuloRealizAcum = RealMedia;
        this.RotuloDiferencaAcum  = "-";
        this.RotuloDiferencaAcum2 = "-";
        this.RotuloDiferencaPerc = "-";

      }else if(tipoGraph==7 || tipoGraph==9){      
        val1 = OrcadoMedia;
        val2 = RealMedia;
        this.RotuloOrcadoMensal = converterComDecimal(OrcadoMedia);
        this.RotuloOrcadoAcum  = converterComDecimal(OrcadoMedia);
        this.RotuloRealizAcum = converterComDecimal(RealMedia);
        this.RotuloDiferencaAcum = ((val2-val1)).toFixed(2);
        this.RotuloDiferencaAcum2 =converterComDecimal(val2-val1)
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