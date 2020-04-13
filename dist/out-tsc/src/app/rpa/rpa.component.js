import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RpaService } from './rpa.service';
let RpaComponent = class RpaComponent {
    constructor(rpaservice) {
        this.rpaservice = rpaservice;
        this.bot = [];
    }
    ngOnInit() {
        this.Arrayas();
        var i = 0;
        // while(i===0){
        //   this.f3();
        // }
    }
    selectCar(bot) {
        this.selectedBot = bot;
        this.displayDialog = true;
        event.preventDefault();
    }
    onDialogHide() {
        this.selectedBot = null;
    }
    Arrayas() {
        // this.bot=[];
        this.cadastro = [];
        this.status = [];
        this.rpaservice.cadastroBots().subscribe(cadastro => {
            for (var i = 0; i < cadastro.length; i++) {
                this.rpaservice.statusBots(cadastro[i].idCad).subscribe(status => {
                    this.bot.push({
                        nomebot: status[0].bot.nomebot,
                        status: status[0].status,
                        descricao: status[0].bot.descricao,
                        historico: status
                    });
                });
            }
        });
    }
    // PreencherBots(cadastro, status){
    // 
    //     console.log(
    //       {
    //         nomebot: cadastro[i].nomebot,
    //         status: cadastro[i].status,
    //         descricao: cadastro[i].descricao,
    //         hist: [this.FiltroBot(cadastro[i].idCad, status)]
    //       }
    //     )
    //   }
    // }
    FiltroBot(Bot, status) {
        var statusbot = [];
        for (var i = 0; i < status.length && statusbot.length < 20; i++) {
            if (status[i]["bot"]["idCad"] === Bot) {
                statusbot.push(status[i]);
            }
        }
        statusbot = statusbot.reverse();
        return statusbot;
    }
};
RpaComponent = tslib_1.__decorate([
    Component({
        selector: 'app-rpa',
        templateUrl: './rpa.component.html',
        styleUrls: ['./rpa.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [RpaService])
], RpaComponent);
export { RpaComponent };
//# sourceMappingURL=rpa.component.js.map