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