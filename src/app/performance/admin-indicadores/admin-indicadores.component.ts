import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-indicadores',
  templateUrl: './admin-indicadores.component.html',
  styleUrls: ['./admin-indicadores.component.css']
})
export class AdminIndicadoresComponent implements OnInit {

  items: MenuItem[];
  public activeItem; 
  public activeItemIndex;
  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Cadastrar'},
      {label: 'Editar'},
      {label: 'Importar'}
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
