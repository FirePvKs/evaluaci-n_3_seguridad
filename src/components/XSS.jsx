export default function XSS() {
  return (
    <article className="prose-section">
      <h1 className="section-title">XSS Reflejado (Cross-Site Scripting)</h1>
      <p className="section-subtitle">Análisis de Vulnerabilidad — Portal de Clientes CrediExpress</p>

      <div className="card">
        <h2 className="card-title">1. Evidencia del Ataque</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, minWidth: '160px', color: 'var(--text-h)' }}>Formulario afectado:</span>
            <span>Portal de Clientes — Sección "XSS (Reflected)"</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, minWidth: '160px', color: 'var(--text-h)' }}>Payload utilizado:</span>
            <code style={{ background: 'var(--code-bg)', padding: '2px 8px', borderRadius: '4px', color: 'var(--accent)', wordBreak: 'break-all' }}>
              {'<script>alert(\'XSS\')</script>'}
            </code>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
            <span style={{ fontWeight: 600, minWidth: '160px', color: 'var(--text-h)' }}>Resultado obtenido:</span>
            <span>El portal reflejó el payload sin sanitizar en la respuesta HTTP. El navegador de la víctima interpretó las etiquetas HTML y ejecutó el JavaScript, desplegando una ventana emergente de alerta.</span>
          </div>
        </div>
        <img
          src="/img_urbvic/xss_urbvic.png"
          alt="Evidencia de XSS Reflejado en DVWA"
          style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border)', marginTop: '8px' }}
        />
        <p style={{ fontSize: '13px', color: 'var(--text)', marginTop: '8px', textAlign: 'center', fontStyle: 'italic' }}>
          Figura 2: Ejecución exitosa de JavaScript arbitrario en el navegador de la víctima en el Portal de CrediExpress. El popup muestra que el código inyectado corrió bajo el contexto de seguridad de la sesión activa del cliente.
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">2. Explicación Técnica — ¿Por qué funciona?</h2>
        <p>
          El portal de CrediExpress toma datos proporcionados por el usuario mediante el formulario
          y los incluye directamente dentro del HTML de la respuesta <strong>sin aplicar
          codificación ni sanitización</strong>. Al no existir ningún filtro, el navegador no puede
          distinguir entre el código legítimo del portal y el código malicioso inyectado por el atacante.
        </p>
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ background: 'var(--code-bg)', borderRadius: '8px', padding: '16px', fontFamily: 'var(--mono)', fontSize: '13px', borderLeft: '3px solid #27ae60' }}>
            <div style={{ color: 'var(--text)', marginBottom: '6px', fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 600 }}>ENTRADA NORMAL: "Juan"</div>
            <code>{'<p>Hello <b>Juan</b></p>'}</code>
            <div style={{ color: '#27ae60', marginTop: '4px', fontSize: '12px' }}>→ El navegador muestra texto: <em>Hello Juan</em></div>
          </div>
          <div style={{ background: 'var(--code-bg)', borderRadius: '8px', padding: '16px', fontFamily: 'var(--mono)', fontSize: '13px', borderLeft: '3px solid var(--accent)' }}>
            <div style={{ color: 'var(--text)', marginBottom: '6px', fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 600 }}>{"ENTRADA MALICIOSA: <script>alert('XSS')</script>"}</div>
            <code>{"<p>Hello <b><script>alert('XSS')</script></b></p>"}</code>
            <div style={{ color: 'var(--accent)', marginTop: '4px', fontSize: '12px' }}>→ El navegador <strong>ejecuta el script</strong> en lugar de mostrarlo como texto</div>
          </div>
        </div>
        <p style={{ marginTop: '12px', fontSize: '14px' }}>
          En un escenario real contra clientes de CrediExpress, en lugar del <code>alert()</code> el
          atacante inyectaría código para <strong>robar la cookie de sesión</strong> del cliente
          autenticado o <strong>redirigirlo a un formulario falso</strong> que simule el portal de pagos.
          El enlace malicioso se distribuiría vía phishing por correo o SMS haciéndose pasar por
          comunicaciones oficiales de la financiera.
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
                ['Attack Vector (AV)', 'Network (N)', 'El atacante distribuye el enlace malicioso remotamente vía phishing dirigido a clientes de CrediExpress, sin requerir acceso físico.'],
                ['Attack Complexity (AC)', 'Low (L)', 'Solo se necesita construir una URL con el payload y enviarla. No requiere configuraciones especiales ni condiciones de carrera.'],
                ['Privileges Required (PR)', 'None (N)', 'El atacante no necesita cuenta ni privilegios en el portal para preparar y lanzar el ataque.'],
                ['User Interaction (UI)', 'Required (R)', 'La víctima (cliente de CrediExpress) debe hacer clic en el enlace malicioso para que el reflejo se gatille en su navegador.'],
                ['Scope (S)', 'Changed (C)', 'El script escapa del servidor y se ejecuta en el navegador del cliente, afectando un componente diferente: el entorno de software del usuario víctima.'],
                ['Confidentiality (C)', 'Low (L)', 'Permite acceder a cookies de sesión (si no tienen flag HttpOnly) y a datos financieros visibles en pantalla del cliente autenticado.'],
                ['Integrity (I)', 'Low (L)', 'Permite modificar visualmente la interfaz del portal (defacement) o insertar formularios falsos de captura de credenciales bancarias.'],
                ['Availability (A)', 'None (N)', 'El ataque no compromete la disponibilidad de los servidores centrales ni de la plataforma de CrediExpress.'],
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
          <span style={{ background: '#e67e22', color: '#fff', borderRadius: '8px', padding: '6px 16px', fontWeight: 700, fontSize: '18px' }}>6.1 Medium</span>
        </div>
        <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text)', fontFamily: 'var(--mono)' }}>
          Vector: CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">4. Política de Prevención</h2>
        <p>Para neutralizar de raíz los ataques XSS en el portal de CrediExpress, toda salida dinámica reflejada al HTML debe pasar obligatoriamente por dos controles:</p>
        <ul className="steps-list mt-3">
          <li>
            <span className="step-badge">A</span>
            <div>
              <strong>Codificación de Salida (Output Encoding):</strong> Los caracteres con significado HTML deben convertirse en sus entidades seguras antes de ser renderizados. Esto impide que el navegador los interprete como código. En React, las expresiones <code>{'{variable}'}</code> aplican esto automáticamente — el riesgo aparece solo si se usa <code>dangerouslySetInnerHTML</code>.
              <div style={{ marginTop: '10px', background: 'var(--code-bg)', borderRadius: '8px', padding: '12px', fontFamily: 'var(--mono)', fontSize: '12px' }}>
                <div style={{ color: 'var(--accent)', marginBottom: '4px' }}>{'// ❌ VULNERABLE — refleja nombre del cliente sin codificar'}</div>
                <div>{'document.getElementById("saludo").innerHTML = "Hola " + nombreCliente;'}</div>
                <div style={{ color: 'var(--text)', fontSize: '11px', fontStyle: 'italic', margin: '2px 0 8px' }}>{'// Si nombreCliente = <script>... → el script se ejecuta en el portal'}</div>
                <div style={{ color: '#27ae60', marginBottom: '4px' }}>{'// ✅ SEGURO — React codifica automáticamente'}</div>
                <div>{'return <p>Hola {nombreCliente}</p>; // nunca ejecuta scripts'}</div>
              </div>
            </div>
          </li>
          <li>
            <span className="step-badge">B</span>
            <div>
              <strong>Sanitización con DOMPurify:</strong> Para los casos donde CrediExpress necesite renderizar HTML legítimo (por ejemplo, mensajes de notificación con formato), se debe usar la librería <strong>DOMPurify</strong> para eliminar cualquier etiqueta o atributo peligroso antes de insertar el contenido en el DOM.
            </div>
          </li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">5. Controles de Mitigación</h2>
        <p style={{ marginBottom: '12px', fontSize: '14px' }}>
          Controles de defensa en capas basados en <strong>OWASP ASVS v4 (V5 - Validation)</strong> y <strong>NIST SP 800-53 (SI-10, SC-28)</strong>:
        </p>
        <ul className="steps-list">
          <li>
            <span className="step-badge">1</span>
            <div>
              <strong>Content Security Policy (CSP):</strong> Configurar el encabezado HTTP <code>Content-Security-Policy</code> en los servidores del portal. Una política como <code>default-src 'self'; script-src 'self'</code> instruye al navegador a ejecutar únicamente scripts del dominio oficial de CrediExpress, bloqueando cualquier script inline inyectado por un atacante.
            </div>
          </li>
          <li>
            <span className="step-badge">2</span>
            <div>
              <strong>Flag HttpOnly en cookies de sesión:</strong> Todas las cookies que gestionan las sesiones activas de los clientes deben incluir el atributo <code>HttpOnly</code>. Esto impide que un script XSS acceda a la cookie mediante <code>document.cookie</code>, eliminando el riesgo de secuestro de sesión bancaria incluso si el ataque XSS logra ejecutarse.
            </div>
          </li>
          <li>
            <span className="step-badge">3</span>
            <div>
              <strong>Cabecera X-XSS-Protection:</strong> Configurar <code>X-XSS-Protection: 1; mode=block</code> como capa adicional retrocompatible para navegadores de clientes que no soporten CSP moderno, bloqueando la carga de la página cuando se detecte un ataque XSS reflejado.
            </div>
          </li>
        </ul>
      </div>
    </article>
  )
}