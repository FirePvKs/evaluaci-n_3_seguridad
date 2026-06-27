import Icon from './Icon'

const controles = [
  {
    prioridad: 1,
    nombre: 'Inyección SQL (SQLi)',
    idRiesgo: 'CRIT-01',
    nivel: 'Crítico',
    color: '#c0392b',
    owasp: 'OWASP A03:2021 - Injection',
    nist: 'NIST SP 800-53 (SI-10: Information Input Validation)',
    prevencion: [
      {
        titulo: 'Prohibición de concatenación SQL',
        desc: 'Queda estrictamente prohibido construir consultas SQL mediante concatenación manual de variables de usuario en cualquier módulo del portal financiero de CrediExpress. Esta práctica es la causa raíz directa de la vulnerabilidad explotada.',
      },
      {
        titulo: 'Consultas Parametrizadas obligatorias',
        desc: 'Todo desarrollo nuevo o actualización del portal debe implementar Prepared Statements o un ORM (Prisma o Sequelize). Esto garantiza la separación física entre las instrucciones del motor SQL y los datos introducidos por el cliente, haciendo imposible que un valor de entrada sea interpretado como código.',
        code: [
          '// [X] PROHIBIDO en CrediExpress',
          "const sql = `SELECT rut, nombre, saldo_credito FROM clientes WHERE id_cliente = '${rutCliente}'`;",
          '',
          '// [OK] ESTÁNDAR OBLIGATORIO',
          'const sql = "SELECT saldo, historial FROM clientes WHERE rut = ?";',
          'db.query(sql, [rutCliente]);',
        ],
      },
    ],
    mitigacion: [
      {
        titulo: 'WAF con reglas de inyección actualizadas diariamente',
        desc: "Configurar el Web Application Firewall corporativo para interceptar, alertar y bloquear automáticamente peticiones HTTP con patrones de inyección SQL (estructuras como ' OR 1=1, comentarios SQL --, UNION SELECT). Las reglas deben actualizarse con feeds de amenazas diariamente.",
      },
      {
        titulo: 'Principio de menor privilegio en base de datos',
        desc: 'Modificar el perfil de conexión de la app al servidor de BD de producción. El usuario asignado solo puede ejecutar SELECT, INSERT y UPDATE en las tablas de negocio esenciales. Se eliminan completamente los permisos DROP, ALTER, TRUNCATE y acceso a information_schema.',
      },
    ],
  },
  {
    prioridad: 2,
    nombre: 'Inyección de Comandos',
    idRiesgo: 'CRIT-02',
    nivel: 'Crítico',
    color: '#c0392b',
    owasp: 'OWASP A03:2021 - Injection',
    nist: 'NIST SP 800-53 (SI-16: Memory Protection / Execution Control)',
    prevencion: [
      {
        titulo: 'Prohibición de funciones de ejecución directa en shell',
        desc: 'Se prohíbe el uso de funciones exec(), system() o shell_exec() que pasen input del cliente directamente al intérprete de comandos del SO. Estas funciones son la causa raíz de la vulnerabilidad documentada en la sección 04.',
      },
      {
        titulo: 'Uso de execFile con argumentos separados',
        desc: 'Cualquier utilidad del sistema operativo estrictamente necesaria debe invocarse mediante APIs que pasen los argumentos como arreglo aislado, sin invocar shell. Esto neutraliza completamente el uso de metacaracteres como ;, && o |.',
        code: [
          '// [X] PROHIBIDO — input del cliente al shell',
          'exec(`ping -c 4 ${ipIngresada}`);',
          '',
          '// [OK] ESTÁNDAR OBLIGATORIO — sin invocación de shell',
          "execFile('ping', ['-c', '4', ipIngresada], { shell: false });",
          '// El ";" en ipIngresada es tratado como string, jamás como separador',
        ],
      },
    ],
    mitigacion: [
      {
        titulo: 'Validación estricta con lista blanca (whitelist)',
        desc: 'Implementar en el servidor una expresión regular que rechace inmediatamente cualquier entrada que no cumpla el formato exacto esperado. Si el campo solicita una IP, solo se aceptan caracteres numéricos y puntos bajo el patrón ^([0-9]{1,3}\\.){3}[0-9]{1,3}$.',
      },
      {
        titulo: 'Hardening del proceso del servidor web',
        desc: 'El proceso del servidor web debe correr bajo un usuario dedicado (www-data o nobody) sin privilegios de administración, sin acceso de ejecución en directorios del sistema y sin permisos para invocar binarios críticos como cat, bash, wget o sudo.',
      },
    ],
  },
  {
    prioridad: 3,
    nombre: 'XSS Reflejado',
    idRiesgo: 'ALTO-01',
    nivel: 'Alto',
    color: '#e67e22',
    owasp: 'OWASP A03:2021 - Injection (XSS)',
    nist: 'NIST SP 800-53 (SI-11: Error Handling / Output Sanitization)',
    prevencion: [
      {
        titulo: 'Codificación de salida contextual obligatoria',
        desc: "Todo dato dinámico mostrado en el Portal de Clientes debe pasar por output encoding antes de renderizarse. Los caracteres con significado HTML (<, >, \", ', &) se convierten a entidades seguras, impidiendo al navegador interpretarlos como código.",
      },
      {
        titulo: 'Prohibición de dangerouslySetInnerHTML sin revisión',
        desc: 'En React, el renderizado nativo con {variable} aplica encoding automáticamente. Se prohíbe taxativamente el uso de dangerouslySetInnerHTML salvo autorización explícita tras revisión de seguridad. Para contenido HTML legítimo, usar DOMPurify como sanitizador previo.',
        code: [
          '// [X] PROHIBIDO — inserta HTML sin sanitizar',
          '<div dangerouslySetInnerHTML={{ __html: contenidoCliente }} />',
          '',
          '// [OK] ESTÁNDAR — React codifica automáticamente',
          '<p>Bienvenido, {nombreCliente}</p>',
          '',
          '// [OK] SI SE NECESITA HTML — sanitizar primero con DOMPurify',
          'import DOMPurify from "dompurify";',
          '<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />',
        ],
      },
    ],
    mitigacion: [
      {
        titulo: 'HttpOnly y Secure en todas las cookies de sesión',
        desc: 'Configurar en el servidor el envío obligatorio de los atributos HttpOnly y Secure en todas las cookies de autenticación. HttpOnly impide que scripts inyectados accedan a document.cookie, eliminando el robo de sesión incluso si el XSS logra ejecutarse.',
      },
      {
        titulo: "Content Security Policy (CSP) estricta",
        desc: "Forzar la cabecera HTTP Content-Security-Policy: default-src 'self'; script-src 'self'. Esta política instruye al navegador del cliente a ejecutar únicamente scripts del dominio oficial de CrediExpress, bloqueando cualquier script inline inyectado por un atacante.",
      },
    ],
  },
]

