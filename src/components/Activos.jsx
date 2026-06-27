const CIA = ({ c, i, a }) => (
  <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
    {[['C', c], ['I', i], ['A', a]].map(([label, nivel]) => {
      const color = nivel === 'Crítica (Alta)' ? 'var(--accent)' : nivel === 'Alta' ? '#e67e22' : '#7f8c8d'
      return (
        <span key={label} style={{
          background: 'var(--code-bg)', border: `1px solid ${color}`,
          borderRadius: '4px', padding: '2px 8px', fontSize: '12px',
          color, fontWeight: 600
        }}>
          {label}: {nivel}
        </span>
      )
    })}
  </div>
)

const activos = [
  {
    id: 1,
    nombre: 'Base de Datos de Clientes y PII',
    descripcion: 'Contiene los registros de identidad de todos los clientes de CrediExpress: RUT, nombres completos, correos electrónicos, teléfonos, domicilios y contraseñas cifradas.',
    vinculo: 'Es el núcleo de autenticación de la plataforma. Sin estos datos, CrediExpress no puede validar la identidad de quienes solicitan ni gestionan créditos, paralizando toda operación financiera.',
    c: 'Crítica (Alta)', i: 'Crítica (Alta)', a: 'Alta',
  },
  {
    id: 2,
    nombre: 'Historial Financiero y Registro de Créditos',
    descripcion: 'Tablas que almacenan los estados de cuenta, montos otorgados, número de cuotas, saldos pendientes y el comportamiento de pago histórico de cada cliente.',
    vinculo: 'Representa el patrimonio contable de CrediExpress y el estado contractual de las deudas vigentes. Su alteración tendría consecuencias legales directas para la financiera.',
    c: 'Crítica (Alta)', i: 'Crítica (Alta)', a: 'Alta',
  },
  {
    id: 3,
    nombre: 'Motor y Resultados de Scoring Crediticio',
    descripcion: 'Algoritmos internos y puntajes asignados a cada cliente que determinan automáticamente su nivel de riesgo crediticio y capacidad de endeudamiento.',
    vinculo: 'Es la ventaja competitiva de CrediExpress. Su exposición permitiría a competidores replicar el modelo de riesgo; su alteración induciría decisiones crediticias erróneas aumentando la tasa de morosidad.',
    c: 'Alta', i: 'Crítica (Alta)', a: 'Media',
  },
  {
    id: 4,
    nombre: 'Servidor de Aplicaciones y Sistema de Archivos',
    descripcion: 'Infraestructura lógica del portal: sistema operativo del servidor, código fuente (React/Node.js) y archivos de configuración con credenciales de conexión a las bases de datos.',
    vinculo: 'Es la plataforma que expone el servicio al cliente a través de internet. Su compromiso implica el acceso indirecto a todos los demás activos, ya que el servidor tiene acceso directo a las bases de datos.',
    c: 'Alta', i: 'Alta', a: 'Crítica (Alta)',
  },
  {
    id: 5,
    nombre: 'Tokens de Sesión y Cookies de Autenticación',
    descripcion: 'Identificadores temporales generados en memoria y almacenados en el navegador del cliente para mantener la sesión activa sin requerir reautenticación constante.',
    vinculo: 'Son el mecanismo de control de acceso inmediato que garantiza que un cliente solo visualice sus propios datos financieros. Su robo permite suplantar la identidad del titular sin necesitar su contraseña.',
    c: 'Crítica (Alta)', i: 'Alta', a: 'Media',
  },
]

