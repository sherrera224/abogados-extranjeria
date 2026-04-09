"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const REGULARIZATION_TYPES = [
  {
    id: "extraordinaria",
    label: "Regularización Extraordinaria (nueva ley)",
    badge: "Nueva ley · hasta 30/06/2026",
    docs: [
      { id: "pasaporte", label: "Pasaporte o documento de identidad en vigor" },
      { id: "antecedentes_esp", label: "Certificado de antecedentes penales de España" },
      { id: "antecedentes_origen", label: "Certificado de antecedentes penales del país de origen (apostillado y traducido)" },
      { id: "prueba_residencia", label: "Prueba de residencia anterior al 31/12/2025 (empadronamiento, facturas, etc.)" },
    ],
  },
  {
    id: "arraigo_social",
    label: "Arraigo Social",
    badge: "Mín. 3 años de residencia",
    docs: [
      { id: "pasaporte", label: "Pasaporte o documento de viaje en vigor" },
      { id: "empadronamiento", label: "Certificado de empadronamiento histórico (mín. 3 años)" },
      { id: "antecedentes_esp", label: "Certificado de antecedentes penales de España" },
      { id: "antecedentes_origen", label: "Certificado de antecedentes penales del país de origen (apostillado)" },
      { id: "informe_arraigo", label: "Informe de arraigo social expedido por el ayuntamiento" },
      { id: "contrato_trabajo", label: "Contrato de trabajo (mín. 30 h/semana) o medios económicos" },
    ],
  },
  {
    id: "arraigo_laboral",
    label: "Arraigo Laboral",
    badge: "Mín. 2 años + 6 meses de actividad",
    docs: [
      { id: "pasaporte", label: "Pasaporte o documento de viaje en vigor" },
      { id: "empadronamiento", label: "Certificado de empadronamiento (mín. 2 años)" },
      { id: "antecedentes_esp", label: "Certificado de antecedentes penales de España" },
      { id: "antecedentes_origen", label: "Certificado de antecedentes penales del país de origen" },
      { id: "prueba_laboral", label: "Prueba de relación laboral (actas Inspección de Trabajo, nóminas, testimonios)" },
    ],
  },
  {
    id: "arraigo_formacion",
    label: "Arraigo para la Formación",
    badge: "Mín. 2 años + matrícula oficial",
    docs: [
      { id: "pasaporte", label: "Pasaporte o documento de viaje en vigor" },
      { id: "empadronamiento", label: "Certificado de empadronamiento (mín. 2 años)" },
      { id: "antecedentes_esp", label: "Certificado de antecedentes penales de España" },
      { id: "antecedentes_origen", label: "Certificado de antecedentes penales del país de origen" },
      { id: "matricula", label: "Justificante de matrícula en FP, educación secundaria u otro programa oficial" },
      { id: "medios_economicos", label: "Acreditación de medios económicos suficientes" },
    ],
  },
  {
    id: "arraigo_familiar",
    label: "Arraigo Familiar",
    badge: "Padre/madre de ciudadano o residente",
    docs: [
      { id: "pasaporte", label: "Pasaporte o documento de viaje en vigor" },
      { id: "antecedentes_esp", label: "Certificado de antecedentes penales de España" },
      { id: "antecedentes_origen", label: "Certificado de antecedentes penales del país de origen" },
      { id: "libro_familia", label: "Libro de familia o certificado de nacimiento del/la hijo/a (apostillado)" },
      { id: "doc_hijo", label: "Documentación de nacionalidad o residencia legal del/la hijo/a" },
      { id: "convivencia", label: "Acreditación de convivencia o relación de dependencia" },
    ],
  },
];

interface DocStatus {
  url: string;
  name: string;
  uploadedAt: string;
  review?: "pending" | "approved" | "rejected";
}

interface ClientData {
  regularizationType: string;
  docs: Record<string, DocStatus>;
}

