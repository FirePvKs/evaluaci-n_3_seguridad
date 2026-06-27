const PROB_LABELS = ['Muy Baja', 'Baja', 'Media', 'Alta', 'Muy Alta']
const IMP_LABELS  = ['Muy Bajo', 'Bajo', 'Moderado', 'Mayor', 'Catastrófico']

const getColor = (score) => {
  if (score >= 15) return { bg: '#c0392b', text: '#fff', label: 'Crítico'  }
  if (score >= 10) return { bg: '#e67e22', text: '#fff', label: 'Alto'     }
  if (score >= 5)  return { bg: '#f1c40f', text: '#1a1a2e', label: 'Medio' }
  return               { bg: '#27ae60', text: '#fff', label: 'Bajo'        }
}

// Vulnerabilities: { prob (1-5), imp (1-5), label, badge }
const vulns = [
  { prob: 4, imp: 5, label: 'SQLi',  fullname: 'Inyección SQL'         },
  { prob: 3, imp: 5, label: 'CMD',   fullname: 'Inyección de Comandos' },
  { prob: 4, imp: 3, label: 'XSS',   fullname: 'XSS Reflejado'         },
]

function getVuln(p, i) {
  return vulns.filter(v => v.prob === p && v.imp === i)
}

export default function Matriz() {
  return (
    <article className="prose-section">
      <h1 className="section-title">Matriz de Riesgo</h1>
      <p className="section-subtitle">Mapa de Calor y Priorización — Portal de Clientes CrediExpress</p>

      {/* Criterios */}
      <div className="card">
        <h2 className="card-title">1. Criterios de Evaluación</h2>
        <p style={{ fontSize: '14px', marginBottom: '14px' }}>
          Se establece una escala del <strong>1 al 5</strong> para Probabilidad e Impacto de
          Negocio. El nivel de riesgo final se calcula como:{' '}
          <strong>Riesgo = Probabilidad × Impacto</strong>.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px', color: 'var(--text-h)' }}>Escala de Probabilidad</p>
            {[
              ['5 — Muy Alta', 'Explotación automatizada e inminente si se descubre.'],
              ['4 — Alta',     'Fácilmente explotable sin barreras perimetrales.'],
              ['3 — Media',    'Descubrible con herramientas estándar de escaneo.'],
              ['2 — Baja',     'Requiere alto esfuerzo o ingeniería social dirigida.'],
              ['1 — Muy Baja', 'Requiere condiciones extremadamente raras.'],
            ].map(([lvl, desc]) => (
              <div key={lvl} style={{ display: 'flex', gap: '8px', fontSize: '12px', marginBottom: '5px' }}>
                <span style={{ fontWeight: 600, minWidth: '90px', color: 'var(--text-h)' }}>{lvl}</span>
                <span style={{ color: 'var(--text)' }}>{desc}</span>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px', color: 'var(--text-h)' }}>Escala de Impacto (Negocio)</p>
            {[
              ['5 — Catastrófico', 'Compromiso total de infraestructura y datos financieros.'],
              ['4 — Mayor',        'Exposición masiva de PII o alteración de registros crediticios.'],
              ['3 — Moderado',     'Exposición parcial o interrupción breve del portal.'],
              ['2 — Bajo',         'Pérdidas financieras marginales y recuperables.'],
              ['1 — Muy Bajo',     'Sin impacto financiero ni exposición de datos.'],
            ].map(([lvl, desc]) => (
              <div key={lvl} style={{ display: 'flex', gap: '8px', fontSize: '12px', marginBottom: '5px' }}>
                <span style={{ fontWeight: 600, minWidth: '100px', color: 'var(--text-h)' }}>{lvl}</span>
                <span style={{ color: 'var(--text)' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heat map */}
      <div className="card">
        <h2 className="card-title">2. Mapa de Calor — Matriz de Riesgo</h2>

        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: '520px' }}>
            {/* Impacto header */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', paddingLeft: '110px' }}>
              <div style={{ flex: 1, textAlign: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--text-h)', letterSpacing: '0.05em' }}>
                IMPACTO →
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '110px', marginBottom: '4px' }}>
              {IMP_LABELS.map((lbl, idx) => (
                <div key={idx} style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: 'var(--text)', fontWeight: 600 }}>
                  {idx + 1}<br />{lbl}
                </div>
              ))}
            </div>

            {/* Rows P=5 down to P=1 */}
            {[5,4,3,2,1].map((p) => (
              <div key={p} style={{ display: 'flex', alignItems: 'stretch', marginBottom: '3px' }}>
                {/* Prob label */}
                <div style={{
                  width: '110px', flexShrink: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'flex-end', justifyContent: 'center',
                  paddingRight: '10px', fontSize: '11px', color: 'var(--text)', fontWeight: 600,
                  textAlign: 'right', lineHeight: '1.3'
                }}>
                  {p} — {PROB_LABELS[p - 1]}
                </div>

                {/* Cells */}
                {[1,2,3,4,5].map((i) => {
                  const score = p * i
                  const col   = getColor(score)
                  const here  = getVuln(p, i)
                  return (
                    <div key={i} style={{
                      flex: 1, minHeight: '64px', background: col.bg, color: col.text,
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', borderRadius: '4px', margin: '0 2px',
                      fontSize: '13px', fontWeight: 700, position: 'relative',
                      boxShadow: here.length ? '0 0 0 2px #fff, 0 0 0 4px var(--accent)' : 'none',
                      transition: 'transform 0.1s',
                    }}>
                      <span>{score}</span>
                      {here.map(v => (
                        <span key={v.label} style={{
                          fontSize: '10px', fontWeight: 800, marginTop: '2px',
                          background: 'rgba(0,0,0,0.25)', borderRadius: '3px',
                          padding: '1px 5px', letterSpacing: '0.03em'
                        }}>
                          {v.label}
                        </span>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}

            {/* Leyenda */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { range: '1–4',   ...getColor(2)  },
                { range: '5–9',   ...getColor(7)  },
                { range: '10–14', ...getColor(12) },
                { range: '15–25', ...getColor(20) },
              ].map(({ range, bg, text, label }) => (
                <div key={range} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                  <div style={{ width: '14px', height: '14px', background: bg, borderRadius: '3px' }} />
                  <span style={{ color: 'var(--text-h)', fontWeight: 600 }}>{label}</span>
                  <span style={{ color: 'var(--text)' }}>({range})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabla justificación */}
      <div className="card">
        <h2 className="card-title">3. Justificación de Puntuación por Vulnerabilidad</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            {
              name: 'Inyección SQL', prob: 4, imp: 5, risk: 20, color: '#c0392b',
              probJust: 'Alta (4) — El formulario no realiza ninguna parametrización, por lo que cualquier escáner web automático (SQLMap, Burp Suite) lo detecta en segundos sin conocimientos especializados.',
              impJust:  'Catastrófico (5) — La explotación con un payload simple extrae la base de datos completa de clientes, incluyendo RUT, saldos, historial crediticio y scoring. Implica multas máximas bajo la Ley 19.628 y pérdida irreversible de confianza regulatoria.',
            },
            {
              name: 'Inyección de Comandos', prob: 3, imp: 5, risk: 15, color: '#c0392b',
              probJust: 'Media (3) — Aunque sin validaciones, la explotación requiere mapear los comandos disponibles en el sistema operativo subyacente y el contexto de ejecución del proceso web.',
              impJust:  'Catastrófico (5) — El acceso directo al SO del servidor permite leer archivos .env con credenciales de BD, instalar web shells persistentes, destruir logs de auditoría o derribar el portal completo, afectando la Confidencialidad, Integridad y Disponibilidad simultáneamente.',
            },
            {
              name: 'XSS Reflejado', prob: 4, imp: 3, risk: 12, color: '#e67e22',
              probJust: 'Alta (4) — El reflejo de etiquetas <script> es inmediato y visible en la URL de respuesta. Cualquier cliente técnico puede construir el enlace malicioso sin herramientas especializadas.',
              impJust:  'Moderado (3) — El daño inicial está acotado al secuestro de la sesión del cliente individual engañado. Requiere un vector complementario de phishing para materializarse, lo que reduce su impacto sistémico comparado con las otras dos vulnerabilidades.',
            },
          ].map(({ name, prob, imp, risk, color, probJust, impJust }) => (
            <div key={name} style={{ border: `1px solid ${color}`, borderLeft: `4px solid ${color}`, borderRadius: '8px', padding: '14px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-h)' }}>{name}</span>
                <span style={{ background: color, color: '#fff', borderRadius: '4px', padding: '2px 10px', fontSize: '12px', fontWeight: 700 }}>
                  Riesgo: {risk}
                </span>
                <span style={{ background: 'var(--code-bg)', color: 'var(--text-h)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 10px', fontSize: '12px' }}>
                  P={prob} × I={imp}
                </span>
              </div>
              <p style={{ fontSize: '13px', margin: '0 0 6px' }}>
                <strong>Probabilidad:</strong> {probJust}
              </p>
              <p style={{ fontSize: '13px', margin: 0 }}>
                <strong>Impacto:</strong> {impJust}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Priorización */}
      <div className="card">
        <h2 className="card-title">4. Priorización de Vulnerabilidades</h2>
        <p style={{ fontSize: '14px', marginBottom: '14px' }}>
          La prioridad de remediación combina el <strong>riesgo de negocio</strong> de la
          matriz con el <strong>puntaje técnico CVSS v3.1</strong>. Ambas métricas deben
          alinearse para que la decisión de atención sea objetiva y auditable.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            {
              orden: 1, name: 'Inyección SQL', riesgo: 20, cvss: '9.4 Critical',
              cvssColor: '#c0392b', riesgoColor: '#c0392b',
              just: 'Mayor puntaje de riesgo de negocio combinado. No requiere interacción de terceros y permite de inmediato el robo de la base de datos financiera central. Debe repararse antes que cualquier otra vulnerabilidad.',
            },
            {
              orden: 2, name: 'Inyección de Comandos', riesgo: 15, cvss: '9.9 Critical',
              cvssColor: '#c0392b', riesgoColor: '#c0392b',
              just: 'Máxima severidad técnica CVSS. Su probabilidad de negocio es marginalmente menor que SQLi, pero su capacidad de destruir la disponibilidad total del servicio y comprometer todos los demás activos la sitúa en segundo lugar inmediato.',
            },
            {
              orden: 3, name: 'XSS Reflejado', riesgo: 12, cvss: '6.1 Medium',
              cvssColor: '#e67e22', riesgoColor: '#e67e22',
              just: 'Pese a ser muy probable, el impacto sistémico está acotado. Requiere un vector de phishing complementario para materializarse. Se atiende tras corregir las dos vulnerabilidades de acceso directo a datos.',
            },
          ].map(({ orden, name, riesgo, cvss, cvssColor, riesgoColor, just }) => (
            <div key={orden} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', background: riesgoColor,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: '16px', flexShrink: 0
              }}>{orden}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-h)' }}>{name}</span>
                  <span style={{ background: riesgoColor, color: '#fff', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 700 }}>
                    Riesgo: {riesgo}
                  </span>
                  <span style={{ background: cvssColor, color: '#fff', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 700 }}>
                    CVSS: {cvss}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text)' }}>{just}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}