import { Component, OnInit } from '@angular/core';
import {MenuItem, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  items: MenuItem[];
  public activeItem; 
  public activeItemIndex;
  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Cadastrar Usuário'},
      {label: 'Lista de Usuários'}
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
