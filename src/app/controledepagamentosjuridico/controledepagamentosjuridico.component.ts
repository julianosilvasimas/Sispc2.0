import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-controledepagamentosjuridico',
  templateUrl: './controledepagamentosjuridico.component.html',
  styleUrls: ['./controledepagamentosjuridico.component.css']
})
export class controledepagamentosjuridicoComponent implements OnInit {
  items: MenuItem[] 
  public activeItem 
  public activeItemIndex

  constructor() { }

  ngOnInit() {
      this.items =
      [
        {label: 'Cadastro'},
        {label: 'Lista'},
        {label: 'Aprovacoes'},
        {label: 'Relatórios'}
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