function DocRow({
  docItem,
  uploaded,
  userId,
  onUploaded,
}: {
  docItem: { id: string; label: string };
  uploaded?: DocStatus;
  userId: string;
  onUploaded: (docId: string, status: DocStatus) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const { startUpload } = useUploadThing("documentUploader", {
    onClientUploadComplete: async (res: { ufsUrl: string; name: string }[]) => {
      if (!res?.[0]) return;
      const status: DocStatus = {
        url: res[0].ufsUrl,
        name: res[0].name,
        uploadedAt: new Date().toISOString(),
      };
      try {
        await updateDoc(doc(db, "clients", userId), {
          [`docs.${docItem.id}`]: status,
        });
      } catch {
        // Firestore update
      }
      onUploaded(docItem.id, status);
      setUploading(false);
    },
    onUploadError: () => setUploading(false),
  });

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg border ${
        uploaded ? "border-green-200 bg-green-50" : "border-gray-200 bg-slate-50"
      }`}
    >
      <div className="shrink-0 mt-0.5">
        {uploaded ? (
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-700 font-medium leading-snug">{docItem.label}</p>
        {uploaded && (
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <a
              href={uploaded.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2 truncate max-w-xs"
            >
              {uploaded.name}
            </a>
            {uploaded.review === "approved" && (
              <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">✅ Aprobado</span>
            )}
            {uploaded.review === "rejected" && (
              <span className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">❌ Rechazado — vuelva a subir</span>
            )}
            {(!uploaded.review || uploaded.review === "pending") && (
              <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">⏳ En revisión</span>
            )}
          </div>
        )}
        {uploading && <p className="text-xs text-slate-400 mt-1">Subiendo…</p>}
      </div>

      <label className="shrink-0 cursor-pointer">
        <input
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setUploading(true);
              startUpload([file]);
            }
          }}
        />
        <span className={`text-xs border px-3 py-1.5 rounded transition-colors ${
          uploading
            ? "border-slate-200 text-slate-300 cursor-not-allowed"
            : "border-slate-300 text-slate-600 hover:border-slate-600 hover:text-slate-800"
        }`}>
          {uploading ? "Subiendo…" : uploaded ? "Actualizar" : "Subir"}
        </span>
      </label>
    </div>
  );
}

export default function PortalPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [selectedType, setSelectedType] = useState("");
  const [saving, setSaving] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, "clients", user.uid));
        if (snap.exists()) {
          const data = snap.data() as ClientData;
          setClientData(data);
          setSelectedType(data.regularizationType || "");
        }
      } catch {
        // Firestore not yet set up
      }
      setDataLoading(false);
    };
    load();
  }, [user]);

  const saveType = async () => {
    if (!user || !selectedType) return;
    setSaving(true);
    try {
      const ref2 = doc(db, "clients", user.uid);
      const snap = await getDoc(ref2);
      if (snap.exists()) {
        await updateDoc(ref2, { regularizationType: selectedType });
      } else {
        await setDoc(ref2, { regularizationType: selectedType, docs: {} });
      }
      setClientData((prev) => ({ ...prev!, regularizationType: selectedType, docs: prev?.docs ?? {} }));
    } catch {
      // Firestore error
    }
    setSaving(false);
  };

  const handleUploaded = (docId: string, status: DocStatus) => {
    setClientData((prev) => ({
      ...prev!,
      docs: { ...prev?.docs, [docId]: status },
    }));
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-400 text-sm">Cargando su expediente…</div>
      </div>
    );
  }

  if (!user) return null;

  const activeType = REGULARIZATION_TYPES.find((t) => t.id === (clientData?.regularizationType || selectedType));
  const uploadedDocs = clientData?.docs ?? {};
  const totalDocs = activeType?.docs.length ?? 0;
  const completedDocs = activeType?.docs.filter((d) => uploadedDocs[d.id]).length ?? 0;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-6">
          <div className="shrink-0">
            <a href="/" className="text-lg font-bold text-slate-800 tracking-tight">Abogados de Extranjería</a>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-light hidden sm:block">Área de Clientes</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 hidden sm:block truncate max-w-48">{user.email}</span>
            <button
              onClick={async () => { await logout(); router.push("/"); }}
              className="text-sm text-slate-600 hover:text-slate-900 border border-gray-200 px-3 py-1.5 rounded transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Mi expediente</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            {user.displayName ? `Bienvenido/a, ${user.displayName}` : "Bienvenido/a al Portal"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">Desde aquí puede gestionar y subir la documentación requerida para su trámite.</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 mb-6">
          <h3 className="text-base font-semibold text-slate-800 mb-4">Tipo de regularización</h3>
          <div className="space-y-2 mb-4">
            {REGULARIZATION_TYPES.map((t) => (
              <label
                key={t.id}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedType === t.id ? "border-slate-800 bg-slate-50" : "border-gray-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={t.id}
                  checked={selectedType === t.id}
                  onChange={() => setSelectedType(t.id)}
                  className="mt-0.5 accent-slate-800"
                />
                <div>
                  <p className="text-sm font-medium text-slate-800">{t.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t.badge}</p>
                </div>
              </label>
            ))}
          </div>
          <button
            onClick={saveType}
            disabled={saving || !selectedType || selectedType === clientData?.regularizationType}
            className="bg-slate-800 text-white px-5 py-2 rounded text-sm font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            {saving ? "Guardando…" : "Confirmar tipo"}
          </button>
        </div>

        {activeType && clientData?.regularizationType && (
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <h3 className="text-base font-semibold text-slate-800">Documentación requerida</h3>
              <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">
                {completedDocs} de {totalDocs} documentos subidos
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6">
              <div
                className="bg-slate-800 h-1.5 rounded-full transition-all"
                style={{ width: totalDocs ? `${(completedDocs / totalDocs) * 100}%` : "0%" }}
              ></div>
            </div>

            <div className="space-y-3">
              {activeType.docs.map((docItem) => (
                <DocRow
                  key={docItem.id}
                  docItem={docItem}
                  uploaded={uploadedDocs[docItem.id]}
                  userId={user.uid}
                  onUploaded={handleUploaded}
                />
              ))}
            </div>

            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-700">Formatos aceptados:</strong> PDF, JPG, PNG, WEBP · Tamaño máximo: 16 MB por archivo.<br />
              Los documentos quedan guardados de forma segura. Nuestro equipo los revisará y se pondrá en contacto con usted.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}