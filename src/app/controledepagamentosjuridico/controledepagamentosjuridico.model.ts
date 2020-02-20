export class Controledepagamentosjuridico {
    pagamento(){}
}
export interface Pagamento{
    dataProgramada: String,
    motivoPagamento:  String,
    enviadoParaAprovacao: number,
    idPagamento: String,
    processo: String,
    dataCadastro: String,
    usuarioInsert: String,
    falhaConcess: boolean,
    sentenca: String,
    fornecedor: String,
    autor: String,
    escritorio: String,
    empresa: String,
    aprovador2: String,
    aprovador1: String,
    aprovador3: String,
    aprovacao1: number,
    aprovacao2: number,
    aprovacao3: number,
    contaContabil: String,
    centroDeCusto: String,
    natureza: String,
    valor:number
}