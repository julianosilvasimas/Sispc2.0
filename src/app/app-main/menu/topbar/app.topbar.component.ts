import {Component} from '@angular/core';
import {AppMainComponent} from '../../app.main.component';
import { AuthService } from '../../../login/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {
    nome: string;
    dadosUser: any;
    cargo: string;
    imgPerfil: string;

    constructor(public app: AppMainComponent, private authService: AuthService) {
        this.nome = sessionStorage.getItem('nome')
        authService.usuario(sessionStorage.getItem('email')).subscribe(response => {
            this.dadosUser = response,
            this.cargo = response['cargo']
            //console.log(response['cargo'])
            //console.log(response['foto'])
            
            if(response['foto']===null){
                this.imgPerfil = "assets/layout/images/profile-image.png"
            }else{
            this.imgPerfil = response['foto']
            }
        })
    }
    fechar(){
        sessionStorage.clear()
    }
}
