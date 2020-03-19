import { Component, OnInit } from '@angular/core';
import { EnergiaService } from './energia.service';
import { CsvDataService } from '../csv-data.service';
import { MessageService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-energia',
  templateUrl: './energia.component.html',
  styleUrls: ['./energia.component.css']
})
export class EnergiaComponent implements OnInit {
 
  items: MenuItem[];
  public activeItem; 
  public activeItemIndex;
  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Equipamentos'},
      {label: 'Forecast'}
    ];
    this.trocadeitemIndex(1);
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
