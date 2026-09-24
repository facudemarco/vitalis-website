"use client";

import Link from "next/link";
import {use, useEffect, useState} from "react";

import {Studies, UserPatient} from "@/types";

import {dataService} from "@/services/dataService";
import EstudiosCard from "@/app/system/(pacientes)/estudios-pacientes/EstudiosCard";
import Panel from "@/app/system/components/Panel";
import {ArrowLeft, Clients} from "@/components/ui/Icons";

interface PageProps {
  params: Promise<{id: string}>;
}

export function ClientesEstudiosPage({params}: PageProps) {
  const [studies, setStudies] = useState<Studies[]>([]);
  const patient_id = use(params).id;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (patient_id) {
      const getStudies = async () => {
        try {
          const response = await dataService.getStudiesByPatientId(patient_id);

          setStudies(response);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching studies:", error);
          setIsLoading(false);
        }
      };

      void getStudies();
    }
  }, [patient_id]);

  return (
    <Panel pageIcon={<Clients />} pageTitle="Estudios - Paciente">
      {isLoading ? (
        <p className="my-auto text-center font-semibold">Cargando estudios...</p>
      ) : studies.length === 0 ? (
        <p className="my-auto text-center font-semibold">No tienes estudios aún.</p>
      ) : (
        <section className="flex max-h-82 flex-col gap-5 overflow-y-scroll md:px-10">
          {studies.map((study: Studies) => (
            <EstudiosCard key={study.id} studies={study} />
          ))}
        </section>
      )}
    </Panel>
  );
}

export default function EstudiosPacientesPage({params}: PageProps) {
  const [data, setData] = useState<UserPatient | null>(null);
  const id = use(params).id;
  const [studies, setStudies] = useState<Studies[]>([]);
  const [uploadingConsent, setUploadingConsent] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const data = async () => {
      try {
        const res = await dataService.getPatientById(id);
        const studies = await dataService.getStudiesByPatientId(id);

        setData(res);
        setStudies(studies);
      } catch (error) {
        console.error(error);
      }
    };

    void data();
  }, [id]);

  const registerConsent = async () => {
    setUploadingConsent(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("study_type", "Consentimiento informado");
      formData.append("status", "Disponible");
      await dataService.postStudie(id, formData);
      setStudies(await dataService.getStudiesByPatientId(id));
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error registrando consentimiento informado:", error);
      setUploadError("No se pudo registrar el consentimiento informado.");
    } finally {
      setUploadingConsent(false);
    }
  };

  const consentUploadControl = (
    <div className="flex flex-col items-start gap-2">
      <button
        className="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white disabled:opacity-60"
        disabled={uploadingConsent}
        type="button"
        onClick={() => void registerConsent()}
      >
        {uploadingConsent ? "Registrando..." : "Registrar consentimiento informado"}
      </button>
      {uploadError && <p className="text-sm text-red-700">{uploadError}</p>}
      {uploadSuccess && (
        <p className="text-sm text-green-700">Consentimiento informado disponible.</p>
      )}
    </div>
  );

  if (!data) {
    return (
      <Panel pageIcon={<Clients />} pageTitle="Historial de estudios">
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-600" />
        </div>
      </Panel>
    );
  }

  if (studies.length === 0) {
    return (
      <Panel pageIcon={<Clients />} pageTitle="Historial de estudios">
        <section className="flex flex-col items-start gap-3">
          <Link className="flex items-center gap-1 font-bold" href="/system/clientes">
            <ArrowLeft />
            Volver
          </Link>
          <p>No hay estudios</p>
          {consentUploadControl}
        </section>
      </Panel>
    );
  }

  return (
    <Panel
      pageIcon={<Clients />}
      pageTitle={`Historial de estudios - ${data.first_name} ${data.last_name}`}
    >
      <section className="my-5 flex flex-col gap-5">
        {consentUploadControl}
        <Link className="flex items-center gap-1 font-bold" href="/system/clientes">
          <ArrowLeft />
          Volver
        </Link>
        {studies.map((study) => (
          <EstudiosCard key={study.id} studies={study} />
        ))}
      </section>
    </Panel>
  );
}
