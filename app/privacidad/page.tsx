import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Abogados de Extranjería Madrid",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <a href="/" className="text-lg font-bold text-slate-800 tracking-tight">
            Abogados de Extranjería
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 prose prose-slate prose-sm sm:prose-base">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Política de Privacidad</h1>
        <p className="text-slate-400 text-sm mb-8">Última actualización: abril de 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">1. Responsable del tratamiento</h2>
          <p className="text-slate-600 leading-relaxed">
            El responsable del tratamiento de los datos personales recogidos en este sitio web es el despacho
            <strong> Abogados de Extranjería</strong>, con domicilio en Calle Florencio García 6, Local 13,
            Madrid, CP 28017. Correo de contacto:{" "}
            <a href="mailto:afrinconm30@gmail.com" className="text-slate-800 underline">
              afrinconm30@gmail.com
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">2. Datos que recopilamos</h2>
          <ul className="text-slate-600 space-y-1 list-disc pl-5">
            <li>Nombre, apellidos y número de teléfono (al registrarse en el área de clientes)</li>
            <li>Dirección de correo electrónico y contraseña (gestionada mediante Firebase Auth)</li>
            <li>Documentos personales que usted sube voluntariamente a su expediente</li>
            <li>Datos de navegación básicos (dirección IP, tipo de navegador) de forma anónima</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">3. Finalidad del tratamiento</h2>
          <ul className="text-slate-600 space-y-1 list-disc pl-5">
            <li>Gestionar el expediente de regularización del cliente</li>
            <li>Comunicarnos con usted para dar seguimiento a su trámite</li>
            <li>Cumplir con las obligaciones legales del despacho</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">4. Base legal</h2>
          <p className="text-slate-600 leading-relaxed">
            El tratamiento se basa en el consentimiento del interesado (art. 6.1.a RGPD) y en la ejecución
            de un contrato de servicios jurídicos (art. 6.1.b RGPD).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">5. Conservación de los datos</h2>
          <p className="text-slate-600 leading-relaxed">
            Los datos se conservarán durante el tiempo necesario para la prestación del servicio y,
            posteriormente, durante los plazos de prescripción legales aplicables (mínimo 5 años).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">6. Destinatarios</h2>
          <p className="text-slate-600 leading-relaxed">
            Los datos no se ceden a terceros salvo obligación legal. Se utilizan los siguientes proveedores
            de servicios tecnológicos, todos con garantías adecuadas de protección de datos:
          </p>
          <ul className="text-slate-600 space-y-1 list-disc pl-5 mt-2">
            <li>Google Firebase (autenticación y base de datos) — EE.UU., con cláusulas contractuales tipo</li>
            <li>Uploadthing (almacenamiento de ficheros) — EE.UU., con cláusulas contractuales tipo</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">7. Sus derechos</h2>
          <p className="text-slate-600 leading-relaxed">
            Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y
            portabilidad enviando un correo a{" "}
            <a href="mailto:afrinconm30@gmail.com" className="text-slate-800 underline">
              afrinconm30@gmail.com
            </a>{" "}
            con copia de su DNI. También tiene derecho a presentar una reclamación ante la{" "}
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-800 underline"
            >
              Agencia Española de Protección de Datos (AEPD)
            </a>
            .
          </p>
        </section>
      </main>

      <footer className="border-t border-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex gap-6 text-xs text-slate-400">
          <a href="/" className="hover:text-slate-600">Inicio</a>
          <a href="/aviso-legal" className="hover:text-slate-600">Aviso Legal</a>
        </div>
      </footer>
    </div>
  );
}
