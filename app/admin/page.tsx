"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const DOC_LABELS: Record<string, string> = {
  pasaporte: "Pasaporte / DNI",
  antecedentes_esp: "Antecedentes penales España",
  antecedentes_origen: "Antecedentes penales país de origen",
  prueba_residencia: "Prueba de residencia",
  empadronamiento: "Certificado de empadronamiento",
  informe_arraigo: "Informe de arraigo social",
  contrato_trabajo: "Contrato de trabajo",
  prueba_laboral: "Prueba de relación laboral",
  matricula: "Justificante de matrícula",
  medios_economicos: "Medios económicos",
  libro_familia: "Libro de familia / nacimiento",
  doc_hijo: "Documentación del hijo/a",
  convivencia: "Acreditación de convivencia",
};

const TYPE_LABELS: Record<string, string> = {
  extraordinaria: "Regularización Extraordinaria",
  arraigo_social: "Arraigo Social",
  arraigo_laboral: "Arraigo Laboral",
  arraigo_formacion: "Arraigo para la Formación",
  arraigo_familiar: "Arraigo Familiar",
};

const TYPE_TOTAL: Record<string, number> = {
  extraordinaria: 4,
  arraigo_social: 6,
  arraigo_laboral: 5,
  arraigo_formacion: 6,
  arraigo_familiar: 6,
};

interface DocStatus {
  url: string;
  name: string;
  uploadedAt: string;
  review?: "pending" | "approved" | "rejected";
}

