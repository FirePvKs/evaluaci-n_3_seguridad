const prompts = [
  {
    numero: '01',
    seccion: 'Resumen ejecutivo del caso',
    archivo: '01_resumen_urbvic.md',
    herramienta: 'Gemini',
    prompt:
      'haz un resumen ejecutivo de la ultima vulnerabilidad encontrada en github esto es para un trabajo de la universidad por lo que debe ser serio y con lenguaje técnico, no ocupes emojis y debe tener los siguientes criterios qué pasó, cuándo, quiénes participaron, impacto',
    acepto:
      'Se aceptó la estructura completa con los cuatro criterios solicitados y la línea de tiempo del incidente.',
    corrigio:
      'Se ajustó la terminología técnica para incluir los nombres exactos de los componentes (babeld, gitrpcd, X-Stat) que no aparecían en la respuesta inicial.',
  },
  {
    numero: '02',
    seccion: 'Marco normativo aplicable',
    archivo: '02_marco_urbvic.md',
    herramienta: 'Gemini',
    prompt:
      'necesito que en base a esté caso apliques las leyes y regulaciones chilenas aplicables es importante que sean de chile y con bases de link para verificar las fuentes',
    acepto:
      'Se aceptaron las cuatro normativas identificadas (Ley 21.459, Ley 21.663, Ley 19.628, Decreto 295) con sus artículos específicos y los links de la BCN.',
    corrigio:
      'Se añadió manualmente la referencia al Decreto 295 como normativa complementaria, que no apareció en la respuesta inicial pero es fundamental para determinar el umbral de efecto significativo.',
  },
  {
    numero: '03',
    seccion: 'Tipificación de delitos',
    archivo: '03_delitos_urbvic.md',
    herramienta: 'Gemini',
    prompt:
      'Tipificación de delitos según la Ley 21.459, citando artículos y mapeando cada acción del atacante aplicalo al caso de la ultima vulnerabilidad de github',
    acepto:
      'Se aceptó el análisis de subsumisión de cada acción técnica con su correspondiente artículo de la Ley 21.459.',
    corrigio:
      'Fue necesario un segundo prompt para que la tabla de mapeo se generara en formato Markdown compatible con archivos .md, ya que la respuesta inicial presentaba el contenido en texto plano sin estructura de tabla.',
  },
  {
    numero: '03b',
    seccion: 'Tabla de mapeo técnico-legal (formato Markdown)',
    archivo: '03_delitos_urbvic.md',
    herramienta: 'Gemini',
    prompt:
      'necesito que me hagas esté cuadro de mapea técnico compatible con archivos md para que se vean correctamente Acción del Atacante (Técnica) | Verbo Rector Afectado | Artículo Violado (Ley 21.459) | Calificación Penal Producida',
    acepto:
      'Se aceptó la tabla en formato Markdown con las cuatro columnas y los cuatro delitos correctamente estructurados.',
    corrigio:
      'Se verificó manualmente que la sintaxis de la tabla fuera compatible con el renderizado en GitHub antes de incluirla en el archivo final.',
  },
  {
    numero: '04',
    seccion: 'Tabla comparativa de marcos regulatorios',
    archivo: '04_comparacion_urbvic.md',
    herramienta: 'Gemini',
    prompt:
      'Tabla comparativa de marcos regulatorios por industria (mínimo 3 marcos y 3 ejes). para el caso de la vulnerabilidad de github ya mencionado',
    acepto:
      'Se aceptaron los tres marcos (Ley 21.663, Ley 19.628, RAN-CMF) y los tres ejes de análisis: obligación de reporte, estándares técnicos y régimen de sanciones.',
    corrigio:
      'Requirió un prompt adicional para convertir el contenido al formato Markdown de tabla, ya que la respuesta inicial entregó el texto sin estructura.',
  },
  {
    numero: '04b',
    seccion: 'Tabla comparativa en formato Markdown',
    archivo: '04_comparacion_urbvic.md',
    herramienta: 'Gemini',
    prompt:
      'aplica el formato md a esta tabla [tabla con las tres leyes, sus ejes de reporte, estándares técnicos y sanciones]',
    acepto:
      'Se aceptó la tabla final con las celdas correctamente formateadas para renderizado en GitHub.',
    corrigio:
      'Se revisó manualmente el alineado de columnas y se corrigieron saltos de línea dentro de celdas que rompían la estructura Markdown.',
  },
  {
    numero: '05',
    seccion: 'Responsabilidades legales de los actores',
    archivo: '05_responsabilidades_urbvic.md',
    herramienta: 'Gemini',
    prompt:
      'Actores identificados y sus responsabilidades penales, civiles y administrativas, con cita de norma para el caso de la vulnerabilidad de github',
    acepto:
      'Se aceptaron los actores identificados y la distinción entre tipos de responsabilidad con sus citas normativas.',
    corrigio:
      'Se añadió manualmente el actor Wiz Research con su eximente de responsabilidad, que no apareció en la respuesta inicial de Gemini.',
  },
  {
    numero: '06',
    seccion: 'Tratamiento de datos personales y derechos ARCO',
    archivo: '06_datos_urbvic.md',
    herramienta: 'Gemini',
    prompt:
      'Tratamiento de datos según la Ley 19.628: tipos, distinción personales/sensibles y derechos ARCO aplicado al caso de la vulnerabilidad de github',
    acepto:
      'Se aceptó la distinción entre datos personales y sensibles con ejemplos concretos del contexto de desarrollo de software.',
    corrigio:
      'Se enriquecieron los ejemplos de datos sensibles con casos más específicos al escenario empresarial GHES (registros biométricos, afiliaciones sindicales) que la respuesta de Gemini no contemplaba.',
  },
  {
    numero: '07',
    seccion: 'Conclusiones y recomendaciones',
    archivo: '07_conclusiones_urbvic.md',
    herramienta: 'Gemini',
    prompt:
      'Recomendaciones de seguridad y reflexión final del análisis aplicalo al caso de la vulnerabilidad de github',
    acepto:
      'Se aceptó el enfoque de defensa en capas y la reflexión final sobre el marco legal chileno.',
    corrigio:
      'Se ajustó la reflexión para que mencionara explícitamente la Ley 21.663 y el deber activo de las organizaciones, no solo la penalización del atacante.',
  },
  {
    numero: '08',
    seccion: 'Construcción de la aplicación web React',
    archivo: 'src/components/*.jsx, src/App.jsx',
    herramienta: 'Claude (claude.ai)',
    prompt:
      'necesito que hagas un informe en base a este proyecto y con guía del documento que te enviaré. como dice ahí cada documento .md de la carpeta docs es un componente de la pagina web, sigue las instrucciones',
    acepto:
      'Se aceptó la estructura completa del proyecto: los 8 componentes React correspondientes a cada archivo .md, el App.jsx con navegación lateral, y todos los estilos CSS.',
    corrigio:
      'Se corrigió el #root del index.css que tenía un ancho fijo de 1126px que limitaba el layout de la aplicación.',
  },
  {
    numero: '09',
    seccion: 'Cambio a diseño de una sola página con scroll',
    archivo: 'src/App.jsx, src/App.css',
    herramienta: 'Claude (claude.ai)',
    prompt:
      'está bien pero haz que sea todo en una pagina osea que simplemente haciendo scroll puedo ir viendo todo',
    acepto:
      'Se aceptó el rediseño completo: eliminación del sidebar, barra de navegación superior sticky con scroll suave a cada sección, y hero introductorio con los datos del caso.',
    corrigio:
      'No fue necesario corregir la estructura, solo se ajustó el scroll-margin-top de las secciones para que la barra de navegación no tapara los títulos al hacer clic.',
  },
  {
    numero: '10',
    seccion: 'Aplicación de tema rojo claro y blanco',
    archivo: 'src/index.css, src/App.css',
    herramienta: 'Claude (claude.ai)',
    prompt:
      'continua y usa colores rojos claros y blanco',
    acepto:
      'Se aceptó el cambio de paleta completo: fondo blanco puro, acento rojo #c0392b, bordes y fondos en tonos rojo muy suaves, y barra roja izquierda en los títulos de sección.',
    corrigio:
      'Se revisaron manualmente los colores de los elementos que usaban morado (arco-purple, delito-purple) para que quedaran consistentes con el tema rojo.',
  },
  {
    numero: '11',
    seccion: 'Reorganización de la sección de prompts',
    archivo: 'src/components/Prompts.jsx',
    herramienta: 'Claude (claude.ai)',
    prompt:
      'organiza los promts y elimina el cuadro que dice resumen de uso en la seccion de promts, todos los promts que están en el archivo .md de promts son de gemini y agrega los promts que usé en esté chat, no uses emojis',
    acepto:
      'Se aceptó la reorganización completa: prompts de Gemini separados de los prompts de Claude, sin cuadro de estadísticas, sin emojis.',
    corrigio:
      'Se corrigió la atribución de todos los prompts del archivo .md, que estaban incorrectamente asignados a Claude cuando correspondían a Gemini.',
  },
  {
    numero: '12',
    seccion: 'Cambio a navegación por botones en el header',
    archivo: 'src/App.jsx, src/App.css',
    herramienta: 'Claude (claude.ai)',
    prompt:
      'volvamos al formato de antes que al apretar un boton mostraba el contenido y solo ese contenido pero no hagas un sidebar usa los botones que ya están en el header y recuerda incluir esté promt en la pagina',
    acepto:
      'Se aceptó la navegación por estado con los botones del header: cada botón muestra solo la sección correspondiente, con el botón activo resaltado con borde inferior rojo.',
    corrigio:
      'Se eliminó el hero y la estructura de página única del rediseño anterior, volviendo al layout de contenido único por sección con botones de anterior y siguiente al pie.',
  },
  ,
  {
    numero: '13',
    seccion: 'Ajuste visual de tarjetas',
    archivo: 'src/App.css',
    herramienta: 'Claude (claude.ai)',
    prompt:
      'al hacer hover en una tarjeta de contenido el borde izquierdo rojo se aclara, quita eso y los bordes de las tarjetas quítales el border radius, incluye este promt en el proyecto',
    acepto:
      'Se eliminó el efecto hover que cambiaba el color del borde al pasar el cursor sobre las tarjetas, y se removió el border-radius de todas las tarjetas de contenido principal.',
    corrigio:
      'Se verificó que el cambio aplicara también a las tarjetas de marcos regulatorios, responsabilidades, datos ARCO y recomendaciones, no solo a la clase .card base.',
  },
  ,
  {
    numero: '14',
    seccion: 'Reemplazo de emojis por iconos Material Icons',
    archivo: 'src/components/*.jsx, index.html',
    herramienta: 'Claude (claude.ai)',
    prompt:
      'https://fonts.google.com/icons quita todos los emojis y usa iconos de esta pagina que te envié, incluye este promt en el proyecto',
    acepto:
      'Se aceptó el reemplazo completo de todos los emojis en Resumen, Marco, Comparacion, Responsabilidades y Conclusiones por iconos de la librería Material Icons de Google, cargada vía CDN en index.html.',
    corrigio:
      'Se creó un componente Icon.jsx reutilizable para simplificar el uso de los iconos en todos los componentes y mantener consistencia en el tamaño y estilo.',
  },
  ,
  {
    numero: '15',
    seccion: 'Espacio para imagen en el header',
    archivo: 'src/App.jsx, src/App.css, public/logo.svg',
    herramienta: 'Claude (claude.ai)',
    prompt:
      'necesito que incluyas e incorpores de forma efectiva en la esquina superior izquierda del header un espacio para una imagen la cual yo modificaré por lo que solo necesito el espacio ya adaptado, incluye este promt en el informe',
    acepto:
      'Se aceptó el espacio de 36x36px en la esquina izquierda del header, antes de la marca TI3034, con un archivo placeholder logo.svg en la carpeta public/ listo para reemplazar.',
    corrigio:
      'Se cambió el formato inicial de logo.png a logo.svg para que el espacio se renderizara correctamente sin necesidad de un archivo de imagen real durante el desarrollo.',
  },
  ,
  {
    numero: '16',
    seccion: 'Footer con información del alumno',
    archivo: 'src/App.jsx, src/App.css',
    herramienta: 'Claude (claude.ai)',
    prompt:
      'necesito que añadas un footer a toda la pagina con informacion como nombre del alumno, semestre en que el va, carrera que estudia y link a mi perfil de github — Nombre: Vicente Paolo Thomás Urbina Riquelme, Semestre: tercero, Carrera: Ing Informatica, https://github.com/FirePvKs',
    acepto:
      'Se aceptó el footer con nombre completo, carrera, semestre, institución y un botón con icono SVG de GitHub que enlaza al perfil indicado.',
    corrigio:
      'No requirió correcciones.',
  },
]

