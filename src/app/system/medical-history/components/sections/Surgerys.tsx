import React, {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";

import {MedicalRecordSurgerys} from "@/types";

import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

import {SectionHandler} from "../../useFormRegistry";

interface Props {
  defaultValues: MedicalRecordSurgerys | null;
  registerSection: (handler: SectionHandler<MedicalRecordSurgerys>) => () => void;
}

// Helper function to convert string booleans to actual booleans
const normalizeBooleanFields = (
  data: MedicalRecordSurgerys | null,
): MedicalRecordSurgerys | null => {
  if (!data) return null;

  // The API sometimes returns booleans as strings ("true"/"false")
  // We need to normalize them to actual boolean values
  const toBool = (value: any): boolean => value === "true" || value === true;

  return {
    ...data,
    apendice: toBool(data.apendice),
    amigdala: toBool(data.amigdala),
    hernia: toBool(data.hernia),
    varices: toBool(data.varices),
    vesicula: toBool(data.vesicula),
    columna: toBool(data.columna),
    testiculos: toBool(data.testiculos),
    others: toBool(data.others),
  };
};

export const SurgerysSection = React.memo(({defaultValues, registerSection}: Props) => {
  const normalizedDefaults = normalizeBooleanFields(defaultValues);

  const form = useForm<MedicalRecordSurgerys>({
    defaultValues: normalizedDefaults ?? ({} as MedicalRecordSurgerys),
    mode: "onBlur",
  });

  const {getValues, trigger, register, control, setValue} = form;

  useEffect(() => {
    const unregister = registerSection({
      getValues: () => getValues(),
      validate: async () => trigger(),
      getErrors: () =>
        form.formState.errors.others_description ? ["Detalle de otras cirugías"] : [],
    });

    return unregister;
  }, [registerSection, getValues, trigger]);

  return (
    <AccordionItem value="item-7">
      <AccordionTrigger>Ha sido operado/a de:</AccordionTrigger>
      <AccordionContent>
        <div className="relative">
          <img alt="Logo" className="absolute top-0 right-0" src="/logo.png" width={60} />
          <div className="flex flex-col gap-3 text-lg">
            {/* Header */}
            <div className="flex items-center">
              <div className="w-[150px] shrink-0 md:w-[300px]" />
              <div className="flex gap-6">
                <p className="w-6 text-center font-semibold">Si</p>
                <p className="w-6 text-center font-semibold">No</p>
              </div>
            </div>

            {/* ¿Apéndice? */}
            <div className="flex items-center">
              <p className="w-[150px] shrink-0 md:w-[300px]">¿Apéndice?</p>
              <Controller
                control={control}
                name="apendice"
                render={({field: {onChange, value}}) => (
                  <div className="flex gap-6">
                    <input
                      checked={value}
                      className="h-6 w-6 cursor-pointer"
                      type="radio"
                      onChange={() => onChange(true)}
                    />
                    <input
                      checked={!value}
                      className="h-6 w-6 cursor-pointer"
                      type="radio"
                      onChange={() => onChange(false)}
                    />
                  </div>
                )}
              />
              <div className="ml-10 flex items-center gap-2">
                <span className="text-sm">Fecha aproximada</span>
                <input
                  placeholder="Formato: 00/00/0000"
                  {...register("apendice_date", {setValueAs: (v: string) => v || null})}
                  className="w-full border border-gray-500 p-1 md:w-[200px]"
                  type="text"
                />
              </div>
            </div>

            {/* ¿Amígdala? */}
            <div className="flex items-center">
              <p className="w-[150px] shrink-0 md:w-[300px]">¿Amígdala?</p>
              <Controller
                control={control}
                name="amigdala"
                render={({field: {onChange, value}}) => (
                  <div className="flex gap-6">
                    <input
                      checked={value}
                      className="h-6 w-6 cursor-pointer"
                      type="radio"
                      onChange={() => onChange(true)}
                    />
                    <input
                      checked={!value}
                      className="h-6 w-6 cursor-pointer"
                      type="radio"
                      onChange={() => onChange(false)}
                    />
                  </div>
                )}
              />
              <div className="ml-10 flex items-center gap-2">
                <span className="text-sm">Fecha aproximada</span>
                <input
                  placeholder="Formato: 00/00/0000"
                  {...register("amigdala_date", {setValueAs: (v: string) => v || null})}
                  className="w-full border border-gray-500 p-1 md:w-[200px]"
                  type="text"
                />
              </div>
            </div>

            {/* ¿Hernia? */}
            <div className="flex items-center">
              <p className="w-[150px] shrink-0 md:w-[300px]">¿Hernia?</p>
              <Controller
                control={control}
                name="hernia"
                render={({field: {onChange, value}}) => (
                  <div className="flex gap-6">
                    <input
                      checked={value}
                      className="h-6 w-6 cursor-pointer"
                      type="radio"
                      onChange={() => onChange(true)}
                    />
                    <input
                      checked={!value}
                      className="h-6 w-6 cursor-pointer"
                      type="radio"
                      onChange={() => onChange(false)}
                    />
                  </div>
                )}
              />
              <div className="ml-10 flex items-center gap-2">
                <span className="text-sm">Fecha aproximada</span>
                <input
                  placeholder="Formato: 00/00/0000"
                  {...register("hernia_date", {setValueAs: (v: string) => v || null})}
                  className="w-full border border-gray-500 p-1 md:w-[200px]"
                  type="text"
                />
              </div>
            </div>

            {/* ¿Várices? */}
            <div className="flex items-center">
              <p className="w-[150px] shrink-0 md:w-[300px]">¿Várices?</p>
              <Controller
                control={control}
                name="varices"
                render={({field: {onChange, value}}) => (
                  <div className="flex gap-6">
                    <input
                      checked={value}
                      className="h-6 w-6 cursor-pointer"
                      type="radio"
                      onChange={() => onChange(true)}
                    />
                    <input
                      checked={!value}
                      className="h-6 w-6 cursor-pointer"
                      type="radio"
                      onChange={() => onChange(false)}
                    />
                  </div>
                )}
              />
              <div className="ml-10 flex items-center gap-2">
                <span className="text-sm">Fecha aproximada</span>
                <input
                  placeholder="Formato: 00/00/0000"
                  {...register("varices_date", {setValueAs: (v: string) => v || null})}
                  className="w-full border border-gray-500 p-1 md:w-[200px]"
                  type="text"
                />
              </div>
            </div>

            {/* ¿Vesícula? */}
            <div className="flex items-center">
              <p className="w-[150px] shrink-0 md:w-[300px]">¿Vesícula?</p>
              <Controller
                control={control}
                name="vesicula"
                render={({field: {onChange, value}}) => (
                  <div className="flex gap-6">
                    <input
                      checked={value}
                      className="h-6 w-6 cursor-pointer"
                      type="radio"
                      onChange={() => onChange(true)}
                    />
                    <input
                      checked={!value}
                      className="h-6 w-6 cursor-pointer"
                      type="radio"
                      onChange={() => onChange(false)}
                    />
                  </div>
                )}
              />
              <div className="ml-10 flex items-center gap-2">
                <span className="text-sm">Fecha aproximada</span>
                <input
                  placeholder="Formato: 00/00/0000"
                  {...register("vesicula_date", {setValueAs: (v: string) => v || null})}
                  className="w-full border border-gray-500 p-1 md:w-[200px]"
                  type="text"
                />
              </div>
            </div>

            {/* ¿Columna? */}
            <div className="flex items-center">
              <p className="w-[150px] shrink-0 md:w-[300px]">¿Columna?</p>
              <Controller
                control={control}
                name="columna"
                render={({field: {onChange, value}}) => (
                  <div className="flex gap-6">
                    <input
                      checked={value}
                      className="h-6 w-6 cursor-pointer"
                      type="radio"
                      onChange={() => onChange(true)}
                    />
                    <input
                      checked={!value}
                      className="h-6 w-6 cursor-pointer"
                      type="radio"
                      onChange={() => onChange(false)}
                    />
                  </div>
                )}
              />
              <div className="ml-10 flex items-center gap-2">
                <span className="text-sm">Fecha aproximada</span>
                <input
                  placeholder="Formato: 00/00/0000"
                  {...register("columna_date", {setValueAs: (v: string) => v || null})}
                  className="w-full border border-gray-500 p-1 md:w-[200px]"
                  type="text"
                />
              </div>
            </div>

            {/* ¿Testículos? */}
            <div className="flex items-center">
              <p className="w-[150px] shrink-0 md:w-[300px]">¿Testículos?</p>
              <Controller
                control={control}
                name="testiculos"
                render={({field: {onChange, value}}) => (
                  <div className="flex gap-6">
                    <input
                      checked={value}
                      className="h-6 w-6 cursor-pointer"
                      type="radio"
                      onChange={() => onChange(true)}
                    />
                    <input
                      checked={!value}
                      className="h-6 w-6 cursor-pointer"
                      type="radio"
                      onChange={() => onChange(false)}
                    />
                  </div>
                )}
              />
              <div className="ml-10 flex items-center gap-2">
                <span className="text-sm">Fecha aproximada</span>
                <input
                  placeholder="Formato: 00/00/0000"
                  {...register("testiculos_date", {setValueAs: (v: string) => v || null})}
                  className="w-full border border-gray-500 p-1 md:w-[200px]"
                  type="text"
                />
              </div>
            </div>

            {/* Otros */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <p className="w-[150px] shrink-0 md:w-[300px]">Otros</p>
                <Controller
                  control={control}
                  name="others"
                  render={({field: {onChange, value}}) => (
                    <div className="flex gap-6">
                      <input
                        aria-label="Sí, tuvo otras cirugías"
                        checked={value === true}
                        className="h-6 w-6 cursor-pointer"
                        type="radio"
                        onChange={() => onChange(true)}
                      />
                      <input
                        aria-label="No tuvo otras cirugías"
                        checked={value === false}
                        className="h-6 w-6 cursor-pointer"
                        type="radio"
                        onChange={() => {
                          onChange(false);
                          setValue("others_description", "");
                        }}
                      />
                    </div>
                  )}
                />
                <div className="ml-10 flex items-center gap-2">
                  <span className="text-sm">Fecha aproximada</span>
                  <input
                    placeholder="Formato: 00/00/0000"
                    {...register("others_date", {setValueAs: (v: string) => v || null})}
                    className="w-full border border-gray-500 p-1 md:w-[200px]"
                    type="text"
                  />
                </div>
              </div>

              {form.watch("others") === true && (
                <label className="ml-[150px] flex flex-col gap-1 md:ml-[300px]">
                  <span className="text-sm font-medium">¿De qué fue operado/a?</span>
                  <textarea
                    {...register("others_description", {
                      validate: (value) =>
                        getValues("others") !== true ||
                        Boolean(value?.trim()) ||
                        "Indique de qué fue operado/a",
                    })}
                    className="w-full border border-gray-500 p-2 md:max-w-xl"
                    id="others_description"
                    placeholder="Describa la cirugía"
                    rows={3}
                  />
                  {form.formState.errors.others_description?.message && (
                    <span className="text-sm text-red-600">
                      {form.formState.errors.others_description.message}
                    </span>
                  )}
                </label>
              )}
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
});

SurgerysSection.displayName = "SurgerysSection";
