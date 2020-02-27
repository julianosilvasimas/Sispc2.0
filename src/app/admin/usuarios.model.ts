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


export interface UsuarioDTO{
    usuarioId: number,
    nome: string,
    email: string,
    login: string
    ativo: boolean,
    senha: string,
    gerenciaId: any[],
    supervisaoId: any[],
    undcodigo: any[]
}

export interface Usuario{
    usuarioId: number,
    nome: string,
    email: string,
    login: string
    ativo: boolean,
    foto: string,
    cargo: string,
    senha: string,
    gerenciaId: any[],
    supervisaoId: any[],
    undcodigo: any[]
    perfis: any[]
    
}