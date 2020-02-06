import { Directive, Input, ElementRef, OnInit } from '@angular/core';

import { Tarefa } from './tarefa.model';

@Directive({
  selector: '[tarefaConcluida]'
})
export class TarefaConcluidaDirective implements OnInit {

	@Input() tarefa: Tarefa;

  constructor(private element: ElementRef) { }

  ngOnInit() {
  	if(this.tarefa.estaConcluida()){
  		this.element.nativeElement.style.textDecoration = 'line-through';
  	}
  }

}
