import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-controledepagamentosjuridico',
  templateUrl: './controledepagamentosjuridico.component.html',
  styleUrls: ['./controledepagamentosjuridico.component.css']
})
export class controledepagamentosjuridicoComponent implements OnInit {
  items: any[] = []
  public activeItem 
  public activeItemIndex

  public CentrodeCusto: any[] = []; 
  usuPagamentos;
  usuAprovacao;
  usuNivel=0;
  centrosDeCustos = null
  constructor() { 

  }

  ngOnInit() {
    //Preencehendo array de permissoes e liberando acessos

    let i =0
    while (sessionStorage.getItem("permissao "+ i) != null){
      let permissao = sessionStorage.getItem("permissao "+ i)

      //Liberando acessos
      if(permissao === "ROLE_JURIDICO_PAGAMENTOS"){
        this.usuPagamentos =true;

      }else if(permissao === "ROLE_JURIDICO_APROVACAO1"){
        this.usuAprovacao=true;
        this.usuNivel=1;

      }else if(permissao === "ROLE_JURIDICO_APROVACAO3"){
        this.usuAprovacao=true;
        this.usuNivel=3;
        
      }else if(permissao.substring(0,24) === "ROLE_JURIDICO_APROVACAO2"){
        this.usuAprovacao=true;
        this.usuNivel=2;
        var cc = permissao.substring(25,Number.MAX_VALUE);
        this.centrosDeCustos = this.centrosDeCustos==null ? cc : this.centrosDeCustos+","+cc
      } 
      
      i++
    }

    if(this.usuPagamentos==true){
      this.items.push({label: 'Cadastro'})
      this.items.push({label: 'Lista'})
      this.items.push({label: 'Acompanhar Aprovações'})
    }
    if(this.usuAprovacao==true){
      this.items.push({label: 'Aprovador'})
    }
    console.log(this.centrosDeCustos)
    this.activeItem = this.items[0]
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
