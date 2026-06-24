# 08. Mejora Tecnológica y Plan de Recuperación ante Desastres (DRP)

Para garantizar la resiliencia operativa de **CrediExpress**, este documento define las actualizaciones de arquitectura necesarias para minimizar la superficie de ataque y el Plan de Recuperación ante Desastres (Disaster Recovery Plan) diseñado para restablecer la disponibilidad e integridad de los datos financieros tras un incidente de seguridad crítico[cite: 2].

---

## 1. Propuesta de Mejoras Tecnológicas (Arquitectura de Seguridad)
Alineado con los estándares **CIS Controls** y **NIST SP 800-53**, se propone transformar el modelo operativo del Portal de Clientes mediante tres pilares arquitectónicos avanzados[cite: 2]:

### A. Implementación de un Web Application Firewall (WAF) de Siguiente Generación
*   **Acción:** Desplegar una capa perimetral basada en la nube (como Cloudflare Enterprise o AWS WAF) antes de que el tráfico HTTP llegue a los servidores de CrediExpress.
*   **Propósito:** Inspeccionar en tiempo real las solicitudes entrantes mediante firmas actualizadas de OWASP, deteniendo los intentos de Inyección SQL, XSS e Inyección de Comandos en el borde de la red, bloqueando las IPs maliciosas antes de que interactúen con el backend.

### B. Segmentación de Redes y Zonas Desmilitarizadas (DMZ)
*   **Acción:** Aislar la arquitectura en tres capas de red estrictamente diferenciadas mediante firewalls internos:
    1.  **Capa de Presentación (DMZ):** Aloja exclusivamente los servidores web que renderizan el Portal de Clientes.
    2.  **Capa de Aplicación:** Aloja la lógica de negocios y las APIs financieras (Node.js). Solo acepta peticiones provenientes de la DMZ.
    3.  **Capa de Datos:** Aloja la Base de Datos central y el motor de scoring crediticio. Está completamente aislada de Internet; solo acepta conexiones de la capa de aplicación mediante puertos específicos (ej. 5432 para PostgreSQL).

### C. Pipeline de Integración Continua con Pruebas de Seguridad (DevSecOps)
*   **Acción:** Integrar herramientas de análisis estático (SAST) como SonarQube y escáneres de dependencias de código en el repositorio de GitHub corporativo.
*   **Propósito:** Analizar automáticamente cada commit realizado por el equipo de desarrollo, bloqueando los despliegues a producción si se detectan patrones de código vulnerables (como concatenaciones SQL o funciones de ejecución de comandos directas de shell)[cite: 1].

---

## 2. Plan de Recuperación ante Desastres (DRP)
Este plan entra en acción si un atacante logra explotar con éxito una inyección de comandos o un SQLi crítico, comprometiendo el servidor o alterando tablas de créditos.
┌────────────────────────────────────────────────────────┐
│               DETECCIÓN DEL INCIDENTE                  │
│       (Alertas WAF, SIEM o anomalías en BD)            │
└───────────────────────────┬────────────────────────────┘
▼
┌────────────────────────────────────────────────────────┐
│               FASE 1: AISLAMIENTO                     │
│    (Revocación de tokens, desconexión de red de DMZ)   │
└───────────────────────────┬────────────────────────────┘
▼
┌────────────────────────────────────────────────────────┐
│            FASE 2: ANÁLISIS Y LIMPIEZA                 │
│      (Auditoría forense, parchado de código raíz)      │
└───────────────────────────┬────────────────────────────┘
▼
┌────────────────────────────────────────────────────────┐
│             FASE 3: RESTAURACIÓN (DRP)                 │
│    (Despliegue de ambiente limpio e inyección de BD)   │
└───────────────────────────┬────────────────────────────┘
▼
┌────────────────────────────────────────────────────────┐
│       FASE 4: NOTIFICACIÓN Y CIERRE (POST-MORTEM)      │
│  (Reporte a la CMF, comunicación legal a clientes)     │
└────────────────────────────────────────────────────────┘

### Estrategia de Respaldos (Backup)
*   **Política 3-2-1:** Mantener 3 copias de los datos de la base de datos (PII, créditos y scoring), en 2 soportes diferentes, con al menos 1 copia guardada en una ubicación física/nube distinta (Off-site) completamente aislada del entorno productivo principal.
*   **Frecuencia:** Respaldos incrementales cada 1 hora y respaldos completos (*Full Backups*) cada 24 horas a la medianoche de forma automatizada y cifrada con el algoritmo AES-256.

### Procedimiento de Restauración y Levantamiento
En caso de pérdida de integridad o destrucción del entorno productivo (ej. alteración maliciosa mediante SQLi o borrado del servidor vía inyección de comandos)[cite: 1]:
1.  **Aislamiento Inmediato:** El equipo de operaciones coloca el Portal de Clientes en modo mantenimiento y revoca todas las credenciales actuales de conexión de la base de datos.
2.  **Aprovisionamiento Limpio (Infraestructura como Código):** Se levanta una instancia de servidor web completamente nueva y vacía utilizando scripts automatizados (Docker/Terraform), garantizando que cualquier malware insertado por el atacante en el sistema de archivos anterior sea erradicado.
3.  **Aplicación de Parches:** Se despliega la versión del código fuente que ya posee la corrección técnica de la vulnerabilidad explotada.
4.  **Restauración del Estado Financiero:** Se toma el último respaldo de base de datos verificado como íntegro (previo al ataque). Se ejecuta un proceso de validación contable interna para asegurar la consistencia de los créditos históricos antes de reconectar el portal.

### Protocolo de Notificaciones y Cumplimiento Legal
Dado el rubro financiero de CrediExpress, el flujo de notificaciones post-incidente se rige bajo estrictos canales formales y legales:
*   **Autoridades Regulatorias (Chile):** De acuerdo a las normativas de la Comisión para el Mercado Financiero (CMF) y la ley de protección de datos personales, el Oficial de Seguridad de la Información (CISO) debe reportar el incidente y su alcance en un plazo máximo de 4 horas tras su confirmación.
*   **Clientes Afectados:** En un plazo máximo de 24 horas, la gerencia de comunicaciones enviará un aviso formal exclusivo a los clientes cuyos datos personales o financieros se hayan visto comprometidos por el incidente. La notificación incluirá las medidas adoptadas por la empresa y la recomendación obligatoria de restablecer sus credenciales de acceso.