interface ClientRecord {
  uid: string;
  nombre?: string;
  apellidos?: string;
  telefono?: string;
  email?: string;
  regularizationType?: string;
  docs?: Record<string, DocStatus>;
  notes?: string;
  createdAt?: string;
}

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [savingNote, setSavingNote] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const handleReview = async (
    clientUid: string,
    docId: string,
    review: "pending" | "approved" | "rejected"
  ) => {
    try {
      await updateDoc(doc(db, "clients", clientUid), {
        [`docs.${docId}.review`]: review,
      });
      setClients((prev) =>
        prev.map((c) =>
          c.uid !== clientUid
            ? c
            : {
                ...c,
                docs: {
                  ...c.docs,
                  [docId]: { ...c.docs![docId], review },
                },
              }
        )
      );
    } catch {
      setError("Error al actualizar el estado.");
    }
  };

  const handleSaveNote = async (clientUid: string) => {
    setSavingNote(clientUid);
    try {
      await updateDoc(doc(db, "clients", clientUid), { notes: notes[clientUid] ?? "" });
      setClients((prev) =>
        prev.map((c) => (c.uid === clientUid ? { ...c, notes: notes[clientUid] ?? "" } : c))
      );
    } catch {
      setError("Error al guardar nota.");
    }
    setSavingNote(null);
  };

  const handleDelete = async (uid: string) => {
    setDeleting(uid);
    try {
      const client = clients.find((c) => c.uid === uid);
      const urls = Object.values(client?.docs ?? {}).map((d) => d.url).filter(Boolean);

      // Delete files from Uploadthing
      if (urls.length > 0) {
        await fetch("/api/delete-client-files", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls }),
        });
      }

      // Delete Firestore record
      await deleteDoc(doc(db, "clients", uid));
      setClients((prev) => prev.filter((c) => c.uid !== uid));
    } catch {
      setError("Error al eliminar el cliente.");
    }
    setDeleting(null);
    setConfirmDelete(null);
  };

  useEffect(() => {
    if (!loading && (!user || user.email !== ADMIN_EMAIL)) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return;
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, "clients"));
        const data: ClientRecord[] = snap.docs.map((d) => ({
          uid: d.id,
          ...(d.data() as Omit<ClientRecord, "uid">),
        }));
        data.sort((a, b) => (a.apellidos ?? "").localeCompare(b.apellidos ?? ""));
        setClients(data);
        const n: Record<string, string> = {};
        data.forEach((c) => { if (c.notes) n[c.uid] = c.notes; });
        setNotes(n);
      } catch {
        setError("No se pudo cargar la lista de clientes. Verifica las reglas de Firestore.");
      }
      setDataLoading(false);
    };
    load();
  }, [user]);

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Cargando expedientes…</p>
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) return null;

  const totalDocs = clients.reduce((acc, c) => acc + Object.keys(c.docs ?? {}).length, 0);
  const pendingClients = clients.filter((c) => {
    const total = TYPE_TOTAL[c.regularizationType ?? ""] ?? 0;
    return total > Object.keys(c.docs ?? {}).length;
  }).length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-4">
          <div>
            <a href="/" className="text-lg font-bold text-slate-800 tracking-tight">
              Abogados de Extranjería
            </a>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-light hidden sm:block">
              Panel de Administración
            </p>
          </div>
          <span className="text-xs text-slate-500 hidden sm:block">{user.email}</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Panel interno</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Expedientes de clientes</h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">Clientes registrados</p>
            <p className="text-2xl font-bold text-slate-800">{clients.length}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">Documentos recibidos</p>
            <p className="text-2xl font-bold text-slate-800">{totalDocs}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">Expedientes incompletos</p>
            <p className="text-2xl font-bold text-slate-800">{pendingClients}</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {clients.length === 0 && !error ? (
          <div className="text-center py-20 text-slate-400">
            <p>No hay clientes registrados aún.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {clients.map((client) => {
              const docs = client.docs ?? {};
              const docCount = Object.keys(docs).length;
              const total = TYPE_TOTAL[client.regularizationType ?? ""] ?? 0;
              const isComplete = total > 0 && docCount >= total;
              const isOpen = expanded === client.uid;

              return (
                <div key={client.uid} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpanded(isOpen ? null : client.uid)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                        <span className="text-sm font-semibold text-slate-600">
                          {(client.nombre?.[0] ?? "?").toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {client.nombre} {client.apellidos}
                        </p>
                        <p className="text-xs text-slate-400 truncate">{client.email}{client.telefono ? ` · ${client.telefono}` : ""}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      {client.regularizationType && (
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded hidden md:block">
                          {TYPE_LABELS[client.regularizationType] ?? client.regularizationType}
                        </span>
                      )}
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          isComplete
                            ? "bg-green-50 text-green-700"
                            : docCount > 0
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {total > 0 ? `${docCount}/${total}` : `${docCount} docs`}
                      </span>
                      {confirmDelete === client.uid ? (
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleDelete(client.uid)}
                            disabled={deleting === client.uid}
                            className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                          >
                            {deleting === client.uid ? "Eliminando…" : "Confirmar"}
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="text-xs border border-gray-300 text-slate-500 px-2 py-1 rounded hover:border-slate-500"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); setConfirmDelete(client.uid); }}
                          className="text-xs border border-red-200 text-red-500 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                        >
                          Eliminar
                        </button>
                      )}
                      <svg
                        className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 px-5 py-5">
                      <div className="flex flex-wrap gap-4 mb-4 text-xs text-slate-500">
                        {client.regularizationType && (
                          <span>
                            <strong className="text-slate-700">Tipo:</strong>{" "}
                            {TYPE_LABELS[client.regularizationType]}
                          </span>
                        )}
                        {client.createdAt && (
                          <span>
                            <strong className="text-slate-700">Registrado:</strong>{" "}
                            {new Date(client.createdAt).toLocaleDateString("es-ES", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}
                        <span>
                          <strong className="text-slate-700">UID:</strong>{" "}
                          <span className="font-mono">{client.uid}</span>
                        </span>
                        {client.telefono && (
                          <span>
                            <strong className="text-slate-700">Teléfono:</strong> {client.telefono}
                          </span>
                        )}
                      </div>

                      {!client.regularizationType ? (
                        <p className="text-sm text-slate-400 italic">
                          El cliente aún no ha seleccionado tipo de regularización.
                        </p>
                      ) : docCount === 0 ? (
                        <p className="text-sm text-slate-400 italic">No ha subido documentos todavía.</p>
                      ) : (
                        <div className="space-y-2">
                          {Object.entries(docs).map(([id, docFile]) => (
                            <div
                              key={id}
                              className="flex items-center justify-between gap-4 py-3 border-b border-gray-50 last:border-0"
                            >
                              <div className="min-w-0">
                                <p className="text-sm text-slate-700 font-medium">
                                  {DOC_LABELS[id] ?? id}
                                </p>
                                <p className="text-xs text-slate-400 mt-0.5">
                                  {docFile.name} ·{" "}
                                  {new Date(docFile.uploadedAt).toLocaleDateString("es-ES", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <select
                                  value={docFile.review ?? "pending"}
                                  onChange={(e) => handleReview(client.uid, id, e.target.value as "pending" | "approved" | "rejected")}
                                  className={`text-xs border rounded px-2 py-1 outline-none ${
                                    docFile.review === "approved"
                                      ? "border-green-300 bg-green-50 text-green-700"
                                      : docFile.review === "rejected"
                                      ? "border-red-300 bg-red-50 text-red-700"
                                      : "border-slate-200 bg-slate-50 text-slate-600"
                                  }`}
                                >
                                  <option value="pending">⏳ En revisión</option>
                                  <option value="approved">✅ Aprobado</option>
                                  <option value="rejected">❌ Rechazado</option>
                                </select>
                                <a
                                  href={docFile.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
                                >
                                  Ver / Descargar
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {total > 0 && docCount < total && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
                          Faltan {total - docCount} documento{total - docCount !== 1 ? "s" : ""} por subir.
                        </div>
                      )}
                      {isComplete && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                          ✓ Expediente completo — todos los documentos recibidos.
                        </div>
                      )}

                      {/* Internal notes */}
                      <div className="mt-5 pt-4 border-t border-gray-100">
                        <label className="block text-xs font-medium text-slate-600 uppercase tracking-widest mb-2">
                          Notas internas
                        </label>
                        <textarea
                          rows={3}
                          className="w-full text-sm border border-gray-200 rounded p-3 outline-none focus:border-slate-400 transition-colors resize-none"
                          placeholder="Anotaciones privadas sobre este expediente (solo visibles para el despacho)…"
                          value={notes[client.uid] ?? ""}
                          onChange={(e) => setNotes((prev) => ({ ...prev, [client.uid]: e.target.value }))}
                        />
                        <button
                          onClick={() => handleSaveNote(client.uid)}
                          disabled={savingNote === client.uid}
                          className="mt-2 text-xs bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors disabled:opacity-50"
                        >
                          {savingNote === client.uid ? "Guardando…" : "Guardar nota"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
