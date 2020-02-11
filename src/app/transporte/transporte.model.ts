export interface Veiculo{
    veiculoId: string,
    datCad: string,
    placa: string,
    chassi:string,
    modelo: string,
    capacidadem3: string,
    responsavel: string,
    tipoVeiculo: string,
    gerencia: string,
    gps: boolean,
    devolvido: boolean,
    supervisao: string,
    locadora: string,
    pool: boolean,
    oficina: boolean
}
export interface Agendamento{
    agendamentoId: number,
    solicitante: string,
    fksolicitante: number,
    emailsolicitante: string,
    qtdPessoas: number,
    agendadoate: string,
    tipoVeiculoSolicitado: string,
    tipoVeiculoDisponibilizado: string,
    agendadode:string,
    placa:string,
    aprovador: string,
    emailaprovador: string,
    aprovacao: number,
    justificativa: string,
    justificativasolicitacao: string,
    destino: string,
    condutor: string,
    dataAgendamento: string,
    emergencial: boolean,
}
export interface labels{
    label: string,
    value: string
}