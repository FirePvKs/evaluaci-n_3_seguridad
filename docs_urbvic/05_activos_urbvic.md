# 05. Inventario de Activos de Información y Análisis de Riesgos

## 1. Identificación y Clasificación de Activos de Información
Para la operación segura del Portal de Clientes de CrediExpress, se han identificado y clasificado cinco (5) activos de información críticos. La clasificación se rige bajo los pilares de la seguridad de la información: **Confidencialidad (C)**, **Integridad (I)** y **Disponibilidad (A)**.

### Activo 1: Base de Datos de Clientes y Datos de Identificación Personal (PII)
* **Descripción:** Contiene los registros de identidad de los usuarios de la financiera (RUT, nombres, correos electrónicos, teléfonos, domicilios y contraseñas cifradas).
* **Vínculo con el Rubro:** Es el núcleo transaccional y de autenticación; esencial para validar la identidad de quienes solicitan y gestionan créditos.
* **Clasificación:**
  * **Confidencialidad:** Crítica (Alta)
  * **Integridad:** Crítica (Alta)
  * **Disponibilidad:** Alta

### Activo 2: Historial Financiero y Registro de Créditos
* **Descripción:** Tablas y registros lógicos que almacenan los estados de cuenta, montos otorgados, número de cuotas, saldos pendientes y el comportamiento de pago histórico de cada cliente.
* **Vínculo con el Rubro:** Representa el patrimonio contable de CrediExpress y el estado contractual de las deudas de los usuarios.
* **Clasificación:**
  * **Confidencialidad:** Crítica (Alta)
  * **Integridad:** Crítica (Alta)
  * **Disponibilidad:** Alta

### Activo 3: Motor y Resultados de Scoring Crediticio
* **Descripción:** Algoritmos internos y puntajes (*scores*) asignados a cada cliente que determinan de manera automática o semiautomática su nivel de riesgo y capacidad de endeudamiento.
* **Vínculo con el Rubro:** Es la ventaja competitiva y el núcleo de toma de decisiones de riesgo de la casa de crédito para mitigar la tasa de evasión de pagos.
* **Clasificación:**
  * **Confidencialidad:** Alta
  * **Integridad:** Crítica (Alta)
  * **Disponibilidad:** Media

### Activo 4: Sistema de Archivos y Servidor de Aplicaciones (Servidor Web)
* **Descripción:** La infraestructura lógica, sistema operativo del servidor, código fuente (React/Node.js) y archivos de configuración del portal web.
* **Vínculo con el Rubro:** Es la plataforma tecnológica que expone el servicio al cliente financiero a través de internet de manera ininterrumpida.
* **Clasificación:**
  * **Confidencialidad:** Alta
  * **Integridad:** Alta
  * **Disponibilidad:** Crítica (Alta)

### Activo 5: Tokens de Sesión Activos y Cookies de Autenticación
* **Descripción:** Identificadores temporales generados en memoria y almacenados en los navegadores para mantener las sesiones de los clientes activas de forma segura.
* **Vínculo con el Rubro:** Mecanismo de control de acceso inmediato que garantiza que un cliente solo visualice sus propios datos financieros y no los de terceros.
* **Clasificación:**
  * **Confidencialidad:** Crítica (Alta)
  * **Integridad:** Alta
  * **Disponibilidad:** Media

---

## 2. Asociación de Vulnerabilidades a los Activos en Riesgo
Cada una de las vulnerabilidades descubiertas en la auditoría web técnica (DVWA) tiene un impacto directo sobre uno o más activos específicos del negocio de CrediExpress:

### A. Impacto de Inyección SQL (SQLi) sobre los Activos[cite: 1]
* **Activos Directamente Afectados:** **Activo 1** (Base de Datos/PII), **Activo 2** (Historial Financiero) y **Activo 3** (Scoring Crediticio).
* **Análisis de Riesgo:** Al ingresar el payload explotado, se anula la restricción lógica de las consultas, permitiendo a un atacante extraer la base de datos completa de clientes. Esto compromete la **Confidencialidad** absoluta de la PII, los saldos de los créditos y los modelos de scoring, exponiendo a la empresa a multas legales severas y pérdida de confianza regulatoria.

### B. Impacto de Cross-Site Scripting Reflejado (XSS) sobre los Activos[cite: 1]
* **Activos Directamente Afectados:** **Activo 5** (Tokens de Sesión) y **Activo 1** (Datos Personales visibles en pantalla).
* **Análisis de Riesgo:** Al ejecutarse código JavaScript arbitrario en el navegador de la víctima, el atacante puede secuestrar el **Activo 5** (extrayendo cookies si carecen de protección). Con este token, el atacante puede suplantar la identidad del cliente afectado dentro de su portal, vulnerando la **Confidencialidad** y pudiendo visualizar historiales financieros o datos personales de forma ilegítima.

### C. Impacto de Inyección de Comandos sobre los Activos[cite: 1]
* **Activos Directamente Afectados:** **Activo 4** (Servidor de Aplicaciones), y por extensión indirecta, **todos** los activos anteriores (1, 2, 3 y 5).
* **Análisis de Riesgo:** Este hallazgo representa el riesgo de mayor espectro. Al comprometer el sistema operativo del servidor web con privilegios de ejecución, el atacante puede alterar, destruir o secuestrar el **Activo 4** (afectando la **Disponibilidad** total de CrediExpress). Asimismo, al controlar el servidor, gana la capacidad técnica para interceptar el código fuente, extraer credenciales de conexión locales y comprometer la **Integridad** y **Confidencialidad** de las bases de datos transaccionales conectadas.