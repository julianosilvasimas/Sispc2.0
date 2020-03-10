import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
})
export class AppComponent {
    constructor( private messageService: MessageService){

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
