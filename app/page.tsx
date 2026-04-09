"use client";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-4">
          <div className="shrink-0">
            <h1 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">Abogados de Extranjería</h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-light hidden sm:block">Especialistas en Derecho Migratorio</p>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 whitespace-nowrap text-sm">
              <li><a href="#inicio" className="text-slate-600 hover:text-slate-900 transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="text-slate-600 hover:text-slate-900 transition-colors">Servicios</a></li>
              <li><a href="#documentacion" className="text-slate-600 hover:text-slate-900 transition-colors">Documentación</a></li>
              <li><a href="#sobre-nosotros" className="text-slate-600 hover:text-slate-900 transition-colors">El Despacho</a></li>
              <li><a href="#ubicacion" className="text-slate-600 hover:text-slate-900 transition-colors">Ubicación</a></li>
              <li><a href="/login" className="text-slate-600 hover:text-slate-900 transition-colors text-xs border border-gray-300 px-3 py-1.5 rounded">Área de Clientes</a></li>
              <li><a href="#contacto" className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors">Consulta Gratuita</a></li>
            </ul>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <span className={`block w-6 h-0.5 bg-slate-700 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-slate-700 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-slate-700 transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
            <a href="#inicio" onClick={() => setMenuOpen(false)} className="text-slate-700 py-2 border-b border-gray-100">Inicio</a>
            <a href="#servicios" onClick={() => setMenuOpen(false)} className="text-slate-700 py-2 border-b border-gray-100">Servicios</a>
            <a href="#documentacion" onClick={() => setMenuOpen(false)} className="text-slate-700 py-2 border-b border-gray-100">Documentación</a>
            <a href="#sobre-nosotros" onClick={() => setMenuOpen(false)} className="text-slate-700 py-2 border-b border-gray-100">El Despacho</a>
            <a href="#ubicacion" onClick={() => setMenuOpen(false)} className="text-slate-700 py-2 border-b border-gray-100">Ubicación</a>
            <a href="/login" onClick={() => setMenuOpen(false)} className="text-slate-700 py-2 border-b border-gray-100">Área de Clientes</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)} className="bg-slate-800 text-white text-center py-2 rounded">Consulta Gratuita</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="bg-slate-800 text-white py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-slate-400 uppercase tracking-widest text-xs sm:text-sm mb-4 font-light">Derecho de Extranjería · España</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight max-w-3xl">Regularización de Ciudadanos Extranjeros en España</h2>
          <p className="text-base sm:text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">Somos abogados especializados exclusivamente en extranjería. Asesoramos a ciudadanos extranjeros en todos los trámites de regularización al amparo de la nueva normativa vigente en España.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#contacto" className="bg-white text-slate-800 px-6 sm:px-8 py-3 rounded font-semibold hover:bg-slate-100 transition-colors text-sm sm:text-base">Solicitar Consulta</a>
            <a href="#servicios" className="border border-slate-400 text-white px-6 sm:px-8 py-3 rounded font-semibold hover:border-white transition-colors text-sm sm:text-base">Nuestros Servicios</a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-slate-500 uppercase tracking-widest text-xs sm:text-sm text-center mb-2">Áreas de Práctica</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 mb-12">Nuestros Servicios Jurídicos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-1 bg-slate-800 mb-5"></div>
              <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-3">Regularización de Residencia</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Asesoramiento integral para la obtención de autorización de residencia legal en España conforme a la nueva normativa vigente.</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-1 bg-slate-800 mb-5"></div>
              <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-3">Permisos y Visados</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Tramitación de visados, autorizaciones de trabajo y residencia, y demás procedimientos administrativos ante organismos competentes.</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-1 bg-slate-800 mb-5"></div>
              <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-3">Asesoría Jurídica Integral</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Consultas legales especializadas en derecho de extranjería, recursos administrativos y representación ante autoridades.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="documentacion" className="bg-slate-800 text-white py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-slate-400 uppercase tracking-widest text-xs sm:text-sm mb-2 font-light">Requisitos</p>
          <h3 className="text-2xl sm:text-3xl font-bold mb-8">Documentación para la Regularización</h3>

          {/* Nueva Ley de Regularización Extraordinaria */}
          <div className="bg-amber-500/10 border border-amber-400/40 rounded-lg p-5 sm:p-8 mb-10">
            <p className="text-amber-400 text-xs uppercase tracking-widest mb-1">Nueva vía · Plazo hasta el 30 de junio de 2026</p>
            <h4 className="text-lg sm:text-xl font-semibold mb-3">Ley de Regularización Extraordinaria</h4>
            <p className="text-slate-300 text-sm mb-8 leading-relaxed max-w-3xl">
              El Congreso de los Diputados aprobó la Proposición de Ley de Regularización Extraordinaria para ciudadanos extranjeros en situación irregular con arraigo en España. El proceso de solicitudes está activo desde abril de 2026.{" "}
              <span className="text-amber-400 font-medium">El plazo límite para presentar la solicitud es el 30 de junio de 2026 — improrrogable.</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-5">
                <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">1. Residencia</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2"><span className="text-amber-400 shrink-0 mt-0.5">—</span><span>Haber estado en España <strong className="text-white">antes del 31 de diciembre de 2025</strong></span></li>
                  <li className="flex gap-2"><span className="text-amber-400 shrink-0 mt-0.5">—</span><span>Acreditar al menos <strong className="text-white">5 meses de permanencia ininterrumpida</strong> al momento de la solicitud</span></li>
                  <li className="flex gap-2 text-slate-400 text-xs mt-1"><span className="shrink-0">·</span><span>Válido: empadronamiento, envíos de dinero, consultas médicas, abonos de transporte, facturas, etc.</span></li>
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-5">
                <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">2. Antecedentes Penales</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2"><span className="text-amber-400 shrink-0 mt-0.5">—</span><span>Sin antecedentes penales en <strong className="text-white">España</strong> ni en los <strong className="text-white">países anteriores de residencia</strong></span></li>
                  <li className="flex gap-2"><span className="text-amber-400 shrink-0 mt-0.5">—</span><span>No figurar como amenaza para el orden público ni la seguridad nacional</span></li>
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-5">
                <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">3. Solicitantes de Asilo</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2"><span className="text-amber-400 shrink-0 mt-0.5">—</span><span>También pueden acogerse los solicitantes de protección internacional</span></li>
                  <li className="flex gap-2"><span className="text-amber-400 shrink-0 mt-0.5">—</span><span>Solicitud de asilo presentada <strong className="text-white">antes del 31 de diciembre de 2025</strong></span></li>
                  <li className="flex gap-2 text-slate-400 text-xs mt-1"><span className="shrink-0">·</span><span>Novedad: ambos procesos ya no son incompatibles</span></li>
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-5">
                <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">4. Documentos</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2"><span className="text-amber-400 shrink-0 mt-0.5">—</span><span>Pasaporte o documento de identidad en vigor</span></li>
                  <li className="flex gap-2"><span className="text-amber-400 shrink-0 mt-0.5">—</span><span>Certificado de antecedentes penales de España</span></li>
                  <li className="flex gap-2"><span className="text-amber-400 shrink-0 mt-0.5">—</span><span>Certificado de antecedentes penales del país de origen (apostillado y traducido)</span></li>
                  <li className="flex gap-2"><span className="text-amber-400 shrink-0 mt-0.5">—</span><span>Prueba de residencia anterior al 31/12/2025</span></li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-400/20 rounded p-4 text-xs text-amber-300/80 leading-relaxed">
              <strong className="text-amber-400">Plazo improrrogable:</strong> Las solicitudes deben presentarse antes del <strong className="text-amber-400">30 de junio de 2026</strong>. No espere al último momento. Contáctenos para una valoración personalizada y gestión completa de su expediente.
            </div>
          </div>

          <p className="text-slate-400 text-sm mb-6">Otras vías de regularización ordinaria disponibles:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-5 sm:p-6">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Más habitual</p>
              <h4 className="text-base sm:text-lg font-semibold mb-1">Arraigo Social</h4>
              <p className="text-slate-400 text-sm mb-4">Mínimo 3 años de residencia continuada en España</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Pasaporte o documento de viaje en vigor</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Certificado de empadronamiento histórico (mín. 3 años)</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Antecedentes penales de España y país de origen (apostillado)</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Informe de arraigo social del ayuntamiento</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Contrato de trabajo (mín. 30 h/semana) o medios económicos</li>
              </ul>
            </div>

            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-5 sm:p-6">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Sin oferta de empleo</p>
              <h4 className="text-base sm:text-lg font-semibold mb-1">Arraigo Laboral</h4>
              <p className="text-slate-400 text-sm mb-4">Mínimo 2 años de residencia y 6 meses de actividad laboral</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Pasaporte o documento de viaje en vigor</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Certificado de empadronamiento (mín. 2 años)</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Antecedentes penales de España y país de origen</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Prueba de relación laboral (Inspección de Trabajo, nóminas, testimonios, etc.)</li>
              </ul>
            </div>

            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-5 sm:p-6">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Nueva vía</p>
              <h4 className="text-base sm:text-lg font-semibold mb-1">Arraigo para la Formación</h4>
              <p className="text-slate-400 text-sm mb-4">Mínimo 2 años de residencia y matrícula en formación oficial</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Pasaporte o documento de viaje en vigor</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Certificado de empadronamiento (mín. 2 años)</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Antecedentes penales de España y país de origen</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Matrícula en FP, educación secundaria u otro programa oficial</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Acreditación de medios económicos suficientes</li>
              </ul>
            </div>

            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-5 sm:p-6">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Vínculo familiar</p>
              <h4 className="text-base sm:text-lg font-semibold mb-1">Arraigo Familiar</h4>
              <p className="text-slate-400 text-sm mb-4">Padre/madre de ciudadano español, europeo o residente legal</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Pasaporte o documento de viaje en vigor</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Antecedentes penales de España y país de origen</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Libro de familia o certificado de nacimiento del/la hijo/a (apostillado)</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Documentación de nacionalidad o residencia legal del/la hijo/a</li>
                <li className="flex gap-2"><span className="text-slate-500 shrink-0">—</span>Acreditación de convivencia o dependencia</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-slate-900/50 border border-slate-700 rounded-lg p-5 text-sm text-slate-400 leading-relaxed">
            <span className="text-slate-300 font-semibold">Nota importante:</span> Los documentos expedidos en el extranjero deben estar debidamente legalizados mediante apostilla de La Haya o legalización consular, y traducidos al español por traductor jurado cuando así se requiera. Los requisitos concretos pueden variar según la delegación de gobierno competente. Consúltenos para una valoración personalizada de su caso.
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-nosotros" className="bg-white border-y border-gray-100 py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-slate-500 uppercase tracking-widest text-xs sm:text-sm mb-2">Quiénes Somos</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">Abogados Especialistas en Extranjería</h3>
          <p className="text-slate-600 leading-relaxed mb-4 max-w-3xl">Somos un equipo de letrados dedicados exclusivamente al derecho de extranjería. Acompañamos a ciudadanos extranjeros en cada etapa de su proceso de regularización, con una atención personalizada, rigurosa y completamente confidencial.</p>
          <p className="text-slate-600 leading-relaxed max-w-3xl">Nuestro compromiso es ofrecer soluciones jurídicas eficaces, adaptadas a la situación concreta de cada cliente, con pleno dominio de la legislación española vigente y sus últimas modificaciones.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <p className="text-slate-500 uppercase tracking-widest text-xs sm:text-sm text-center mb-2">Contacto</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 mb-3">Solicite su Consulta</h3>
          <p className="text-center text-slate-500 text-sm mb-8">Complete el formulario y uno de nuestros letrados se pondrá en contacto con usted a la mayor brevedad posible.</p>
          <div className="bg-white p-6 sm:p-10 rounded-lg border border-gray-100 shadow-sm">
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre completo" className="w-full p-3 border border-gray-200 rounded text-sm outline-none focus:border-slate-400 transition-colors" />
                <input type="tel" placeholder="Teléfono" className="w-full p-3 border border-gray-200 rounded text-sm outline-none focus:border-slate-400 transition-colors" />
              </div>
              <input type="email" placeholder="Correo electrónico" className="w-full p-3 border border-gray-200 rounded text-sm outline-none focus:border-slate-400 transition-colors" />
              <select className="w-full p-3 border border-gray-200 rounded text-sm text-slate-500 outline-none focus:border-slate-400 transition-colors bg-white">
                <option value="">Tipo de consulta</option>
                <option value="regularizacion-extraordinaria">Regularización Extraordinaria (nueva ley)</option>
                <option value="regularizacion">Regularización de residencia (arraigo)</option>
                <option value="permiso-trabajo">Permiso de trabajo</option>
                <option value="visado">Visado</option>
                <option value="otro">Otro</option>
              </select>
              <textarea placeholder="Describa brevemente su situación" className="w-full p-3 border border-gray-200 rounded text-sm outline-none focus:border-slate-400 transition-colors" rows={4}></textarea>
              <button type="submit" className="w-full bg-slate-800 text-white py-3 rounded font-semibold hover:bg-slate-700 transition-colors text-sm">Enviar Solicitud</button>
            </form>
          </div>
          <div className="mt-6 text-center text-sm text-slate-500">
            <p className="font-medium text-slate-700">Nuestro despacho</p>
            <p>Calle Florencio García 6, Local 13</p>
            <p>Madrid · CP 28017</p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="ubicacion" className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-slate-500 uppercase tracking-widest text-xs sm:text-sm mb-2">Cómo llegar</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Nuestro Despacho</h3>
          <p className="text-slate-500 text-sm mb-8">Calle Florencio García 6, Local 13 · Madrid · CP 28017</p>
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm w-full" style={{height: '420px'}}>
            <iframe
              title="Ubicación del despacho"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.8!2d-3.6459!3d40.4221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228c0000000001%3A0x1!2sCalle+Florencio+Garc%C3%ADa+6%2C+28017+Madrid!5e0!3m2!1ses!2ses!4v1712600000000!5m2!1ses!2ses&q=Calle+Florencio+Garcia+6,+28017+Madrid"
              width="100%"
              height="100%"
              style={{border: 0}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-slate-800 mb-1">Dirección</p>
              <p>Calle Florencio García 6, Local 13</p>
              <p>Madrid, CP 28017</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">Horario de atención</p>
              <p>Lunes a Viernes: 9:00 – 19:00</p>
              <p className="text-slate-500 italic">Atención exclusivamente con cita previa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-slate-300 mb-1">Abogados de Extranjería</p>
          <p className="text-sm mb-3">Calle Florencio García 6, Local 13 · Madrid · CP 28017</p>
          <p className="text-sm">&copy; 2026 Abogados de Extranjería · Especialistas en Derecho Migratorio. Todos los derechos reservados.</p>
          <p className="text-xs mt-2 text-slate-600">La información contenida en este sitio web tiene carácter meramente informativo y no constituye asesoramiento jurídico.</p>
          <div className="flex justify-center gap-6 mt-4 text-xs text-slate-500">
            <a href="/privacidad" className="hover:text-slate-300 transition-colors">Política de Privacidad</a>
            <a href="/aviso-legal" className="hover:text-slate-300 transition-colors">Aviso Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}