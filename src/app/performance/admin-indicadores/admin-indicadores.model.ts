import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

export interface CadIndicador{
    indicadorId: number, 
    indicador: string, 
    gerencia: number, 
    classificacao : number, 
    tipo_grafico : number,
    ordem : number,
    tendencia : number,
    produtos: any[],
    campoDoGraficoId: campoDoGraficoId[],
    rotuloVirgula: any,
    qtdEixos: any
    campo1: any
    campo2: any
    campo3: any
    campo4: any
    rotulocampo1: any
    rotulocampo2: any
    rotulocampo3: any
    rotulocampo4: any
}
export interface campoDoGraficoId{
    estilo: string,
    label: string,
    tipografico: string,
    coreixo: string,
    eixo: string,
    posicao: string,
    campoDoGraficoId: number
}