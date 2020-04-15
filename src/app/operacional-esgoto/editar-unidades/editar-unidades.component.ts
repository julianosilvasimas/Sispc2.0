import { Component, OnInit } from '@angular/core';
import { OperacionalEsgotoService } from '../operacional-esgoto.service';
import { PerformanceService } from 'src/app/performance/performance.service';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/admin/Admin.service';
import { Unidades } from '../editar-indicadores/classificacao-indicadores.model';

@Component({
  selector: 'app-editar-unidades',
  templateUrl: './editar-unidades.component.html',
  styleUrls: ['./editar-unidades.component.css']
})
export class EditarUnidadesComponent implements OnInit {

  constructor(private esg:OperacionalEsgotoService, private adminServ:AdminService, private messageService: MessageService) { }
  volumes 

  ngOnInit() {
    this.AtualizarUnidades();
    this.AtualizarUsuarios();
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'dataDaCriacao', header: 'Criacao' },
      { field: 'unidade', header: 'unidade' },
      { field: 'tipoDeTratamento', header: 'Tipo de Tratamento' },
      { field: 'vazao', header: 'Vazão' },
    ];
  }

  AtualizarUsuarios(){
    console.log("Carregando")
    this.adminServ.listusers2().subscribe(
      resp=>{
        this.Disponiveis = resp['content']
        console.log(resp)
        console.log(this.Disponiveis)
        this.displayOperadoresCarregando = false
      }
    );
  }
  AtualizarUnidades(){
    this.esg.getunidades().subscribe(
      response=>{
        this.ListaDeUnidades = response
      }
    )
  }

  ListaDeUnidades
  UnidadeSelected:Unidades
  novaUnidade
  cols
  displayDialog: boolean = false
  
  showDialogToAdd() {
    this.UnidadeSelected = {
      id: null,
      unidade: null,
      dataDaCriacao: null,
      tipoDeTratamento: null,
      vazao: null,
      operadores: []
    }
    this.novaUnidade = true;
    this.displayDialog = true;
  }

  save() {
    console.log(this.UnidadeSelected)
    var id = this.UnidadeSelected.id == null ? 0 : this.UnidadeSelected.id 
    this.esg.updateunidade(this.UnidadeSelected, id).subscribe(
      indicadors  =>  {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Indicador '+this.UnidadeSelected['indicador']+' Alterado'});
        this.Operaveis=[]
        this.AtualizarUnidades()
      },error=>{
        this.messageService.add({severity: 'warn', summary: 'Erro', detail: 'Erro'});
      }
    )
    this.displayDialog = false;
  }

  onRowSelect(event) {
      this.novaUnidade = false;
      this.displayDialog = true;
  }

  cloneCar(c: any): any {
      let car = {};
      for (let prop in c) {
          car[prop] = c[prop];
      }
      return car;
  }

  deleteUnidade(){
    this.esg.DeleteUnidade(this.UnidadeSelected.id).subscribe(
      indicadors  =>  {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Classificação '+this.UnidadeSelected['nome']+' Deletado'});
        this.AtualizarUnidades()
        this.displayDialog = false;
      },error=>{
        this.messageService.add({severity: 'warn', summary: 'Erro', detail: 'Erro'});
      }
    )
  }

  //===================================================================================================================================
  //Gerenciar Operadores
  
  displayOperadores:boolean =false
  displayOperadoresCarregando:boolean =false
  Disponiveis =[]
  Disponiveis2 =[]
  Operaveis =[]
  gerenciarOperadores(){
    console.log(this.Disponiveis)
    if(this.Disponiveis.length===0){
      this.displayOperadoresCarregando = true
    }else{
      this.displayOperadores = true
      this.Disponiveis2 = this.Disponiveis.map( 
        function( elem ) {
          console.log(elem)
          return elem;
        }
      )

    }

    this.Operaveis = this.UnidadeSelected.operadores
  }

  salvarOperadores(){
    this.UnidadeSelected.operadores = this.Operaveis
    this.displayOperadoresCarregando = true
    
    this.esg.updateOperadores(this.UnidadeSelected).subscribe(
      indicadors  =>  {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Indicador '+this.UnidadeSelected['indicador']+' Alterado'});
        this.displayOperadores = false
        this.displayOperadoresCarregando = false
      },error=>{
        this.messageService.add({severity: 'warn', summary: 'Erro', detail: 'Erro'});
        this.displayOperadoresCarregando = false
      }
    )
  }
}
