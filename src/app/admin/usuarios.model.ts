export interface Usuarios{
    usuarioId: number,
    nome: string,
    email: string,
    login: string
    ativo: boolean,
    senha: string
}
export interface Permissoes{
    perfilId: number,
    perfil: string,
    permissao: string,
    authority: string
}


export interface Usuario{
    usuarioId: number,
    nome: string,
    email: string,
    login: string
    ativo: boolean,
    cargo: number,
    foto: string,
    undcodigo: number,
    gerenciaId: number,
    supervisaoId: number,
    perfis: Permissoes[],

}