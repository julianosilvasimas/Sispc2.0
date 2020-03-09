import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.css']
})
export class ImportarComponent implements OnInit {


  onstructor() { }

  items: MenuItem[];
  public activeItem; 
  public activeItemIndex;

  ngOnInit() {
    this.items = [
      {label: 'Importar Orçados'},
      {label: 'Bots'}
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
