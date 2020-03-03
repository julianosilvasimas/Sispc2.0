import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-editarindicadores',
  templateUrl: './editarindicadores.component.html',
  styleUrls: ['./editarindicadores.component.css']
})
export class EditarindicadoresComponent implements OnInit {

  constructor() { }

  items: MenuItem[];
  public activeItem; 
  public activeItemIndex;

  ngOnInit() {
    this.items = [
      {label: 'Editar Cadastro'},
      {label: 'Editar Orçados'}
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
