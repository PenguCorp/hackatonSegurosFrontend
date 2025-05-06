// Formulario multistep corregido para envío y validación
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/Card";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { TextArea } from "./ui/TextArea";
import { Button } from "./ui/Button";
import { Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { UserCharacterizationForm } from "../types";

const steps = ["Tu meta", "Platin", "Hábitos financieros"];

interface SelectableCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const SelectableCard: React.FC<SelectableCardProps> = ({ label, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between border rounded-xl px-4 py-3 transition-all cursor-pointer ${selected
    ? "bg-blue-100 border-blue-500 shadow-md"
    : "bg-white border-slate-300 hover:border-blue-400"
    } `}
  >
    <span className="text-sm font-medium">{label}</span>
    {selected && <Check className="h-5 w-5 text-blue-500" />}
  </div>
);

export const CharacterizationForm: React.FC = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
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
    console.log("Enviando datos:", data);
    try {
      await api.post("/formulario", data);
      alert("Formulario enviado exitosamente");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error al enviar el formulario");
    }
  };

  const nextStep = async () => {
    const valid = await trigger();
    if (valid) setStep((prev) => prev + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <TextArea label="¿Qué te motivó a dar el primer paso?" {...register("motivacion", { required: "Campo requerido" })} error={errors.motivacion?.message} />
            <Select label="¿Cuánto tiempo te das para lograrlo?" options={[{ value: "", label: "Selecciona un plazo" }, { value: "menos_3", label: "Menos de 3 años" }, { value: "entre_3_5", label: "Entre 3 y 5 años" }, { value: "mas_5", label: "Más de 5 años" }]} {...register("plazo_objetivo", { required: true })} error={errors.plazo_objetivo?.message} />
            <TextArea label="¿Qué sentirías al alcanzar esta meta?" {...register("emocion_logro", { required: "Campo requerido" })} error={errors.emocion_logro?.message} />
            <Input type="number" label="¿Qué tan importante es esta meta para ti? (1-5)" min={1} max={5} {...register("importancia", { required: true, min: 1, max: 5 })} error={errors.importancia?.message} />
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <Select label="¿Con qué frecuencia deseas actualizaciones?" options={[{ value: "", label: "Selecciona una frecuencia" }, { value: "diario", label: "Diario" }, { value: "semanal", label: "Semanal" }, { value: "quincenal", label: "Quincenal" }, { value: "mensual", label: "Mensual" }]} {...register("frecuencia_actualizaciones", { required: true })} error={errors.frecuencia_actualizaciones?.message} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SelectableCard label="Recordatorios" selected={watch("ayuda_recordatorios")} onClick={() => setValue("ayuda_recordatorios", !watch("ayuda_recordatorios"))} />
              <SelectableCard label="Consejos financieros" selected={watch("ayuda_consejos")} onClick={() => setValue("ayuda_consejos", !watch("ayuda_consejos"))} />
              <SelectableCard label="Explicaciones de ahorro" selected={watch("ayuda_explicaciones")} onClick={() => setValue("ayuda_explicaciones", !watch("ayuda_explicaciones"))} />
              <SelectableCard label="Solo mensajes importantes" selected={watch("ayuda_mensajes_importantes")} onClick={() => setValue("ayuda_mensajes_importantes", !watch("ayuda_mensajes_importantes"))} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex gap-3">
              <SelectableCard label="Sí tengo" selected={watch("tiene_otros_ahorros")} onClick={() => setValue("tiene_otros_ahorros", true)} />
              <SelectableCard label="No tengo" selected={!watch("tiene_otros_ahorros")} onClick={() => setValue("tiene_otros_ahorros", false)} />
            </div>
            <Select label="¿Frecuencia de pagos automáticos?" options={[{ value: "", label: "Selecciona una frecuencia" }, { value: "siempre", label: "Siempre" }, { value: "algunas_veces", label: "Algunas veces" }, { value: "nunca", label: "Nunca" }]} {...register("frecuencia_pagos", { required: true })} error={errors.frecuencia_pagos?.message} />
            <Select label="¿Qué tan cómodo estás con herramientas digitales?" options={[{ value: "", label: "Selecciona tu nivel" }, { value: "muy_comodo", label: "Muy cómodo" }, { value: "algo_comodo", label: "Algo cómodo" }, { value: "prefiero_humano", label: "Prefiero atención humana" }]} {...register("comodidad_digital", { required: true })} error={errors.comodidad_digital?.message} />
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Formulario de Caracterización</CardTitle>
        <CardDescription>Queremos conocerte mejor para ayudarte</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-center space-x-4">
            {steps.map((title, index) => (
              <button
                type="button"
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${step === index? "bg-yellow-400 text-white" : "bg-slate-200 text-slate-700"}`}
                onClick={() => setStep(index)}
              >
                {title}
              </button>
            ))}
          </div>

          <div>{renderStep()}</div>

          <div className="flex justify-between mt-6">
            {step > 0 && <Button type="button" onClick={() => setStep(step - 1)}>Anterior</Button>}
            {step < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>Siguiente</Button>
            ) : (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" isLoading={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar formulario"}
                </Button>
              </motion.div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};