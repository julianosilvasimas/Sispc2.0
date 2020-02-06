import { Component, OnInit } from '@angular/core';
import {MenuItem, SelectItem} from 'primeng/api';

import { TransporteService } from '../transporte.service';
import { Veiculo } from '../transporte.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  items: MenuItem[];
  public activeItem; 
  public activeItemIndex;

  //ARRAYS DE CADASTRO
  public Gerencias;
  public Supervisoes;
  public condutores;
  public modelos;
  public locadoras;
  public tipoVeiculo;
  public adicionais;
  public GPS;


  displayDialog: boolean;
  selectedCar: any;
  displayEdit: boolean;
  editedCar: any;

   cars0:any[];
   cars:any[];


   lazyCars:[];
   
   brands: string[];

   colors: string[];

   totalLazyCarsLength: number;

   timeout: any;

   checkedPool: any;
   checkedOficina: any;
   checkedDevolvido: any;
   checkedGps: any;

   sortKey: any;

   sortOptions: SelectItem[];

   cadastroCarro: Veiculo;
   cadplaca: any;
   cadchassi:any;
   cadmodelo: number = 4;
   cadcapacidadem3: any;
   cadresponsavel: any;
   cadtipoVeiculo: any;
   cadgerencia: any;
   cadlocadora: any;
   cadsupervisao: any;
   cadpool: boolean;
   cadgps: boolean;
   cadoficina: boolean;
   caddevolvido: boolean;

   constructor(private transporteService: TransporteService) { }

   

    ngOnInit() { 
      this.cadpool = false;
      this.caddevolvido = false;
      this.cadgps = false;
      this.cadoficina = false;
        
      this.items = [
        {label: 'Lista de veículos'},
        {label: 'Cadastrar Novo'}
      ];
      
      this.transporteService.veiculos()
      .subscribe(
        Veiculos  =>  {
          this.cars0 = Veiculos
          this.cars= this.cars0
        });

      
      

      this.Gerencias = [
        {label: ''},
        {label: 'Comercial'},
        {label: 'Operacional'}
      ];
      this.Supervisoes = [
        {label: ''},
        {label: 'Fiscalizacao'},
        {label: 'Eletromecanica'}
      ];
      this.condutores = [
        {label: ''},
        {label: 'Albert Einstein'},
        {label: 'Fred Mercury'},
        {label: 'José Vicente'}
      ];
      
      this.tipoVeiculo = [
        {label: ''},
        {label: 'Moto'},
        {label: 'Carro'},
        {label: 'Veículo Pesado'}
      ];
      this.GPS = [
        {label: ''},
        {label: 'Com GPS'},
        {label: 'Sem GPS'}
      ];
      this.modelos = [
        {label: ''},
        {label: 'Onix'},
        {label: 'Prisma'},
        {label: 'Corolla'},
        {label: 'Montana'},
        {label: 'Strada'},
        {label: 'Saveiro'},
        {label: 'AMAROK'},
        {label: 'S10'},
        {label: 'Retro CAT'},
        {label: 'CAMINHAO'}
      ];
      this.locadoras = [
        {label: ''},
        {label: 'LVE'},
        {label: 'Ouro Verde'}
      ];
      this.adicionais = [
        {label: ''},
        {label: 'munck'},
        {label: 'pipa 10m/³'}
      ];
      this.trocadeitemIndex(0);
    }

    filter(){
      console.log("============")
      this.cars = this.cars0
      if(this.sortKey == '0'){
        this.cars = this.cars0
      }else{
        for(var i = 0; i<this.cars0.length; i++ ){
          console.log("index = "+i+" de "+this.cars0.length)
          var modelo:string=this.cars0[i].brand ;
          var modelocomp:string=this.modelos[(this.sortKey-1)].label ;
          

          if(modelo == modelocomp){
            this.cars.push(
              {
                vin: this.cars0[i].vin,
                brand: this.cars0[i].brand,
                color: this.cars0[i].color,
                placa: this.cars0[i].placa,
                year: this.cars0[i].year,
              }
            )
          }
        }
      }
    }



    
    trocadeitem(activeItem: MenuItem){
      this.activeItem = activeItem['activeItem']
      this.activeItemIndex = this.items.indexOf(this.activeItem)
    }
    trocadeitemIndex(index){
      this.activeItem = this.items[index]
      this.activeItemIndex = index
    }





    //==========================================================================================================================
    //SALVAR CADASTRO DE VEICULO================================================================================================
    selectCar(car: Veiculo) {
      this.selectedCar = car;
      this.cadplaca = this.selectedCar.placa
      this.cadchassi = this.selectedCar.chassi
      // this.cadmodelo = this.selectedCar.modelo
      this.displayDialog = true;
      event.preventDefault();
    }
    onDialogHide() {
      this.selectedCar = null;
    }
    SalvarVeiculo(){
      var placa = this.cadplaca;
      var chassi = this.cadchassi;
      var modelo = this.modelos[this.cadmodelo].label;
      var capac = this.adicionais[this.cadcapacidadem3].label;
      var resp = this.condutores[this.cadresponsavel].label;
      var Tveic = this.tipoVeiculo[this.cadtipoVeiculo].label;
      var ger = this.Gerencias[this.cadgerencia].label;
      var loca = this.locadoras[this.cadlocadora].label;
      var supe = this.Supervisoes[this.cadsupervisao].label;
      var pool = this.cadpool;
      var cgps = this.cadgps;
      var cofi = this.cadoficina;
      var cdev = this.caddevolvido;

      this.transporteService.InputVeiculo(placa,chassi,modelo,capac,resp,Tveic,ger,cgps,cdev,supe,loca,pool,cofi).subscribe(
        response => {
          console.log(response);
        });

        this.limpar();
    }
    //==========================================================================================================================


    editCar(car: Veiculo) {
      this.editedCar = car;
      this.displayEdit = true;
      event.preventDefault();
    }
    onEditHide() {
      this.editedCar = null;
      this.limpar();
    }

    EditarVeiculo(carro: Veiculo){
      console.log(carro)
    }

    


    find(Arrays: any[], attribute:any){
      for(var i = 0; i < Arrays.length; i++)
      {
        if(Arrays[i].label == attribute)
        {
          return i;
        }
      }
    }

    limpar(){
      this.cadplaca = null;
      this.cadchassi = null;
      // this.cadmodelo =null;
      this.cadcapacidadem3 = null;
      this.cadresponsavel = null;
      this.cadtipoVeiculo = null;
      this.cadgerencia = null;
      this.cadlocadora = null;
      this.cadsupervisao = null;
      this.cadpool = null;
      this.cadgps = null;
      this.cadoficina = null;
      this.caddevolvido = null;
    }

}
