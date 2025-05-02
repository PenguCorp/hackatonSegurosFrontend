export type User = {
  id?: string;
  name?: string;
  email: string;
  token?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

export type UserCharacterizationForm = {
  usuario_id: number;
  motivacion: string;
  plazo_objetivo: "menos_3" | "entre_3_5" | "mas_5";
  emocion_logro: string;
  importancia: number;
  frecuencia_actualizaciones: "diario" | "semanal" | "quincenal" | "mensual";
  ayuda_recordatorios: boolean;
  ayuda_consejos: boolean;
  ayuda_explicaciones: boolean;
  ayuda_mensajes_importantes: boolean;
  tiene_otros_ahorros: boolean;
  frecuencia_pagos: "siempre" | "algunas_veces" | "nunca";
  comodidad_digital: "muy_comodo" | "algo_comodo" | "prefiero_humano";
};