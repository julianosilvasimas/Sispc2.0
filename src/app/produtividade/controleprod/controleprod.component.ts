import { Component, OnInit } from '@angular/core';
import { ProdutividadeService } from './../produtividade.service';
import { Produtividade } from './../produtividade.model';

@Component({
  selector: 'app-controleprod',
  templateUrl: './controleprod.component.html',
  styleUrls: ['./controleprod.component.css']
})
export class ControleprodComponent implements OnInit {

  resumao: Produtividade[]; 
  colsresumo: { field: string; header: string; }[];
  detalhar: boolean = false;

  constructor(private produtividadeService: ProdutividadeService) { }

  ngOnInit() {

    this.colsresumo = [                                                                                                                         
      { field: 'servico', header: 'Nº Documento' },
      { field: 'tmerenoir', header: 'Assunto' },
      { field: 'qtdprevista', header: 'Tipo' },
      { field: 'tempoprevisto', header: 'Envio' },
      { field: 'tmeapont', header: 'Retorno' },
      { field: 'exec', header: 'Aprovação' },
      { field: 'exoc', header: 'Link Documento' },
      { field: 'tempexec', header: 'Link Documento' },
      { field: 'tempdesloc', header: 'Link Documento' }
  ];

    this.produtividadeService.getResumao().then(data => this.resumao = data);  //this.resumao = data
  }

  onChange($event){

  }

  detalhe(){
    this.detalhar = !this.detalhar
  }

}
