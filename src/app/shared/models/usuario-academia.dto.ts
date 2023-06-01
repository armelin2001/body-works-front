export interface UsuarioAcademiaAdmDto {
    id?: string;
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    codigo?: string;
    adm: boolean;
    dataNascimento: Date;
    genero: string;
}

export interface UsuarioAcademiaAdmResumidoDto {
    id?: string;
    nome: string;
    cpf: string;
    email: string;
    adm: boolean;
}