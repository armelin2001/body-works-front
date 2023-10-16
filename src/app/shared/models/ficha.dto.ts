
export type TipoTreino = "A" | "B" | "C" | "D" | "E";

export interface IFichaDTO {
    id?: string;
    idInstrutor: string;
    nome: string;
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
}
