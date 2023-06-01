export type EquipamentoTipo = 
    | "Cross"
    | "Livre"
    | "Barra";
    
export interface IEquipamentoDTO{
    id?: string;
    nome: string;
    tipo: EquipamentoTipo;
}