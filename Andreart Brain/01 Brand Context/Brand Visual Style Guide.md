---
title: "Manual de Identidad Visual & Fuente de Estilo Artístico"
category: "01 Brand Context"
workflow: "W1_BRAND_STRATEGY"
skills_used:
  - "mas-product-marketing-context"
  - "mas-ad-creative"
status: approved
version: "2.0"
protected: true
created_at: 2026-08-09
updated_at: 2026-08-09
tags:
  - brand-identity
  - visual-style
  - art-direction
  - technical-drawing
  - cad-flat
  - color-palette
  - logo
---

# Manual de Identidad Visual & Fuente de Estilo Artístico: Andreart Vestuario

*Guía Maestra de Dirección de Arte, Paleta Cromática, Tipografía, Ficha Técnica CAD y Sistema de Prompts Visuales*  
*Location: 01 Brand Context / Brand Visual Style Guide*  
*Last updated: 2026-08-09*

> 🛡️ **Eslogan Oficial de Marca:** *"Sé tu propio héroe"*

---

## 📌 1. Principios Centrales de Identidad Visual

La identidad visual de **Andreart Vestuario** equilibra la **fantasía urbana conceptual** con el **rigor técnico del patronaje y la alta costura de Bogotá**. Cada publicación refleja un estándar editorial premium:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        ESTÁNDAR VISUAL DE ALTA COSTURA DE AUTOR                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • Slide 1 (Hero): Fotografía editorial vertical con iluminación violeta de taller.     │
│ • Slide 2 (Ficha CAD): Dibujo técnico vectorial (maniquí + prenda desglosada y cotas). │
│ • Slide 3 (Detalle): Macro textura de alta densidad y marquilla estampada suave (PAS). │
│ • Slide 4 (CTA): Fondo morado real liso (#3E2356), monograma blanco y slogan oficial.  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 2. Paleta Cromática Oficial

```mermaid
graph LR
    A["🟣 Deep Violet<br/>#3E2356<br/>(Fondo Maestro)"] --- B["🪻 Soft Lilac<br/>#CBBAD9<br/>(Acentos & PAS)"]
    B --- C["📜 Atelier Ivory / White<br/>#FFFFFF<br/>(Lienzo Ficha CAD)"]
    C --- D["🖤 Obsidian Charcoal<br/>#1E1B24<br/>(Línea Vectorial CAD)"]
    D --- E["⚪ Pure White<br/>#FFFFFF<br/>(Monograma Minimal)"]
```

| Color | Hex | RGB | Rol de Marca |
|---|---|---|---|
| **Deep Violet (Morado Real)** | `#3E2356` | `(62, 35, 86)` | Color maestro para fondos sólidos y slides de cierre. |
| **Soft Lilac (Lavanda Suave)** | `#CBBAD9` | `(203, 186, 217)` | Acentos sutiles, detalles luminosos y confort PAS. |
| **Atelier Canvas (Blanco Puro)** | `#FFFFFF` | `(255, 255, 255)` | Lienzo de alta visibilidad para fichas técnicas CAD. |
| **Obsidian Charcoal (Negro Vectorial)** | `#1E1B24` | `(30, 27, 36)` | Trazo técnico, líneas de costura y flechas de caída. |
| **Pure White (Blanco Puro)** | `#FFFFFF` | `(255, 255, 255)` | Monograma geométrico de autor y textos minimalistas. |

---

## ✒️ 3. Logotipo & Monograma Oficial

![[01 Brand Context/Brand Assets/andreart-logo-monogram.png]]

- **Monograma:** Composición geométrica lineal con una 'A' central entrelazada en líneas diagonales y diamante invertido.
- **Tipografía:** Letras mayúsculas `A N D R E A R T` de trazo fino geométrico con interletrado generoso (*tracking amplio*).

---

## 👗 4. Dirección de Arte & Estilo de Figurín (Ficha Técnica CAD de Patronaje)

![[01 Brand Context/Brand Assets/andreart-technical-figurine-cad-style.png]]

### Reglas de Diseño para el Slide 2 (Ficha Técnica CAD):
1. **Composición Dual de Alta Precisión:**
   - **Lado Izquierdo:** Maniquí/figura de moda estilizada vistiendo el conjunto completo con anotaciones de silueta.
   - **Lado Derecho:** Dibujo plano técnico vectorial (CAD Flat) de la prenda desglosada (pliegues profundos, costuras, pretinas, cierres, botas anchas).
2. **Línea Vectorial Nítida:** Trazo negro puro de alta definición sobre fondo blanco limpio (`#FFFFFF`), con flechas direccionales de caída de tela y líneas punteadas de costura.
3. **Anotaciones Técnicas en Mayúsculas:** Textos limpios con líneas guía indicadoras (`JACKET FR.`, `CROSSOVER CLOSURE`, `WAISTBAND TIE`, `DEEP PLEATS`, `WIDE CUFF`).
4. **Índice de Diseño:** Insignia técnica en la esquina inferior derecha (`DESIGN NO. 042`).

---

## 🤖 5. Sistema de Prompts & Generación de Imágenes (Motor Anti-Drift)

### 🌟 Tokens Positivos Obligatorios para Slide 2 (CAD Técnico):
```text
professional fashion technical flat drawing, CAD specification sheet, crisp black vector line art, pure white background, dual layout with stylized mannequin on left and flat garment pattern on right, precise tailoring seams, pleat direction arrows, neat uppercase callout annotations with leader lines, design index badge, haute couture blueprint
```

---

## 📸 6. Prompts Maestros por Tipo de Slide

### Slide 1: Portada Hero (Fotografía Limpia de Alto Impacto)
> **Prompt:** `High-fashion editorial vertical 4:5 portrait of a model wearing avant-garde [GARMENT], Andreart brand style, deep violet atmospheric studio lighting (#3E2356), soft lavender rim light (#CBBAD9), moody cinematic depth, uncluttered clean background, sharp focus, haute couture styling.`

### Slide 2: Figurín Técnico en Líneas (Ficha Técnica CAD de Patronaje)
> **Prompt:** `Professional fashion technical flat drawing and specification sheet of [GARMENT], in the exact artistic CAD style of the reference image, pure white background, crisp black vector line art. Left side shows a minimalist mannequin fashion figure wearing the ensemble. Right side shows the detailed technical flat drawing of the garment with seam lines, fabric drape arrows, and neat uppercase technical callout annotations with leader lines, and 'DESIGN NO. 042' at bottom right. High contrast, precise tailoring blueprints.`

### Slide 3: Planos Detalle & Confort PAS (Macro Textil Limpio)
> **Prompt:** `Professional macro photography of dark heavyweight luxury textile weave of [GARMENT] with soft lavender undertones (#CBBAD9), clean reinforced tailoring stitches, seamless printed tagless label, tactile comfort PAS, clean studio lighting, shallow depth of field, minimalist composition.`

### Slide 4: Slide de Conversión CTA (Ultra-Minimalista Oficial)
> **Prompt:** `Ultra-minimalist haute couture Instagram slide for Andreart, seamless flat solid deep royal violet background (#3E2356), vast empty negative space, perfectly centered clean white geometric Andreart logo monogram, minimal single-line elegant typography 'SÉ TU PROPIO HÉROE', clean refined luxury aesthetic, zero clutter, breathable and simple.`

---

## 🔄 Historial de Revisiones (Changelog)
- **v2.0 (2026-08-09):** Establecimiento oficial del Estilo Ficha Técnica CAD de Patronaje (maniquí con conjunto + plano técnico desglosado con cotas, flechas y anotaciones) para el Slide 2.
- **v1.1 (2026-08-09):** Refuerzo de limpieza visual y fondos despejados.
- **v1.0 (2026-08-09):** Creación inicial del manual de estilo.

---

## 🔗 Referencias Cruzadas
- Contexto de Marca: [[01 Brand Context/product-marketing-context.md]]
- Guía Técnica SOP: [[07 Paid, Social & Community/Social Content/Guia Tecnica de Produccion de Contenido.md]]
- Estrategia Maestra de Contenidos: [[02 Strategy & Research/Content Strategy/Master Content Strategy.md]]
