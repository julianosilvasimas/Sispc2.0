
export interface Classificacao{
    id: number,
    dataDaCriacao: string,
    icon: string,
    nome: string
}

export interface Unidades{
    id: number,
    dataDaCriacao: string,
    unidade: string,
    tipoDeTratamento: number,
    vazao: number,
    operadores: any[]
}