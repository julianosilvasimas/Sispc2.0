import { Component, OnInit } from '@angular/core';
import{ OperacionalEsgotoService } from './operacional-esgoto.service';
import{ PerformanceService } from '../performance/performance.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-operacional-esgoto',
  templateUrl: './operacional-esgoto.component.html',
  styleUrls: ['./operacional-esgoto.component.css']
})
export class OperacionalEsgotoComponent implements OnInit {


  constructor(private esg:OperacionalEsgotoService, private perf:PerformanceService, private messageService: MessageService) { }

  Usuario = sessionStorage.getItem('nome')
  ngOnInit() {
    
  }
}