const impactos = [
  {
    letra: 'A',
    vuln: 'Inyección SQL (SQLi)',
    score: '9.4 Critical',
    color: 'var(--accent)',
    afectados: 'Activos 1, 2 y 3',
    analisis: 'Al anular la restricción lógica de las consultas, el atacante puede extraer la base de datos completa de clientes, comprometiendo la Confidencialidad absoluta de la PII, los saldos de créditos y los modelos de scoring. Esto expone a CrediExpress a multas regulatorias bajo la Ley 19.628 y pérdida de confianza operacional.',
  },
  {
    letra: 'B',
    vuln: 'XSS Reflejado',
    score: '6.1 Medium',
    color: '#e67e22',
    afectados: 'Activos 5 y 1',
    analisis: 'El script ejecutado en el navegador de la víctima puede secuestrar el token de sesión del cliente (Activo 5) si carece de protección HttpOnly. Con ese token el atacante suplanta la identidad del titular y accede a sus datos financieros (Activo 1) de forma completamente ilegítima.',
  },
  {
    letra: 'C',
    vuln: 'Inyección de Comandos',
    score: '9.9 Critical',
    color: 'var(--accent)',
    afectados: 'Activo 4 y por extensión Activos 1, 2, 3 y 5',
    analisis: 'Es el hallazgo de mayor espectro. Al comprometer el SO del servidor (Activo 4), el atacante puede leer los archivos .env con credenciales de BD, instalar un web shell para acceso permanente y destruir o secuestrar todos los demás activos. Una vulnerabilidad de este tipo en una casa de crédito implica el riesgo de interrupción total del servicio.',
  },
]

export default function Activos() {
  return (
    <article className="prose-section">
      <h1 className="section-title">Activos de Información</h1>
      <p className="section-subtitle">Inventario y Análisis de Riesgos — Portal de Clientes CrediExpress</p>

      <div className="card">
        <h2 className="card-title">1. Identificación y Clasificación de Activos</h2>
        <p style={{ marginBottom: '16px', fontSize: '14px' }}>
          Se identificaron <strong>cinco activos de información críticos</strong> para la operación
          del Portal de Clientes. Cada activo se clasifica bajo los tres pilares de la seguridad
          de la información: <strong>Confidencialidad (C)</strong>, <strong>Integridad (I)</strong>{' '}
          y <strong>Disponibilidad (A)</strong>, con niveles Media, Alta y Crítica (Alta).
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activos.map((a) => (
            <div key={a.id} style={{
              border: '1px solid var(--border)', borderRadius: '10px',
              padding: '16px', background: 'var(--accent-bg)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{
                  background: 'var(--accent)', color: '#fff', borderRadius: '50%',
                  width: '28px', height: '28px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: 700, fontSize: '13px', flexShrink: 0
                }}>{a.id}</span>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-h)' }}>{a.nombre}</h3>
              </div>
              <p style={{ fontSize: '13px', margin: '0 0 6px', color: 'var(--text)' }}>
                <strong>Descripción:</strong> {a.descripcion}
              </p>
              <p style={{ fontSize: '13px', margin: '0 0 8px', color: 'var(--text)' }}>
                <strong>Vínculo con el rubro:</strong> {a.vinculo}
              </p>
              <CIA c={a.c} i={a.i} a={a.a} />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">2. Asociación de Vulnerabilidades a los Activos en Riesgo</h2>
        <p style={{ marginBottom: '16px', fontSize: '14px' }}>
          Cada vulnerabilidad descubierta en la auditoría tiene un impacto directo y medible
          sobre activos específicos del negocio de CrediExpress. Esta asociación es clave para
          priorizar la remediación según el valor del activo comprometido.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {impactos.map((imp) => (
            <div key={imp.letra} style={{
              border: `1px solid ${imp.color}`,
              borderLeft: `4px solid ${imp.color}`,
              borderRadius: '8px', padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-h)' }}>
                  {imp.letra}. {imp.vuln}
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    background: imp.color, color: '#fff',
                    borderRadius: '4px', padding: '2px 10px',
                    fontSize: '12px', fontWeight: 700
                  }}>{imp.score}</span>
                  <span style={{
                    background: 'var(--code-bg)', color: 'var(--text-h)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px', padding: '2px 10px', fontSize: '12px', fontWeight: 600
                  }}>{imp.afectados}</span>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text)', lineHeight: '1.6' }}>
                {imp.analisis}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}