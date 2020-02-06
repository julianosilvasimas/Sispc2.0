import { Component, OnInit } from '@angular/core';
import { Car, Projetos } from '../../demo/domain/car';
import { SelectItem, MessageService } from 'primeng/api';
import { CarService } from '../../demo/service/carservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html'
})
export class ProjetosComponent implements OnInit {

  cars: Projetos[];

    cols: any[];

    nome: SelectItem[];

    yearFilter: number;

    yearTimeout: any;

    data: any;

    selectedCar1: SelectItem[];
    municipio: SelectItem[];
    status:SelectItem[];

  constructor(private carService: CarService, private messageService: MessageService) {  
    
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
        { field: 'nProjeto', header: 'N° Projeto' },
        { field: 'nome', header: 'Nome' },
        { field: 'status', header: 'Status' },
        { field: 'tipo', header: 'Tipo' },
        { field: 'segmento', header: 'Segmento' },
        { field: 'municipio', header: 'Município' },
        { field: 'marco', header: 'Marco' }
    ]; 
  }

  abrir(){
      window.open("/mainprojeto")
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
