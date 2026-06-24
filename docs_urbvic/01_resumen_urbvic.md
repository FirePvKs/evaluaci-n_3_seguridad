# 01. Resumen Ejecutivo y Contexto de Negocio

## Contexto de la Organización y Entorno Operativo
CrediExpress es una casa de crédito orientada al otorgamiento de préstamos financieros mediante plataformas digitales. Como entidad financiera, la confianza, la confidencialidad y la integridad de los datos son los pilares fundamentales de la operación. 

La organización opera un **Portal de Clientes** centralizado que permite a los usuarios:
* Consultar el estado de sus créditos actuales.
* Visualizar su historial de pagos y cuotas pendientes.
* Acceder a su perfil financiero, que incluye el motor de *scoring* crediticio interno.

Este portal web se conecta directamente a bases de datos relacionales y servidores de aplicaciones que procesan información altamente sensible, lo que lo convierte en un objetivo lucrativo para actores maliciosos.

---

## Información Sensible Bajo Resguardo
El Portal de Clientes de CrediExpress gestiona y almacena activos de información críticos que, según las normativas vigentes y los estándares de la industria financiera (como los principios de OWASP y regulaciones locales), requieren el máximo nivel de protección:

* **Datos de Identificación Personal (PII):** Nombres completos, RUT, direcciones, correos electrónicos y teléfonos de contacto de los clientes.
* **Información Financiera y Bancaria:** Números de cuentas corrientes, historial de transacciones, estados de cuentas y solicitudes de crédito en curso.
* **Algoritmos y Resultados de Scoring Crediticio:** Evaluaciones de riesgo interno, capacidad de endeudamiento calculada y clasificaciones de comportamiento comercial.
* **Credenciales de Acceso:** Hashes de contraseñas, tokens de sesión y registros de auditoría de autenticación.

---

## Alcance y Objetivos de la Auditoría
El presente informe documenta una auditoría de seguridad técnica realizada sobre el Portal de Clientes de CrediExpress en un ambiente controlado de pruebas (DVWA) configurado bajo un nivel de seguridad inicial (*Low*).

### Objetivos Principales:
1. **Identificación y Explotación:** Demostrar de manera práctica la viabilidad de tres vectores de ataque críticos: Inyección SQL (SQLi), Cross-Site Scripting Reflejado (XSS Reflected) e Inyección de Comandos.
2. **Evaluación de Impacto Técnico:** Clasificar técnicamente la gravedad de cada vulnerabilidad utilizando la métrica estándar **CVSS v3.1**.
3. **Análisis de Riesgo de Negocio:** Traducir los hallazgos técnicos en impactos reales sobre la operación, las finanzas y la reputación de CrediExpress mediante la construcción de una Matriz de Riesgo.
4. **Diseño de Controles Defensivos:** Proponer políticas de prevención robustas que ataquen la causa raíz de las fallas y controles de mitigación alineados con marcos internacionales de ciberseguridad.