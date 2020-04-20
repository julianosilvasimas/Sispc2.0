import { Component, OnInit } from '@angular/core';
import { OperacionalEsgotoService } from '../operacional-esgoto.service';
import { AppComponent } from 'src/app/app.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-produtos-quimicos',
  templateUrl: './produtos-quimicos.component.html',
  styleUrls: ['./produtos-quimicos.component.css']
})
export class ProdutosQuimicosComponent implements OnInit {

  constructor(private esg:OperacionalEsgotoService, private adminServ:AppComponent, private messageService: MessageService) { }

  ngOnInit() {
    this.AtualizarUnidades()
  }

  Unidades
  AtualizarUnidades(){
    this.Unidades = this.adminServ.Unidades;
  }
} 
