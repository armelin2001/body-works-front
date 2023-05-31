export type EquipamentoTipo = "Cross" | "Livre" | "Barra";

export interface EquipamentoDto {
  id: string;
  nome: string;
  tipo: EquipamentoTipo;
}
