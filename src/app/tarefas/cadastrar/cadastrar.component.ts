import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Tarefa } from '../shared';
import { TarefaService } from './../shared/tarefa.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

	@ViewChild('formTarefa',{static: false}) formTarefa: NgForm;
	public tarefa: Tarefa;

  constructor(
  	private tarefaService: TarefaService, 
  	private router: Router
  ) { }

  ngOnInit() {
  	this.tarefa =  new Tarefa();
  }

  public cadastrar(): void {
  	if(this.validarFormulario()){
  		this.tarefaService.cadastrar(this.tarefa);
  		this.router.navigate(['tarefas']);
  	}
  }

  public validarFormulario(): boolean {
  	return this.formTarefa.form.valid;
  }

}
