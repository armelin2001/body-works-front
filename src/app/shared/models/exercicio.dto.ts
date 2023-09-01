export type ExercicioTipo = 
    | "Cross"
    | "Livre"   
    | "Barra";
    
export interface IExercicioDTO{
    id?: string;
    nome: string;
    tipo: ExercicioTipo;
}