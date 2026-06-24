# 02. Análisis de Vulnerabilidad: Inyección SQL (SQLi)

## 1. Evidencia del Ataque
* [cite_start]**Formulario Afectado:** Portal de Clientes - Sección "SQL Injection".
* [cite_start]**Payload Utilizado:** `' OR '1'='1`.
* [cite_start]**Resultado Obtenido:** El sistema evadió la lógica de autenticación/filtrado de la consulta y expuso la totalidad de los registros de la base de datos de usuarios (IDs, nombres, apellidos y datos asociados).

![Evidencia de Inyección SQL](img_vicos/sqli_vicos.png)  
[cite_start]*Figura 1: Captura de pantalla que demuestra la extracción masiva de datos de clientes en el entorno controlado de CrediExpress usando el payload `' OR '1'='1`.* [cite: 33, 80, 92]

---

## 2. Explicación Técnica (¿Por qué funciona?)
[cite_start]La vulnerabilidad existe porque el portal de CrediExpress concatena directamente la entrada del usuario dentro de la cadena de la consulta SQL, sin realizar ninguna validación, sanitización o parametrización previa[cite: 80]. 

A nivel de código de backend, la consulta se procesa de una forma similar a la siguiente:
```sql
SELECT first_name, last_name FROM users WHERE user_id = '$USER_INPUT';
Al ingresar el payload ' OR '1'='1, la consulta final ejecutada por el motor de la base de datos se transforma en:
SELECT first_name, last_name FROM users WHERE user_id = '' OR '1'='1';
Dado que la condición '1'='1' siempre es verdadera (True), la cláusula WHERE se invalida por completo. Como consecuencia, el motor de la base de datos devuelve todos los registros almacenados en la tabla de usuarios, rompiendo el aislamiento de datos entre clientes.

3. Clasificación de Gravedad CVSS v3.1Utilizando la calculadora oficial de FIRST, se ha determinado que esta vulnerabilidad posee una severidad Alta / Crítica debido al impacto directo en el negocio financiero.  Vector de Ataque (AV): Network (N) - Se puede explotar de forma remota a través de internet.Complejidad del Ataque (AC): Low (L) - No requiere condiciones especiales; el payload es simple.  Privilegios Requeridos (PR): Low (L) / None (N) - Accesible por cualquier usuario autenticado en su portal.  Interacción del Usuario (UI): None (N) - No requiere que un tercero interactúe con el ataque.Alcance (S): Unchanged (U) - El impacto se mantiene dentro del mismo entorno de la base de datos.Confidencialidad (C): High (H) - Impacto crítico para CrediExpress: Expone de manera masiva los RUTs, datos de contacto, registros financieros y los resultados del scoring crediticio de todos los clientes.  Integridad (I): Low (L) / High (H) - Permite potencialmente la manipulación, alteración o borrado de registros de crédito si el usuario de la BD tiene permisos de escritura.Disponibilidad (A): Low (L) - Podría causar denegación de servicio indirecta si se extraen bases de datos masivas.Puntaje Base CVSS v3.1 Estimado: 8.8 - 9.8 (High/Critical) (Dependiendo de los privilegios del usuario de la BD de la aplicación).

4. Política de Prevención (Causa Raíz)Para erradicar esta vulnerabilidad desde la raíz, CrediExpress debe prohibir la concatenación directa de variables en cadenas SQL e implementar de manera obligatoria:Consultas Parametrizadas (Prepared Statements): El uso de marcadores de posición garantiza que el motor de la base de datos trate la entrada del usuario estrictamente como un dato (un string o un integer) y nunca como código ejecutable.  Ejemplo en Node.js/PDO: SELECT first_name, last_name FROM users WHERE user_id = ?;Uso de Object-Relational Mapping (ORM): Implementar herramientas como Sequelize, Prisma o Hibernate que parametrizan las consultas de forma nativa por defecto.

5. Control de Mitigación (Defensa en Capas)Como medidas complementarias de mitigación y defensa en profundidad, alineadas con los marcos de trabajo OWASP y NIST SP 800-53, se establecen los siguientes controles:  Principio de Menor Privilegio (BD): Configurar la cuenta de conexión de la aplicación web a la base de datos para que solo tenga los permisos estrictamente necesarios (SELECT, INSERT, UPDATE en tablas específicas), eliminando privilegios administrativos como DROP, ALTER o acceso a tablas del sistema (ej. information_schema).Implementación de un Web Application Firewall (WAF): Desplegar reglas de inspección en el WAF para detectar y bloquear en el borde peticiones HTTP que contengan caracteres sospechosos o patrones comunes de inyección SQL (como marcas de comentarios -- o expresiones OR 1=1).  Validación de Entradas (Input Validation): Implementar listas blancas en el backend para validar que el parámetro enviado coincida estrictamente con el tipo de dato esperado (por ejemplo, validar que el ID de usuario sea exclusivamente un número entero o un formato alfanumérico controlado).