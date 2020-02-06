import { Injectable } from '@angular/core';

import { Tarefa } from './tarefa.model';

@Injectable()
export class TarefaService {

  constructor() { }

  public buscar() {
  	return this.buscarDados();
  }

  public cadastrar(tarefa: Tarefa): void {
    tarefa.setId((new Date()).getTime());
    tarefa.setConcluida(false);
    let tarefas: Tarefa[] = this.buscar();
    tarefas.push(tarefa);
    this.atualizarDados(tarefas);
  }

  public buscarPorId(id: number): Tarefa {
    let tarefas: Tarefa[] = this.buscar();
    return tarefas.find(tarefa => tarefa.getId() === id);
  }

  public editar(tarefaAtulizada: Tarefa): void {
    let tarefas: Tarefa[] = this.buscar();
    tarefas.forEach((tarefa, index, array) => {
      if(tarefa.getId() == tarefaAtulizada.getId()){
        array[index] = tarefaAtulizada;
      }
    });
    this.atualizarDados(tarefas);
  }

  public remover(tarefaRemovida: Tarefa): void {
    let tarefas = this.buscar();
    tarefas = tarefas.filter(tarefa => tarefa.getId() != tarefaRemovida.getId());
    this.atualizarDados(tarefas);
  }

  public alterarStatus(tarefa: Tarefa): void {
    tarefa.setConcluida(!tarefa.estaConcluida());
    this.editar(tarefa);
  }

  private buscarDados(){
    let dados: string = localStorage.getItem('tarefas');
    //console.log(dados)
    
    let tarefas: Tarefa[] = [];
  	if(dados){
      tarefas = JSON.parse(dados);
      
  		tarefas.forEach((tarefa, index, array) => {
        //console.log(tarefa)
        //console.log(index)
        //console.log(array)
        //if(index===0){
        array[index] = new Tarefa(tarefa.id, tarefa.nome, tarefa.inicioPrevisto, tarefa.dataInicio,
          tarefa.conclusaoPrevista, tarefa.dataConclusao, tarefa.responsavel, tarefa.concluida);
        //}
      });
      }
      console.log(tarefas)
  	return tarefas;
  }

  private atualizarDados(tarefas: Tarefa[]): void {
  	let dados: string = JSON.stringify(tarefas);
  	localStorage.setItem('tarefas', dados);
  }

}
