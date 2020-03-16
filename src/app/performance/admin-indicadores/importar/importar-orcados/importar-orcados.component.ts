import { Component, OnInit } from '@angular/core';
import {Message, MessageService} from "primeng/api";
// import {RefletOrdre} from "../../shared/refletordre";
// import {RefletordreService} from "../../services/refletordre.service";
import {Routes, RouterModule, Router} from '@angular/router';
import { AdminIndicadoresService } from '../../admin-indicadores.service';

@Component({
  selector: 'app-importar-orcados',
  templateUrl: './importar-orcados.component.html',
  styleUrls: ['./importar-orcados.component.css']
})
export class ImportarOrcadosComponent implements OnInit {

  // refletordreService: RefletordreService = new RefletordreService();
  uploadedFiles: any[] = [];
  fileBuffer:string = "";
  fileLines:string[] = [];
  refletOrdres:any[] = new Array<any>();
  debug: string = "";
  file: File;
  listaCompleta:any[] = []



  filtroListaIndicador:any[]=[]
  IndicadorSelecionado

  constructor(private adminindic: AdminIndicadoresService,private router: Router,  private messageService: MessageService) { }

  ngOnInit() {
    this.adminindic.listaIndicadores().subscribe(
      indicador  =>  {
        this.filtroListaIndicador = indicador
      }
    )
  }


  //===========================================================================================
  //UPLOADER
  myUploader(event) {
    this.tableactive = false
    this.fileBuffer = ""
    this.readFile(event.files[0]);
  }

  readFile(file: File) {
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      this.Listaindicadores = []
      this.fileBuffer+=reader.result;
      this.fileLines = this.fileBuffer.split("\n");
      this.preencherTabela(this.fileLines)
    };

    this.tableactive = true
  }
  
  //===========================================================================================
  //TABLE

  Listaindicadores: any[]=[]
  tableactive:boolean = false
  preencherTabela(fileLines){
    var data
    var orcado
    var meta
    var minimo
    var maximo
    var forecast
    var forecast2
    var forecast3
    var previsao
    var fileCols = fileLines[0].split(';');

    for(var i =0;i<fileCols.length;i++){
      var c = fileCols[i].toLocaleLowerCase().replace(' ','').replace('ç','c').replace('í','i').replace('ã','a').replace('á','a')
      data = c.includes('data') ? i : data;
      orcado = c.includes('orcado') ? i : orcado;
      meta = c.includes('meta') ? i : meta;
      minimo = c.includes('minimo') ? i : minimo;
      maximo = c.includes('maximo') ? i : maximo;
      forecast = c.includes('forecast') ? i : forecast;
      forecast2 = c.includes('forecast2') ? i : forecast2;
      forecast3 = c.includes('forecast3') ? i : forecast3;
      previsao = c.includes('previsao') ? i : previsao;
      
    }

    orcado = orcado == undefined ? '-' : orcado
    meta = meta == undefined ? '-' : meta
    minimo = minimo == undefined ? '-' : minimo
    maximo = maximo == undefined ? '-' : maximo
    forecast = forecast == undefined ? '-' : forecast
    forecast2 = forecast2 == undefined ? '-' : forecast2
    forecast3 = forecast3 == undefined ? '-' : forecast3
    previsao = previsao == undefined ? '-' : previsao

    console.log(orcado + ' - '+meta+ ' - '+minimo+ ' - '+maximo+ ' - '+forecast+ ' - '+forecast2+ ' - '+forecast3+ ' - '+previsao)

    for(var i =1;i<fileLines.length;i++){
      var fileCol = fileLines[i].split(';');
      var dataconvertida = fileCol[data].substring(6,10) + '-' + fileCol[data].substring(3,5) + '-' + fileCol[data].substring(0,2);
      this.Listaindicadores.push({
        dataindicador: dataconvertida,
        orcado: orcado == '-' ? 0 : fileCol[orcado].replace(".","").replace(",",".")*1,
        meta: meta == '-' ? 0 :fileCol[meta].replace(".","").replace(",",".")*1,
        minimo: minimo == '-' ? 0 :fileCol[minimo].replace(".","").replace(",",".")*1,
        maximo: maximo == '-' ? 0 :fileCol[maximo].replace(".","").replace(",",".")*1,
        forecast: forecast == '-' ? 0 :fileCol[forecast].replace(".","").replace(",",".")*1,
        forecast2: forecast2 == '-' ? 0 : fileCol[forecast2].replace(".","").replace(",",".")*1,
        forecast3: forecast3 == '-' ? 0 :fileCol[forecast3].replace(".","").replace(",",".")*1,
        previsao: previsao == '-' ? 0 :fileCol[previsao].replace(".","").replace(",",".")*1
      });
    }
  }

  resetar(){
    this.tableactive=false
    this.Listaindicadores = []
  }
  
  enviarDados(){
    if(this.IndicadorSelecionado == null){
      this.messageService.add({severity: 'info', summary: 'Informação', detail: 'Selecione o Indicador.'});
    }else{
      for(var i = 0;i<this.Listaindicadores.length;i=i){
        this.adminindic.importarIndicador(this.Listaindicadores[i], this.IndicadorSelecionado.indicadorId).subscribe(
          ind=>{
          },
          erro=>{
            this.messageService.add({severity: 'danger', summary: 'Erro', detail: 'Erro'});
          }
        )
        this.Listaindicadores.splice(i,1);
      }
      if(this.Listaindicadores.length===0){
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Indicador '+this.IndicadorSelecionado.indicador+' atualizado'});
      }else{
        this.messageService.add({severity: 'danger', summary: 'Erro', detail: 'Erro'});
      }
    }
  }

}
