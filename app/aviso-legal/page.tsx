import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal | Abogados de Extranjería Madrid",
};

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <a href="/" className="text-lg font-bold text-slate-800 tracking-tight">
            Abogados de Extranjería
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Aviso Legal</h1>
        <p className="text-slate-400 text-sm mb-8">Última actualización: abril de 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">1. Datos identificativos</h2>
          <p className="text-slate-600 leading-relaxed">
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad
            de la Información y de Comercio Electrónico (LSSI-CE), se informa:
          </p>
          <ul className="text-slate-600 space-y-1 list-none pl-0 mt-3">
            <li><strong>Denominación:</strong> Abogados de Extranjería</li>
            <li><strong>Domicilio:</strong> Calle Florencio García 6, Local 13, Madrid, CP 28017</li>
            <li>
              <strong>Contacto:</strong>{" "}
              <a href="mailto:afrinconm30@gmail.com" className="text-slate-800 underline">
                afrinconm30@gmail.com
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">2. Objeto y ámbito de aplicación</h2>
          <p className="text-slate-600 leading-relaxed">
            El presente aviso legal regula el uso del sitio web cuyo titular es Abogados de Extranjería.
            El acceso y uso de esta web atribuye la condición de usuario, que acepta las condiciones aquí
            establecidas.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">3. Propiedad intelectual</h2>
          <p className="text-slate-600 leading-relaxed">
            Los contenidos del sitio web (textos, imágenes, diseño y código) son propiedad del despacho
            o disponen de licencia para su uso. Queda prohibida su reproducción total o parcial sin
            autorización expresa y por escrito.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">4. Exclusión de responsabilidad</h2>
          <p className="text-slate-600 leading-relaxed">
            La información publicada en esta web tiene carácter meramente informativo y no constituye
            asesoramiento jurídico. El despacho no se responsabiliza de los daños derivados del uso
            incorrecto del sitio ni de la desactualización de sus contenidos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">5. Legislación aplicable</h2>
          <p className="text-slate-600 leading-relaxed">
            Las presentes condiciones se rigen por la legislación española. Para cualquier controversia
            derivada del uso de este sitio, las partes se someten a los Juzgados y Tribunales de Madrid,
            renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
          </p>
        </section>
      </main>

      <footer className="border-t border-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex gap-6 text-xs text-slate-400">
          <a href="/" className="hover:text-slate-600">Inicio</a>
          <a href="/privacidad" className="hover:text-slate-600">Política de Privacidad</a>
        </div>
      </footer>
    </div>
  );
}
