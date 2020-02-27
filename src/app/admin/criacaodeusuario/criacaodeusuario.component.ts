import { Component, OnInit } from '@angular/core';
import { Usuarios, Permissoes } from "../usuarios.model";
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
  unidades:any[]; 
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
    this.adminserv.listunidades().subscribe(
      response =>{
        this.unidades = response
      }
    )
  }


  salvar(){
    var usuario =
    {
      usuarioId: null,
      nome: this.CadNome,
      email: this.CadEmail,
      login: this.CadLogin,
      ativo: this.CadAtivo,
      senha: null,
      gerenciaId: this.CadGerencia===undefined ? null : this.CadGerencia,
      supervisaoId: this.CadSupervisao===undefined ? null : this.CadSupervisao,
      undcodigo: this.CadUnidades===undefined ? null : this.CadUnidades
    }
    this.adminserv.InputUsuario(usuario).subscribe(
      response => {
        if(response.status === 201){
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Usuário '+usuario.nome+ ' foi incluído com sucesso!'});
        }
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail: error.message, life: 500});
      }
    );
    console.log(usuario)
    this.CadAtivo=null
    this.CadNome=null
    this.CadEmail=null
    this.CadLogin=null
    this.CadGerencia=null
    this.CadSupervisao=null
    this.CadUnidades=null
  }
}
