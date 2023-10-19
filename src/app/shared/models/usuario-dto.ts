export interface UsuarioDto {
  id?: string;
  nome: string;
  cpf: string;
  genero: string;
  email: string;
  senha: string;
  perfil: string;
  statusPagamento: string;
  dataNascimento: Date;
  peso?: string;
  altura?: string;
}

export interface UsuarioFichaDto {
    id: string;
    idFicha: string;
}
