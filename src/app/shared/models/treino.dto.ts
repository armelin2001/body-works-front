export interface TreinoDto {
    id?: string;
    idUsuario: string;
    idFicha: string;
    dataTreino: Date;
    comentario?: string;
    exercicios: ExercicioTreinoDto[];
}

export interface ExercicioTreinoDto {
    idExercicio: string;
    cargaMedia?: number;
    series: number;
    repeticoes: number[];
    carga: number[];
}