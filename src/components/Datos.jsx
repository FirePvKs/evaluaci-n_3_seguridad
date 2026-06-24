const tiposDatos = [
  {
    label: 'A',
    tipo: 'Datos Personales',
    color: 'datos-blue',
    definicion:
      'Son los relativos a cualquier información concerniente a personas naturales, identificadas o identificables (Art. 2° letra f).',
    ejemplos: [
      'Nombre del desarrollador',
      'Nombre de usuario (username)',
      'Dirección de correo electrónico institucional o personal asociada a commits de Git',
      'Direcciones IP de conexión a los repositorios',
    ],
    requisito:
      'Su tratamiento requiere autorización del titular por escrito o por un medio que garantice su autenticidad, salvo que provengan de fuentes accesibles al público o sean necesarios para la gestión económica de la entidad.',
  },
  {
    label: 'B',
    tipo: 'Datos Sensibles',
    color: 'datos-red',
    definicion:
      'Aquellos datos personales que se refieren a las características físicas o morales de las personas o a hechos o circunstancias de su vida privada o intimidad (Art. 2° letra g): hábitos personales, origen racial, ideologías políticas, creencias religiosas, estados de salud físicos o psíquicos, vida sexual.',
    ejemplos: [
      'Bases de datos de prueba con datos médicos almacenados en repositorios privados',
      'Archivos de configuración con afiliaciones sindicales de trabajadores',
      'Registros biométricos de acceso almacenados en el entorno empresarial',
    ],
    requisito:
      'Tratamiento PROHIBIDO, a menos que medie una autorización legal explícita, el consentimiento inequívoco y expreso del titular, o sean datos necesarios para la determinación u obtención de beneficios de salud.',
  },
]

const derechosARCO = [
  {
    letra: 'A',
    nombre: 'Acceso',
    color: 'arco-purple',
    concepto:
      'El derecho del titular a solicitar y obtener confirmación de si sus datos están siendo tratados, en qué forma, el origen de los mismos, la finalidad del almacenamiento y los destinatarios a quienes se comunican.',
    aplicacion:
      'Un desarrollador o cliente puede exigir a la organización que declare exactamente qué datos suyos estaban almacenados en los servidores de GitHub afectados por la vulnerabilidad.',
  },
  {
    letra: 'R',
    nombre: 'Rectificación',
    color: 'arco-blue',
    concepto:
      'El derecho a solicitar la modificación, actualización o corrección de aquellos datos personales que sean inexactos, erróneos, incompletos o desactualizados.',
    aplicacion:
      'Si los datos de un desarrollador en los repositorios afectados están desactualizados o son incorrectos, puede exigir su corrección inmediata.',
  },
  {
    letra: 'C',
    nombre: 'Cancelación',
    color: 'arco-orange',
    concepto:
      'El derecho a exigir la supresión de los datos personales cuando su almacenamiento carezca de fundamento legal, cuando la autorización del titular haya expirado o revocado, o cuando los datos estén caducos.',
    aplicacion:
      'Si los datos de producción de un cliente fueron copiados en un entorno de pruebas (sandbox) de GitHub sin su consentimiento explícito, el titular puede exigir la inmediata eliminación regulatoria de esos registros.',
  },
  {
    letra: 'O',
    nombre: 'Oposición',
    color: 'arco-green',
    concepto:
      'La facultad del titular para negarse a que sus datos personales sean objeto de un tratamiento específico o que se utilicen para fines determinados (como la cesión a terceros o fines comerciales), aun cuando el tratamiento sea lícito.',
    aplicacion:
      'Los titulares de datos afectados pueden oponerse a que sus datos sean compartidos con terceros como parte de un análisis forense post-incidente sin su consentimiento.',
  },
]

export default function Datos() {
  return (
    <article className="prose-section">
      <h1 className="section-title">Tratamiento de Datos Personales</h1>
      <p className="section-subtitle">
        Ley N° 19.628 — Tipos de datos, distinción personales/sensibles y Derechos ARCO
      </p>

      <div className="card">
        <h2 className="card-title">Clasificación Legal de los Datos Comprometidos</h2>
        <p className="mb-4">
          La legislación chilena clasifica los datos en categorías estrictas para determinar la
          intensidad de su protección y los requisitos de su tratamiento. En el contexto del
          CVE-2026-3854, se identifican dos categorías:
        </p>
        <div className="datos-grid">
          {tiposDatos.map((d, i) => (
            <div key={i} className={`datos-card ${d.color}`}>
              <div className="datos-badge">{d.label}</div>
              <h3 className="datos-tipo">{d.tipo}</h3>
              <p className="datos-def">{d.definicion}</p>
              <div className="datos-ejemplos">
                <p className="ejemplos-label">Ejemplos en el caso GitHub:</p>
                <ul>
                  {d.ejemplos.map((e, j) => (
                    <li key={j}>{e}</li>
                  ))}
                </ul>
              </div>
              <div className="datos-requisito">
                <p className="requisito-label">Requisito de Tratamiento:</p>
                <p>{d.requisito}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Derechos ARCO</h2>
        <p className="mb-4">
          Constituyen el núcleo de las facultades que la ley otorga a los ciudadanos para mantener
          el control sobre sus datos personales frente a cualquier organización pública o privada
          que actúe como responsable de la base de datos.
        </p>
        <div className="arco-grid">
          {derechosARCO.map((d, i) => (
            <div key={i} className={`arco-card ${d.color}`}>
              <div className="arco-letra">{d.letra}</div>
              <h3 className="arco-nombre">{d.nombre}</h3>
              <div className="arco-content">
                <p className="arco-concepto">{d.concepto}</p>
                <div className="arco-aplicacion">
                  <span className="aplicacion-label">Aplicación al caso:</span>
                  <p>{d.aplicacion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
