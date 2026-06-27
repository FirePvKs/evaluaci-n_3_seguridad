import Icon from './Icon'

export default function Resumen() {
  return (
    <article className="prose-section">
      <h1 className="section-title">Resumen Ejecutivo</h1>
      <p className="section-subtitle">Auditoría de Seguridad Web — Portal de Clientes CrediExpress</p>

      <div className="card">
        <h2 className="card-title">Contexto de la Organización</h2>
        <p>
          <strong>CrediExpress</strong> es una casa de crédito orientada al otorgamiento de
          préstamos financieros mediante plataformas digitales. Como entidad financiera, la
          confianza, la confidencialidad y la integridad de los datos son los pilares
          fundamentales de su operación.
        </p>
        <p className="mt-3">
          La organización opera un <strong>Portal de Clientes</strong> centralizado que permite
          a los usuarios consultar el estado de sus créditos, visualizar su historial de pagos y
          acceder a su perfil financiero, incluyendo el motor de <em>scoring</em> crediticio
          interno. Este portal se conecta directamente a bases de datos relacionales y servidores
          de aplicaciones que procesan información altamente sensible.
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">Información Sensible Bajo Resguardo</h2>
        <div className="impact-grid">
          <div className="impact-box impact-cloud">
            <h3>Datos Personales (PII)</h3>
            <p>Nombres completos, RUT, direcciones, correos electrónicos y teléfonos de contacto de los clientes registrados en la plataforma.</p>
          </div>
          <div className="impact-box impact-enterprise">
            <h3>Información Financiera</h3>
            <p>Números de cuenta, historial de transacciones, estados de cuenta, solicitudes de crédito en curso y resultados de scoring crediticio.</p>
          </div>
          <div className="impact-box impact-cloud">
            <h3>Credenciales de Acceso</h3>
            <p>Hashes de contraseñas, tokens de sesión activos y registros de auditoría de autenticación de todos los clientes.</p>
          </div>
          <div className="impact-box impact-enterprise">
            <h3>Algoritmos Propietarios</h3>
            <p>Modelos y parámetros del motor de scoring crediticio interno, clasificaciones de riesgo y capacidades de endeudamiento calculadas.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Alcance y Objetivos de la Auditoría</h2>
        <p>
          El presente informe documenta una auditoría de seguridad técnica realizada sobre el
          Portal de Clientes de CrediExpress en un ambiente controlado de pruebas{' '}
          <strong>(DVWA)</strong> configurado bajo nivel de seguridad <em>Low</em>.
        </p>
        <ul className="steps-list mt-3">
          <li>
            <span className="step-badge">1</span>
            <div>
              <strong>Identificación y explotación:</strong> Demostración práctica de tres
              vectores de ataque críticos — Inyección SQL, XSS Reflected e Inyección de
              Comandos — sobre el entorno controlado asignado.
            </div>
          </li>
          <li>
            <span className="step-badge">2</span>
            <div>
              <strong>Evaluación de impacto técnico:</strong> Clasificación de la gravedad
              de cada vulnerabilidad mediante la métrica estándar <strong>CVSS v3.1</strong>,
              con puntajes obtenidos desde la calculadora oficial de FIRST.
            </div>
          </li>
          <li>
            <span className="step-badge">3</span>
            <div>
              <strong>Análisis de riesgo de negocio:</strong> Traducción de los hallazgos
              técnicos en impactos reales sobre la operación financiera y la reputación de
              CrediExpress mediante una Matriz de Riesgo con mapa de calor.
            </div>
          </li>
          <li>
            <span className="step-badge">4</span>
            <div>
              <strong>Diseño de controles defensivos:</strong> Propuesta de políticas de
              prevención que ataquen la causa raíz de las fallas y controles de mitigación
              alineados con marcos internacionales (OWASP, NIST, CIS Controls).
            </div>
          </li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">Hallazgos — Resumen de Vulnerabilidades</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date" style={{ color: '#c0392b', minWidth: '110px' }}>SQLi · 9.4 Critical</div>
            <div className="timeline-content">
              <strong>Inyección SQL</strong> — La aplicación concatena directamente la entrada
              del usuario en las consultas SQL, permitiendo la extracción completa de la base
              de datos de clientes sin autenticación adicional.
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date" style={{ color: '#e67e22', minWidth: '110px' }}>XSS · 6.1 Medium</div>
            <div className="timeline-content">
              <strong>Cross-Site Scripting Reflejado</strong> — El portal refleja la entrada
              del usuario en el HTML sin sanitizarla, permitiendo la ejecución de código
              JavaScript arbitrario en el navegador de otros clientes.
            </div>
          </div>
          <div className="timeline-item" style={{ borderBottom: 'none' }}>
            <div className="timeline-date" style={{ color: '#c0392b', minWidth: '110px' }}>CMDi · 9.9 Critical</div>
            <div className="timeline-content">
              <strong>Inyección de Comandos</strong> — El servidor ejecuta comandos del sistema
              operativo con input del usuario sin validación, otorgando control total sobre el
              servidor y todos los activos almacenados en él.
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Metodología Aplicada</h2>
        <div className="actors-grid">
          <div className="actor-card">
            <div className="actor-icon"><Icon name="manage_search" size={28} /></div>
            <h3>Reconocimiento</h3>
            <p>Identificación del entorno, puntos de entrada y superficie de ataque del portal.</p>
          </div>
          <div className="actor-card">
            <div className="actor-icon"><Icon name="bolt" size={28} /></div>
            <h3>Explotación</h3>
            <p>Ejecución de los tres ataques en ambiente controlado DVWA con evidencia documentada.</p>
          </div>
          <div className="actor-card">
            <div className="actor-icon"><Icon name="bar_chart" size={28} /></div>
            <h3>Análisis</h3>
            <p>Medición CVSS v3.1, construcción de matriz de riesgo y priorización por impacto.</p>
          </div>
          <div className="actor-card">
            <div className="actor-icon"><Icon name="shield" size={28} /></div>
            <h3>Remediación</h3>
            <p>Propuesta de controles de prevención y mitigación referenciados a OWASP y NIST.</p>
          </div>
          <div className="actor-card">
            <div className="actor-icon"><Icon name="restart_alt" size={28} /></div>
            <h3>Recuperación</h3>
            <p>Plan de respuesta ante incidentes y recuperación ante desastres (DR) para CrediExpress.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Marco Ético y Legal</h2>
        <p>
          Todos los ataques documentados en este informe fueron ejecutados{' '}
          <strong>exclusivamente</strong> sobre el entorno controlado DVWA proporcionado por el
          docente, con fines académicos y defensivos. Atacar sistemas ajenos sin autorización
          expresa constituye un delito informático tipificado en la{' '}
          <strong>Ley 21.459</strong> (Chile). El conocimiento de estas técnicas se adquiere con
          el único propósito de diseñar defensas más robustas.
        </p>
      </div>
    </article>
  )
}
