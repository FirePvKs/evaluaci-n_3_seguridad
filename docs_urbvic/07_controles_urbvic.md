# 07. Políticas de Prevención y Controles de Mitigación

Para proteger el Portal de Clientes de CrediExpress, se establece un marco de control estructurado que separa las **Políticas de Prevención** (acciones que eliminan la causa raíz en el código fuente) de los **Controles de Mitigación** (salvaguardas operativas y perimetrales que reducen la probabilidad y el impacto en producción).

Este plan se fundamenta directamente en las directrices internacionales de **OWASP Top 10:2021** y los controles de seguridad de **NIST SP 800-53 Rev. 5**[cite: 2].

---

## 1. Plan de Control para Riesgos Críticos (Zonas Rojas / Naranjas)

### 🚨 Prioridad 1: Inyección SQL (SQLi)
*   **Referencia de Marco:** OWASP A03:2021-Injection / NIST SP 800-53 (SI-10: *Information Input Validation*).
*   **Política de Prevención (Causa Raíz):** 
    *   Queda estrictamente prohibido el uso de consultas SQL construidas mediante concatenación manual de variables de usuario. 
    *   Todo desarrollo nuevo o actualización en el portal financiero debe implementar obligatoriamente **Consultas Parametrizadas (Prepared Statements)** o el uso estricto de un mapeador de objetos relacionales (ORM como Prisma o Sequelize). Esto garantiza la separación física entre las instrucciones lógicas del motor SQL y los datos introducidos por el cliente.
*   **Controles de Mitigación:**
    *   **Control Perimetral:** Configurar y actualizar diariamente el set de reglas del Web Application Firewall (WAF) corporativo para interceptar, alertar y bloquear de forma automática peticiones HTTP entrantes con patrones característicos de inyección de código (por ejemplo, firmas de ataques que incluyan estructuras lógicas como `' OR 1=1`).
    *   **Aislamiento de Privilegios:** Modificar el perfil de conexión de la aplicación web a la base de datos de producción. El usuario asignado debe operar bajo el principio de menor privilegio, eliminando permisos administrativos del sistema (ej. `DROP`, `ALTER`) y limitándolo únicamente a sentencias de lectura y escritura (`SELECT`, `INSERT`, `UPDATE`) en las tablas esenciales del negocio de créditos.

### 🚨 Prioridad 2: Inyección de Comandos (Command Injection)
*   **Referencia de Marco:** OWASP A03:2021-Injection / NIST SP 800-53 (SI-16: *Memory Protection / Execution Control*).
*   **Política de Prevención (Causa Raíz):**
    *   Se prohíbe el uso de funciones del sistema de ejecución directa en la shell (tales como `exec()`, `system()`, o `shell_exec()`) que utilicen entradas directas del cliente[cite: 1].
    *   Cualquier requerimiento del sistema operativo que deba ser invocado de manera indispensable (por ejemplo, llamadas a utilidades de red) deberá procesarse utilizando APIs nativas del lenguaje de programación o mediante la ejecución de arreglos de argumentos aislados sin invocación de shell (ej. `child_process.execFile` con argumentos separados), neutralizando por completo el uso de delimitadores como `;`, `&&` o `|`[cite: 1].
*   **Controles de Mitigación:**
    *   **Validación Estricta de Entradas (Sanitización):** Implementar filtros en el servidor que rechacen de forma inmediata cualquier entrada de texto que no cumpla de manera exacta con una expresión regular restrictiva (por ejemplo, si el formulario solicita una IP, validar únicamente caracteres numéricos y puntos `^([0-9]{1,3}\.){3}[0-9]{1,3}$`, descartando automáticamente cualquier carácter especial).
    *   **Restricción de Entorno (Hardening de Sistema Operativo):** Configurar el proceso del servidor web para que corra en un usuario dedicado del sistema con nulos privilegios de administración (ej. `nobody` o `www-data`). Este usuario no debe poseer acceso de ejecución en directorios de sistema sensibles ni permisos para invocar comandos críticos (como `cat`, `sh`, `bash`, `sudo`).

### 🟠 Prioridad 3: Cross-Site Scripting Reflejado (XSS Reflected)
*   **Referencia de Marco:** OWASP A03:2021-Injection (subcategoría XSS) / NIST SP 800-53 (SI-11: *Error Handling / Output Sanitization*).
*   **Política de Prevención (Causa Raíz):**
    *   Se establece como estándar obligatorio de desarrollo la **Codificación de Salida Contextual (Output Encoding)** para todos los datos dinámicos que se muestren en el Portal de Clientes. Los caracteres con significado en HTML (`<`, `>`, `"`, `'`, `&`) deben convertirse a sus entidades seguras equivalentes antes de renderizarse. 
    *   Al utilizar React para el front-end del proyecto, se debe velar por el comportamiento por defecto de la plataforma que sanitiza las salidas de texto de manera nativa, prohibiendo taxativamente el uso de la propiedad insegura `dangerouslySetInnerHTML` a menos que sea autorizada explícitamente tras una revisión de código.
*   **Controles de Mitigación:**
    *   **Seguridad de Cookies:** Configurar en el servidor el envío obligatorio de los atributos de seguridad **`HttpOnly`** y **`Secure`** en todas las cookies de autenticación de clientes de CrediExpress. El flag `HttpOnly` imposibilita el robo de sesiones mediante scripts inyectados en el navegador a través de `document.cookie`.
    *   **Cabeceras de Seguridad:** Forzar la inyección de la cabecera HTTP **`Content-Security-Policy` (CSP)** con directivas estrictas (ej. `default-src 'self'; script-src 'self'`), lo que previene que los navegadores web de los clientes procesen código JavaScript *inline* malicioso o scripts provenientes de servidores externos controlados por atacantes.

---

## 2. Resumen de Gobernanza de Controles

| ID Riesgo | Vulnerabilidad | Marco de Referencia Primario | Responsable del Control | Frecuencia de Revisión |
| :--- | :--- | :--- | :--- | :--- |
| **CRIT-01** | Inyección SQL | OWASP A03 / NIST SI-10 | Equipo de Desarrollo / Administrador de BD | En cada Commit / Auditoría Trimestral |
| **CRIT-02** | Inyección de Comandos | OWASP A03 / NIST SI-16 | Administrador de Infraestructura / DevSecOps | Despliegue de Código / Escaneo de Vulnerabilidades Mensual |
| **ALTO-01** | XSS Reflejado | OWASP A03 / NIST SI-11 | Desarrolladores Frontend / Diseñadores Web | En cada sprint / Revisión Automatizada de Dependencias |