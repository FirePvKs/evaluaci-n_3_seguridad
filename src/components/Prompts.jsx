const promptsGeminiData = [
  {
    numero: 'G-01',
    seccion: 'Resumen ejecutivo — Portal CrediExpress',
    archivo: '01_resumen_urbvic.md',
    herramienta: 'Gemini (modo pensamiento extendido)',
    prompt: 'CrediExpress — Casa de crédito — Créditos, scoring, datos financieros.\n\nQuiero que hagas un resumen ejecutivo en base a la información de los archivos proporcionados sobre la empresa y su portal de clientes. Idealmente hazlo en Markdown. Archivo destino: 01_resumen_urbvic.md',
    acepto: 'Se aceptó la estructura completa del resumen: descripción de la empresa, servicios financieros ofrecidos, tipos de datos que maneja el portal (PII, scoring crediticio, historial de créditos) y el alcance de la auditoría.',
    corrigio: 'Se ajustó la descripción del tipo de datos para incluir explícitamente los tokens de sesión y las credenciales de autenticación como activos adicionales que el portal gestiona.',
  },
  {
    numero: 'G-02',
    seccion: 'Análisis de vulnerabilidad — Inyección SQL',
    archivo: '02_sqli_urbvic.md',
    herramienta: 'Gemini (modo pensamiento extendido)',
    prompt: 'CrediExpress — Casa de crédito — Créditos, scoring, datos financieros.\n\nQuiero que hagas un análisis técnico de la vulnerabilidad de Inyección SQL. Debe incluir: evidencia del ataque, explicación técnica de por qué funciona, clasificación CVSS v3.1, política de prevención y controles de mitigación. Idealmente hazlo en Markdown. Archivo destino: 02_sqli_urbvic.md',
    acepto: 'Se aceptó el análisis técnico con la consulta SQL vulnerable vs. parametrizada, la explicación del mecanismo de la condición siempre verdadera y la propuesta de Prepared Statements como defensa principal.',
    corrigio: 'Se corrigió el puntaje CVSS: el valor inicial entregado fue 9.8, pero al ejecutar la calculadora oficial de FIRST con los parámetros exactos (Availability: Low en vez de High) el resultado fue 9.4 Critical. Se actualizó el vector string en consecuencia.',
  },
  {
    numero: 'G-03',
    seccion: 'Análisis de vulnerabilidad — XSS Reflejado',
    archivo: '03_xss_urbvic.md',
    herramienta: 'Gemini (modo pensamiento extendido)',
    prompt: 'CrediExpress — Casa de crédito — Créditos, scoring, datos financieros.\n\nQuiero que hagas un análisis técnico de la vulnerabilidad XSS Reflejado. Debe incluir evidencia, explicación técnica, clasificación CVSS v3.1, política de prevención (output encoding y CSP) y controles de mitigación. Idealmente hazlo en Markdown. Archivo destino: 03_xss_urbvic.md',
    acepto: 'Se aceptó la explicación del mecanismo reflejo, el escenario de robo de sesión bancaria y las defensas de output encoding y Content Security Policy.',
    corrigio: 'Se eliminó una referencia a XSS Almacenado que aparecía en la descripción, ya que el ataque ejecutado en DVWA es exclusivamente del tipo Reflejado. También se corrigió la ruta de imagen de img_vicos/ a img_urbvic/.',
  },
  {
    numero: 'G-04',
    seccion: 'Análisis de vulnerabilidad — Inyección de Comandos',
    archivo: '04_comandos_urbvic.md',
    herramienta: 'Gemini (modo pensamiento extendido)',
    prompt: 'CrediExpress — Casa de crédito — Créditos, scoring, datos financieros.\n\nQuiero que hagas un análisis técnico de la vulnerabilidad de Inyección de Comandos. Debe incluir evidencia, explicación técnica del separador ";" en bash, clasificación CVSS v3.1, política de prevención y controles de mitigación. Idealmente hazlo en Markdown. Archivo destino: 04_comandos_urbvic.md',
    acepto: 'Se aceptó la explicación del separador secuencial ";" en bash, el escenario de acceso a /etc/passwd y la propuesta de execFile con shell: false como defensa principal.',
    corrigio: 'Se detectó un bloque de código bash sin cerrar que absorbía las secciones 3, 4 y 5. Se corrigió la apertura y cierre del bloque. También se corrigió la ruta de imagen de img_vicos/ a img_urbvic/.',
  },
  {
    numero: 'G-05',
    seccion: 'Activos de información y riesgos según industria',
    archivo: '05_activos_urbvic.md',
    herramienta: 'Gemini (modo pensamiento extendido)',
    prompt: 'CrediExpress — Casa de crédito — Créditos, scoring, datos financieros.\n\nQuiero que identifiques y clasifiques los activos de información del portal vinculados al rubro financiero, y asocies cada vulnerabilidad al activo que pone en riesgo. Clasifica bajo los ejes CIA. Idealmente hazlo en Markdown. Archivo destino: 05_activos_urbvic.md',
    acepto: 'Se aceptó la identificación de 5 activos (BD de clientes, historial financiero, motor de scoring, servidor de aplicaciones y tokens de sesión), su clasificación CIA y la asociación de cada vulnerabilidad con los activos que compromete.',
    corrigio: 'Se añadió el Activo 5 (tokens de sesión) que no aparecía en la respuesta inicial, siendo fundamental para el análisis del ataque XSS cuyo impacto directo es el secuestro de sesión de clientes autenticados.',
  },
  {
    numero: 'G-06',
    seccion: 'Matriz de riesgo y mapa de calor',
    archivo: '06_matriz_urbvic.md',
    herramienta: 'Gemini (modo pensamiento extendido)',
    prompt: 'CrediExpress — Casa de crédito — Créditos, scoring, datos financieros.\n\nQuiero que construyas una matriz de riesgo probabilidad x impacto con escala 1-5, ubicando las 3 vulnerabilidades con justificación coherente al rubro financiero y priorización alineada al CVSS. Idealmente hazlo en Markdown. Archivo destino: 06_matriz_urbvic.md',
    acepto: 'Se aceptó la escala de calificación 1–5, la ubicación de las tres vulnerabilidades en la matriz y la priorización coherente con sus puntajes CVSS reales.',
    corrigio: 'Se actualizaron los puntajes CVSS de referencia en la priorización: SQLi de ~9.8 a 9.4 y Comandos de ~10.0 a 9.9, para reflejar los valores exactos obtenidos en la calculadora oficial de FIRST.',
  },
  {
    numero: 'G-07',
    seccion: 'Políticas de prevención y controles de mitigación',
    archivo: '07_controles_urbvic.md',
    herramienta: 'Gemini (modo pensamiento extendido)',
    prompt: 'CrediExpress — Casa de crédito — Créditos, scoring, datos financieros.\n\nQuiero que propongas políticas de prevención que ataquen la causa raíz de cada vulnerabilidad y controles de mitigación complementarios, referenciando marcos OWASP, NIST o CIS. Idealmente hazlo en Markdown. Archivo destino: 07_controles_urbvic.md',
    acepto: 'Se aceptó la estructura de dos capas (prevención vs. mitigación) para cada vulnerabilidad, la referencia a OWASP Top 10:2021 y NIST SP 800-53, y la tabla de gobernanza con responsables y frecuencias.',
    corrigio: 'Se actualizó el ejemplo de código vulnerable para usar columnas reales de CrediExpress (rut, saldo_credito, id_cliente) en vez de los genéricos (users, id) para conectar la política al hallazgo concreto.',
  },
  {
    numero: 'G-08',
    seccion: 'Mejora tecnológica y plan de recuperación (DRP)',
    archivo: '08_recuperacion_urbvic.md',
    herramienta: 'Gemini (modo pensamiento extendido)',
    prompt: 'CrediExpress — Casa de crédito — Créditos, scoring, datos financieros.\n\nQuiero que propongas mejoras tecnológicas (WAF, segmentación de redes, DevSecOps) y un plan de recuperación ante desastres con fases de detección, aislamiento, análisis, restauración y notificación. Incluye política de respaldos. Idealmente hazlo en Markdown. Archivo destino: 08_recuperacion_urbvic.md',
    acepto: 'Se aceptó la estructura de tres mejoras tecnológicas (WAF, DMZ en 3 capas, pipeline DevSecOps con SAST) y el DRP en 5 fases con acciones concretas, incluyendo la notificación a la CMF dentro de 4 horas.',
    corrigio: 'Se añadió la política de respaldos 3-2-1 con frecuencias específicas (incremental cada 1 hora, full diario cifrado con AES-256), que no estaba en la respuesta inicial pero es requisito explícito del criterio 3.1.6 de la rúbrica.',
  },
]

