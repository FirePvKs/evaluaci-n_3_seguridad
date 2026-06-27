export default function InyeccionSQL() {
  return (
    <article className="prose-section">
      <h1 className="section-title">Inyección SQL (SQLi)</h1>
      <p className="section-subtitle">Análisis de Vulnerabilidad — Portal de Clientes CrediExpress</p>

      <div className="card">
        <h2 className="card-title">1. Evidencia del Ataque</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, minWidth: '160px', color: 'var(--text-h)' }}>Formulario afectado:</span>
            <span>Portal de Clientes — Sección "SQL Injection"</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, minWidth: '160px', color: 'var(--text-h)' }}>Payload utilizado:</span>
            <code style={{ background: 'var(--code-bg)', padding: '2px 8px', borderRadius: '4px', color: 'var(--accent)' }}>
              ' OR '1'='1
            </code>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, minWidth: '160px', color: 'var(--text-h)' }}>Resultado obtenido:</span>
            <span>Extracción completa de todos los usuarios de la base de datos sin autenticación adicional.</span>
          </div>
        </div>
        <img
          src="/img_urbvic/sqli_urbvic.png"
          alt="Evidencia de Inyección SQL en DVWA"
          style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border)', marginTop: '8px' }}
        />
        <p style={{ fontSize: '13px', color: 'var(--text)', marginTop: '8px', textAlign: 'center', fontStyle: 'italic' }}>
          Figura 1: Extracción masiva de datos de clientes en el entorno controlado de CrediExpress usando el payload <code>' OR '1'='1</code>.
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">2. Explicación Técnica — ¿Por qué funciona?</h2>
        <p>
          La vulnerabilidad existe porque el portal concatena directamente la entrada del usuario
          dentro de la cadena de la consulta SQL, sin validación, sanitización ni parametrización previa.
        </p>
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ background: 'var(--code-bg)', borderRadius: '8px', padding: '16px', fontFamily: 'var(--mono)', fontSize: '13px', borderLeft: '3px solid #27ae60' }}>
            <div style={{ color: 'var(--text)', marginBottom: '4px', fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 600 }}>ENTRADA NORMAL: 1</div>
            <code>SELECT first_name, last_name FROM users WHERE user_id = '1';</code>
            <div style={{ color: '#27ae60', marginTop: '4px', fontSize: '12px' }}>→ Devuelve solo el usuario 1</div>
          </div>
          <div style={{ background: 'var(--code-bg)', borderRadius: '8px', padding: '16px', fontFamily: 'var(--mono)', fontSize: '13px', borderLeft: '3px solid var(--accent)' }}>
            <div style={{ color: 'var(--text)', marginBottom: '4px', fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 600 }}>ENTRADA MALICIOSA: ' OR '1'='1</div>
            <code>SELECT first_name, last_name FROM users WHERE user_id = '' OR '1'='1';</code>
            <div style={{ color: 'var(--accent)', marginTop: '4px', fontSize: '12px' }}>→ '1'='1' siempre es verdadero → devuelve TODOS los registros</div>
          </div>
        </div>
        <p style={{ marginTop: '12px', fontSize: '14px' }}>
          La comilla <code>'</code> cierra el parámetro y <code>OR '1'='1'</code> añade una condición siempre verdadera.
          El motor SQL invalida la restricción WHERE y devuelve la totalidad de la base de datos de clientes financieros.
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">3. Clasificación CVSS v3.1</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--accent-bg)', borderBottom: '2px solid var(--accent)' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Métrica</th>
                <th style={{ textAlign: 'center', padding: '8px 12px', fontWeight: 600 }}>Valor</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Justificación</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Attack Vector (AV)', 'Network (N)', 'Explotable de forma remota vía internet sin acceso físico.'],
                ['Attack Complexity (AC)', 'Low (L)', 'No requiere condiciones especiales; el payload es simple.'],
                ['Privileges Required (PR)', 'None (N)', 'Accesible por cualquier visitante del portal sin credenciales.'],
                ['User Interaction (UI)', 'None (N)', 'No requiere intervención de terceros para ejecutarse.'],
                ['Scope (S)', 'Unchanged (U)', 'El impacto permanece dentro del entorno de la base de datos.'],
                ['Confidentiality (C)', 'High (H)', 'Expone masivamente RUTs, datos de contacto y scoring crediticio.'],
                ['Integrity (I)', 'High (H)', 'Permite manipulación o borrado de registros de crédito.'],
                ['Availability (A)', 'Low (L)', 'Puede causar degradación de rendimiento en extracción masiva.'],
              ].map(([metric, value, justif], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--accent-bg)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 500 }}>{metric}</td>
                  <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                    <span style={{ background: 'var(--accent-bg)', color: 'var(--accent)', borderRadius: '4px', padding: '2px 8px', fontWeight: 600, fontSize: '12px' }}>{value}</span>
                  </td>
                  <td style={{ padding: '8px 12px', color: 'var(--text)' }}>{justif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '16px', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, color: 'var(--text-h)' }}>Puntaje Base CVSS v3.1</span>
          <span style={{ background: 'var(--accent)', color: '#fff', borderRadius: '8px', padding: '6px 16px', fontWeight: 700, fontSize: '18px' }}>9.4 Critical</span>
        </div>
        <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text)', fontFamily: 'var(--mono)' }}>
          Vector: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:L
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">4. Política de Prevención</h2>
        <p>Erradicar la causa raíz requiere prohibir la concatenación directa de variables en cadenas SQL e implementar obligatoriamente:</p>
        <ul className="steps-list mt-3">
          <li>
            <span className="step-badge">A</span>
            <div>
              <strong>Consultas Parametrizadas (Prepared Statements):</strong> La base de datos recibe primero la instrucción con marcadores <code>?</code> y después el dato, tratándolo siempre como valor, nunca como código ejecutable.
              <div style={{ marginTop: '10px', background: 'var(--code-bg)', borderRadius: '8px', padding: '12px', fontFamily: 'var(--mono)', fontSize: '12px' }}>
                <div style={{ color: 'var(--accent)', marginBottom: '6px' }}>{'// [X] VULNERABLE — portal actual de CrediExpress'}</div>
                <div>{`const sql = \`SELECT rut, nombre, saldo_credito FROM clientes WHERE id_cliente = '\${inputUsuario}'\`;`}</div>
                <div style={{ color: 'var(--text)', fontSize: '11px', margin: '2px 0 6px', fontStyle: 'italic' }}>{'// Si inputUsuario = \' OR \'1\'=\'1 → filtra a TODOS los clientes'}</div>
                <div style={{ color: '#27ae60', margin: '8px 0 4px' }}>{'// [OK] SEGURO — consulta parametrizada'}</div>
                <div>{'const sql = "SELECT rut, nombre, saldo_credito FROM clientes WHERE id_cliente = ?";'}</div>
                <div>{'db.query(sql, [inputUsuario]); // inputUsuario nunca se interpreta como SQL'}</div>
              </div>
            </div>
          </li>
          <li>
            <span className="step-badge">B</span>
            <div>
              <strong>ORM (Object-Relational Mapping):</strong> Implementar herramientas como Prisma o Sequelize que parametrizan las consultas de forma nativa y por defecto, eliminando el riesgo por diseño.
            </div>
          </li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">5. Controles de Mitigación</h2>
        <p style={{ marginBottom: '12px', fontSize: '14px' }}>
          Controles complementarios basados en <strong>OWASP Top 10:2021 (A03 - Injection)</strong> y <strong>NIST SP 800-53 (SI-10)</strong>:
        </p>
        <ul className="steps-list">
          <li>
            <span className="step-badge">1</span>
            <div>
              <strong>Principio de Menor Privilegio en BD:</strong> El usuario de conexión de la app debe tener únicamente permisos <code>SELECT</code>, <code>INSERT</code> y <code>UPDATE</code> en tablas específicas, eliminando acceso a <code>DROP</code>, <code>ALTER</code> e <code>information_schema</code>.
            </div>
          </li>
          <li>
            <span className="step-badge">2</span>
            <div>
              <strong>Web Application Firewall (WAF):</strong> Desplegar reglas para detectar y bloquear patrones de inyección SQL en las peticiones HTTP entrantes antes de llegar al servidor de aplicaciones.
            </div>
          </li>
          <li>
            <span className="step-badge">3</span>
            <div>
              <strong>Validación de tipo de entrada:</strong> Forzar que el parámetro sea estrictamente del tipo de dato esperado (ej. entero para IDs) antes de procesarlo en la consulta.
            </div>
          </li>
        </ul>
      </div>
    </article>
  )
}