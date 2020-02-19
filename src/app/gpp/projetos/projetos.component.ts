import { Component, OnInit } from '@angular/core';
import { Car, Projetos } from '../../demo/domain/car';
import { SelectItem, MessageService } from 'primeng/api';
import { CarService } from '../../demo/service/carservice';
import { RouterLink } from '@angular/router';
import { ProjetosService } from './projetos.service';


@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html'
})
export class ProjetosComponent implements OnInit {

  cars: Projetos[];

  projetos: any[];
    cols: any[];

    nome: SelectItem[];
 
    yearFilter: number;

    yearTimeout: any;

    data: any;

    selectedCar1: SelectItem[];
    selectedProjeto: SelectItem[];
    municipio: SelectItem[];
    status:SelectItem[];

  constructor(private carService: CarService,private projetosService: ProjetosService, private messageService: MessageService) {  
    
    this.data = {
      datasets: [{
          data: [
              11,
              16,
              7,
              3,
              14
          ],
          backgroundColor: [
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB"
          ],
          label: 'My dataset'
      }],
      /*
      labels: [
          "Red",
          "Green",
          "Yellow",
          "Grey",
          "Blue"
      ]*/
  }

  }

  ngOnInit() {
    
    this.carService.getProjetos().then(cars => this.cars = cars);

    this.projetosService.projetos()
    .subscribe(res => {
        console.log(res)
        this.projetos = res
    });

    this.municipio = [
        { label: 'Todos', value: null },
        { label: 'Arraial do Cabo', value: 'Arraial do Cabo' },
        { label: 'Cabo Frio', value: 'Cabo Frio' },
        { label: 'Iguaba Grande', value: 'Iguaba Grande' },
        { label: 'São Pedro da Aldeia', value: 'São Pedro' },
        { label: 'Armação dos Búzios', value: 'Búzios' },
        { label: 'ETA', value: 'Mercedes' }
    ];

    this.status = [
        { label: 'Em Andamento', value: 'Em Andamento' },
        { label: 'Paralisado', value: 'Paralisado' },
        { label: 'Cancelado', value: 'Cancelado' },
        { label: 'Concluido', value: 'Concluído' }
    ];

    this.cols = [
        { field: 'projetoId', header: 'N° Projeto' },
        { field: 'projeto', header: 'Nome' },
        { field: 'statusgloblal', header: 'Status' },
        { field: 'setor', header: 'Setor' },
        //{ field: 'responsavel', header: 'Responsavel' },
        //{ field: 'localidade', header: 'Município' },
        { field: 'radar', header: 'Marco' }
    ]; 
  }

  abrir(){
      sessionStorage.setItem('idProjeto',this.selectedProjeto['projetoId'])
      sessionStorage.setItem('nomeProjeto',this.selectedProjeto['projeto'])
      //window.open("/mainprojeto")
  }

  onYearChange(event, dt) {
    if (this.yearTimeout) {
        clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
        dt.filter(event.value, 'year', 'gt');
    }, 250);
}


}
