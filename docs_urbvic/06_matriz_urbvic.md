# 06. Matriz de Riesgo, Mapa de Calor y Priorización

## 1. Definición de Criterios de Evaluación
Para cuantificar los riesgos en CrediExpress, se establece una escala del 1 al 5 tanto para la Probabilidad como para el Impacto de Negocio, donde el riesgo final se calcula como:  
**Nivel de Riesgo = Probabilidad × Impacto**

### Escala de Probabilidad
1. **Muy Baja (1):** Teóricamente posible pero requiere condiciones extremadamente raras.
2. **Baja (2):** Requiere un alto esfuerzo o ingeniería social dirigida.
3. **Media (3):** La vulnerabilidad está expuesta y es descubrible con herramientas estándar.
4. **Alta (4):** Fácilmente explotable por un atacante con conocimientos básicos, sin barreras perimetrales.
5. **Muy Alta (5):** Explotación automatizada e inminente en el corto plazo si se descubre.

### Escala de Impacto (Financiero, Legal y Reputacional)
1. **Muy Bajo (1):** Sin impacto financiero ni exposición de datos. El cliente no lo nota.
2. **Bajo (2):** Afectación menor. Pérdidas financieras marginales recuperables de inmediato.
3. **Moderado (3):** Exposición parcial de datos de un cliente individual. Interrupción breve del portal web.
4. **Mayor (4):** Exposición masiva de datos personales (PII) o alteración de registros crediticios individuales. Sanciones legales intermedias.
5. **Catastrófico (5):** Compromiso total de la infraestructura, acceso completo a saldos, scoring crediticio e historiales de préstamos. Multas regulatorias máximas, demandas colectivas y quiebra reputacional.

---

## 2. Matriz de Riesgo y Justificación (Contexto CrediExpress)

| Vulnerabilidad | Probabilidad (1-5) | Impacto (1-5) | Valor de Riesgo | Clasificación del Riesgo |
| :--- | :---: | :---: | :---: | :--- |
| **Inyección de Comandos** | 3 | 5 | **15** | 🔴 Crítico / Muy Alto |
| **Inyección SQL (SQLi)** | 4 | 5 | **20** | 🔴 Crítico / Muy Alto |
| **XSS Reflejado** | 4 | 3 | **12** | 🟠 Alto / Moderado |

### Justificación de Cuantificación:
* **Inyección SQL (Riesgo: 20 - Crítico):** Se le asigna Probabilidad **Alta (4)** debido a que el formulario del portal web no realiza ninguna parametrización, permitiendo su hallazgo inmediato con escáneres automáticos. El Impacto es **Catastrófico (5)** porque la explotación masiva usando `' OR '1'='1` extrae la base de datos completa de clientes con sus PII, historiales de pago y motores de scoring, destruyendo el secreto financiero del negocio.
* **Inyección de Comandos (Riesgo: 15 - Crítico):** La Probabilidad se evalúa en **Media (3)** porque, aunque no tiene validaciones, suele requerir mapear los comandos exactos del sistema operativo subyacente[cite: 1]. El Impacto es **Catastrófico (5)** debido a que el payload `127.0.0.1; cat /etc/passwd` demuestra que el atacante ejecuta instrucciones directamente en el servidor central, facultándolo para borrar bitácoras, inyectar malware transaccional o botar la plataforma por completo[cite: 1].
* **XSS Reflejado (Riesgo: 12 - Alto):** Posee una Probabilidad **Alta (4)** dado que el reflejo de etiquetas `<script>` es directo y visible en la URL de respuesta. El Impacto es **Moderado (3)** en comparación con los anteriores, ya que requiere de la interacción del usuario (un clic en un enlace de phishing) y el daño inicial está acotado al secuestro de la sesión del cliente específico engañado.

---

## 3. Representación del Mapa de Calor Visual
*(Nota: Este mapa conceptual orienta la lógica del componente visual `Matriz.jsx` en React, usando un sistema de colores corporativo)*
IMPACTO ➔
[Muy Bajo: 1]  [Bajo: 2]   [Moderado: 3]  [Mayor: 4]   [Catastrófico: 5]
P ┌─────────────┬───────────┬──────────────┬────────────┬─────────────────┐
R │     (1)     │    (2)    │     (3)      │    (4)     │       (5)       │ 5 [Muy Alta]
O │     (2)     │    (4)    │     (6)      │    (8)     │      (10)       │ 4 [Alta] -> 🟠 XSS (12) en Imp:3 | 🔴 SQLi (20) en Imp:5
B │     (3)     │    (6)    │     (9)      │    (12)    │      (15)       │ 3 [Media]-> 🔴 Comandos (15) en Imp:5
A │     (4)     │    (8)    │     (12)     │    (16)    │      (20)       │ 2 [Baja]
🡫 │     (5)     │    (10)   │     (15)     │    (20)    │      (25)       │ 1 [Muy Baja]
└─────────────┴───────────┴──────────────┴────────────┴─────────────────┘

* **Leyenda:** 🟢 Bajo (1-4) | 🟡 Medio (5-9) | 🟠 Alto (10-14) | 🔴 Crítico (15-25)

---

## 4. Priorización de Vulnerabilidades para Mitigación
De acuerdo con el análisis combinado de la Matriz de Riesgo de negocio y los puntajes técnicos de severidad **CVSS v3.1** calculados en el Informe A, el orden de atención prioritario y obligatorio para CrediExpress es el siguiente[cite: 1, 2]:

1. **Prioridad 1: Inyección SQL (SQLi) [Riesgo de Negocio: 20 | CVSS: ~9.8]**
   * *Justificación:* Es la vulnerabilidad con el mayor puntaje de riesgo de negocio combinado. No requiere interacción de terceros y permite de forma inmediata el robo de la base de datos financiera central. Debe repararse de forma prioritaria debido a la inminencia de su explotación.
2. **Prioridad 2: Inyección de Comandos [Riesgo de Negocio: 15 | CVSS: ~10.0]**
   * *Justificación:* Aunque técnicamente su severidad CVSS es máxima debido al control completo sobre el sistema operativo, su probabilidad es marginalmente menor que la inyección SQL en un ambiente de producción web común. Sin embargo, su capacidad de destruir la disponibilidad del servicio la sitúa inmediatamente en segundo lugar de atención.
3. **Prioridad 3: Cross-Site Scripting Reflejado (XSS) [Riesgo de Negocio: 12 | CVSS: ~6.1]**
   * *Justificación:* Se posiciona al final de la cola de mitigación crítica. Pese a ser altamente probable, el impacto sistémico está acotado ya que requiere que el atacante logre engañar individualmente a cada cliente a través de un ataque complementario de phishing.