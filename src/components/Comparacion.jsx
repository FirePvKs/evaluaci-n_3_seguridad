import Icon from './Icon'

const marcos = [
  {
    ley: 'Ley N° 21.663',
    subtitulo: 'Ley Marco de Ciberseguridad / ANCI',
    industria: 'Transversal a Infraestructura Crítica (Telecomunicaciones, Energía, Salud, Banca, etc. calificados como de Importancia Vital).',
    reporte: 'Obligatorio e inmediato. Plazo máximo de 3 horas desde la detección del incidente con efectos significativos. Se reporta directamente al CSIRT Nacional (bajo la Agencia Nacional de Ciberseguridad).',
    estandares: 'Implementación de un Sistema de Gestión de Seguridad de la Información (SGSI) continuo, planes de continuidad operacional, auditorías periódicas y análisis de riesgo según directrices de la ANCI.',
    sanciones: 'Multas administrativas gravísimas: Hasta 40.000 UTM para Operadores de Importancia Vital (OIV) que no reporten o no apliquen las medidas de mitigación ordenadas.',
    color: 'marco-red',
    plazo: '3 horas',
  },
  {
    ley: 'Ley N° 19.628',
    subtitulo: 'Protección de la Vida Privada / Agencia de Protección de Datos',
    industria: 'Multisectorial (Cualquier entidad pública o privada que realice tratamiento de datos personales).',
    reporte: 'Notificación de Brechas de Seguridad. Se debe informar a la autoridad de control y a los titulares afectados a la brevedad posible ante incidentes que comprometan la confidencialidad de datos personales.',
    estandares: 'Principios de seguridad por defecto y confidencialidad. Exige medidas técnicas y organizativas proporcionales al riesgo del tratamiento (cifrado, control de accesos, trazabilidad).',
    sanciones: 'Multas económicas severas: Las reformas vigentes homologan las sanciones a estándares internacionales (proporcionales a los ingresos de la empresa) por infracciones graves en el deber de seguridad.',
    color: 'marco-blue',
    plazo: 'A la brevedad',
  },
  {
    ley: 'RAN — CMF',
    subtitulo: 'Recopilación Actualizada de Normas / Comisión para el Mercado Financiero',
    industria: 'Industria Financiera y Bancaria (Bancos, instituciones financieras, pasarelas de pago que usen plataformas como GitHub para su CI/CD).',
    reporte: 'Reporte de Incidentes Operacionales Críticos. Plazo máximo de 30 minutos (Alerta Temprana) vía sistema SEIL de la CMF si el incidente afecta canales, datos financieros o la continuidad del negocio.',
    estandares: 'Cumplimiento estricto de la Gestión de Riesgo Operacional y Ciberseguridad. Exige pruebas de intrusión (pentesting), gestión estricta de vulnerabilidades y control de proveedores tecnológicos (Third-Party Risk).',
    sanciones: 'Sanciones institucionales y monetarias: Multas que pueden alcanzar hasta el 30% de la entidad patrimonial o sumas millonarias en UF, además de amonestaciones y restricciones operativas.',
    color: 'marco-green',
    plazo: '30 minutos',
  },
]

const ejes = [
  { key: 'reporte',    label: 'Eje 1: Obligación de Reporte',          icon: 'schedule' },
  { key: 'estandares', label: 'Eje 2: Estándares Técnicos Exigidos',   icon: 'lock' },
  { key: 'sanciones',  label: 'Eje 3: Régimen de Sanciones y Multas',  icon: 'gavel' },
]

export default function Comparacion() {
  return (
    <article className="prose-section">
      <h1 className="section-title">Comparación de Marcos Regulatorios</h1>
      <p className="section-subtitle">Análisis comparativo por industria — 3 marcos × 3 ejes</p>

      <div className="card mb-6">
        <h2 className="card-title">Plazos de Reporte — Resumen Rápido</h2>
        <div className="plazo-grid">
          {marcos.map((m, i) => (
            <div key={i} className={`plazo-box ${m.color}`}>
              <div className="plazo-time">{m.plazo}</div>
              <div className="plazo-ley">{m.ley}</div>
              <div className="plazo-desc">{m.subtitulo}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="card-title">Tabla Comparativa Completa</h2>
        <div className="overflow-x-auto">
          <table className="comparacion-table">
            <thead>
              <tr>
                <th>Marco / Ley</th>
                <th>Industria / Ámbito</th>
                <th><Icon name="schedule" className="th-icon" /> Reporte</th>
                <th><Icon name="lock" className="th-icon" /> Estándares</th>
                <th><Icon name="gavel" className="th-icon" /> Sanciones</th>
              </tr>
            </thead>
            <tbody>
              {marcos.map((m, i) => (
                <tr key={i}>
                  <td><strong>{m.ley}</strong><br /><small>{m.subtitulo}</small></td>
                  <td>{m.industria}</td>
                  <td>{m.reporte}</td>
                  <td>{m.estandares}</td>
                  <td>{m.sanciones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="marcos-detail">
        {marcos.map((m, i) => (
          <div key={i} className={`marco-detail-card ${m.color}-light`}>
            <div className={`marco-detail-header ${m.color}`}>
              <h3>{m.ley}</h3>
              <span>{m.subtitulo}</span>
            </div>
            <div className="marco-detail-body">
              <p className="marco-industria">{m.industria}</p>
              {ejes.map((eje) => (
                <div key={eje.key} className="eje-item">
                  <Icon name={eje.icon} className="eje-icon" />
                  <div>
                    <p className="eje-label">{eje.label}</p>
                    <p>{m[eje.key]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