const promptsGemini = prompts.filter(p => p.herramienta === 'Gemini')
const promptsClaude = prompts.filter(p => p.herramienta.startsWith('Claude'))

function PromptCard({ p }) {
  return (
    <div className="prompt-card card">
      <div className="prompt-header">
        <span className="prompt-num">{p.numero}</span>
        <div>
          <p className="prompt-seccion">{p.seccion}</p>
          <span className="prompt-archivo">{p.archivo}</span>
        </div>
        <span className="prompt-herramienta">{p.herramienta}</span>
      </div>

      <div className="prompt-block">
        <p className="prompt-label">Prompt utilizado:</p>
        <blockquote className="prompt-text">{p.prompt}</blockquote>
      </div>

      <div className="prompt-result">
        <div className="result-acepto">
          <div>
            <p className="result-label">Que se acepto</p>
            <p>{p.acepto}</p>
          </div>
        </div>
        <div className="result-corrigio">
          <div>
            <p className="result-label">Que se corrigio</p>
            <p>{p.corrigio}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Prompts() {
  return (
    <article className="prose-section">
      <h1 className="section-title">Bitacora de Uso de Inteligencia Artificial</h1>
      <p className="section-subtitle">
        Registro de prompts, correcciones y reflexion sobre el uso de IA en el desarrollo del informe
      </p>

      <div className="prompts-group">
        <h2 className="prompts-group-title">Prompts — Gemini</h2>
        <p className="prompts-group-desc">
          Utilizados para generar el contenido de los archivos Markdown del informe legal.
        </p>
        {promptsGemini.map((p) => (
          <PromptCard key={p.numero} p={p} />
        ))}
      </div>

      <div className="prompts-group">
        <h2 className="prompts-group-title">Prompts — Claude</h2>
        <p className="prompts-group-desc">
          Utilizados para construir la aplicacion web React que presenta el informe.
        </p>
        {promptsClaude.map((p) => (
          <PromptCard key={p.numero} p={p} />
        ))}
      </div>

      <div className="card reflexion-ia">
        <h2 className="card-title">Reflexion Final sobre el Uso de IA</h2>
        <p>
          Se utilizaron dos herramientas de IA con roles diferenciados. Gemini se empleó en la
          etapa de investigación y redacción legal, generando el contenido de los ocho archivos
          Markdown. Claude se empleó en la etapa de desarrollo, construyendo la aplicación React
          que presenta ese contenido.
        </p>
        <p className="mt-3">
          En ningún caso se aceptó una respuesta sin revisión. Las correcciones más frecuentes
          con Gemini fueron la adición de actores omitidos y el reformateo de tablas al estándar
          Markdown. Con Claude, la corrección principal fue el ajuste del layout CSS para que el
          diseño funcionara correctamente en el entorno del proyecto.
        </p>
        <p className="mt-3">
          La calidad del análisis legal dependió en mayor medida de la investigación previa del
          caso y del conocimiento de las normativas chilenas que de la capacidad generativa de
          las herramientas. Estas fueron instrumentos de productividad, no de sustitución del
          criterio juridico-técnico.
        </p>
      </div>
    </article>
  )
}