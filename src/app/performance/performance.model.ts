
export interface Bots{
    label: string,
    funcao: string,
    value: number,
    status: string

}
export interface Indicadores{
    exeindicadorId: number,
    datareferencia: Date,
    dataindicador: Date,
    ciclo: number,
    periodicidade: string,
    orcado: number,
    realizado: number,
    realizadokg: number,
    pecld: number,
    forecast: number,
    forecast2: number,
    forecast3: number,
    minimo: number,
    maximo: number,
    meta: number,
    valorretido: number,
    previsao: number,
    dentroprazo: number,
    foraprazo: number,
    dentroprazoreg: number,
    foraprazoreg: number,
    atendente: number,
    atendimento: number,
    comentario: string ,
    acao: string,
    analise: string,
    colaborador: string,
    indicadorId: {
        indicadorId: number,
        classificacao: string,
        indicador: string,
        gerencia: number,
        ordem: number,
        tipoGrafico: number,
        produtos: object
    },
    undcodigo: {
        unidadeId: number,
        unidade: string,
        cnpj: number,
        tag: string,
        regionalId: number
    }
}