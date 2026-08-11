"use client";
import Link from "next/link";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";

import {UserPatient} from "@/types";

import Panel from "@/app/system/components/Panel";
import {ArrowLeft, Clients} from "@/components/ui/Icons";
import {dataService} from "@/services/dataService";
import {authService} from "@/services/authService";

const studyTypes = [
  {
    value: "Básico de ley",
    label: "Básico de ley",
    detail:
      "Básico de ley (Consentimiento informado + ECG + Radiografía de Tórax frente, Exámen Clínico)",
  },
  {
    value: "Básico + EEG + Audiometría + Psicotécnico + RX (CLS)",
    label: "Básico + EEG + Audiometría + Psicotécnico + RX (CLS)",
    detail: "Básico de ley + EEG + Audiometria+ Psicotécnico + Radiografía de CLS frente y perfil",
  },
  {
    value: "Básico + EEG + Audiometría + Psicotécnico + RX (CLS) + Drogas",
    label: "Básico + EEG + Audiometría + Psicotécnico + RX (CLS) + Drogas",
    detail:
      "Básico de ley + EEG+ Audiometría+ Psicotécnico + Radiografía de CLS frente y perfil + Drogas de abuso con Benzodiacepinas y derivados",
  },
  {
    value: "Básico + EEG + Audiometría + Psicotécnico + RX (CLS, CC) + Drogas (M/C)",
    label: "Básico + EEG + Audiometría + Psicotécnico + RX (CLS, CC) + Drogas (M/C)",
    detail:
      "Básico de ley + EEG + Audiometria + Psicotecnico + Radiografía de CLS y CC frente y perfil + Drogas de abuso (Marihuana y Cocaina)",
  },
  {
    value: "Básico + EEG + Audiometría + Psicotécnico + RX (CLS) + Drogas + Test Cereal + Espiro",
    label: "Básico + EEG + Audiometría + Psicotécnico + RX (CLS) + Drogas + Test Cereal + Espiro",
    detail:
      "Básico de ley + EEG+ Audiometria + Psicotécnico + Radiografía de CLS frente y perfil + Drogas de abuso con benzodiacepinas y derivados+ Test del cereal + Espirometría",
  },
  {
    value: "otro",
    label: "Otro",
    detail: "Especifica el tipo de estudio de manera manual",
  },
];

export default function AddEmployeePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [selectedStudy, setSelectedStudy] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const {profile} = await authService.getCurrentUser();
      const id = profile?.company_id;

      if (!id) {
        setError("No se pudo identificar a la empresa.");

        return;
      }

      const payload = {...data};

      if (payload.study_type === "otro") {
        payload.study_type = payload.custom_study_type;
      }
      delete payload.custom_study_type;

      await dataService.createEmployee(id, payload as unknown as UserPatient);
      alert("Empleado agregado correctamente");
      router.push("/system/empleados");
    } catch (e) {
      console.error(e);
      setError("Ocurrió un error al agregar el empleado.");
    }
  };

  return (
    <Panel pageIcon={<Clients />} pageTitle="Agregar empleado">
      <Link className="flex items-center gap-1 font-bold" href="/system/empleados">
        <ArrowLeft />
        Cancelar
      </Link>
      <form
        className="mt-10 flex flex-col gap-2"
        onSubmit={(e) => {
          void handleSubmit(onSubmit)(e);
        }}
      >
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <label className="text-lg font-bold italic" htmlFor="nombre">
          Nombre *
        </label>
        <input
          required
          className="rounded-lg border border-[#4A4A4A] bg-white px-5 py-1"
          placeholder="Ingresa el nombre"
          type="text"
          {...register("first_name")}
        />
        {errors.first_name && <span className="text-red-500">Este campo es requerido</span>}
        <label className="text-lg font-bold italic" htmlFor="apellido">
          Apellido *
        </label>
        <input
          required
          className="rounded-lg border border-[#4A4A4A] bg-white px-5 py-1"
          placeholder="Ingresa el apellido"
          type="text"
          {...register("last_name")}
        />
        <label className="text-lg font-bold italic" htmlFor="fecha_nacimiento">
          Fecha de nacimiento *
        </label>
        <input
          required
          className="rounded-lg border border-[#4A4A4A] bg-white px-5 py-1"
          placeholder="Ingresa la fecha de nacimiento"
          type="date"
          {...register("date_of_birth")}
        />
        <label className="text-lg font-bold italic" htmlFor="obra_social">
          Obra social *
        </label>
        <input
          required
          className="rounded-lg border border-[#4A4A4A] bg-white px-5 py-1"
          placeholder="Ingresa la obra social"
          type="text"
          {...register("social_security")}
        />
        <label className="text-lg font-bold italic" htmlFor="dni">
          DNI *
        </label>
        <input
          required
          className="rounded-lg border border-[#4A4A4A] bg-white px-5 py-1"
          placeholder="Ingresa el DNI"
          type="text"
          {...register("dni")}
        />
        <label className="text-lg font-bold italic" htmlFor="telefono">
          Telefono *
        </label>
        <input
          className="rounded-lg border border-[#4A4A4A] bg-white px-5 py-1"
          placeholder="Ingresa el telefono"
          type="text"
          {...register("phone")}
        />
        <label className="text-lg font-bold italic" htmlFor="direccion">
          Direccion *
        </label>
        <input
          required
          className="rounded-lg border border-[#4A4A4A] bg-white px-5 py-1"
          placeholder="Ingresa la direccion"
          type="text"
          {...register("address")}
        />
        <label className="text-lg font-bold italic" htmlFor="study_type">
          Tipo de estudio a realizar *
        </label>
        <select
          required
          className="rounded-lg border border-[#4A4A4A] bg-white px-5 py-1 text-black"
          {...register("study_type", {
            onChange: (e) => setSelectedStudy(e.target.value),
          })}
          defaultValue=""
          title={
            studyTypes.find((s) => s.value === selectedStudy)?.detail ||
            "Selecciona un tipo de estudio"
          }
        >
          <option disabled value="">
            Selecciona una opción
          </option>
          {studyTypes.map((study) => (
            <option key={study.value} title={study.detail} value={study.value}>
              {study.label}
            </option>
          ))}
        </select>
        {selectedStudy === "otro" && (
          <>
            <label className="mt-2 text-lg font-bold italic" htmlFor="custom_study_type">
              Especificar tipo de estudio *
            </label>
            <textarea
              required
              className="rounded-lg border border-[#4A4A4A] bg-white px-5 py-2 text-black"
              placeholder="Especifica el tipo de estudio..."
              rows={3}
              {...register("custom_study_type")}
            />
          </>
        )}
        {selectedStudy && selectedStudy !== "otro" && (
          <div className="mt-2 rounded-lg border border-[#4A4A4A] bg-[#2d2d2d] p-3 text-xs text-gray-300 italic">
            <strong>Detalle del estudio:</strong>{" "}
            {studyTypes.find((s) => s.value === selectedStudy)?.detail}
          </div>
        )}
        <button
          className="bg-blue mt-10 cursor-pointer rounded-lg py-2 font-semibold text-white"
          type="submit"
        >
          Agregar
        </button>
      </form>
    </Panel>
  );
}
