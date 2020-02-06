import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Tarefa } from '../shared';
import { TarefaService } from './../shared/tarefa.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

	@ViewChild('formTarefa', {static: false}) formTarefa: NgForm;
	public tarefa: Tarefa;

  constructor(
  	private tarefaService: TarefaService,
  	private route: ActivatedRoute,
  	private router: Router
  ) { }

  ngOnInit() {
  	let id = +this.route.snapshot.params.id;
  	if(!Number.isInteger(id)){
  		this.router.navigate(['tarefas']);
  	}
  	this.tarefa = this.tarefaService.buscarPorId(id);
  }

  public editar(): void {
  	if(this.validarFormulario()){
  		this.tarefaService.editar(this.tarefa);
  		this.router.navigate(['tarefas']);
  	}
  }

  public validarFormulario(): boolean {
  	return this.formTarefa.form.valid;
  }

}
