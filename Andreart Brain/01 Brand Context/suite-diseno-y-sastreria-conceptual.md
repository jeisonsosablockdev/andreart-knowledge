---
title: "Suite de Diseño de Moda y Sastrería Conceptual"
category: "01 Brand Context"
workflow: "skill-adaptation"
skills_used:
  - "fashion-designer"
  - "tailor"
  - "textile-engineer"
status: active
version: "1.0"
created_at: 2026-11-07
updated_at: 2026-11-07
tags:
  - marketing
  - brand-context
  - fashion-design
  - tailoring
  - textile-engineering
---

# Suite de Diseño de Moda y Sastrería Conceptual

> [!NOTE]
> **Resumen Ejecutivo:** Este documento compendia la suite técnica y creativa de diseño de modas, sastrería y selección textil adaptada al ADN de Andreart Vestuario (*Urban Fantasy Haute Couture*). Define el uso de los tres skills locales (`fashion-designer`, `tailor`, `textile-engineer`) para conceptualizar colecciones, patronar con moldería adaptable XS-XL y seleccionar textiles nobles resistentes al clima de Bogotá.

## 🎯 Contexto y Métricas Clave
- **Objetivo comercial:** Profesionalizar y estandarizar la creación de fichas técnicas, colecciones cápsula y especificaciones de confección artesanal bajo la dirección creativa de Andrea.
- **Público objetivo (ICP):** Adultos contemporáneos, profesionales del sector cultural y tecnológico que buscan vestir con distinción y porte épico en su vida cotidiana.
- **KPI Primario:** 100% de coherencia en siluetas, calce multitalle y durabilidad textil en nuevos desarrollos.

## 📋 Entregable Principal: Arquitectura de la Suite

### 1. `fashion-designer` (Dirección Creativa y Deconstrucción de Arquetipos)
- **Propósito:** Conceptualizar prendas de autor, colecciones cápsula atemporales, mood boards y fichas técnicas conceptuales (Tech Packs).
- **Enfoque Andreart:** Deconstrucción de arquetipos narrativos (mago, guardián, samurái, heroína cósmica) en siluetas funcionales de alta costura para uso diario en entornos urbanos y de oficina.
- **Ruta del Skill:** `MarketingAgentCore/skills/fashion-designer/`

### 2. `tailor` (Sastrería Conceptual y Moldería Inteligente)
- **Propósito:** Patronaje técnico, tolerancias de confección, construcción de cuellos y solapas, ensamble de forros satinados y sistemas de ajuste.
- **Enfoque Andreart:** Moldería adaptable de talla XS a XL mediante pretinas híbridas (delantero sastre plano, posterior elastizado/anudable), pliegues con volumen latente y tiros ergonómicos como los del Pantalón Hakama.
- **Ruta del Skill:** `MarketingAgentCore/skills/tailor/`

### 3. `textile-engineer` (Ingeniería Textil y Nobleza de Materiales)
- **Propósito:** Selección de tejidos por gramaje (GSM), ensayos de caída (*drape*), resistencia al frote continuo y comportamiento térmico.
- **Enfoque Andreart:** Materiales nobles y duraderos (gabardina de algodón de 280-340 GSM, paño de lana de 400-520 GSM, lino pesado de 240-290 GSM y forros satinados de alta densidad) aptos para el clima frío y de montaña (10°C a 20°C / Bogotá).
- **Ruta del Skill:** `MarketingAgentCore/skills/textile-engineer/`

---

## 🔄 Historial de Revisiones (Changelog)
- **v1.1 (2026-11-07):** Estandarización de nombres de skills a formato limpio sin prefijo mas- (`fashion-designer`, `tailor`, `textile-engineer`).
- **v1.0 (2026-11-07):** Creación inicial e integración formal de la suite de diseño y confección en el proyecto.

## 🧪 Validación y Próximos Pasos
- [x] Importación de skills upstream en `MarketingAgentCore/imported-skills/`
- [x] Adaptación de tres skills locales en `MarketingAgentCore/skills/`
- [x] Activación mediante enlaces simbólicos en `enable-project-skills.sh`
- [x] Superación del 100% de pruebas de idempotencia
- [ ] Aplicar `fashion-designer` en el próximo diseño de cápsula de invierno

## 🔗 Referencias Cruzadas
- Contexto maestro de marca: [[01 Brand Context/product-marketing-context.md]]
- Descripción de productos e insignia: [[01 Brand Context/Product Description.md]]
- Guía de estilo visual: [[01 Brand Context/Brand Visual Style Guide.md]]
