import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-relatorioindicadores',

  templateUrl: './relatorioindicadores.component.html',	
  styleUrls: ['./relatorioindicadores.component.css']	
})
export class RelatorioindicadoresComponent implements OnInit {
  public refer 
  public indicador
  public comparar= []
  public idgerencias= []
  public idgerenciasretornado
  public gerencia
  public gerencia2

  constructor(private messageService: MessageService,private route: ActivatedRoute) { 

  }
  ngOnInit() {
    this.route.params.subscribe( parametros => {

        this.indicador=parametros['id'];
        this.refer=parametros['ref'];
      
    });
    this.messageService.add({severity:'info', summary:'Referência', detail:'Aguarde a geração do relatório', life:9000});
  }

  procurarGerencias(){

  }
}