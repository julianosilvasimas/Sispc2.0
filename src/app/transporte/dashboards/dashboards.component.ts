import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

  public Gerencias;
  public Supervisoes;
  public condutores;
  
  public ranking1;
  public cols1;
  public ranking2;

  public gerencSelect;
  public supervSelect;
  public placSelect;


  constructor() { }

  ngOnInit() {


    
    
    this.Gerencias = [
      {label: '', value:0},
      {label: 'Comercial', value:1},
      {label: 'Operacional', value:2}
    ];
    this.Supervisoes = [
      {label: '', value:0},
      {label: 'Fiscalizacao', value:1},
      {label: 'Eletromecanica', value:2}
    ];
    this.condutores = [
      {label: '', value:0},
      {label: 'Albert Einstein', value:1},
      {label: 'Fred Mercury', value:2},
      {label: 'José Vincente', value: 3}
    ];

    this.cols1 = [
      {field: 'indice', header: '#  '},
      {field: 'placa', header: 'Placas'},
      {field: 'condutor', header: 'Condutores'},
      {field: 'nome', header: 'Responsáveis Pelo Veículo'},
      {field: 'gerencia', header: 'Gerencias'},
      {field: 'departamento',  header: 'Departamento'}
    ];
    this.ranking1 = [
      {indice: 1, placa: 'HFE6699', condutor: 'NÃO IDENTIFICADO', nome:'Fulano de Tal', gerencia: 'Comercial', departamento: 'Fiscalização'},
      {indice: 2, placa: 'HFE6710', condutor: 'José da Silva', nome:'Beltrano Silva', gerencia: 'Operacional Água', departamento: 'Eletromecânica'},
      {indice: 3, placa: 'HFE6711', condutor: 'NÃO IDENTIFICADO', nome:'Sicrano Oliveira', gerencia: 'Comercial', departamento: 'Comissão de Fraudes'},
      {indice: 4, placa: 'HFE6712', condutor: 'Weslley S.', nome:'Fred Mercury', gerencia: 'Planejamento', departamento: 'Planejamento'},
      {indice: 5, placa: 'HFE6713', condutor: 'Mahatma Gandhi', nome:'Mahatma Gandhi', gerencia: 'Operacional', departamento: 'Eletromecânica'},
      {indice: 6, placa: 'HFE6714', condutor: 'Antonio Jobim', nome:'Antonio Jobim', gerencia: 'Frotas', departamento: 'Frotas'},
      {indice: 7, placa: 'HFE6715', condutor: 'NÃO IDENTIFICADO', nome:'Larissa de Macedo', gerencia: 'Frotas', departamento: 'Frotas'},
      {indice: 8, placa: 'HFE6716', condutor: 'Luiz Gonzaga', nome:'Weslley S.', gerencia: 'Serviços', departamento: 'Corte e Religação'},
      {indice: 9, placa: 'HFE6717', condutor: 'José da Silva', nome:'José da Silva', gerencia: 'Serviços', departamento: 'Manutenção'},
      {indice: 10, placa: 'HFE6718', condutor: 'NÃO IDENTIFICADO', nome:'José das Couves', gerencia: 'Operacional Água', departamento: 'Automação'}
    ];


  }
  exportCSV(){
    function convertToCSV(objArray) {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';

      for (var i = 0; i < array.length; i++) {
          var line = '';
          for (var index in array[i]) {
              if (line != '') line += ';'

              line += array[i][index];
          }

          str += line + '\r\n';
      }

      return str;
  }

  function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
      }
    }

    var headers = {
        indice: 'Indice', // remove commas to avoid errors
        placa: "Placa",
        condutor: "Condutor",
        nome: "Responsavel",
        gerencia: "Gerencia",
        departamento: "Departamento",
    };

    var itemsNotFormatted = this.ranking1;
  

    var itemsFormatted = [];

    // format the data
    itemsNotFormatted.forEach((item) => {
        itemsFormatted.push({
            indice: item.indice, // remove commas to avoid errors,
            placa: item.placa,
            condutor: item.condutor,
            nome: item.nome,
            gerencia: item.gerencia,
            departamento: item.departamento
        });
    });

    var fileTitle = 'orders'; // or 'my-unique-title'

    exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download

  }
}
