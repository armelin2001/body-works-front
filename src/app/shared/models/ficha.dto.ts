export type TipoTreino = 'A' | 'B' | 'C' | 'D' | 'E';

export interface IFichaDTO {
  id?: string;
  idInstrutor: string;
  nome: string;
  qtdTreino: number;
  descricao?: string;
  tiposGrupamento: String[];
  exercicios: IExercicioFicha[];
}

export interface IExercicioFicha {
  idExercicio: string;
  series: number;
  repeticoes: number;
  tempoIntervaloMinutos: number;
  tempoIntervaloSegundos: number;
  tipoGrupamento: string;
  tipoTreino: string;
}

export interface IExercicioFichaTreino extends IExercicioFicha {
    nome?: string;
    observacoes?: string;
    videoDemonstrativo?: string;
    idEquipamento: string;
}

export interface IExercicio{
    idExercicio: string;
    repeticoes: number;
    carga: number;
}