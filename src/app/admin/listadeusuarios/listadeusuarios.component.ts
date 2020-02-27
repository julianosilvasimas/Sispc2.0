import { Component, OnInit } from '@angular/core';
import { Usuarios, Permissoes, Usuario } from "../usuarios.model";
import { AdminService } from './../Admin.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-listadeusuarios',
  templateUrl: './listadeusuarios.component.html',
  styleUrls: ['./listadeusuarios.component.css']
})
export class ListadeusuariosComponent implements OnInit {

  constructor(private adminserv: AdminService, private messageService: MessageService) {}

  usuarios:Usuarios[]; 
  gerencias:any[]; 
  supervisoes:any[]; 

  UsuarioSelect: Usuarios;
  EditUsuario: boolean = false;
  
  PermissoesSelect: Usuarios;
  UsuarioEditarPermissoes: Usuario;
  EditPermissoes: boolean = false;

  sourcePermissoes: Permissoes[];
  targetPermissoes: Permissoes[];

  ngOnInit() {
    this.adminserv.listusers().subscribe(
      response =>{
        this.usuarios = response['content']
      }
    )
    this.adminserv.listgerencias().subscribe(
      response =>{
        this.gerencias.push({
          gerenciaId: 0,
          label: "",
          tag: null,
          icon: null,
          routerLink: null,
          escopoIndicador: null
        })
        this.gerencias.push(response)
      }
    )
    this.adminserv.listsupervisoes().subscribe(
      response =>{
        this.supervisoes = response
      }
    )
  }
  selecionar(usuario){
    this.UsuarioSelect=usuario
    this.EditUsuario = true
  }


  //====================================================================================

  resetarSenha(usuario: Usuarios){
    this.adminserv.resetSenha(usuario).subscribe(
      response => {
        if(response === null){
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Senha '+usuario.nome+ ' foi resetada!'});
        }
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail: error.message, life: 500});
      }
    );
    this.EditUsuario = false
    this.UsuarioSelect=null
  }

  //====================================================================================

  updateUser(usuario: Usuarios){
    this.adminserv.updateUsers(usuario).subscribe(
      response => {
        if(response === null){
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Usuário '+usuario.nome+ ' foi alterado com sucesso!'});
        }
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail: error.message, life: 500});
      }
    );
    this.EditUsuario = false
    this.UsuarioSelect=null
  }

  //====================================================================================

  atribuirPermissoes(usuario: Usuarios){
    this.EditPermissoes = true;
    this.PermissoesSelect = usuario;
    this.adminserv.selecionarusuario(usuario).subscribe(
      response =>{
        this.UsuarioEditarPermissoes = response;
        this.targetPermissoes=response['perfis'];
        this.adminserv.listpermissoes().subscribe(
          response => {
            this.newarray(this.targetPermissoes,response);           
          }
        );
      }
    );
  }

  editarPermissoes(){
    var newpermissoes =[]
    for(var i=0; i<this.targetPermissoes.length;i++){
      newpermissoes.push(
        {
          perfilId: this.targetPermissoes[i].perfilId,
          perfil: this.targetPermissoes[i].perfil,
          permissao: this.targetPermissoes[i].permissao
        }
      )
    }
    var usuarioupdatePerms =
    {
      usuarioId: this.UsuarioEditarPermissoes.usuarioId,
      nome: this.UsuarioEditarPermissoes.nome,
      email: this.UsuarioEditarPermissoes.email,
      login: this.UsuarioEditarPermissoes.login,
      ativo: this.UsuarioEditarPermissoes.ativo,
      cargo: this.UsuarioEditarPermissoes.cargo,
      foto: this.UsuarioEditarPermissoes.foto,
      undcodigo: this.UsuarioEditarPermissoes.undcodigo,
      gerenciaId: this.UsuarioEditarPermissoes.gerenciaId,
      supervisaoId: this.UsuarioEditarPermissoes.supervisaoId,
      perfis: newpermissoes
    }
    this.adminserv.updateUser(usuarioupdatePerms).subscribe(
      response => {
        if(response === null){
          this.messageService.add({sticky: true, severity:'success', summary: 'Dados Salvos!', 
          detail:'Usuário '+usuarioupdatePerms.nome+ ' foi alterado com sucesso!'});
        }
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail: error.message, life: 500});
      }
    );
    this.UsuarioEditarPermissoes = null
    this.targetPermissoes = []
    this.sourcePermissoes = []
    this.EditPermissoes = false
    this.EditUsuario = false
    this.UsuarioSelect = null
  }

  newarray(minhasperm: Permissoes[], todasperm:Permissoes[]){
    
    for(var i = 0; i<minhasperm.length;i++){
      var index = todasperm.indexOf(minhasperm[i]);
      todasperm.splice(index,1)
    }  
    this.sourcePermissoes = todasperm
  }
  //====================================================================================

}