const promptsClaudeData = [
  {
    numero: 'C-01',
    seccion: 'Revisión inicial del proyecto y verificación contra rúbricas',
    archivo: 'docs_urbvic/*.md',
    herramienta: 'Claude (claude.ai)',
    prompt: 'en el zip está un proyecto antiguo de la anterior evaluación pero ya actualice los docs por lo que hay que actualizar el contenido de la pagina de react.\n\nantes de hacer cualquier cosa es clave que verifiques que el contenido de los docs cumpla con las 2 rubricas si ves que algo está mal no modifiques nada del código y dime que está mal para actualizarlo\n\nmencióname que fotos debo tener según los archivos que te mandé y en que pagina debo de tomarlas',
    acepto: 'Se aceptó el diagnóstico previo al código: rutas de imágenes incorrectas (img_vicos/ en vez de img_urbvic/), bloque SQL sin cerrar en 02 y 04, bitácora de IA incompleta sin reflexión ni correcciones documentadas, y ausencia de tabla CVSS consolidada. También se aceptó la lista de las 3 capturas requeridas con su URL exacta de DVWA.',
    corrigio: 'No se modificó código en esta iteración, solo se reportaron los hallazgos para que los archivos .md fueran corregidos primero, siguiendo el orden solicitado.',
  },
  {
    numero: 'C-02',
    seccion: 'Corrección de archivos 02_sqli y 04_comandos',
    archivo: '02_sqli_urbvic.md, 04_comandos_urbvic.md',
    herramienta: 'Claude (claude.ai)',
    prompt: 'Mándame la corrección de el archivo 02_sql y el 04_comandos',
    acepto: 'Se aceptaron ambos archivos con los bloques de código correctamente cerrados, las rutas de imagen corregidas a img_urbvic/, las tablas CVSS con justificación por métrica y los puntajes reales (9.4 y 9.9) obtenidos de la calculadora FIRST.',
    corrigio: 'Se ajustó el ejemplo de código vulnerable en 02_sqli para usar las columnas del negocio de CrediExpress (rut, saldo_credito, id_cliente) en lugar de la tabla genérica users.',
  },
  {
    numero: 'C-03',
    seccion: 'Componente 01 — Resumen ejecutivo',
    archivo: 'src/components/Resumen.jsx, src/App.jsx',
    herramienta: 'Claude (claude.ai)',
    prompt: 'la primera me dio 9.4\nla segunda me dio 6.1\nel tercero me dio 9.9\n\n(asegúrate que esté la justificación de cada selección en los docs y ahora si empieza a modificar código y haz el 01, evidentemente la información que está en el código es de otro trabajo asi que solo reemplazalo',
    acepto: 'Se aceptó el Resumen.jsx completo con contexto de CrediExpress, grilla de información sensible, objetivos de auditoría en 4 pasos, hallazgos con los 3 puntajes CVSS verificados y metodología en 5 fases. También se aceptó el App.jsx con la nueva estructura de 9 secciones.',
    corrigio: 'Se confirmaron los 3 puntajes CVSS antes de proceder para que el Resumen los reflejara correctamente desde el inicio.',
  },
  {
    numero: 'C-04',
    seccion: 'Componentes 02, 03 y 04 — Ataques',
    archivo: 'src/components/InyeccionSQL.jsx, XSS.jsx, Comandos.jsx',
    herramienta: 'Claude (claude.ai)',
    prompt: 'haz el componente 02 en base a el docs que está en docs_urbvic de el proyecto, no inventes informacion y si ves algun error o inconsistencia en el docs o algo que choque con alguna de las 2 rubricas mencionamelo junto al punto de la rubrica que no corresponde\n[mismo prompt aplicado a los componentes 03 y 04]',
    acepto: 'Se aceptaron los tres componentes con tabla CVSS por métricas con justificación, bloques de código vulnerable vs. seguro contextualizados al portal de CrediExpress, y badges de severidad con colores diferenciados (rojo para Critical, naranja para Medium).',
    corrigio: 'En XSS.jsx se cambió el color del badge de rojo a naranja para reflejar que 6.1 es Medium y no Critical. En los bloques de código se reemplazaron los ejemplos genéricos por columnas reales del negocio.',
  },
  {
    numero: 'C-05',
    seccion: 'Componentes 05, 06, 07 y 08',
    archivo: 'src/components/Activos.jsx, Matriz.jsx, Controles.jsx, Recuperacion.jsx',
    herramienta: 'Claude (claude.ai)',
    prompt: 'haz el componente 05 en base a el docs que está en docs_urbvic de el proyecto, no inventes informacion y si ves algun error o inconsistencia en el docs o algo que choque con alguna de las 2 rubricas mencionamelo junto al punto de la rubrica que no corresponde\n[mismo prompt aplicado a los componentes 07 y 08]',
    acepto: 'Se aceptaron: Activos con clasificación CIA y asociación vulnerabilidad→activo, Matriz con mapa de calor React de 25 celdas coloreadas con las 3 vulnerabilidades ubicadas, Controles con separación prevención/mitigación, y Recuperacion con DRP en 5 fases y política 3-2-1 de respaldos.',
    corrigio: 'En Matriz.jsx se actualizaron los puntajes CVSS a los valores reales. En Recuperacion.jsx se añadió la notificación a la CMF dentro de 4 horas, requerida para entidades financieras chilenas.',
  },
  {
    numero: 'C-06',
    seccion: 'Implementación de imágenes y eliminación de emojis',
    archivo: 'public/img_urbvic/*, src/components/*.jsx',
    herramienta: 'Claude (claude.ai)',
    prompt: 'aqui está el proyecto lo que debes hacer es lo siguiente\n\n1- implementar las imagenes correspondientes en su lugar correspondiente (las imagenes que te fui enviando en la conversacion y que verificamos que eran correctas\n\n2- eliminar todos los emojis de la app web y si es necesario remplazarlo por icons de está pagina https://fonts.google.com/icons',
    acepto: 'Se aceptó la ubicación de las 3 imágenes verificadas en public/img_urbvic/ y el reemplazo de todos los emojis por iconos de Material Icons mediante un componente Icon.jsx reutilizable.',
    corrigio: 'Se verificó con un script Python que no quedara ningún carácter emoji en ningún .jsx antes de empaquetar. Los marcadores en bloques de código se convirtieron a texto plano ([X] y [OK]).',
  },
  {
    numero: 'C-07',
    seccion: 'Componente 09 — Bitácora de IA, evaluación final y prompt actual',
    archivo: 'src/components/Prompts.jsx',
    herramienta: 'Claude (claude.ai)',
    prompt: '1- ahora si en el archivo promts_urbvic usalo para el componente 09, integrandolo bien con los promts ya puestos, y si hay un promt ya puesto que no tiene nada que ver con esté trabajo eliminalo solo deja promts que son para la estetica de la pagina que hice anteriormente y sigue el formato que ves\n\n2- luego de implementar el 09 que te pedi arriba evalua todo el proyecto con las 2 rubricas para asegurarse que está todo bien\n\n3- incluye esté promt en el 09',
    acepto: 'Se aceptó la integración completa: prompts Gemini de contenido de seguridad (G-01 a G-08), prompts Claude de desarrollo de auditoría (C-01 a C-07), prompts de estética conservados (E-01 a E-09) y reflexión final actualizada al contexto de la auditoría de CrediExpress.',
    corrigio: 'Se eliminaron los 7 prompts de Gemini de la Evaluación 2 (caso GitHub CVE-2026-3854) que no correspondían a este trabajo. Se conservaron únicamente los prompts de diseño y estética de la interfaz.',
  },
]

