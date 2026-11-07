---
name: sdd-fashion-collection
description: Metodología Spec-Driven Development (SDD) para diseño y gestión de colecciones cápsula de autor en Andreart Vestuario. Úsalo cuando crees una nueva colección de moda, actualices siluetas o prendas, o necesites gestionar versiones limpias de bocetos técnicos y fotografías editoriales en carpetas autónomas. Compatible con Windows y macOS.
metadata:
  version: 1.0.0-mas
---

# Spec-Driven Collection Development (SDD) - Andreart Atelier

Este skill formaliza el desarrollo de colecciones cápsula de autor para **Andreart Vestuario** (*Urban Fantasy Haute Couture*) utilizando la metodología **Spec-Driven Development (SDD)**. 

Al igual que en la ingeniería de software donde una especificación rigurosa gobierna la implementación y las pruebas, en el diseño de moda conceptual el documento de especificación (`SPEC.md`) es la **única fuente de verdad** que rige la moldería, la paleta cromática, los textiles y los activos visuales.

---

## 🏛️ 1. Arquitectura de Carpeta Autónoma por Colección

Cada proyecto de colección vive en un directorio autocontenido e independiente dentro del vault:

```text
Andreart Brain/01 Brand Context/Colecciones/<slug-coleccion>/
├── SPEC.md                      # Especificación técnica maestra de colección
├── assets/                      # ÚNICAMENTE los activos visuales aprobados de la versión vigente
│   ├── 01-sketch-figurin-pantalon-globo.jpg
│   ├── 01-sketch-personaje-frente.jpg
│   ├── 04-sketch-chaqueta-frente.jpg
│   ├── 05-sketch-chaqueta-atras.jpg
│   ├── 06-sketch-pantalon-frente.jpg
│   ├── 07-sketch-pantalon-atras.jpg
│   └── 08-foto-realista-kokusen-hero.jpg
├── assets/.archive/             # Histórico de iteraciones y bocetos descartados
└── references/                  # Fotos de inspiración, insumos del cliente y referencias de patronaje
```

---

## 🔄 2. El Ciclo de 4 Fases: Spec-Driven Development (SDD)

```
┌────────────────────────────────────────────────────────┐
│ 1. SPEC DEFINITION (SPEC.md)                           │
│ Concepto, siluetas, moldería XS-XL, paleta Total Black │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ 2. ASSET GENERATION (Subagente Ilustrador)             │
│ Figurines y planos técnicos derivados del SPEC         │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ 3. AUDIT & USER VALIDATION                             │
│ Contraste de piezas visuales contra especificación     │
│ ¿Cambio requerido? -> Actualizar primero el SPEC.md    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ 4. ASSET PRUNING (prune-collection-versions.ts)        │
│ Aislar descartes en .archive/ y dejar assets/ 100% OK  │
└────────────────────────────────────────────────────────┘
```

### Fase 1: Redacción o Actualización de la Especificación (`SPEC.md`)
Antes de crear o modificar ilustraciones, actualiza el `SPEC.md`:
• **Concepto y Narrativa:** Deconstrucción del arquetipo sin caer en disfraces literales.
• **Moldería Inteligente:** Sistema adaptable multitalle (XS a XL) con pretinas sastre, elásticos ocultos o lazos.
• **Paleta Cromática Rigurosa:** Si es Total Black, forros al 100% en satín negro azabache, herrajes en níquel pavonado y cero contrastes involuntarios.
• **Fichas Técnicas:** Detallar medidas clave (ej. cuello chimenea de 11 cm, puños elásticos de 4 cm, pliegues de 3.5 cm).

### Fase 2: Generación Guiada de Activos Visuales
• **Estilo Taller de Autor:** Boceto a mano alzada sobre papel marfil frío (`#F6F4EE`), líneas visibles de grafito, trazo de tinta china y aguadas de acuarela negra con sello oficial Andreart.
• **Tipología de Entregables:**
  - Figurín protagónico individual de la prenda clave.
  - Figurín de conjunto completo de pasarela.
  - Planos técnicos individuales en plano (Flats delantero y trasero).
  - Fotografía editorial realista de lookbook de estudio.

### Fase 3: Auditoría y Refinamiento Incremental
• Si el usuario solicita un ajuste ("cambiar el pantalón", "poner ojaletes en el cuello"):
  1. Aplica la regla de refinamiento no destructivo.
  2. Actualiza primero la ficha técnica en el `SPEC.md` incrementando la versión (`v1.1`, `v1.2`, etc.).
  3. Produce la nueva iteración visual y reemplaza la referencia en el Markdown.

### Fase 4: Podado Automatizado de Versiones
Ejecuta el script TypeScript para auditar y archivar cualquier archivo que ya no esté referenciado en el `SPEC.md`:

```bash
# macOS / Linux
node MarketingAgentCore/scripts/prune-collection-versions.ts <nombre-coleccion>

# Windows (PowerShell / CMD)
node .\MarketingAgentCore\scripts\prune-collection-versions.ts <nombre-coleccion>
```

---

## 🛠️ 3. Comandos Multiplataforma (TypeScript)

| Acción | Comando (macOS / Linux) | Comando (Windows) |
| :--- | :--- | :--- |
| **Auditar activos** | `node MarketingAgentCore/scripts/prune-collection-versions.ts <slug> --inspect` | `node .\MarketingAgentCore\scripts\prune-collection-versions.ts <slug> --inspect` |
| **Simular podado** | `node MarketingAgentCore/scripts/prune-collection-versions.ts <slug> --dry-run` | `node .\MarketingAgentCore\scripts\prune-collection-versions.ts <slug> --dry-run` |
| **Podar y archivar** | `node MarketingAgentCore/scripts/prune-collection-versions.ts <slug>` | `node .\MarketingAgentCore\scripts\prune-collection-versions.ts <slug>` |
| **Eliminar permanentes** | `node MarketingAgentCore/scripts/prune-collection-versions.ts <slug> --hard` | `node .\MarketingAgentCore\scripts\prune-collection-versions.ts <slug> --hard` |

---

## 📋 4. Reglas Críticas de Marca para Colecciones
• **100% Lenguaje Afirmativo:** La propuesta de valor se sostiene en la nobleza de la sastrería, los materiales y el patronaje de autor. Cero comparaciones peyorativas con disfraces o moda desechable.  
• **Sobriedad y Madurez Estética:** Cero emojis decorativos por defecto. Usar viñetas tipográficas limpias (`•` o `-`).  
• **Disciplina de Archivos:** La carpeta `assets/` solo debe contener archivos formalmente vinculados en el `SPEC.md`. Todo insumo externo vive en `references/`.
