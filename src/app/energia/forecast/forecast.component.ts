import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

 
  items: MenuItem[];
  public activeItem; 
  public activeItemIndex;
  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Água'},
      {label: 'Esgoto'}
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
