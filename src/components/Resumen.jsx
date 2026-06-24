import Icon from './Icon'

export default function Resumen() {
  return (
    <article className="prose-section">
      <h1 className="section-title">Resumen Ejecutivo del Caso</h1>
      <p className="section-subtitle">CVE-2026-3854 — Vulnerabilidad RCE en GitHub</p>

      <div className="card">
        <h2 className="card-title">¿Qué Pasó? — Descripción Técnica</h2>
        <p>
          Se identificó una vulnerabilidad crítica de Ejecución Remota de Código (RCE) en la
          infraestructura interna de Git de GitHub, específicamente dentro de su proxy de Git
          denominado <code>babeld</code> y el componente <code>gitrpcd</code>. El fallo, registrado
          bajo el identificador <strong>CVE-2026-3854</strong>, consiste en un defecto de inyección
          de protocolos internos.
        </p>
        <p className="mt-3">
          El vector de ataque permitía a cualquier usuario autenticado con permisos de escritura
          (push) en cualquier repositorio inyectar metadatos manipulados en los encabezados del
          servicio interno <code>X-Stat</code> mediante un comando estándar <code>git push</code>.
          La explotación exitosa requería una cadena de tres pasos:
        </p>
        <ul className="steps-list">
          <li>
            <span className="step-badge">1</span>
            <div>
              <strong>Evasión del entorno aislado (sandbox):</strong> Alteración de la variable
              <code> rails_env</code> para conmutar las rutas de producción a entornos no restringidos.
            </div>
          </li>
          <li>
            <span className="step-badge">2</span>
            <div>
              <strong>Redirección del directorio de hooks:</strong> Manipulación del parámetro
              <code> custom_hooks_dir</code> para controlar la base de búsqueda de los scripts de
              ejecución automática.
            </div>
          </li>
          <li>
            <span className="step-badge">3</span>
            <div>
              <strong>Inyección de scripts con path traversal:</strong> Inclusión de secuencias de
              escape en <code>repo_pre_receive_hooks</code> para forzar al sistema binario a ejecutar
              comandos arbitrarios en el servidor subyacente.
            </div>
          </li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">Línea de Tiempo del Incidente</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">4 mar 2026</div>
            <div className="timeline-content">
              El equipo de <strong>Wiz Research</strong> detectó el fallo e informó a GitHub a través
              de su programa de divulgación responsable. Ese mismo día, GitHub desplegó una
              mitigación de emergencia en la plataforma global GitHub.com.
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">10 mar 2026</div>
            <div className="timeline-content">
              Se asignó formalmente el identificador <strong>CVE-2026-3854</strong> con una métrica
              de severidad <strong>CVSS v4.0 de 8.7 (Alta/Crítica)</strong>. Se liberaron los parches
              correctivos para las versiones afectadas de GitHub Enterprise Server (GHES).
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">28 abr 2026</div>
            <div className="timeline-content">
              Tras cumplirse los plazos de seguridad reglamentarios, se procedió a la{' '}
              <strong>divulgación pública y técnica</strong> del fallo.
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Actores Involucrados</h2>
        <div className="actors-grid">
          <div className="actor-card">
            <Icon name="manage_search" className="actor-icon" />
            <h3>Wiz Research</h3>
            <p>
              Responsable del descubrimiento y análisis del fallo mediante herramientas de
              ingeniería inversa potenciadas por IA para análisis de binarios cerrados.
            </p>
          </div>
          <div className="actor-card">
            <Icon name="corporate_fare" className="actor-icon" />
            <h3>GitHub Inc. (Microsoft)</h3>
            <p>
              Entidad encargada de recibir el reporte, validar el riesgo y desarrollar los
              parches de seguridad para su infraestructura interna y productos comerciales.
            </p>
          </div>
          <div className="actor-card">
            <Icon name="public" className="actor-icon" />
            <h3>Organizaciones Afectadas</h3>
            <p>
              Administradores de TI y empresas globales que operan instancias locales de
              GitHub Enterprise Server y requirieron la aplicación inmediata de parches.
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Impacto y Alcance</h2>
        <div className="impact-grid">
          <div className="impact-box impact-cloud">
            <h3>GitHub.com (Cloud Compartido)</h3>
            <p>
              El RCE afectó directamente a los <strong>nodos de almacenamiento compartidos</strong>.
              Un atacante podría haber accedido de manera no autorizada a millones de repositorios
              públicos y privados pertenecientes a otras organizaciones alojadas en la misma
              infraestructura.
            </p>
          </div>
          <div className="impact-box impact-enterprise">
            <h3>GitHub Enterprise Server (On-Premise)</h3>
            <p>
              El impacto en servidores locales fue <strong>total</strong>. La explotación del fallo
              otorgaba acceso directo al sistema operativo subyacente, exponiendo código fuente
              propietario, credenciales de acceso y secretos de CI/CD almacenados en entornos
              empresariales aislados.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
