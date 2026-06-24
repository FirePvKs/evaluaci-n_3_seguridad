const delitos = [
  {
    accion: 'Inyección de metadatos maliciosos en encabezados X-Stat mediante un comando git push legítimo',
    verbo: 'Exceder la autorización de acceso al sistema',
    articulo: 'Artículo 1°',
    tipo: 'Acceso Ilícito',
    color: 'delito-blue',
    analisis:
      'El sujeto activo posee una autorización limitada (permisos estándar de push en su propio repositorio). Sin embargo, al manipular los encabezados del servicio proxy interno babeld mediante la inyección de protocolos, el atacante excede la autorización que posee. El dolo se manifiesta en saltarse los mecanismos de autenticación y control perimetral para ingresar a la capa de servicios internos (gitrpcd), cumpliendo con el elemento subjetivo del tipo.',
    text: '"El que, con ánimo de apoderarse, usar o conocer la información contenida en un sistema informático, acceda a él o a parte de él, sin autorización o excediendo la que posea..."',
  },
  {
    accion: 'Alteración de la variable interna de entorno rails_env para evadir el entorno aislado (sandbox)',
    verbo: 'Alterar datos informáticos de forma indebida',
    articulo: 'Artículo 3°',
    tipo: 'Ataque a la Integridad de los Datos',
    color: 'delito-orange',
    analisis:
      'La variable rails_env constituye lógicamente un "dato informático". Al forzar la conmutación de los modos de producción a entornos no restringidos, el atacante ejecuta de manera indebida el verbo rector alterar. Esta modificación no autorizada de los datos de configuración del framework desprotege los límites de seguridad impuestos por el aislamiento (sandbox).',
    text: '"El que, de manera indebida o sin autorización, altere, dañe, borre, deteriore o suprima datos informáticos..."',
  },
  {
    accion: 'Manipulación del parámetro custom_hooks_dir e inyección de secuencias de escape (path traversal) en repo_pre_receive_hooks',
    verbo: 'Introducir datos / Obstaculizar gravemente el sistema',
    articulo: 'Artículo 4°',
    tipo: 'Ataque a la Integridad del Sistema',
    color: 'delito-red',
    analisis:
      'La ejecución remota de código (RCE) a nivel de sistema operativo mediante el secuestro de los scripts de ejecución automática (hooks) implica la introducción y transmisión de datos informáticos maliciosos (payloads). Al tomar el control de los procesos del servidor subyacente, se vulnera gravemente la integridad del sistema. La alteración del flujo lógico para ejecutar procesos arbitrarios constituye jurídicamente una obstaculización grave de su funcionamiento normal.',
    text: '"El que, de manera indebida o sin autorización, obstaculice o interrumpa gravemente el funcionamiento total o parcial de un sistema informático, a través de la introducción, transmisión, daño, deterioro, alteración o supresión de datos informáticos..."',
  },
  {
    accion: 'Acceso indebido y extracción de repositorios privados y secretos de CI/CD de terceros en los nodos de almacenamiento compartidos',
    verbo: 'Interceptar datos informáticos dentro del sistema',
    articulo: 'Artículo 2°',
    tipo: 'Interceptación Ilícita',
    color: 'delito-purple',
    analisis:
      'La arquitectura afectada corresponde a nodos compartidos multi-inquilino (multi-tenant). Al romper el aislamiento, el atacante captura el flujo de datos y el contenido de repositorios de otros usuarios que se procesan o almacenan dentro de un mismo sistema. Capturar o desviar de forma encubierta esta información confidencial sin consentimiento de los titulares constituye el verbo rector de interceptar datos informáticos en su fase de tránsito o procesamiento interno.',
    text: '"El que, de manera indebida o sin autorización, intercepte, interrumpa o interfiera la transmisión no pública de datos informáticos entre sistemas informáticos, o dentro de un mismo sistema..."',
  },
]

export default function Delitos() {
  return (
    <article className="prose-section">
      <h1 className="section-title">Tipificación de Delitos Informáticos</h1>
      <p className="section-subtitle">Ley N° 21.459 — Mapeo de acciones del atacante</p>

      <div className="card mb-6">
        <h2 className="card-title">Tabla de Mapeo Técnico-Legal</h2>
        <div className="overflow-x-auto">
          <table className="mapeo-table">
            <thead>
              <tr>
                <th>Acción del Atacante</th>
                <th>Verbo Rector</th>
                <th>Artículo</th>
                <th>Calificación Penal</th>
              </tr>
            </thead>
            <tbody>
              {delitos.map((d, i) => (
                <tr key={i}>
                  <td><code>{d.accion.split(' ').slice(0, 6).join(' ')}…</code></td>
                  <td>{d.verbo}</td>
                  <td><strong>{d.articulo}</strong></td>
                  <td><span className={`tipo-tag ${d.color}`}>{d.tipo}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {delitos.map((d, i) => (
        <div key={i} className="card delito-card">
          <div className={`delito-number ${d.color}`}>{i + 1}</div>
          <div>
            <div className="delito-header">
              <span className={`tipo-tag ${d.color}`}>{d.articulo} — {d.tipo}</span>
            </div>
            <h2 className="card-title mt-2">Acción Técnica</h2>
            <p className="font-medium mb-3">{d.accion}</p>

            <div className="legal-quote">
              <p className="quote-label">Texto legal aplicable:</p>
              <p className="quote-text">{d.text}</p>
            </div>

            <h3 className="analysis-title">Análisis de Subsumisión</h3>
            <p>{d.analisis}</p>
          </div>
        </div>
      ))}
    </article>
  )
}
