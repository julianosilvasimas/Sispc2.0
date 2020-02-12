import { Component, OnInit } from '@angular/core';
import { PerformanceService } from './../../../../performance/performance.service';

@Component({
  selector: 'app-menurelatorio',
  template: `
          <ul app-submenu [item]="items" target="_blank" root="true" id="items" class="navigation-menu" visible="true" parentActive="true"></ul>
          `
})
export class MenurelatorioComponent implements OnInit {
  public items: any[];
  constructor( private performanceService: PerformanceService) { }
  qtd=0
  indicadores: any[];
  gerencias: any[];

  permissoes: any[] = [];
  usuPerformance: boolean = false;
  usuComissao: boolean = false;
  usuTransporte: boolean = false;

  ngOnInit() {
    this.preenchergerencias();

    //Preencehendo array de permissoes e liberando acessos
    let i =0
    while (sessionStorage.getItem("permissao "+ i) != null){
        let permissao = sessionStorage.getItem("permissao "+ i)
        this.permissoes.push(permissao)
        //Liberando acessos
        if(permissao === "ROLE_ADMIN"){
            this.usuPerformance = true
            this.usuComissao = true
            this.usuTransporte = true
        }else if(permissao === "ROLE_ADMIN_COMISSAO"){
            this.usuComissao = true
        }else if(permissao === "ROLE_ADMIN_FROTAS"){
            this.usuTransporte = true
        }else if(permissao === "ROLE_ADMIN_INDICADOR"){
            this.usuPerformance
             = true
        }
        
        i++
    }
  }

  preenchergerencias(){
    this.performanceService.gerencias()
    .subscribe(
      response => {
        this.gerencias = []
        this.items = []
        this.gerencias = response.splice(2, Number.MAX_VALUE)
        for(var i=0; i<this.gerencias.length;i++){

          this.performanceService.classindicadores(this.gerencias[i]['gerenciaId'])
            .subscribe(
              response2=>{
                this.qtd = response2.length; 
                if(this.qtd==0){
                  this.gerencias.splice(i, 1); 
                }
              }
            );
          this.gerencias[i]['routerLink'] = '/relatorio';
          //console.log(this.gerencias)
        }
        this.Preencheitems();
      }
    );
  }

  Preencheitems(){
    this.items = this.usuPerformance === true?
    [
      {
        label: 'Performance', icon: 'timeline', routerLink:'/relatorio'
      }
    ] :
    []
  }
}
