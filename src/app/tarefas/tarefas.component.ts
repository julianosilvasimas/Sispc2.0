import { Component, OnInit } from '@angular/core';
import { Tarefa } from './shared/tarefa.model';
import { TarefaService } from './shared/tarefa.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html'
})
export class TarefasComponent implements OnInit {

  public tarefas: Tarefa[];
  clonedTarefa: any;

  constructor(private tarefaService: TarefaService, private messageService: MessageService) { }

  ngOnInit() {
    this.tarefas = this.tarefaService.buscar();
    //console.log(this.tarefas)
  }

  teste(){
    this.tarefaService.buscar();
 }

  public temTarefas(): boolean {
  	return this.tarefas.length > 0;
  }

  public remover($event: any, tarefa: Tarefa): void {
    $event.preventDefault();
    if(confirm('Você deseja remover a tarefa ' + tarefa.getNome() + '?')){
      this.tarefaService.remover(tarefa);
      this.tarefas = this.tarefaService.buscar();
    }
  }

  public alterarStatus(tarefa: Tarefa): void {
    if(confirm('Você alterar o status da tarefa ' + tarefa.getNome() + '?')){
      this.tarefaService.alterarStatus(tarefa);
      this.tarefas = this.tarefaService.buscar();
    }
  }

  onRowEditInit(tarefa: Tarefa) {
    this.clonedTarefa[tarefa.nome] = {...tarefa};
}

onRowEditSave(tarefa: Tarefa) {
    if (tarefa.nome != null) {
        delete this.clonedTarefa[tarefa.nome];
        this.messageService.add({severity:'success', summary: 'Success', detail:'Car is updated'});
    }
    else {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Year is required'});
    }
}

onRowEditCancel(tarefa: Tarefa, index: number) {
    this.tarefas[index] = this.clonedTarefa[tarefa.nome];
    delete this.clonedTarefa[tarefa.nome];
}

}
