
import { Component, OnInit, Input} from '@angular/core';
import { Indicador } from '../../performance.model';
import { PerformanceService } from '../../performance.service';
import { AuthService } from '../../../login/auth.service';

@Component({
  selector: 'app-capa',
  templateUrl: './capa.component.html',
  styleUrls: ['./capa.component.css']
})
export class CapaComponent implements OnInit {
  @Input() refer;
  @Input() indicador;

  public NomeGerencia
  public nome
  public email
  public ind: any;
  public date;

  orcadoAcum: any;
  realizAcum: any
  orcadoMensal: any;
  previsaoMensal: any;
  diferencaAcum: any;
  diferencaPerc: any;

  constructor(private performanceService: PerformanceService, private authService: AuthService) {

    this.nome = sessionStorage.getItem('nome');
    this.email = sessionStorage.getItem('email');
    var data = new Date(),
      diaF = ("0" + data.getDate()).slice(-2),
      mesF = ("0" + data.getMonth()+1).slice(-2),
      anoF = data.getFullYear(),
      hora = ("0" + data.getHours()).slice(-2),
      minuto = ("0" + data.getMinutes()).slice(-2),
      dias = new Array('Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado');

    this.date = dias[data.getDay()]+" - "+diaF+"/"+mesF+"/"+anoF+" "+hora+":"+minuto;

  }

  ngOnInit() {
    console.log(this.indicador)
    this.performanceService.gerencias()
    .subscribe(
      response => {
        var items = []
        items = response.splice(2, Number.MAX_VALUE)
        for(var i=0; i<items.length;i++){
          console.log(items[i]['gerenciaId']+" = "+this.indicador)
          if(items[i]['gerenciaId'] == this.indicador){
            this.NomeGerencia = items[i]['label'];
            break;
          }
        }
      }
    );
    this.MontarArrayDeIndicadores(this.indicador)

  }


  MontarArrayDeIndicadores(indicador: number){
    this.performanceService.classindicadores(indicador)
      .subscribe(
        Indicadores  =>  {
          this.ind = Indicadores

        });
  }

  
}
