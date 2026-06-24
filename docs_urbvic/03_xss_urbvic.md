# 03. Análisis de Vulnerabilidad: Cross-Site Scripting Reflejado (XSS Reflected)

## 1. Evidencia del Ataque
* **Formulario Afectado:** Portal de Clientes - Sección "XSS (Reflected)".
* **Payload Utilizado:** `<script>alert('XSS')</script>`
* **Resultado Obtenido:** La aplicación reflejó directamente el payload introducido en la respuesta HTTP, provocando que el navegador de la víctima interpretara las etiquetas HTML y ejecutara el código JavaScript, desplegando una ventana emergente de alerta.

![Evidencia de XSS Reflejado](img_vicos/xss_vicos.png)  
*Figura 2: Captura de pantalla que demuestra la ejecución exitosa de JavaScript arbitrario en el navegador de la víctima en el Portal de CrediExpress usando el payload `<script>alert('XSS')</script>`.*

---

## 2. Explicación Técnica (¿Por qué funciona?)
La vulnerabilidad de XSS Reflejado se presenta cuando la aplicación web de CrediExpress toma datos proporcionados por el usuario mediante una petición HTTP (por ejemplo, parámetros URL o valores de un formulario de búsqueda) y los incluye inmediatamente dentro de la página web de respuesta sin aplicar mecanismos de sanitización ni codificación de caracteres.

Al no existir un filtro, el navegador no puede distinguir entre el código legítimo provisto por la aplicación y el código malicioso inyectado por el atacante. En consecuencia, el motor de JavaScript del navegador procesa y ejecuta de forma automática los scripts maliciosos insertados bajo el contexto de seguridad de la sesión activa del usuario afectado.

---

## 3. Clasificación de Gravedad CVSS v3.1
De acuerdo con la métrica estándar de FIRST, esta vulnerabilidad posee una severidad **Media / Alta** en un entorno financiero real.

* **Vector de Ataque (AV):** Network (N) - El ataque puede ser distribuido remotamente (por ejemplo, enviando un enlace malicioso por correo o phishing a clientes de CrediExpress).
* **Complejidad del Ataque (AC):** Low (L) - No se requieren condiciones complejas ni configuraciones especiales para su ejecución.
* **Privilegios Requeridos (PR):** None (N) - No se necesita tener privilegios elevados para preparar y lanzar el ataque en la URL.
* **Interacción del Usuario (UI):** Required (R) - **Crítico:** Exige que la víctima haga clic en el enlace malicioso generado por el atacante para gatillar el reflejo en su navegador.
* **Alcance (S):** Changed (C) - **Impacto Técnico Elevado:** El script se ejecuta en el navegador de la víctima, permitiendo atacar el entorno del software cliente fuera del servidor web original.
* **Confidencialidad (C):** Low (L) / Medium (M) - Permite al atacante acceder a cookies de sesión (si no tienen flag *HttpOnly*), tokens de autenticación de la cuenta corriente/créditos y datos desplegados en la pantalla del usuario.
* **Integridad (I):** Low (L) - Permite modificar visualmente la interfaz del portal bancario (deformación web o *defacement*) o insertar formularios falsos de captura de datos (phishing localizado).
* **Disponibilidad (A):** None (N) - Generalmente no compromete la disponibilidad de los servidores centrales de la financiera.

> **Puntaje Base CVSS v3.1 Estimado:** **6.1 - 7.5 (Medium/High)** (Determinado principalmente por el cambio en el alcance (*Scope*) del ataque).

---

## 4. Política de Prevención (Causa Raíz)
Para neutralizar de raíz los ataques XSS, CrediExpress debe adoptar una política estricta de manejo seguro de datos en la interfaz de usuario:

* **Codificación de Salida (Context-Aware Output Encoding):** Asegurar que cualquier dato dinámico reflejado en el HTML sea codificado antes de ser renderizado. Los caracteres especiales con significado en HTML/JavaScript deben transformarse en sus entidades seguras equivalentes (por ejemplo, convertir `<` en `&lt;`, `>` en `&gt;` y `"` en `&quot;`). En React, el uso por defecto de `{expresiones}` aplica esta protección automáticamente, a menos que se use de forma insegura la propiedad `dangerouslySetInnerHTML`.
* **Sanitización de Entradas:** Filtrar y limpiar rigurosamente cualquier entrada HTML que sea legítimamente permitida, utilizando librerías robustas y ampliamente probadas en la industria como **DOMPurify**.

---

## 5. Control de Mitigación (Defensa en Capas)
Como salvaguardas perimetrales y de configuración en capas basadas en las guías **OWASP ASVS** y **NIST**, se definen los siguientes controles mitigatorios:

1. **Implementación de Content Security Policy (CSP):** Configurar un encabezado HTTP de Política de Seguridad de Contenido robusto en los servidores web de CrediExpress. Una política restrictiva (por ejemplo, `default-src 'self'; script-src 'self'`) instruye al navegador para que solo ejecute scripts provenientes de fuentes explícitamente autorizadas, bloqueando por completo la ejecución de scripts *inline* (como el payload inyectado) o código de terceros no verificado.
2. **Atributos de Cookies de Sesión Seguros:** Configurar de forma obligatoria la bandera **`HttpOnly`** en todas las cookies encargadas de manejar las sesiones y tokens de los clientes financieros. Esto evita que los scripts maliciosos inyectados por XSS puedan acceder a las cookies de autenticación mediante `document.cookie`, mitigando por completo el riesgo de secuestro de cuentas (*Session Hijacking*).
3. **Uso de la cabecera X-XSS-Protection:** Aunque los navegadores modernos confían más en las políticas CSP, configurar la cabecera `X-XSS-Protection: 1; mode=block` añade una capa adicional de protección retrocompatible para navegadores antiguos de clientes.