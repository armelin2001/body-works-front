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