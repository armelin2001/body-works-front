import { IFichaDTO, TipoTreino } from "./ficha.dto";

export interface IHistoricoTreino {
    id?: string;
    qtdAtualTreino: number;
    tipoAtual?: TipoTreino;
    idFichaTreino: string;
    ficha?: IFichaDTO;
    idUsuario: string;
    dataTreino: Date;
    idTreino?: string;
}
