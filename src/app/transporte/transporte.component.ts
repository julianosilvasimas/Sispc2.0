import { Component, OnInit } from '@angular/core';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html',
  styleUrls: ['./transporte.component.css']
})
export class TransporteComponent implements OnInit {
  items: MenuItem[] 
  public activeItem 
  public activeItemIndex

  constructor() {
  }


    ngOnInit() {
      this.items =
      [
        {label: 'Dashboards'},
        {label: 'Agendamento'},
        {label: 'Cadastro'}
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
