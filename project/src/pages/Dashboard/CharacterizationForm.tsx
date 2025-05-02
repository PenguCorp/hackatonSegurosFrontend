import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Checkbox } from "../../components/ui/Checkbox";
import { TextArea } from "../../components/ui/TextArea";
import { Button } from "../../components/ui/Button";
import { UserCharacterizationForm } from "../../types";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";

const PLAZO_OPTIONS = [
  { value: "", label: "Selecciona un plazo" },
  { value: "menos_3", label: "Menos de 3 años" },
  { value: "entre_3_5", label: "Entre 3 y 5 años" },
  { value: "mas_5", label: "Más de 5 años" },
];

const FRECUENCIA_ACTUALIZACIONES_OPTIONS = [
  { value: "", label: "Selecciona una frecuencia" },
  { value: "diario", label: "Diario" },
  { value: "semanal", label: "Semanal" },
  { value: "quincenal", label: "Quincenal" },
  { value: "mensual", label: "Mensual" },
];

const FRECUENCIA_PAGOS_OPTIONS = [
  { value: "", label: "Selecciona una frecuencia" },
  { value: "siempre", label: "Siempre" },
  { value: "algunas_veces", label: "Algunas veces" },
  { value: "nunca", label: "Nunca" },
];

const COMODIDAD_DIGITAL_OPTIONS = [
  { value: "", label: "Selecciona tu nivel de comodidad" },
  { value: "muy_comodo", label: "Muy cómodo" },
  { value: "algo_comodo", label: "Algo cómodo" },
  { value: "prefiero_humano", label: "Prefiero atención humana" },
];

export const CharacterizationForm: React.FC = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserCharacterizationForm>({
    defaultValues: {
      usuario_id: user?.id ? parseInt(user.id) : 0,
      motivacion: "",
      plazo_objetivo: "menos_3",
      emocion_logro: "",
      importancia: 3,
      frecuencia_actualizaciones: "diario",
      ayuda_recordatorios: false,
      ayuda_consejos: false,
      ayuda_explicaciones: false,
      ayuda_mensajes_importantes: false,
      tiene_otros_ahorros: false,
      frecuencia_pagos: "siempre",
      comodidad_digital: "muy_comodo",
    },
  });

  const onSubmit = async (data: UserCharacterizationForm) => {
    try {
      await api.post("/formularios", data);
      alert("Formulario enviado exitosamente");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error al enviar el formulario");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Formulario de Caracterización</CardTitle>
        <CardDescription>
          Queremos conocer mejor tus metas para ayudarte a cumplirlas
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">1. Conectemos con tu meta</h2>
            
            <TextArea
              label="¿Qué te motivó a dar el primer paso?"
              placeholder="Cuéntanos sobre tu sueño, cambio o necesidad..."
              {...register("motivacion", {
                required: "Este campo es requerido",
              })}
              error={errors.motivacion?.message}
            />

            <Select
              label="¿Cuánto tiempo te das para lograrlo?"
              options={PLAZO_OPTIONS}
              {...register("plazo_objetivo", {
                required: "Por favor selecciona un plazo",
              })}
              error={errors.plazo_objetivo?.message}
            />

            <TextArea
              label="¿Qué sentirías al alcanzar esta meta?"
              placeholder="Por ejemplo: tranquilidad, orgullo, seguridad..."
              {...register("emocion_logro", {
                required: "Este campo es requerido",
              })}
              error={errors.emocion_logro?.message}
            />

            <Input
              type="number"
              label="¿Qué tan importante es esta meta para ti? (1-5)"
              min={1}
              max={5}
              {...register("importancia", {
                required: "Este campo es requerido",
                min: { value: 1, message: "El valor mínimo es 1" },
                max: { value: 5, message: "El valor máximo es 5" },
              })}
              error={errors.importancia?.message}
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">2. Acompañamiento personalizado con PenguIA</h2>

            <Select
              label="¿Con qué frecuencia te gustaría recibir actualizaciones?"
              options={FRECUENCIA_ACTUALIZACIONES_OPTIONS}
              {...register("frecuencia_actualizaciones", {
                required: "Por favor selecciona una frecuencia",
              })}
              error={errors.frecuencia_actualizaciones?.message}
            />

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                ¿Qué tipo de ayuda te gustaría recibir?
              </label>
              
              <div className="space-y-2">
                <Checkbox
                  label="Recordatorios para mantenerme al día"
                  {...register("ayuda_recordatorios")}
                />
                <Checkbox
                  label="Consejos para mejorar mis finanzas"
                  {...register("ayuda_consejos")}
                />
                <Checkbox
                  label="Explicaciones claras sobre cómo crece mi ahorro"
                  {...register("ayuda_explicaciones")}
                />
                <Checkbox
                  label="Solo mensajes importantes"
                  {...register("ayuda_mensajes_importantes")}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">3. Tus hábitos financieros</h2>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                ¿Tienes actualmente otros mecanismos de ahorro o inversión?
              </label>
              <Checkbox
                label="Sí"
                {...register("tiene_otros_ahorros")}
              />
            </div>

            <Select
              label="¿Qué tan frecuente usas pagos automáticos o programados?"
              options={FRECUENCIA_PAGOS_OPTIONS}
              {...register("frecuencia_pagos", {
                required: "Por favor selecciona una frecuencia",
              })}
              error={errors.frecuencia_pagos?.message}
            />

            <Select
              label="¿Qué tan cómodo te sientes con herramientas digitales?"
              options={COMODIDAD_DIGITAL_OPTIONS}
              {...register("comodidad_digital", {
                required: "Por favor selecciona tu nivel de comodidad",
              })}
              error={errors.comodidad_digital?.message}
            />
          </div>

          <div className="flex justify-end">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" isLoading={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar formulario"}
              </Button>
            </motion.div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};