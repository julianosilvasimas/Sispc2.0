import { Component, OnInit, Input } from '@angular/core';
import { OperacionalEsgotoService } from '../../operacional-esgoto.service';
import { AppComponent } from 'src/app/app.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private esg:OperacionalEsgotoService, private adminServ:AppComponent, private messageService: MessageService) { }

  @Input() unidade;
  ProdutosQuimicos

  ngOnInit() {
    this.esg.PesquisarLancamentoProdutoQuimico(this.unidade.id).subscribe(
      resp=>{
        
        this.messageService.add({severity: 'info', summary: "Carregado", detail: resp[0].unidade.unidade+' carregado com sucesso'});
        this.ProdutosQuimicos = resp.map(
          function(e){
            var porcentagem = e.valor/e.indicador.maximo

            console.log(e)
            if(porcentagem===0){
              e.porcentagem = "0"
            }else if(porcentagem <= 0.25){
              e.porcentagem = "25"
            }else if(porcentagem <= 0.5){
              e.porcentagem = "50"
            }else if(porcentagem <= 0.75){
              e.porcentagem = "75"
            }else{
              e.porcentagem = "100"
            }
            return e
          }
        )        
      }
    );
  }

}
