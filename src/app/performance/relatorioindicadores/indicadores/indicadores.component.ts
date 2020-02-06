import { Component, OnInit, Input} from '@angular/core';
import { Indicador } from '../../performance.model';
import { PerformanceService } from '../../performance.service';


@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {
  @Input() refer;
  @Input() indicador;
  public ind: any;
  public nameInd: any;

  public orcado: number[];
  public orcadoAc: number[];
  public realiz: number[];
  public realizAc: number[];
  public tipoGrafico: number;
  public totalpaginas;

  tipoindicador: string;
  title = 'projeto';
  data: any;
  options: any;


  constructor(private indicadoresService: PerformanceService) {
    
  }


  ngOnInit() {
    this.MontarArrayDeIndicadores(this.indicador)
  }

  INDICADORESlidos: string[] = [];
  chartTest(index, indic: string){
    if(this.INDICADORESlidos.indexOf(indic) == -1 ){
      this.INDICADORESlidos.push(indic)
      this.tipoindicador =indic
    }

  }
  
  MontarArrayDeIndicadores(indicador: number){
    this.indicadoresService.classindicadores(indicador)
      .subscribe(
        Indicadores  =>  {
          this.ind = Indicadores
          this.totalpaginas = this.ind.length+1
        });
  }

}