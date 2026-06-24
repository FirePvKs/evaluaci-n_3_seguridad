import Icon from './Icon'

const recomendaciones = [
  {
    icon: 'build',
    titulo: 'Gestión de Vulnerabilidades y Parcheo Automatizado',
    items: [
      { subtitulo: 'Actualización Crítica', texto: 'Implementar ventanas de mantenimiento prioritarias para entornos On-Premise. Ante vulnerabilidades con puntuación CVSS superior a 8.5, el despliegue de parches en servidores como GitHub Enterprise Server (GHES) debe ejecutarse en un plazo menor a 24 horas desde la liberación del exploit.' },
      { subtitulo: 'Hardening de Componentes Internos', texto: 'Restringir las capacidades de ejecución de los entornos aislados (sandboxes). Configurar los servicios de backend (como los proxies de Git) bajo el principio de menor privilegio, impidiendo que variables de entorno de nivel de aplicación puedan reescribir rutas del sistema operativo.' },
    ],
  },
  {
    icon: 'link',
    titulo: 'Seguridad en la Cadena de Suministro de Software (DevSecOps)',
    items: [
      { subtitulo: 'Auditoría de Hooks', texto: 'Monitorear y restringir el uso de scripts de ejecución automática (custom_hooks). Se debe deshabilitar la capacidad de que usuarios estándar inyecten o modifiquen parámetros de configuración global de Git mediante comandos ordinarios.' },
      { subtitulo: 'Sanitización de Entradas Basada en Firmas', texto: 'Implementar mecanismos de validación estricta a nivel de protocolo (capa de transporte de Git) para neutralizar secuencias de escape de directorios (path traversal) y cargas útiles (payloads) ocultas en metadatos como X-Stat.' },
    ],
  },
  {
    icon: 'assignment',
    titulo: 'Cumplimiento de Gobernanza y Reporte Operacional',
    items: [
      { subtitulo: 'Simulacros de Reporte ANCI', texto: 'Diseñar e institucionalizar playbooks de respuesta a incidentes que contemplen la ventana de 3 horas dispuesta por la Ley N° 21.663. Las organizaciones deben automatizar la recolección de telemetría forense para cumplir con los requisitos informativos del CSIRT Nacional sin dilatar la mitigación técnica.' },
      { subtitulo: 'Auditoría de Datos en Repositorios', texto: 'Implementar herramientas de Escaneo de Secretos y DLP (Data Loss Prevention) para asegurar que ningún repositorio de código (público o privado) almacene Datos Sensibles bajo la Ley N° 19.628 o credenciales de producción en texto plano.' },
    ],
  },
]

export default function Conclusiones() {
  return (
    <article className="prose-section">
      <h1 className="section-title">Conclusiones y Recomendaciones</h1>
      <p className="section-subtitle">Plan de mitigación tecnológico y regulatorio</p>

      <div className="card mb-6">
        <h2 className="card-title">Recomendaciones de Seguridad — Defensa en Capas</h2>
        <p className="mb-5">
          Para prevenir y contener el impacto de fallos críticos de Ejecución Remota de Código
          (RCE) en la cadena de suministro de software, las organizaciones deben adoptar un
          enfoque de <strong>Defensa en Capas</strong>:
        </p>
        <div className="recs-list">
          {recomendaciones.map((rec, i) => (
            <div key={i} className="rec-item">
              <div className="rec-header">
                <Icon name={rec.icon} className="rec-icon" />
                <h3>{rec.titulo}</h3>
              </div>
              <div className="rec-subitems">
                {rec.items.map((item, j) => (
                  <div key={j} className="rec-subitem">
                    <strong className="rec-sublabel">{item.subtitulo}:</strong>
                    <p>{item.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card reflexion-card">
        <h2 className="card-title">Reflexión Final del Análisis</h2>
        <div className="reflexion-content">
          <p>
            El estudio sistémico de la vulnerabilidad CVE-2026-3854 demuestra que la ciberseguridad
            moderna ha dejado de ser un desafío puramente perimetral para convertirse en un problema
            de <strong>confianza de infraestructura interna y gobernanza legal</strong>.
          </p>
          <p>
            La sofisticación del ataque —capaz de instrumentalizar procesos legítimos de desarrollo
            como un comando <code>git push</code> para comprometer servidores subyacentes— evidencia
            la fragilidad de la <strong>cadena de suministro digital</strong>. Un solo fallo de
            inyección en un componente lógico puede desencadenar un riesgo sistémico global,
            exponiendo la propiedad intelectual y los datos de millones de organizaciones simultáneamente.
          </p>
          <p>
            En el contexto chileno, este caso expone la madurez obligatoria a la que se enfrenta el
            país. La coexistencia de la <strong>Ley N° 21.459</strong> y la{' '}
            <strong>Ley N° 21.663</strong> redefine el estándar de diligencia exigido: ya no basta
            con ser una víctima pasiva de un ciberdelito; las organizaciones ahora son legal y
            administrativamente responsables de su propia resiliencia.
          </p>
        </div>
        <div className="leyes-cierre">
          <span className="ley-chip">Ley N° 21.459 — Delitos Informáticos</span>
          <span className="ley-chip">Ley N° 21.663 — Ciberseguridad</span>
          <span className="ley-chip">Ley N° 19.628 — Datos Personales</span>
          <span className="ley-chip">CVE-2026-3854 — Caso GitHub RCE</span>
        </div>
      </div>
    </article>
  )
}
