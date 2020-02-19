export interface Projetos{

    projetoId: number,
    projeto: string,
    localidade: string,
    setor: string,
    responsavel: string,
    statusgloblal: string,
    radar: string,
    gravidade: number,
    urgencia: number,
    tendencia: number,
    inicioprevisto: Date,
    inicioreplanejado: Date,
    iniciorealizado: Date,
    terminoprevisto: Date,
    terminoreplanejado: Date,
    terminorealizado: Date,
    partestinteressadas: [
        {
                orgaoId: number,
                orgao : string,
                ambito: string
        } 
    ]
}
//editar esse modelo
export interface ProjCompletos{
    projetoId: number,
    projeto: string,
    localidade: string,
    setor: string,
    responsavel: string,
    statusgloblal: string,
    radar: string,
    gravidade: number,
    urgencia: number,
    tendencia: number,
    inicioprevisto: Date,
    inicioreplanejado: Date,
    iniciorealizado: Date,
    terminoprevisto: Date,
    terminoreplanejado: Date,
    terminorealizado: Date,
        regulatorio: {
            regulatorioId: 1,
            processo: null,
            fluxoinvestimento: null,
            inicio: null,
            termino: null,
            valorprojeto: null,
            deliberacoes: []
        },
        financeiro: {
            capexId: number,
            nprojetocognos: number,
            descricao: string,
            status: string,
            valortotal: number
        },
        contratacao: {
            contratacaoId: number,
            npedido: number,
            requisicao: string,
            escopo: string,
            contratosistemico: string,
            contratofisico: string,
            nomeempresa: string,
            responsavel: string,
            inicio: string,
            termino: string,
            valorcontratado: string,
            inicioaditivo: string,
            terminoaditivo: string,
            valorcontratadoaditivo: string
        },
        obra: {
            obraId: number,
            avancofisico: number,
            previsto: Date,
            replanejado: Date,
            realizado: Date
        },
        comissionamento: {
            comissionamentoId: 1,
            avancofisico: 0.54,
            previsto: null,
            replanejado: null,
            realizado: null
        },
        comprovacao: {
            comprovacaoId: 1,
            nprocesso: 321,
            envio: null,
            retorno: null,
            valorcomprovado: 235460.0
        },
        licoes: {
            licoesId: 1,
            objetivosatendidos: string,
            entreguenoprazo: string,
            noorcamento: string,
            atendeuescopo: string,
            pfortes: string,
            pfracos: string,
            questoes: string,
            recomendacoes: string
        },
        sesuite: {
            sesuiteId: 1,
            cognosid: null,
            nprojeto: null,
            unidade: null,
            escopo: null,
            justificativa: null,
            premissas: null,
            nvengenharia: null,
            responsavel: null,
            preenchimento: null,
            area: null,
            email: null,
            tel: null,
            teveinvestimento: null,
            envolve: null,
            tipo: null,
            corebusiness: null,
            negocioexistente: null,
            principalmotivacao: null,
            melhoraempresa: null,
            delineado: null,
            nagua: null,
            impactoagua: null,
            nesgoto: null,
            impactoesgoto: null,
            maturidade: null,
            modelomercado: null,
            diferencialcompetitivo: null,
            modeloconcessao: null,
            sinergia: null,
            maturidaderegiao: null
        },
        partestinteressadas: [
            {
                orgaoId: number,
                orgao: string,
                ambito: string
            }
        ]
}