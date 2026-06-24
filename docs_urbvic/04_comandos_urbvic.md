# 04. Análisis de Vulnerabilidad: Inyección de Comandos (Command Injection)

## 1. Evidencia del Ataque

* **Formulario Afectado:** Portal de Clientes - Sección "Command Injection".
* **Payload Utilizado:** `127.0.0.1; cat /etc/passwd`
* **Resultado Obtenido:** El sistema ejecutó el comando de red original (`ping`) y, debido a la falta de validación del carácter delimitador `;`, procedió a ejecutar el comando inyectado `cat /etc/passwd`, exponiendo en pantalla el archivo de configuración con el listado de usuarios del sistema operativo del servidor.

![Evidencia de Inyección de Comandos](img_urbvic/comandos_urbvic.png)

*Figura 3: Captura de pantalla que demuestra la ejecución de comandos arbitrarios en el sistema operativo del servidor de CrediExpress usando el payload `127.0.0.1; cat /etc/passwd`.*

---

## 2. Explicación Técnico-Operativa (¿Por qué funciona?)

La vulnerabilidad se produce porque la aplicación web de CrediExpress toma una entrada proporcionada por el usuario (en este caso, una dirección IP) y la pasa directamente a una función del sistema operativo a través de un shell del sistema, sin sanitizar los metacaracteres de control.

En el backend, el código ejecuta una instrucción similar a esta de forma insegura:

```bash
# Entrada normal: 127.0.0.1
ping -c 4 127.0.0.1
# Solo ejecuta el ping
```

Al ingresar el payload `127.0.0.1; cat /etc/passwd`, el intérprete de comandos de Linux procesa el punto y coma (`;`) como un **separador secuencial de instrucciones**:

```bash
# Entrada maliciosa: 127.0.0.1; cat /etc/passwd
ping -c 4 127.0.0.1; cat /etc/passwd
# Ejecuta el ping Y LUEGO lee /etc/passwd
```

Por lo tanto, el servidor ejecuta primero el comando legítimo (`ping`) y, justo después, el comando arbitrario del atacante (`cat /etc/passwd`) bajo los mismos privilegios del proceso del servidor web.

---

## 3. Clasificación de Gravedad CVSS v3.1

De acuerdo con la métrica estándar de FIRST, esta vulnerabilidad posee una severidad **Crítica**, representando el máximo riesgo técnico para la infraestructura de la organización.

| Métrica | Valor | Justificación |
| :--- | :--- | :--- |
| Vector de Ataque (AV) | Network (N) | La vulnerabilidad puede ser explotada de forma remota a través del Portal de Clientes expuesto a internet. |
| Complejidad del Ataque (AC) | Low (L) | No se requieren condiciones especiales; el uso de delimitadores de shell estándar es suficiente. |
| Privilegios Requeridos (PR) | Low (L) | Puede ser ejecutada por cualquier usuario común con acceso al portal de clientes. |
| Interacción del Usuario (UI) | None (N) | El atacante ejecuta el comando directamente en el servidor sin requerir la intervención de ningún cliente. |
| Alcance (S) | Changed (C) | El ataque se origina en la aplicación web pero logra tomar control del sistema operativo subyacente. |
| Confidencialidad (C) | High (H) | El atacante puede leer archivos del SO, claves de APIs financieras y credenciales de conexión a las bases de datos. |
| Integridad (I) | High (H) | El atacante puede modificar archivos del sistema, implantar web shells o borrar logs de auditoría. |
| Disponibilidad (A) | High (H) | Permite apagar el servidor, saturar sus recursos o eliminar directorios críticos de la aplicación. |

> **Puntaje Base CVSS v3.1 Estimado: 9.9 (Critical)**
> Vector: `CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H`

---

## 4. Política de Prevención (Causa Raíz)

Para erradicar por completo la inyección de comandos en el entorno operativo de CrediExpress, se deben aplicar las siguientes políticas de desarrollo seguro:

* **Evitar la Ejecución Directa de Comandos de Shell:** La mejor defensa es no invocar funciones que llamen directamente al shell del sistema operativo. Si se requiere realizar una validación de red (como un ping), se deben utilizar APIs nativas del lenguaje de programación o librerías específicas de red en lugar de ejecutar binarios del sistema operativo.

* **Uso de Funciones de Ejecución Segura (sin Shell):** Si la invocación es estrictamente necesaria, se deben usar funciones que pasen los argumentos como un arreglo de cadenas aisladas en lugar de una única cadena de texto.

```js
// VULNERABLE: pasa la entrada directamente al shell
const { exec } = require('child_process');
exec(`ping -c 4 ${userInput}`);

// SEGURO: argumentos separados, sin invocación de shell
const { execFile } = require('child_process');
execFile('ping', ['-c', '4', userInput], { shell: false });
```

---

## 5. Control de Mitigación (Defensa en Capas)

Como medidas defensivas complementarias basadas en los marcos **OWASP Top 10:2021 (A03 - Injection)** y **CIS Controls**:

* **Principio de Menor Privilegio a Nivel de OS:** Asegurar que el proceso del servidor web (por ejemplo, `www-data`) se ejecute bajo una cuenta de usuario con privilegios extremadamente limitados. Esta cuenta jamás debe tener privilegios de superusuario (`root`) ni permisos de ejecución en directorios del sistema.

* **Validación con Listas Blancas (Input Validation):** Implementar validaciones estrictas basadas en expresiones regulares en el backend antes de procesar cualquier dato. Si el campo espera una dirección IP, el sistema debe rechazar inmediatamente cualquier entrada que no cumpla el formato esperado.

```js
// Validar que el input sea estrictamente una dirección IP
const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
if (!ipRegex.test(userInput)) {
  return res.status(400).json({ error: 'Formato de IP inválido' });
}
```

* **Aislamiento del Entorno (Containerización):** Ejecutar la aplicación web dentro de un contenedor Docker configurado como Read-Only en su sistema de archivos. Esto limita drásticamente el daño potencial, impidiendo que el atacante acceda al sistema operativo anfitrión si logra comprometer el contenedor.