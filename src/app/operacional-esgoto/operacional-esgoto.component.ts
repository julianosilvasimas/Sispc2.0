import { Component, OnInit } from '@angular/core';
import{ OperacionalEsgotoService } from './operacional-esgoto.service';
import{ PerformanceService } from '../performance/performance.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-operacional-esgoto',
  templateUrl: './operacional-esgoto.component.html',
  styleUrls: ['./operacional-esgoto.component.css']
})
export class OperacionalEsgotoComponent implements OnInit {


  constructor(private esg:OperacionalEsgotoService, private perf:PerformanceService, private messageService: MessageService) { }
  volumes 

  ngOnInit() {
    
    this.perf.cadindicadores().subscribe(
      response=>{
        this.volumes = response
      }
    )
    this.esg.getunidades().subscribe(
      response=>{
        this.ListaDeUnidades = response
      }
    )



    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'dataDaCriacao', header: 'dataDaCriacao' },
      { field: 'unidade', header: 'unidade' },
      { field: 'tipoDeTratamento', header: 'tipoDeTratamento' },
      { field: 'volume', header: 'volume' },
    ];
  }

  ListaDeUnidades
  UnidadeSelected
  novaUnidade
  cols
  displayDialog: boolean = false
  
  showDialogToAdd() {
    this.novaUnidade = true;
    this.displayDialog = true;
  }

  save() {
    this.UnidadeSelected.volume = this.UnidadeSelected.volume.indicadorId
    this.esg.updateunidade(this.UnidadeSelected).subscribe(
      indicadors  =>  {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Indicador '+this.UnidadeSelected['indicador']+' Alterado'});
      },error=>{
        this.messageService.add({severity: 'warn', summary: 'Erro', detail: 'Erro'});
      }
    )
    this.displayDialog = false;
  }

  onRowSelect(event) {
      this.novaUnidade = false;
      this.displayDialog = true;
  }

  cloneCar(c: any): any {
      let car = {};
      for (let prop in c) {
          car[prop] = c[prop];
      }
      return car;
  }
}
