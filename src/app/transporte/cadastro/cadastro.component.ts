import { Component, OnInit } from '@angular/core';
import {MenuItem, SelectItem, MessageService} from 'primeng/api';

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
   cadmodelo: any;
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

   editveiculoId:any;
   editdatCad:any;
   editplaca: any;
   editchassi:any;
   editmodelo: any;
   editcapacidadem3: any;
   editresponsavel: any;
   edittipoVeiculo: any;
   editgerencia: any;
   editlocadora: any;
   editsupervisao: any;
   editpool: boolean;
   editgps: boolean;
   editoficina: boolean;
   editdevolvido: boolean;


   

   constructor(private transporteService: TransporteService,
    private messageService: MessageService) {
      this.atualizarListagem();
    }

   

    ngOnInit() { 
      this.cadpool = false;
      this.caddevolvido = false;
      this.cadgps = false;
      this.cadoficina = false;
        
      this.items = [
        {label: 'Lista de veículos'},
        {label: 'Cadastrar Novo'}
      ];
      

      
      

      this.Gerencias = [
        {label: ''},
        {label: 'Comercial', value: 'Comercial'},
        {label: 'Operacional', value: 'Operacional'}
      ];
      this.Supervisoes = [
        {label: ''},
        {label: 'Fiscalizacao',value: 'Fiscalizacao'},
        {label: 'Eletromecanica', value: 'Eletromecanica'}
      ];
      this.condutores = [
        {label: ''},
        {label: 'Albert Einstein', value: 'Albert Einstein'},
        {label: 'Fred Mercury', value: 'Fred Mercury'},
        {label: 'José Vicente', value: 'José Vicente'},
        {label: 'Hermes e Renato', value: 'Hermes e Renato'}
      ];
      
      this.tipoVeiculo = [
        {label: ''},
        {label: 'MOTO',value: 'MOTO'},
        {label: 'CARRO',value: 'CARRO'},
        {label: 'VEÍCULO PESADO',value: 'VEÍCULO PESADO'}
      ];
      this.GPS = [
        {label: ''},
        {label: 'Com GPS'},
        {label: 'Sem GPS'}
      ];
      this.modelos = [
        {label: ''},
        {label: 'AMAROK', value: 'AMAROK'},
        {label: 'COROLLA', value: 'COROLLA'},
        {label: 'COROLLA GLI', value: 'COROLLA GLI'},
        {label: 'CAMINHAO', value: 'CAMINHAO'},
        {label: 'MONTANA LS - MT', value: 'MONTANA LS - MT'},
        {label: 'ONIX 1.0 LS - MT', value:'ONIX 1.0 LS - MT'},
        {label: 'PRISMA LT - AT', value: 'PRISMA LT - AT'},
        {label: 'RETRO CATERPILLAR', value: 'RETRO CATERPILLAR'},
        {label: 'STRADA', value: 'STRADA'},
        {label: 'S-10 LS - MT', value: 'S-10 LS - MT'}
      ];
      this.locadoras = [
        {label: ''},
        {label: 'LVE', value: 'LVE'},
        {label: 'OURO VERDE', value: 'OURO VERDE'}
      ];
      this.adicionais = [
        {label: '', value: ''},
        {label: 'MUNCK', value: 'MUNCK'},
        {label: 'PIPA 10m/³', value: 'PIPA 10m/³'}
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
    atualizarListagem(){
      this.cars0 = [];
      this.cars = [];
      this.transporteService.veiculos()
      .subscribe(
        Veiculos  =>  {
          this.cars0 = Veiculos
          this.cars= Veiculos
        });
        this.limpar();
    }
    //==========================================================================================================================
    //SALVAR CADASTRO DE VEICULO================================================================================================
    selectCar(car: Veiculo) {
      this.selectedCar = car;
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

      this.editveiculoId = car.veiculoId
      this.editdatCad = car.datCad
      this.editplaca = car.placa
      this.editchassi = car.chassi
      this.editmodelo = car.modelo
      this.editcapacidadem3 = car.capacidadem3
      this.editresponsavel = car.responsavel
      this.edittipoVeiculo = car.tipoVeiculo
      this.editgerencia = car.gerencia
      this.editlocadora = car.locadora;
      this.editsupervisao = car.supervisao;
      this.editpool = car.pool;
      this.editgps = car.gps;
      this.editoficina = car.oficina;
      this.editdevolvido = car.devolvido;

      this.displayEdit = true;
      event.preventDefault();
    }
    onEditHide() {
      this.editedCar = null;
      this.limpar();
    }

    async EditarVeiculo(){
      this.editedCar = {
        veiculoId: this.editveiculoId,
        datCad: this.editdatCad,
        placa:  this.editplaca,
        chassi: this.editchassi,
        modelo: this.editmodelo,
        capacidadem3: this.editcapacidadem3,
        responsavel: this.editresponsavel,
        tipoVeiculo: this.edittipoVeiculo,
        gerencia:  this.editgerencia,
        gps: this.editgps,
        devolvido: this.editdevolvido,
        supervisao: this.editsupervisao,
        locadora: this.editlocadora,
        pool: this.editpool,
        oficina: this.editoficina
      }
      this.transporteService.UpdateVeiculo(this.editedCar).subscribe(response => {
        console.log(response);
      });
      await new Promise(r => setTimeout(r, 500));
      this.atualizarListagem();
      this.displayDialog = false;
      this.displayEdit = false;
      this.cars0 = [];
      this.cars = [];
      
    }

    find(Arrays: any[], attribute:any){
      for(var i = 0; i < Arrays.length; i++)
      {
        if(Arrays[i].label == attribute){
          return i;
        }
      }
    }

    limpar(){
      this.cadplaca = null;
      this.cadchassi = null;
      this.cadmodelo =null;
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