const promptsEsteticaData = [
  {
    numero: 'E-01',
    seccion: 'Construcción de la aplicación web React',
    archivo: 'src/components/*.jsx, src/App.jsx',
    herramienta: 'Claude (claude.ai)',
    prompt: 'necesito que hagas un informe en base a este proyecto y con guía del documento que te enviaré. como dice ahí cada documento .md de la carpeta docs es un componente de la pagina web, sigue las instrucciones',
    acepto: 'Se aceptó la estructura completa del proyecto: los componentes React correspondientes a cada archivo .md, el App.jsx con navegación por secciones y todos los estilos CSS.',
    corrigio: 'Se corrigió el #root del index.css que tenía un ancho fijo de 1126px que limitaba el layout de la aplicación.',
  },
  {
    numero: 'E-02',
    seccion: 'Cambio a diseño de una sola página con scroll',
    archivo: 'src/App.jsx, src/App.css',
    herramienta: 'Claude (claude.ai)',
    prompt: 'está bien pero haz que sea todo en una pagina osea que simplemente haciendo scroll puedo ir viendo todo',
    acepto: 'Se aceptó el rediseño completo: eliminación del sidebar, barra de navegación superior sticky con scroll suave a cada sección.',
    corrigio: 'Se ajustó el scroll-margin-top de las secciones para que la barra de navegación no tapara los títulos al hacer clic.',
  },
  {
    numero: 'E-03',
    seccion: 'Aplicación de tema rojo claro y blanco',
    archivo: 'src/index.css, src/App.css',
    herramienta: 'Claude (claude.ai)',
    prompt: 'continua y usa colores rojos claros y blanco',
    acepto: 'Se aceptó el cambio de paleta completo: fondo blanco puro, acento rojo #c0392b, bordes y fondos en tonos rojo muy suaves, y barra roja izquierda en los títulos de sección.',
    corrigio: 'Se revisaron los colores de los elementos que usaban morado para que quedaran consistentes con el tema rojo.',
  },
  {
    numero: 'E-04',
    seccion: 'Reorganización de la sección de prompts',
    archivo: 'src/components/Prompts.jsx',
    herramienta: 'Claude (claude.ai)',
    prompt: 'organiza los promts y elimina el cuadro que dice resumen de uso en la seccion de promts, todos los promts que están en el archivo .md de promts son de gemini y agrega los promts que usé en esté chat, no uses emojis',
    acepto: 'Se aceptó la reorganización completa: prompts de Gemini separados de los prompts de Claude, sin cuadro de estadísticas, sin emojis.',
    corrigio: 'Se corrigió la atribución de los prompts del archivo .md, que estaban incorrectamente asignados a Claude cuando correspondían a Gemini.',
  },
  {
    numero: 'E-05',
    seccion: 'Cambio a navegación por botones en el header',
    archivo: 'src/App.jsx, src/App.css',
    herramienta: 'Claude (claude.ai)',
    prompt: 'volvamos al formato de antes que al apretar un boton mostraba el contenido y solo ese contenido pero no hagas un sidebar usa los botones que ya están en el header y recuerda incluir esté promt en la pagina',
    acepto: 'Se aceptó la navegación por estado con los botones del header: cada botón muestra solo la sección correspondiente, con el botón activo resaltado con borde inferior rojo.',
    corrigio: 'Se eliminó el hero y la estructura de página única, volviendo al layout de contenido único por sección con botones de anterior y siguiente al pie.',
  },
  {
    numero: 'E-06',
    seccion: 'Ajuste visual de tarjetas',
    archivo: 'src/App.css',
    herramienta: 'Claude (claude.ai)',
    prompt: 'al hacer hover en una tarjeta de contenido el borde izquierdo rojo se aclara, quita eso y los bordes de las tarjetas quítales el border radius, incluye este promt en el proyecto',
    acepto: 'Se eliminó el efecto hover que cambiaba el color del borde y se removió el border-radius de todas las tarjetas.',
    corrigio: 'Se verificó que el cambio aplicara también a las tarjetas de todos los componentes, no solo a la clase .card base.',
  },
  {
    numero: 'E-07',
    seccion: 'Reemplazo de emojis por iconos Material Icons',
    archivo: 'src/components/*.jsx, index.html',
    herramienta: 'Claude (claude.ai)',
    prompt: 'https://fonts.google.com/icons quita todos los emojis y usa iconos de esta pagina que te envié, incluye este promt en el proyecto',
    acepto: 'Se aceptó el reemplazo completo de todos los emojis por iconos de Material Icons cargada vía CDN en index.html.',
    corrigio: 'Se creó un componente Icon.jsx reutilizable para simplificar el uso de los iconos y mantener consistencia.',
  },
  {
    numero: 'E-08',
    seccion: 'Espacio para imagen en el header',
    archivo: 'src/App.jsx, src/App.css, public/logo.svg',
    herramienta: 'Claude (claude.ai)',
    prompt: 'necesito que incluyas e incorpores de forma efectiva en la esquina superior izquierda del header un espacio para una imagen la cual yo modificaré por lo que solo necesito el espacio ya adaptado, incluye este promt en el informe',
    acepto: 'Se aceptó el espacio de 36x36px en la esquina izquierda del header con un archivo placeholder logo.svg en public/ listo para reemplazar.',
    corrigio: 'Se cambió el formato de logo.png a logo.svg para que el espacio se renderizara correctamente sin un archivo de imagen real durante el desarrollo.',
  },
  {
    numero: 'E-09',
    seccion: 'Footer con información del alumno',
    archivo: 'src/App.jsx, src/App.css',
    herramienta: 'Claude (claude.ai)',
    prompt: 'necesito que añadas un footer a toda la pagina con informacion como nombre del alumno, semestre en que el va, carrera que estudia y link a mi perfil de github — Nombre: Vicente Paolo Thomás Urbina Riquelme, Semestre: tercero, Carrera: Ing Informatica, https://github.com/FirePvKs',
    acepto: 'Se aceptó el footer con nombre completo, carrera, semestre, institución y botón con icono SVG de GitHub que enlaza al perfil indicado.',
    corrigio: 'No requirió correcciones.',
  },
]

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
        <blockquote className="prompt-text" style={{ whiteSpace: 'pre-line' }}>{p.prompt}</blockquote>
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
        Registro de prompts, correcciones y reflexion sobre el uso de IA en el desarrollo de la auditoria de seguridad web de CrediExpress
      </p>

      <div className="prompts-group">
        <h2 className="prompts-group-title">Prompts — Gemini (Investigacion de Seguridad)</h2>
        <p className="prompts-group-desc">
          Utilizados para generar el contenido de los archivos Markdown de la auditoria: resumen ejecutivo, analisis de las tres vulnerabilidades, activos, matriz de riesgo, controles y plan de recuperacion.
        </p>
        {promptsGeminiData.map((p) => <PromptCard key={p.numero} p={p} />)}
      </div>

      <div className="prompts-group">
        <h2 className="prompts-group-title">Prompts — Claude (Desarrollo de la Auditoria)</h2>
        <p className="prompts-group-desc">
          Utilizados para construir y corregir los componentes React de la auditoria: revision inicial contra rubricas, correcciones de documentos, construccion de los 9 componentes e implementacion de imagenes e iconos.
        </p>
        {promptsClaudeData.map((p) => <PromptCard key={p.numero} p={p} />)}
      </div>

      <div className="prompts-group">
        <h2 className="prompts-group-title">Prompts — Claude (Estetica e Interfaz)</h2>
        <p className="prompts-group-desc">
          Utilizados para definir el diseno visual de la aplicacion web: navegacion, paleta de colores, tarjetas, iconos, header y footer. Estos prompts aplican a la interfaz independientemente del contenido del informe.
        </p>
        {promptsEsteticaData.map((p) => <PromptCard key={p.numero} p={p} />)}
      </div>

      <div className="card reflexion-ia">
        <h2 className="card-title">Reflexion Final sobre el Uso de IA</h2>
        <p>
          Se utilizaron dos herramientas de IA con roles claramente diferenciados. Gemini se
          empleo en la etapa de investigacion tecnica y redaccion de la auditoria, generando el
          contenido de los ocho archivos Markdown sobre las vulnerabilidades de CrediExpress.
          Claude se empleo en la etapa de desarrollo, construyendo la aplicacion React que
          presenta ese contenido y asegurando su coherencia con las rubricas de evaluacion.
        </p>
        <p className="mt-3">
          En ningun caso se acepto una respuesta sin revision critica. Las correcciones mas
          frecuentes con Gemini fueron ajustes de puntajes CVSS (el score de SQLi se corrigio
          de 9.8 a 9.4 tras verificar la calculadora de FIRST), adicion de activos omitidos y
          correccion de rutas de imagenes. Con Claude, las correcciones principales fueron la
          contextualizacion de ejemplos de codigo al dominio financiero de CrediExpress y la
          verificacion final de ausencia de emojis mediante script Python.
        </p>
        <p className="mt-3">
          La calidad del analisis de seguridad dependio en mayor medida del conocimiento tecnico
          de las vulnerabilidades, los activos en riesgo del sector financiero y los marcos de
          referencia (OWASP, NIST, CIS) que de la capacidad generativa de las herramientas.
          Estas funcionaron como aceleradores de productividad, pero la responsabilidad tecnica
          sobre el contenido recayo siempre en el auditor.
        </p>
      </div>
    </article>
  )
}
