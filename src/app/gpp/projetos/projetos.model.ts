export interface Combos {
    label;
    value;
}

export interface Colunas {
    label;
    header;
}

export interface Engenharia {
    nomeEmpresa;
    respEmpresa;
    status;
    tipo;
    previsto;
    replanejado;
    realizado;
}

export interface Processos {
    nProcesso;
    responsavel;
    envio;
    retorno;
}

export interface Licencas {
    numeroLicenca;
    tipoLicenca;
    status;
    orgao;
    descricao;
    protocolo;
    inicio;
    termino;
}

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
    /*partestinteressadas: [
        {
                orgaoId: number,
                orgao : string,
                ambito: string
        } 
    ]*/
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
            comissionamentoId: number,
            avancofisico: number,
            previsto: Date,
            replanejado: Date,
            realizado: Date
        },
        comprovacao: {
            comprovacaoId: number,
            nprocesso: number,
            envio: Date,
            retorno: Date,
            valorcomprovado: number
        },
        licoes: {
            licoesId: number,
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
            sesuiteId: number,
            cognosid: string,
            nprojeto: string,
            unidade: string,
            escopo: string,
            justificativa: string,
            premissas: string,
            nvengenharia: string,
            responsavel: string,
            preenchimento: string,
            area: string,
            email: string,
            tel: string,
            teveinvestimento: string,
            envolve: string,
            tipo: string,
            corebusiness: string,
            negocioexistente: string,
            principalmotivacao: string,
            melhoraempresa: string,
            delineado: string,
            beneficios: {
                sesuiteBeneficiosId: number,
                impactogestao: string,
                impactomotivacao: string,
                impactoseguranca: string,
                impactosustentabilidade: string,
                outramelhoria: string,
                outramelhoriaespec: string
            },
            direcionamento: {
                sesuiteDirecionamentoId: number,
                nagua: string,
                impactoagua: string,
                nesgoto: string,
                impactoesgoto: string,
                maturidade: string,
                modelomercado: string,
                diferencialcompetitivo: string,
                modeloconcessao: string,
                sinergia: string,
                maturidaderegiao: string
            },
            licenca: {
                sesuiteLicencaId: number,
                impactosocial: string,
                relacionamentopolitico: string,
                relacionamentosociedade: string,
                impactoimagem: string,
                probabilidadeimpactoimagem: string,
                impactoreputacional: string
            },
            riscoscontratual: {
                sesuiteRiscoContratualId: number,
                clausulacontratual: string,
                tipometa: string,
                metaatingida: string,
                penalidade12meses: string,
                penalidadeaplicavel: string,
                probabilidadepenalidade: string,
                postergacao: string,
                impactopolitico: string
            },
            riscosoperacionais: {
                sesuiteRiscoOperacionaisId: number,
                impactointerrupcao: string,
                probabilidadeimpactointerrupcao: string,
                custointerrupcao: string,
                complexidadeexecucao: string,
                impactosubstituicao: string,
                probabilidadeimpactosubstituicao: string,
                impactoambiental: string,
                probabilidadeimpactoambiental: string,
                impactointegridade: string,
                probabilidadeimpactointegridade: string,
                riscoatraso: string,
                possuilicenca: string,
                nlicenca: string,
                prazolicenca: string,
                condicionantelicenca: string,
                condicionantelicencaespec: string,
                emissaolicenca: Date,
                validadelicenca: Date
            }
        },
        partestinteressadas: [
            {
                orgaoId: number,
                orgao: string,
                ambito: string
            }
        ]
}

export interface PartesInteressadas{
    orgaoId: number,
    orgao: string,
    ambito: string
}