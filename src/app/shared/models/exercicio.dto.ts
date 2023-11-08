export type ExercicioDificuldade = "Iniciante" | "Intermediario" | "Avancado";
export type ExercicioTipo = "Cardiovascular" | "Força" | "Flexibilidade";
    
export const NIVEL_DIFICULDADE = [ //ESTE VAI PARA O CAMPO EM HTML
    "Iniciante",
    "Intermediario",
    "Avancado",
];
export const TIPO_EXERCICIO = [ //ESTE VAI PARA O CAMPO EM HTML
    "Cardiovascular",
    "Força",
    "Flexibilidade",
];
    

export interface IExercicioDTO{
    id?: string;
    nome: string;
    tipoExercicio: ExercicioTipo;
    equipamentoNecessario: string;
    nivelDificuldade: ExercicioDificuldade;
    videoDemonstrativo: string;
    musculosTrabalhados: string;
}