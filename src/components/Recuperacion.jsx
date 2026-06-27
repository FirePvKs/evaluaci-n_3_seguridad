import Icon from './Icon'

const mejoras = [
  {
    letra: 'A',
    titulo: 'Web Application Firewall (WAF) de Siguiente Generación',
    accion: 'Desplegar una capa perimetral basada en la nube (Cloudflare Enterprise o AWS WAF) antes de que el tráfico HTTP llegue a los servidores de CrediExpress.',
    proposito: 'Inspeccionar en tiempo real las solicitudes entrantes mediante firmas OWASP actualizadas, bloqueando intentos de SQLi, XSS e Inyección de Comandos en el borde de la red antes de que interactúen con el backend financiero.',
    icon: 'security',
  },
  {
    letra: 'B',
    titulo: 'Segmentación de Redes y Zona Desmilitarizada (DMZ)',
    accion: 'Aislar la arquitectura en tres capas de red estrictamente diferenciadas mediante firewalls internos.',
    proposito: 'Si un atacante compromete la capa de presentación, no puede acceder directamente a las bases de datos de créditos. Cada capa solo acepta conexiones de la capa inmediatamente anterior.',
    icon: 'device_hub',
    capas: [
      { nombre: 'Capa de Presentación (DMZ)', desc: 'Servidores web que renderizan el Portal de Clientes. Expuesta a internet.' },
      { nombre: 'Capa de Aplicación', desc: 'APIs financieras y lógica de negocio (Node.js). Solo acepta peticiones desde la DMZ.' },
      { nombre: 'Capa de Datos', desc: 'Base de datos central y motor de scoring. Completamente aislada de internet; solo acepta conexiones de la capa de aplicación vía puertos específicos (ej. 5432 PostgreSQL).' },
    ],
  },
  {
    letra: 'C',
    titulo: 'Pipeline DevSecOps con Análisis Estático (SAST)',
    accion: 'Integrar herramientas SAST como SonarQube y escáneres de dependencias en el repositorio de GitHub corporativo.',
    proposito: 'Analizar automáticamente cada commit del equipo de desarrollo, bloqueando despliegues a producción si se detectan concatenaciones SQL, funciones exec() directas u otros patrones de código vulnerable antes de que lleguen al ambiente productivo.',
    icon: 'integration_instructions',
  },
]

const fasesDRP = [
  {
    fase: 'DETECCIÓN',
    color: '#7f8c8d',
    icon: 'notifications_active',
    titulo: 'Detección del Incidente',
    desc: 'Alertas automáticas del WAF, SIEM o anomalías detectadas en los patrones de consulta de la base de datos de créditos activan el protocolo.',
    disparadores: [
      'Alerta WAF por payload de SQLi o CMDi',
      'Anomalía de volumen de queries en BD de clientes',
      'Alerta SIEM por proceso hijo inesperado del servidor web',
    ],
  },
  {
    fase: 'FASE 1',
    color: '#c0392b',
    icon: 'gpp_bad',
    titulo: 'Aislamiento',
    desc: 'Contención inmediata para evitar la propagación del daño y el acceso continuo del atacante.',
    acciones: [
      'Colocar el Portal de Clientes en modo mantenimiento',
      'Revocar todos los tokens de sesión activos de clientes',
      'Desconectar el servidor comprometido de la red de DMZ',
      'Revocar credenciales de conexión actuales a la base de datos',
    ],
  },
  {
    fase: 'FASE 2',
    color: '#e67e22',
    icon: 'search',
    titulo: 'Análisis y Limpieza',
    desc: 'Investigación forense para determinar el alcance real del incidente y eliminar la causa raíz.',
    acciones: [
      'Auditoría forense del sistema de archivos del servidor comprometido',
      'Identificar qué datos financieros fueron accedidos o alterados',
      'Parchado de la vulnerabilidad explotada en el código fuente',
      'Eliminación de web shells o malware instalado por el atacante',
    ],
  },
  {
    fase: 'FASE 3',
    color: '#2980b9',
    icon: 'refresh',
    titulo: 'Restauración (DRP)',
    desc: 'Levantamiento de un ambiente limpio y restauración del estado financiero verificado.',
    acciones: [
      'Aprovisionar instancia de servidor nueva con Docker/Terraform (Infraestructura como Código)',
      'Desplegar la versión del código fuente con la corrección de la vulnerabilidad ya aplicada',
      'Restaurar el último respaldo de BD verificado como íntegro previo al ataque',
      'Ejecutar validación contable interna para verificar consistencia de créditos históricos',
    ],
  },
  {
    fase: 'FASE 4',
    color: '#27ae60',
    icon: 'assignment_turned_in',
    titulo: 'Notificación y Cierre (Post-Mortem)',
    desc: 'Cumplimiento legal obligatorio ante reguladores y comunicación formal a clientes afectados.',
    acciones: [
      'CISO reporta el incidente a la CMF en un plazo máximo de 4 horas tras su confirmación',
      'En máximo 24 horas: aviso formal a clientes con datos comprometidos',
      'La notificación incluye las medidas adoptadas y recomendación de restablecer credenciales',
      'Elaboración del informe post-mortem interno con lecciones aprendidas y mejoras aplicadas',
    ],
  },
]

