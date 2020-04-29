import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicadores-diarios',
  templateUrl: './indicadores-diarios.component.html',
  styleUrls: ['./indicadores-diarios.component.css']
})
export class IndicadoresDiariosComponent implements OnInit {

  constructor() { }

  appConsolidado = true
  appLinkIndicadores
  appPreencheIndicadores

  clickConsolidado(){
    this.appConsolidado = true
    this.appLinkIndicadores = false
    this.appPreencheIndicadores = false
  }
  clickLinkIndicadores(){
    this.appConsolidado = false
    this.appLinkIndicadores = true
    this.appPreencheIndicadores = false
  }
  clickPreencheIndicadores(){
    this.appConsolidado = false
    this.appLinkIndicadores = false
    this.appPreencheIndicadores = true
  }


  ngOnInit() {
  }

}
