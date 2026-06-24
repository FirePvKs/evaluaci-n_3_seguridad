import Icon from './Icon'

export default function Marco() {
  return (
    <article className="prose-section">
      <h1 className="section-title">Marco Normativo Aplicable</h1>
      <p className="section-subtitle">Análisis jurídico bajo la legislación chilena e internacional</p>

      <div className="card">
        <div className="law-header">
          <span className="law-badge">Ley N° 21.459</span>
          <h2 className="card-title">Delitos Informáticos</h2>
        </div>
        <p>
          La conducta descrita en la explotación del CVE-2026-3854 (inyección de protocolos y
          ejecución remota de código) se subsume en varios tipos penales introducidos por esta
          ley, la cual adecua la normativa nacional al <strong>Convenio de Budapest</strong>.
        </p>
        <div className="article-list">
          <div className="article-item">
            <span className="article-tag">Art. 2°</span>
            <div><strong>Acceso Ilícito:</strong> La vulnerabilidad permitió a usuarios autenticados "exceder la autorización que poseían" al superar barreras tecnológicas para acceder a nodos de almacenamiento compartidos.</div>
          </div>
          <div className="article-item">
            <span className="article-tag">Art. 4°</span>
            <div><strong>Ataque a la Integridad de los Datos:</strong> La alteración de variables de entorno (<code>rails_env</code>) y parámetros de scripts (<code>custom_hooks_dir</code>) para forzar una ejecución maliciosa constituye una alteración indebida de datos informáticos.</div>
          </div>
          <div className="article-item">
            <span className="article-tag">Art. 3°</span>
            <div><strong>Interceptación Ilícita:</strong> La vulnerabilidad permitía acceder a repositorios privados de terceros en entornos compartidos; cualquier captura de datos sin autorización se encuadra en este tipo penal.</div>
          </div>
        </div>
        <a href="https://www.bcn.cl/leychile/navegar?idNorma=1177743" target="_blank" rel="noopener noreferrer" className="source-link">
          <Icon name="link" className="source-link-icon" /> Fuente: Ley 21.459 — Biblioteca del Congreso Nacional (BCN)
        </a>
      </div>

      <div className="card">
        <div className="law-header">
          <span className="law-badge">Ley N° 21.663</span>
          <h2 className="card-title">Ley Marco de Ciberseguridad (ANCI)</h2>
        </div>
        <p>
          Dado que GitHub provee servicios esenciales para la continuidad operativa de múltiples
          instituciones en Chile, este incidente activa las disposiciones de la nueva{' '}
          <strong>Agencia Nacional de Ciberseguridad (ANCI)</strong>.
        </p>
        <div className="article-list">
          <div className="article-item">
            <span className="article-tag">Art. 9°</span>
            <div><strong>Deber de Reporte:</strong> Las instituciones obligadas que detecten un incidente con "efectos significativos" deben realizar una alerta temprana en un plazo máximo de <strong>3 horas</strong> ante el CSIRT Nacional.</div>
          </div>
          <div className="article-item">
            <span className="article-tag">Art. 4° N°8</span>
            <div><strong>Seguridad por Defecto y desde el Diseño:</strong> La existencia de una vulnerabilidad de inyección en componentes críticos como <code>babeld</code> sugiere una contravención a este principio.</div>
          </div>
          <div className="article-item">
            <span className="article-tag">OIV</span>
            <div><strong>Operadores de Importancia Vital:</strong> Si una empresa chilena utiliza GHES para gestionar infraestructura crítica, está obligada a aplicar parches de forma inmediata bajo apercibimiento de sanciones administrativas.</div>
          </div>
        </div>
        <a href="https://www.bcn.cl/leychile/navegar?idNorma=1202434" target="_blank" rel="noopener noreferrer" className="source-link">
          <Icon name="link" className="source-link-icon" /> Fuente: Ley 21.663 — Biblioteca del Congreso Nacional (BCN)
        </a>
      </div>

      <div className="card">
        <div className="law-header">
          <span className="law-badge">Ley N° 19.628</span>
          <h2 className="card-title">Protección de la Vida Privada</h2>
        </div>
        <p>
          El compromiso de repositorios privados implica en muchos casos el acceso no autorizado a
          datos de carácter personal (nombres de desarrolladores, correos electrónicos, llaves de API, etc.).
        </p>
        <div className="article-list">
          <div className="article-item">
            <span className="article-tag">Art. 11°</span>
            <div><strong>Deber de Cuidado y Diligencia:</strong> El responsable de la base de datos debe cuidar los datos con la debida diligencia. Una vulnerabilidad de esta magnitud puede dar pie a acciones de indemnización si no se adoptaron las medidas técnicas adecuadas.</div>
          </div>
          <div className="article-item">
            <span className="article-tag">2026</span>
            <div><strong>Nuevas Obligaciones:</strong> Bajo los estándares actuales de 2026, la normativa chilena ya exige la notificación de brechas de seguridad a los titulares de los datos cuando existe un riesgo alto para sus derechos.</div>
          </div>
        </div>
        <a href="https://www.bcn.cl/leychile/navegar?idNorma=141599" target="_blank" rel="noopener noreferrer" className="source-link">
          <Icon name="link" className="source-link-icon" /> Fuente: Ley 19.628 — Biblioteca del Congreso Nacional (BCN)
        </a>
      </div>

      <div className="card">
        <div className="law-header">
          <span className="law-badge">D. 295</span>
          <h2 className="card-title">Decreto 295 — Reglamento Ley 21.663</h2>
        </div>
        <p>
          Este reglamento especifica los criterios para determinar cuándo un incidente tiene un
          "efecto significativo", fundamental para la calificación del impacto del CVE-2026-3854 en territorio chileno.
        </p>
        <div className="article-list">
          <div className="article-item">
            <span className="article-tag">Crit.</span>
            <div><strong>Interrupción de Servicios Esenciales:</strong> Se considera efecto significativo si el incidente impide el normal funcionamiento de servicios de utilidad pública. Dado que GitHub es la base del CI/CD del sector tecnológico nacional, el impacto se considera <strong>crítico</strong>.</div>
          </div>
        </div>
        <a href="https://www.bcn.cl/leychile/navegar?idNorma=1202434" target="_blank" rel="noopener noreferrer" className="source-link">
          <Icon name="link" className="source-link-icon" /> Fuente: Decreto 295 (Reglamento Ley 21.663) — BCN
        </a>
      </div>
    </article>
  )
}
