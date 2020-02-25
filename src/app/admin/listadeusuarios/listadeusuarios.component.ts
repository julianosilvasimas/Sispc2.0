import { Component, OnInit } from '@angular/core';
import { Usuarios } from "../usuarios.model";

@Component({
  selector: 'app-listadeusuarios',
  templateUrl: './listadeusuarios.component.html',
  styleUrls: ['./listadeusuarios.component.css']
})
export class ListadeusuariosComponent implements OnInit {

  constructor() { }

  usuarios:Usuarios[]; 

  UsuarioSelect: Usuarios;
  EditUsuario: boolean = false;
  
  PermissoesSelect: Usuarios;
  EditPermissoes: boolean = false;

  ngOnInit() {
    this.usuarios = [
      {usuarioId: 1 , nome: "Juliano Simas", email: "juliente@prolagos.com.br", login: 'juliano.simas', ativo: false, senha: "$2a$10$p8BUl4ElFGUVyLzjt6PppOXFJlb8Yq3iON3ET4lM5iUPjWxFoUue6" },
      {usuarioId: 2 , nome: "Vitor Heser", email: "vitor@prolagos.com.br", login: 'vitor.heser', ativo: true, senha: "$2a$10$p8BUl4ElFGUVyLzjt6PppOXFJlb8Yq3iON3ET4lM5iUPjWxFoUue6"}
    ]
  }

  selecionar(usuario){
    this.UsuarioSelect=usuario
    this.EditUsuario = true
  }

  resetarSenha(usuario){
    //endpoint por metodo PUT http://localhost:7777/usuarios/recupereSenhaUser/2
  }
  atribuirPermissoes(usuario){
    this.EditPermissoes = true
    
  }

}
