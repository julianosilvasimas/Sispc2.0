import { Component, OnInit } from '@angular/core';
import {MenuItem, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent implements OnInit {

  items: MenuItem[];
  public activeItem; 
  public activeItemIndex;
  constructor() {

  }

  ngOnInit() {
 
    this.items = [
      {label: 'Agendar Veículos'},
      {label: 'Aprovar Agendamentos'},
      {label: 'Lista de Agendamentos'}
    ];
    this.trocadeitemIndex(0);
  }
  
  trocadeitem(activeItem: MenuItem){
    this.activeItem = activeItem['activeItem']
    this.activeItemIndex = this.items.indexOf(this.activeItem)
  }
  trocadeitemIndex(index){
    this.activeItem = this.items[index]
    this.activeItemIndex = index
  }
}