const gobernanza = [
  { id: 'CRIT-01', vuln: 'Inyección SQL',         marco: 'OWASP A03 / NIST SI-10', resp: 'Dev / Administrador de BD',    freq: 'Por commit / Auditoría trimestral',  color: '#c0392b' },
  { id: 'CRIT-02', vuln: 'Inyección de Comandos', marco: 'OWASP A03 / NIST SI-16', resp: 'Infra / DevSecOps',             freq: 'Por despliegue / Escaneo mensual',   color: '#c0392b' },
  { id: 'ALTO-01', vuln: 'XSS Reflejado',         marco: 'OWASP A03 / NIST SI-11', resp: 'Dev Frontend / Diseño Web',     freq: 'Por sprint / Revisión automatizada', color: '#e67e22' },
]

export default function Controles() {
  return (
    <article className="prose-section">
      <h1 className="section-title">Políticas de Prevención y Controles de Mitigación</h1>
      <p className="section-subtitle">Plan de Control de Riesgos — Portal de Clientes CrediExpress</p>

      <div className="card">
        <p style={{ fontSize: '14px' }}>
          Se establece un marco de control estructurado que separa las{' '}
          <strong>Políticas de Prevención</strong> — acciones que eliminan la causa raíz en
          el código fuente — de los <strong>Controles de Mitigación</strong> — salvaguardas
          operativas y perimetrales que reducen la probabilidad e impacto en producción. El
          plan se fundamenta en <strong>OWASP Top 10:2021</strong> y{' '}
          <strong>NIST SP 800-53 Rev. 5</strong>.
        </p>
      </div>

      {controles.map((c) => (
        <div className="card" key={c.idRiesgo}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '4px' }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '50%', background: c.color,
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '15px', flexShrink: 0,
            }}>{c.prioridad}</div>
            <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: 'var(--text-h)' }}>{c.nombre}</h2>
            <span style={{ background: c.color, color: '#fff', borderRadius: '4px', padding: '2px 10px', fontSize: '12px', fontWeight: 700 }}>
              {c.idRiesgo} · {c.nivel}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px', marginTop: '8px' }}>
            <span style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 10px', fontSize: '11px', color: 'var(--text-h)', fontWeight: 600 }}>{c.owasp}</span>
            <span style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 10px', fontSize: '11px', color: 'var(--text-h)', fontWeight: 600 }}>{c.nist}</span>
          </div>

          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-h)', margin: '0 0 10px', borderBottom: '1px solid var(--border)', paddingBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Icon name="shield" size={18} style={{ color: c.color }} />
            Políticas de Prevención (Causa Raíz)
          </h3>
          <ul className="steps-list" style={{ marginBottom: '16px' }}>
            {c.prevencion.map((p, i) => (
              <li key={i}>
                <span className="step-badge">P{i + 1}</span>
                <div>
                  <strong>{p.titulo}:</strong> {p.desc}
                  {p.code && (
                    <div style={{ marginTop: '10px', background: 'var(--code-bg)', borderRadius: '8px', padding: '12px', fontFamily: 'var(--mono)', fontSize: '12px', lineHeight: '1.7' }}>
                      {p.code.map((line, j) => (
                        <div key={j} style={{
                          color: line.startsWith('// [X]') ? 'var(--accent)'
                               : line.startsWith('// [OK]') ? '#27ae60'
                               : line.startsWith('//') ? 'var(--text)'
                               : 'var(--text-h)'
                        }}>{line || '\u00A0'}</div>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-h)', margin: '0 0 10px', borderBottom: '1px solid var(--border)', paddingBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Icon name="lock" size={18} style={{ color: c.color }} />
            Controles de Mitigación (Defensa en Capas)
          </h3>
          <ul className="steps-list">
            {c.mitigacion.map((m, i) => (
              <li key={i}>
                <span className="step-badge">M{i + 1}</span>
                <div><strong>{m.titulo}:</strong> {m.desc}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="card">
        <h2 className="card-title">2. Resumen de Gobernanza de Controles</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--accent-bg)', borderBottom: '2px solid var(--accent)' }}>
                {['ID Riesgo', 'Vulnerabilidad', 'Marco de Referencia', 'Responsable', 'Frecuencia de Revisión'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gobernanza.map((g, i) => (
                <tr key={g.id} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--accent-bg)' }}>
                  <td style={{ padding: '8px 12px' }}>
                    <span style={{ background: g.color, color: '#fff', borderRadius: '4px', padding: '2px 8px', fontWeight: 700, fontSize: '12px' }}>{g.id}</span>
                  </td>
                  <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-h)' }}>{g.vuln}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text)' }}>{g.marco}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text)' }}>{g.resp}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text)' }}>{g.freq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  )
}
