export type EquipamentoTipo = 
    | "Cross"
    | "Livre"
    | "Barra";

export const EQUIPAMENTO_TIPO = [ //ESTE VAI PARA O CAMPO EM HTML
    "Cross",
    "Livre",
    "Barra",
];
    
export interface IEquipamentoDTO{
    id?: string;
    nome: string;
    tipo: EquipamentoTipo;
}