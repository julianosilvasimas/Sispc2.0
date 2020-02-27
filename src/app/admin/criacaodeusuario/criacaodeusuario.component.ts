import { Component, OnInit } from '@angular/core';
import { Usuarios, Permissoes, Usuario } from "../usuarios.model";
import { AdminService } from './../Admin.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-criacaodeusuario',
  templateUrl: './criacaodeusuario.component.html',
  styleUrls: ['./criacaodeusuario.component.css']
})
export class CriacaodeusuarioComponent implements OnInit {

  constructor(private adminserv: AdminService, private messageService: MessageService) {}

  usuario
  gerencias:any[]; 
  supervisoes:any[]; 

  CadAtivo:boolean;
  CadNome
  CadEmail
  CadLogin
  CadGerencia
  CadSupervisao
  CadUnidades
  

  ngOnInit() {
    this.adminserv.listgerencias().subscribe(
      response =>{
        this.gerencias = response
      }
    )
    this.adminserv.listsupervisoes().subscribe(
      response =>{
        this.supervisoes = response
      }
    )
  }


  salvar(){
    
  }
}
