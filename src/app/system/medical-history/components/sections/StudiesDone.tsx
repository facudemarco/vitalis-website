import React, {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";

import {MedicalRecordStudies} from "@/types";

import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

import {SectionHandler} from "../../useFormRegistry";

interface Props {
  defaultValues: MedicalRecordStudies | null;
  registerSection: (handler: SectionHandler<MedicalRecordStudies>) => () => void;
}

const normalizeBooleanFields = (data: MedicalRecordStudies | null): MedicalRecordStudies | null => {
  if (!data) return null;

  const toBool = (value: any): boolean => value === "true" || value === true;

  return {
    ...data,
    psicometria: toBool(data.psicometria),
    ergometria: toBool(data.ergometria),
    audiometria: toBool(data.audiometria),
    psicotecnico: toBool(data.psicotecnico),
    drogas_abuso: toBool(data.drogas_abuso),
    evaluation_oftalmologica: toBool(data.evaluation_oftalmologica),
    electro: toBool(data.electro),
    laboratorio: toBool(data.laboratorio),
    rx_columna_cervical_frente: toBool(data.rx_columna_cervical_frente),
    test_cereal: toBool(data.test_cereal),
    examen_fisico: toBool(data.examen_fisico),
    rx_torax_frente: toBool(data.rx_torax_frente),
    espirometria: toBool(data.espirometria),
    electroencefalograma: toBool(data.electroencefalograma),
    rx_columna_lumbo_sacra_frente: toBool(data.rx_columna_lumbo_sacra_frente),
  };
};

export const StudiesDoneSection = React.memo(({defaultValues, registerSection}: Props) => {
  const normalizedDefaults = normalizeBooleanFields(defaultValues);

  const form = useForm<MedicalRecordStudies>({
    defaultValues: normalizedDefaults ?? ({} as MedicalRecordStudies),
    mode: "onBlur",
  });

  const {getValues, trigger, register, control} = form;

  useEffect(() => {
    const unregister = registerSection({
      getValues: () => getValues(),
      validate: async () => trigger(),
    });

    return unregister;
  }, [registerSection, getValues, trigger]);

  return (
    <AccordionItem value="item-25">
      <AccordionTrigger>Estudios realizados</AccordionTrigger>
      <AccordionContent>
        <div className="relative">
          <img alt="Logo" className="absolute top-0 right-0" src="/logo.png" width={60} />
          <div className="mt-10 flex flex-col gap-2 text-base">
            {/* RX Torax frente */}
            <Controller
              control={control}
              name="rx_torax_frente"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={value}
                    className="h-5 w-5 cursor-pointer"
                    id="rx_torax_frente"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="rx_torax_frente">RX Torax frente</label>
                </div>
              )}
            />

            {/* RX Columna Lumbo-Sacra frente/perfi */}
            <Controller
              control={control}
              name="rx_columna_lumbo_sacra_frente"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={value}
                    className="h-5 w-5 cursor-pointer"
                    id="rx_columna_lumbo_sacra_frente"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="rx_columna_lumbo_sacra_frente">
                    RX Columna Lumbo-Sacra frente/perfi
                  </label>
                </div>
              )}
            />

            {/* RX Columna Cervical frente/perfil */}
            <Controller
              control={control}
              name="rx_columna_cervical_frente"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={value}
                    className="h-5 w-5 cursor-pointer"
                    id="rx_columna_cervical_frente"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="rx_columna_cervical_frente">
                    RX Columna Cervical frente/perfil
                  </label>
                </div>
              )}
            />

            {/* Electrocardiograma */}
            <Controller
              control={control}
              name="electro"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={value}
                    className="h-5 w-5 cursor-pointer"
                    id="electro"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="electro">Electrocardiograma</label>
                </div>
              )}
            />

            {/* Audiometría */}
            <Controller
              control={control}
              name="audiometria"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={value}
                    className="h-5 w-5 cursor-pointer"
                    id="audiometria"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="audiometria">Audiometría</label>
                </div>
              )}
            />

            {/* Psicotécnico */}
            <Controller
              control={control}
              name="psicotecnico"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={value}
                    className="h-5 w-5 cursor-pointer"
                    id="psicotecnico"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="psicotecnico">Psicotécnico</label>
                </div>
              )}
            />

            {/* Espirometría */}
            <Controller
              control={control}
              name="espirometria"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={value}
                    className="h-5 w-5 cursor-pointer"
                    id="espirometria"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="espirometria">Espirometría</label>
                </div>
              )}
            />

            {/* Ergometría */}
            <Controller
              control={control}
              name="ergometria"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={value}
                    className="h-5 w-5 cursor-pointer"
                    id="ergometria"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="ergometria">Ergometría</label>
                </div>
              )}
            />

            {/* Evaluación Oftalmológica */}
            <Controller
              control={control}
              name="evaluation_oftalmologica"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={value}
                    className="h-5 w-5 cursor-pointer"
                    id="evaluation_oftalmologica"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="evaluation_oftalmologica">Evaluación Oftalmológica</label>
                </div>
              )}
            />

            {/* Psicometría */}
            <Controller
              control={control}
              name="psicometria"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={value}
                    className="h-5 w-5 cursor-pointer"
                    id="psicometria"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="psicometria">Psicometría</label>
                </div>
              )}
            />

            {/* Electroencefalograma */}
            <Controller
              control={control}
              name="electroencefalograma"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={value}
                    className="h-5 w-5 cursor-pointer"
                    id="electroencefalograma"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="electroencefalograma">Electroencefalograma</label>
                </div>
              )}
            />

            {/* Laboratorio */}
            <Controller
              control={control}
              name="laboratorio"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={value}
                    className="h-5 w-5 cursor-pointer"
                    id="laboratorio"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="laboratorio">Laboratorio</label>
                </div>
              )}
            />

            {/* Drogas de abuso */}
            <Controller
              control={control}
              name="drogas_abuso"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={value}
                    className="h-5 w-5 cursor-pointer"
                    id="drogas_abuso"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="drogas_abuso">Drogas de abuso</label>
                </div>
              )}
            />

            {/* Test de cereal */}
            <Controller
              control={control}
              name="test_cereal"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={Boolean(value)}
                    className="h-5 w-5 cursor-pointer"
                    id="test_cereal"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="test_cereal">Test de cereal</label>
                </div>
              )}
            />

            {/* Exámen físico */}
            <Controller
              control={control}
              name="examen_fisico"
              render={({field: {onChange, value}}) => (
                <div className="flex items-center gap-2">
                  <input
                    checked={Boolean(value)}
                    className="h-5 w-5 cursor-pointer"
                    id="examen_fisico"
                    type="checkbox"
                    onChange={onChange}
                  />
                  <label htmlFor="examen_fisico">Exámen físico</label>
                </div>
              )}
            />

            {/* Observaciones */}
            <div className="mt-4 flex flex-col gap-2">
              <span className="font-semibold">Observaciones:</span>
              <textarea
                {...register("observations")}
                className="h-24 w-full resize-none border border-gray-500 p-2"
              />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
});

StudiesDoneSection.displayName = "StudiesDoneSection";
