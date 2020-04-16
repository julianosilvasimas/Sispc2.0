import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/admin/Admin.service';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
})
export class AppComponent {
    constructor( private messageService: MessageService, private adminServ:AdminService){
        
    }
    Disponiveis=[]
    CarregarLista:boolean = false
    AtualizarUsuarios(){
        if(this.CarregarLista===false){
            this.CarregarLista = true
            console.log("Carregando")
            this.adminServ.listusers2().subscribe(
                resp=>{
                this.Disponiveis = resp['content']
                this.messageService.add({severity: 'success', summary: 'info', detail: 'Lista de usuarios carregada'});
                }
            );
        }
    }

    statusbot = "Pronto";
    resolveAfter5Seconds() {
        return new Promise(resolve => {
            setTimeout(() => {
                this.statusbot= "Pronto";
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'A Importação dos dados para o indicador '+' criado'});
            // }, 30000);
            }, 30000);
        });
    };
}
