export default function Comandos() {
  return (
    <article className="prose-section">
      <h1 className="section-title">Inyección de Comandos (Command Injection)</h1>
      <p className="section-subtitle">Análisis de Vulnerabilidad — Portal de Clientes CrediExpress</p>

      <div className="card">
        <h2 className="card-title">1. Evidencia del Ataque</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, minWidth: '160px', color: 'var(--text-h)' }}>Formulario afectado:</span>
            <span>Portal de Clientes — Sección "Command Injection"</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, minWidth: '160px', color: 'var(--text-h)' }}>Payload utilizado:</span>
            <code style={{ background: 'var(--code-bg)', padding: '2px 8px', borderRadius: '4px', color: 'var(--accent)' }}>
              127.0.0.1; cat /etc/passwd
            </code>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, minWidth: '160px', color: 'var(--text-h)' }}>Resultado obtenido:</span>
            <span>
              El servidor ejecutó el <code>ping</code> legítimo y, al no validar el carácter
              separador <code>;</code>, ejecutó además <code>cat /etc/passwd</code>, exponiendo
              el listado completo de cuentas del sistema operativo del servidor.
            </span>
          </div>
        </div>
        <img
          src="/img_urbvic/comandos_urbvic.png"
          alt="Evidencia de Inyección de Comandos en DVWA"
          style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border)', marginTop: '8px' }}
        />
        <p style={{ fontSize: '13px', color: 'var(--text)', marginTop: '8px', textAlign: 'center', fontStyle: 'italic' }}>
          Figura 3: Ejecución de comandos arbitrarios en el SO del servidor de CrediExpress.
          Se observa el contenido de <code>/etc/passwd</code> con las cuentas del sistema,
          incluyendo <code>root</code>, <code>mysql</code> y <code>www-data</code>.
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">2. Explicación Técnica — ¿Por qué funciona?</h2>
        <p>
          La aplicación toma la IP ingresada por el usuario y la pasa <strong>directamente</strong> a
          una función del sistema operativo a través de un shell, sin sanitizar los metacaracteres
          de control de Linux. El punto y coma (<code>;</code>) es un separador secuencial de
          instrucciones en bash: le indica al intérprete que ejecute un comando y, al terminar,
          ejecute el siguiente.
        </p>
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ background: 'var(--code-bg)', borderRadius: '8px', padding: '16px', fontFamily: 'var(--mono)', fontSize: '13px', borderLeft: '3px solid #27ae60' }}>
            <div style={{ color: 'var(--text)', marginBottom: '6px', fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 600 }}>ENTRADA NORMAL: 127.0.0.1</div>
            <code>ping -c 4 127.0.0.1</code>
            <div style={{ color: '#27ae60', marginTop: '4px', fontSize: '12px' }}>→ Solo ejecuta el ping al servidor local</div>
          </div>
          <div style={{ background: 'var(--code-bg)', borderRadius: '8px', padding: '16px', fontFamily: 'var(--mono)', fontSize: '13px', borderLeft: '3px solid var(--accent)' }}>
            <div style={{ color: 'var(--text)', marginBottom: '6px', fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 600 }}>ENTRADA MALICIOSA: 127.0.0.1; cat /etc/passwd</div>
            <code>ping -c 4 127.0.0.1; cat /etc/passwd</code>
            <div style={{ color: 'var(--accent)', marginTop: '4px', fontSize: '12px' }}>→ Ejecuta el ping <strong>y además</strong> lee el archivo del sistema</div>
          </div>
        </div>
        <p style={{ marginTop: '12px', fontSize: '14px' }}>
          En un escenario real contra CrediExpress, el atacante no se limitaría a leer
          <code>/etc/passwd</code>. Podría ejecutar comandos como <code>cat /var/www/.env</code>
          para obtener las credenciales de la base de datos de clientes, o instalar un
          <strong> web shell</strong> que le otorgue acceso permanente y remoto al servidor
          que aloja los registros financieros y el motor de scoring crediticio.
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
                ['Attack Vector (AV)', 'Network (N)', 'El formulario vulnerable está expuesto en el portal web de CrediExpress, accesible remotamente desde internet.'],
                ['Attack Complexity (AC)', 'Low (L)', 'No se requieren condiciones especiales; el separador ";" es estándar en cualquier shell de Linux.'],
                ['Privileges Required (PR)', 'Low (L)', 'El atacante necesita una cuenta de cliente activa en el portal para acceder al formulario afectado.'],
                ['User Interaction (UI)', 'None (N)', 'El atacante ejecuta el comando directamente en el servidor sin necesitar que ningún cliente interactúe.'],
                ['Scope (S)', 'Changed (C)', 'El ataque se origina en la aplicación web pero logra comprometer el sistema operativo subyacente, un componente completamente diferente.'],
                ['Confidentiality (C)', 'High (H)', 'Permite leer archivos de configuración con credenciales de BD, claves de APIs de scoring y datos de todos los clientes.'],
                ['Integrity (I)', 'High (H)', 'Permite modificar archivos del sistema, implantar web shells, alterar registros de crédito o eliminar logs de auditoría.'],
                ['Availability (A)', 'High (H)', 'Permite detener el servidor web, eliminar directorios críticos de la aplicación o saturar recursos del sistema.'],
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
          <span style={{ background: 'var(--accent)', color: '#fff', borderRadius: '8px', padding: '6px 16px', fontWeight: 700, fontSize: '18px' }}>9.9 Critical</span>
        </div>
        <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text)', fontFamily: 'var(--mono)' }}>
          Vector: CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">4. Política de Prevención</h2>
        <p>La causa raíz es pasar input del usuario directamente al shell del sistema. La política de CrediExpress debe prohibirlo por completo:</p>
        <ul className="steps-list mt-3">
          <li>
            <span className="step-badge">A</span>
            <div>
              <strong>Eliminar la ejecución directa de comandos del sistema:</strong> Si una función
              necesita validar conectividad de red, debe usarse una librería nativa del lenguaje
              en lugar de invocar el binario <code>ping</code> del SO. Esto elimina
              completamente la superficie de ataque.
              <div style={{ marginTop: '10px', background: 'var(--code-bg)', borderRadius: '8px', padding: '12px', fontFamily: 'var(--mono)', fontSize: '12px' }}>
                <div style={{ color: 'var(--accent)', marginBottom: '4px' }}>{'// [X] VULNERABLE — portal actual de CrediExpress'}</div>
                <div>{"const { exec } = require('child_process');"}</div>
                <div>{"exec(`ping -c 4 ${ipIngresada}`); // el ; divide en 2 comandos"}</div>
                <div style={{ color: '#27ae60', margin: '8px 0 4px' }}>{'// [OK] SEGURO — argumentos separados, sin invocar shell'}</div>
                <div>{"const { execFile } = require('child_process');"}</div>
                <div>{"execFile('ping', ['-c', '4', ipIngresada], { shell: false });"}</div>
                <div style={{ color: 'var(--text)', fontSize: '11px', fontStyle: 'italic', marginTop: '4px' }}>{'// ipIngresada nunca puede convertirse en un segundo comando'}</div>
              </div>
            </div>
          </li>
          <li>
            <span className="step-badge">B</span>
            <div>
              <strong>Validación con lista blanca (whitelist):</strong> Si la entrada debe ser
              una dirección IP, rechazar en el backend cualquier valor que no cumpla el formato
              exacto antes de procesar la solicitud, sin permitir excepciones.
              <div style={{ marginTop: '10px', background: 'var(--code-bg)', borderRadius: '8px', padding: '12px', fontFamily: 'var(--mono)', fontSize: '12px' }}>
                <div style={{ color: '#27ae60', marginBottom: '4px' }}>{'// [OK] Validar formato antes de cualquier procesamiento'}</div>
                <div>{"const ipRegex = /^(\\d{1,3}\\.){3}\\d{1,3}$/;"}</div>
                <div>{"if (!ipRegex.test(ipIngresada)) {"}</div>
                <div>{"  return res.status(400).json({ error: 'IP inválida' });"}</div>
                <div>{"}"}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">5. Controles de Mitigación</h2>
        <p style={{ marginBottom: '12px', fontSize: '14px' }}>
          Controles de defensa en profundidad basados en <strong>OWASP Top 10:2021 (A03 - Injection)</strong> y <strong>CIS Controls v8 (Control 4 - Privileged Access)</strong>:
        </p>
        <ul className="steps-list">
          <li>
            <span className="step-badge">1</span>
            <div>
              <strong>Principio de menor privilegio a nivel de SO:</strong> El proceso del
              servidor web (<code>www-data</code>) debe ejecutarse con una cuenta sin privilegios
              de superusuario. Así, aunque el atacante logre inyectar un comando, no podrá
              acceder a directorios del sistema ni instalar software malicioso.
            </div>
          </li>
          <li>
            <span className="step-badge">2</span>
            <div>
              <strong>Containerización con filesystem de solo lectura:</strong> Ejecutar la
              aplicación dentro de un contenedor Docker configurado como <code>read-only</code>.
              Esto limita el daño potencial impidiendo que el atacante escriba archivos en el
              servidor aunque logre ejecutar comandos.
            </div>
          </li>
          <li>
            <span className="step-badge">3</span>
            <div>
              <strong>Monitoreo de ejecución de procesos (SIEM):</strong> Implementar alertas
              en tiempo real que detecten cuando el proceso del servidor web genera procesos
              hijos inusuales como <code>cat</code>, <code>bash</code> o <code>wget</code>,
              permitiendo respuesta inmediata ante un intento de explotación.
            </div>
          </li>
        </ul>
      </div>
    </article>
  )
}