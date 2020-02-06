import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rpa',
  templateUrl: './rpa.component.html',
  styleUrls: ['./rpa.component.css']
})
export class RpaComponent implements OnInit {
  bot: any;
  displayDialog;
  selectedBot;
  constructor() { }

  ngOnInit() {
    this.bot=[
    {
      nomeBot: "Robot de Pipas",
      descricao: "Responsavel por baixar ordens de serviço de pipa",
      gerencia: "Serviços",
      status: "Esperando",
      ultimoStatus:[
        {
          nome: "vitor.heser",
          hostname: "DSKPRL0004",
          status: "Trabalhando",
          horario: "01/01/2020 15:13:00",
        },
        {
          nome: "vitor.heser",
          hostname: "DSKPRL0004",
          status: "Iniciando",
          horario: "01/01/2020 08:13:00",
        },
      ]
    },
    {
      nomeBot: "Gerar Os",
      descricao: "Responsavel por Gerar ordens de Serviços",
      gerencia: "Todas",
      status: "Trabalhando",
      ultimoStatus:[
        {
          nome: "vitor.heser",
          hostname: "DSKPRL0004",
          status: "Trabalhando",
          horario: "01/01/2020 15:13:00",
        },
        {
          nome: "vitor.heser",
          hostname: "DSKPRL0004",
          status: "Iniciando",
          horario: "01/01/2020 08:13:00",
        },
      ]
    },
    {
      nomeBot: "Gerar Os",
      descricao: "Responsavel por Gerar ordens de Serviços",
      gerencia: "Todas",
      status: "Trabalhando",
      ultimoStatus:[
        {
          nome: "vitor.heser",
          hostname: "DSKPRL0004",
          status: "Trabalhando",
          horario: "01/01/2020 15:13:00",
        },
        {
          nome: "vitor.heser",
          hostname: "DSKPRL0004",
          status: "Iniciando",
          horario: "01/01/2020 08:13:00",
        },
      ]
    },
    {
      nomeBot: "Gerar Os",
      descricao: "Responsavel por Gerar ordens de Serviços",
      gerencia: "Todas",
      status: "Trabalhando",
      ultimoStatus:[
        {
          nome: "vitor.heser",
          hostname: "DSKPRL0004",
          status: "Trabalhando",
          horario: "01/01/2020 15:13:00",
        },
        {
          nome: "vitor.heser",
          hostname: "DSKPRL0004",
          status: "Iniciando",
          horario: "01/01/2020 08:13:00",
        },
      ]
    },
    {
      nomeBot: "Robot Compulsórias",
      descricao: "Responsavel por baixar ordens de serviço de pipa",
      gerencia: "Comercial",
      status: "Dormindo",
      ultimoStatus:[
        {
          nome: "vitor.heser",
          hostname: "DSKPRL0004",
          status: "Trabalhando",
          horario: "01/01/2020 15:13:00",
        },
        {
          nome: "vitor.heser",
          hostname: "DSKPRL0004",
          status: "Iniciando",
          horario: "01/01/2020 08:13:00",
        },
      ]
    },
    {
      nomeBot: "Robot Compulsórias",
      descricao: "Responsavel por baixar ordens de serviço de pipa",
      gerencia: "Comercial",
      status: "Dormindo",
      ultimoStatus:[
        {
          nome: "vitor.heser",
          hostname: "DSKPRL0004",
          status: "Trabalhando",
          horario: "01/01/2020 15:13:00",
        },
        {
          nome: "vitor.heser",
          hostname: "DSKPRL0004",
          status: "Iniciando",
          horario: "01/01/2020 08:13:00",
        },
      ]
    },
    {
      nomeBot: "Robot Compulsórias",
      descricao: "Responsavel por baixar ordens de serviço de pipa",
      gerencia: "Comercial",
      status: "Dormindo",
      ultimoStatus:[
        {
          nome: "vitor.heser",
          hostname: "DSKPRL0004",
          status: "Trabalhando",
          horario: "01/01/2020 15:13:00",
        },
        {
          nome: "vitor.heser",
          hostname: "DSKPRL0004",
          status: "Iniciando",
          horario: "01/01/2020 08:13:00",
        },
      ]
    }
  ]
  }
  selectCar(bot: any) {
    this.selectedBot = bot;
    this.displayDialog = true;
    event.preventDefault();
  }

  onDialogHide() {
    this.selectedBot = null;
  }
}
