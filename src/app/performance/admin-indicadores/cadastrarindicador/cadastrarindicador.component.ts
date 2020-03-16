import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cadastrarindicador',
  templateUrl: './cadastrarindicador.component.html',
  styleUrls: ['./cadastrarindicador.component.css']
})
export class CadastrarindicadorComponent implements OnInit {

  constructor( private messageService: MessageService) {
  }

  items: MenuItem[];
  public activeItem; 
  public activeItemIndex;

  ngOnInit() {
    this.items = [
      {label: 'Cadastrar'}
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