export default function Recuperacion() {
  return (
    <article className="prose-section">
      <h1 className="section-title">Mejora Tecnológica y Plan de Recuperación</h1>
      <p className="section-subtitle">DRP y Arquitectura de Seguridad — Portal de Clientes CrediExpress</p>

      <div className="card">
        <p style={{ fontSize: '14px' }}>
          Este plan define las actualizaciones de arquitectura necesarias para minimizar la
          superficie de ataque y el <strong>Plan de Recuperación ante Desastres (DRP)</strong>{' '}
          diseñado para restablecer la disponibilidad e integridad de los datos financieros
          tras un incidente crítico. Se fundamenta en los estándares{' '}
          <strong>CIS Controls</strong> y <strong>NIST SP 800-53</strong>.
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">1. Propuesta de Mejoras Tecnológicas</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mejoras.map((m) => (
            <div key={m.letra} style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '16px', background: 'var(--accent-bg)' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                <Icon name={m.icon} size={24} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '1px' }} />
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-h)' }}>
                  {m.letra}. {m.titulo}
                </h3>
              </div>
              <p style={{ fontSize: '13px', margin: '0 0 6px' }}><strong>Acción:</strong> {m.accion}</p>
              <p style={{ fontSize: '13px', margin: 0 }}><strong>Propósito:</strong> {m.proposito}</p>
              {m.capas && (
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {m.capas.map((c, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '8px 12px', background: 'var(--code-bg)', borderRadius: '6px', borderLeft: `3px solid ${i === 0 ? '#e67e22' : i === 1 ? '#2980b9' : '#27ae60'}` }}>
                      <span style={{ fontWeight: 700, fontSize: '12px', minWidth: '20px', color: 'var(--text-h)' }}>{i + 1}</span>
                      <div>
                        <span style={{ fontWeight: 600, fontSize: '12px', color: 'var(--text-h)' }}>{c.nombre}: </span>
                        <span style={{ fontSize: '12px', color: 'var(--text)' }}>{c.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">2. Plan de Recuperación ante Desastres (DRP)</h2>
        <p style={{ fontSize: '14px', marginBottom: '20px' }}>
          Este plan entra en acción si un atacante logra explotar con éxito una inyección de
          comandos o SQLi crítico, comprometiendo el servidor o alterando tablas de créditos.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {fasesDRP.map((f, idx) => (
            <div key={f.fase}>
              <div style={{ border: `2px solid ${f.color}`, borderRadius: '10px', padding: '16px', background: 'var(--accent-bg)' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <Icon name={f.icon} size={20} style={{ color: f.color }} />
                  <span style={{ background: f.color, color: '#fff', borderRadius: '4px', padding: '2px 10px', fontSize: '12px', fontWeight: 700 }}>{f.fase}</span>
                  <span style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-h)' }}>{f.titulo}</span>
                </div>
                <p style={{ fontSize: '13px', margin: '0 0 10px', color: 'var(--text)' }}>{f.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {(f.acciones || f.disparadores).map((a, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: f.color, fontWeight: 700, flexShrink: 0 }}>→</span>
                      <span style={{ color: 'var(--text)' }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
              {idx < fasesDRP.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
                  <Icon name="arrow_downward" size={20} style={{ color: 'var(--text)', opacity: 0.4 }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">3. Estrategia de Respaldos (Política 3-2-1)</h2>
        <p style={{ fontSize: '14px', marginBottom: '14px' }}>
          Los datos financieros de CrediExpress (PII, créditos y scoring crediticio) se protegen
          bajo la regla internacional <strong>3-2-1</strong>:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
          {[
            { num: '3', label: 'Copias totales', desc: 'Tres copias de cada base de datos: producción, réplica local y respaldo externo.' },
            { num: '2', label: 'Soportes distintos', desc: 'En dos tipos de almacenamiento diferentes: disco local cifrado y bucket S3 en nube.' },
            { num: '1', label: 'Copia off-site', desc: 'Al menos una copia en ubicación física o cuenta cloud completamente aislada del entorno productivo.' },
          ].map(({ num, label, desc }) => (
            <div key={num} style={{ textAlign: 'center', padding: '16px', background: 'var(--accent-bg)', border: '1px solid var(--border)', borderRadius: '10px' }}>
              <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{num}</div>
              <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-h)', margin: '6px 0 4px' }}>{label}</div>
              <div style={{ fontSize: '12px', color: 'var(--text)' }}>{desc}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', padding: '12px', background: 'var(--code-bg)', borderRadius: '8px', borderLeft: '3px solid var(--accent)' }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: '13px', color: 'var(--text-h)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="timer" size={16} style={{ color: 'var(--accent)' }} /> Respaldo incremental
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text)' }}>Cada 1 hora — captura los cambios en transacciones y créditos desde el último respaldo.</p>
          </div>
          <div style={{ flex: 1, minWidth: '200px', padding: '12px', background: 'var(--code-bg)', borderRadius: '8px', borderLeft: '3px solid var(--accent)' }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: '13px', color: 'var(--text-h)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="inventory_2" size={16} style={{ color: 'var(--accent)' }} /> Respaldo completo (Full)
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text)' }}>Cada 24 horas a medianoche — backup cifrado con AES-256 de toda la base de datos financiera.</p>
          </div>
        </div>
      </div>
    </article>
  )
}
