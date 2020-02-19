export class Controledepagamentosjuridico {
    pagamento(){}
}
export interface Pagamento{
    dataProgramada: String,
    motivoPagamento:  String,
    enviadoParaAprovacao: boolean,
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
    aprovacao1: boolean,
    aprovacao2: boolean,
    aprovacao3: boolean,
    contaContabil: String,
    centroDeCusto: String,
    natureza: String,
    valor:number
}