"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function LoginPage() {
  const { login, register, resetPassword } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register" | "reset">("login");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      if (mode === "login") {
        const { user } = await login(email, password);
        router.push(user.email === ADMIN_EMAIL ? "/admin" : "/portal");
      } else if (mode === "register") {
        if (password !== confirmPassword) {
          setError("Las contraseñas no coinciden.");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError("La contraseña debe tener al menos 6 caracteres.");
          setLoading(false);
          return;
        }
        if (!nombre.trim() || !apellidos.trim()) {
          setError("Por favor, introduzca su nombre y apellidos.");
          setLoading(false);
          return;
        }
        if (!telefono.trim()) {
          setError("Por favor, introduzca su número de teléfono.");
          setLoading(false);
          return;
        }
        await register(email, password, nombre.trim(), apellidos.trim(), telefono.trim());
        router.push("/portal");
      } else if (mode === "reset") {
        await resetPassword(email);
        setInfo("Te hemos enviado un correo para restablecer tu contraseña.");
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setError("Email o contraseña incorrectos.");
      } else if (code === "auth/email-already-in-use") {
        setError("Este email ya tiene una cuenta. Inicia sesión.");
      } else if (code === "auth/invalid-email") {
        setError("El email no es válido.");
      } else if (code === "auth/operation-not-allowed") {
        setError("El registro por email no está activado en Firebase. Activa Email/Password en Authentication.");
      } else if (code === "auth/weak-password") {
        setError("La contraseña es demasiado débil.");
      } else {
        setError(`Error: ${code ?? "desconocido"}. Contacte con soporte.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <a href="/" className="shrink-0">
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">Abogados de Extranjería</h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-light hidden sm:block">Especialistas en Derecho Migratorio</p>
          </a>
          <a href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">← Volver al inicio</a>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-12 h-1 bg-slate-800 mx-auto mb-5"></div>
            <h2 className="text-2xl font-bold text-slate-800">
              {mode === "login" && "Área de Clientes"}
              {mode === "register" && "Crear Cuenta"}
              {mode === "reset" && "Recuperar Contraseña"}
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              {mode === "login" && "Acceda para gestionar su expediente y documentación."}
              {mode === "register" && "Cree su cuenta para empezar a gestionar su expediente."}
              {mode === "reset" && "Le enviaremos un enlace para restablecer su contraseña."}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 uppercase tracking-widest mb-1.5">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Carlos"
                      className="w-full p-3 border border-gray-200 rounded text-sm outline-none focus:border-slate-400 transition-colors placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 uppercase tracking-widest mb-1.5">
                      Apellidos
                    </label>
                    <input
                      type="text"
                      required
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      placeholder="García López"
                      className="w-full p-3 border border-gray-200 rounded text-sm outline-none focus:border-slate-400 transition-colors placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}

              {mode === "register" && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 uppercase tracking-widest mb-1.5">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    required
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+34 600 000 000"
                    className="w-full p-3 border border-gray-200 rounded text-sm outline-none focus:border-slate-400 transition-colors placeholder:text-slate-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-600 uppercase tracking-widest mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="su@email.com"
                  className="w-full p-3 border border-gray-200 rounded text-sm outline-none focus:border-slate-400 transition-colors placeholder:text-slate-500"
                />
              </div>

              {mode !== "reset" && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 uppercase tracking-widest mb-1.5">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 border border-gray-200 rounded text-sm outline-none focus:border-slate-400 transition-colors placeholder:text-slate-500"
                  />
                </div>
              )}

              {mode === "register" && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 uppercase tracking-widest mb-1.5">
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 border border-gray-200 rounded text-sm outline-none focus:border-slate-400 transition-colors placeholder:text-slate-500"
                  />
                </div>
              )}

              {error && (
                <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-3">{error}</p>
              )}
              {info && (
                <p className="text-green-700 text-sm bg-green-50 border border-green-200 rounded p-3">{info}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-800 text-white py-3 rounded font-semibold hover:bg-slate-700 transition-colors text-sm disabled:opacity-60"
              >
                {loading ? "Procesando..." : (
                  mode === "login" ? "Iniciar Sesión" :
                  mode === "register" ? "Crear Cuenta" :
                  "Enviar enlace"
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 space-y-2 text-center text-sm">
              {mode === "login" && (
                <>
                  <button onClick={() => { setMode("register"); setError(""); }} className="block w-full text-slate-600 hover:text-slate-900 transition-colors">
                    ¿No tiene cuenta? <span className="font-medium underline underline-offset-2">Regístrese</span>
                  </button>
                  <button onClick={() => { setMode("reset"); setError(""); }} className="block w-full text-slate-400 hover:text-slate-600 transition-colors text-xs">
                    ¿Olvidó su contraseña?
                  </button>
                </>
              )}
              {mode !== "login" && (
                <button onClick={() => { setMode("login"); setError(""); setInfo(""); }} className="text-slate-600 hover:text-slate-900 transition-colors">
                  ← Volver a iniciar sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
