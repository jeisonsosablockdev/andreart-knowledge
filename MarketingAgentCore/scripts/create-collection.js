#!/usr/bin/env node

/**
 * Fashion Collection Generator for AndreArt Vestuario (Urban Fantasy Haute Couture)
 * Generates structured capsule collection deliverables connecting fashion-designer,
 * tailor, and textile-engineer with the Obsidian vault.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../..');
const VAULT_COLLECTIONS_DIR = path.join(ROOT_DIR, 'Andreart Brain', '01 Brand Context', 'Colecciones');
const TEMPLATE_PATH = path.join(ROOT_DIR, 'MarketingAgentCore', 'templates', 'collection-template.md');

const MONTH_NAMES_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function sanitizeSlug(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getMonthYearString() {
  const d = new Date();
  const month = MONTH_NAMES_ES[d.getMonth()];
  const year = d.getFullYear();
  return `${month}-${year}`;
}

/**
 * Generate default capsule pieces if custom pieces are not provided
 */
function buildDefaultPieces(heroName, concept) {
  return [
    {
      nombre: heroName || 'Capa de Autor y Vuelo Estructurado',
      tipo: 'Prenda Insignia (Exterior)',
      silueta: 'Estructurada con hombros amplios y caída solemne',
      textil: 'Paño de lana noble (420 GSM) con forro de satín oscuro',
      molderia: 'Multitalla adaptable XS-XL con cruce envolvente y sisa amplia',
      sku: 'ANDR-CAP-01'
    },
    {
      nombre: 'Pantalón Hakama Plisado',
      tipo: 'Prenda Inferior Insignia',
      silueta: 'Volumen amplio con quiebre vertical nítido',
      textil: 'Gabardina de algodón pesada (300 GSM) de alta recuperación',
      molderia: 'Pretina híbrida (frontal plana sastre, posterior elástica con lazos)',
      sku: 'ANDR-HAK-01'
    },
    {
      nombre: 'Kimono Corto Urbano Deconstruido',
      tipo: 'Prenda Media / Chaqueta Liviana',
      silueta: 'Corte recto con solapa geométrica cruzada',
      textil: 'Sarga técnica satinada (260 GSM) semimate',
      molderia: 'Caída de hombro natural con ajuste mediante cinta interior',
      sku: 'ANDR-KIM-01'
    },
    {
      nombre: 'Camisa de Cuello Mao y Puño Prolongado',
      tipo: 'Prenda Base Superior',
      silueta: 'Líneas limpias y botonadura oculta con puño estilizado',
      textil: 'Algodón peinado con hilado denso (180 GSM)',
      molderia: 'Entalle contemporáneo con holgura anatómica de movimiento',
      sku: 'ANDR-CAM-01'
    }
  ];
}

function formatPiecesTable(pieces) {
  let table = '| Pieza | Tipología | Silueta y Porte | Textil Recomendado | Moldería Adaptable | SKU |\n';
  table += '| :--- | :--- | :--- | :--- | :--- | :--- |\n';
  pieces.forEach(p => {
    table += `| **${p.nombre}** | ${p.tipo} | ${p.silueta} | ${p.textil} | ${p.molderia} | \`${p.sku}\` |\n`;
  });
  return table;
}

function formatTechnicalSpecs(pieces) {
  let specs = '';
  pieces.forEach((p, idx) => {
    specs += `### 5.${idx + 1}. ${p.nombre} (\`${p.sku}\`)\n`;
    specs += `• **Construcción y Acabados de Sastrería:** Costuras estructurales reforzadas a 12 PPP, pespuntes a tono y vivos interiores limpios.\n`;
    specs += `• **Sistema de Ajuste:** ${p.molderia}.\n`;
    specs += `• **Especificación Textil:** ${p.textil}.\n`;
    specs += `• **Tolerancias de Confección:** $\\pm 0.5\\text{ cm}$ en anchos de costura; dobladillos anchos con puntada oculta.\n\n`;
  });
  return specs.trim();
}

/**
 * Main Collection Creator Function
 */
function createCollection(options = {}) {
  const {
    name,
    concept = 'Deconstrucción contemporánea de arquetipos épicos y estética oriental',
    hero = 'Sobretodo Épico de Alta Costura',
    season = 'Atemporal / Climas Fríos y Montaña (Bogotá)',
    palette = 'Negro carbón, azul medianoche, grafito y forros en vino tinto tenue',
    pieces,
    outDir = VAULT_COLLECTIONS_DIR,
    force = false,
    date = getTodayString()
  } = options;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('El parámetro "name" (nombre de la colección) es obligatorio.');
  }

  const collectionName = name.trim();
  const slug = sanitizeSlug(collectionName);
  const monthYear = getMonthYearString();
  const fileName = `coleccion-${slug}-${monthYear}.md`;
  const targetDir = outDir;
  const targetPath = path.join(targetDir, fileName);

  ensureDir(targetDir);

  if (fs.existsSync(targetPath) && !force) {
    const relPath = path.relative(ROOT_DIR, targetPath);
    const err = new Error(
      `ERROR DE PROTECCIÓN: El archivo "${fileName}" ya existe en "${relPath}".\n` +
      `Para refinarlo de forma segura sin sobrescribir, utiliza:\n` +
      `bash MarketingAgentCore/scripts/refine-note.sh refine "${relPath}" "Tu resumen"\n` +
      `O añade el flag "--force" si deseas regenerarlo por completo.`
    );
    err.code = 'EEXIST';
    throw err;
  }

  // Load template
  let templateContent = '';
  if (fs.existsSync(TEMPLATE_PATH)) {
    templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  } else {
    throw new Error(`Plantilla no encontrada en: ${TEMPLATE_PATH}`);
  }

  const capsulePieces = (Array.isArray(pieces) && pieces.length > 0)
    ? pieces
    : buildDefaultPieces(hero, concept);

  const executiveSummary = `Colección cápsula de autor "${collectionName}". Integra el concepto rector de ${concept} con prendas estructuradas de moldería inteligente adaptable (XS a XL), selección textil noble de alto gramaje para clima frío y acabados de sastrería de alta gama.`;

  const creativeManifesto = `La colección "${collectionName}" nace de la exploración visual y narrativa de arquetipos atemporales traducidos a la sofisticación de la vida urbana moderna. Andrea deconstruye las siluetas dramáticas de la fantasía y la tradición oriental en prendas versátiles, sobrias y contundentes, concebidas para vestir con distinción en el entorno profesional y cotidiano.`;

  const piecesTable = formatPiecesTable(capsulePieces);
  const technicalSpecs = formatTechnicalSpecs(capsulePieces);

  const stylingUrban = `Combina el **Pantalón Hakama** con calzado de cuero sobrio (botas chelsea o zapatos sastre) y una camisa blanca o jersey de cuello cisne. La prenda ancla aporta distinción y porte sin saturar el entorno corporativo o creativo.`;

  const stylingEvents = `Superpón la **${hero}** sobre un atuendo monocromático en negro azabache o grafito. Los forros satinados en contraste oscuro y el movimiento gravitacional del faldón generan un impacto escénico elegante en aperturas culturales, convenciones de autor y galas.`;

  // Colors breakdown
  const paletteBase = 'Negro azabache (#0D0D0E), Gris carbón (#1C1D21) y Grafito (#2A2C33).';
  const paletteNarrative = 'Azul medianoche (#141926), Verde bosque profundo (#15201A) y Tabaco cálido (#2B1E17).';
  const paletteAccent = 'Satín vino tinto oscuro (#3B131E) y Bronce envejecido (#5C4A28) en forros y vivos interiores.';

  // Replacements
  let output = templateContent
    .replace(/\{\{NOMBRE_COLECCION\}\}/g, collectionName)
    .replace(/\{\{SLUG\}\}/g, slug)
    .replace(/\{\{CONCEPTO_NARRATIVO\}\}/g, concept)
    .replace(/\{\{TEMPORADA\}\}/g, season)
    .replace(/\{\{PALETA_CROMATICA\}\}/g, palette)
    .replace(/\{\{PRENDA_HEROE\}\}/g, hero)
    .replace(/\{\{TEXTIL_HEROE\}\}/g, 'Paño de lana peinada (420 GSM) con cuerpo firme y forro de satín oscuro de alta densidad')
    .replace(/\{\{FECHA\}\}/g, date)
    .replace(/\{\{MES_ANO\}\}/g, monthYear)
    .replace(/\{\{RESUMEN_EJECUTIVO\}\}/g, executiveSummary)
    .replace(/\{\{MANIFIESTO_CREATIVO\}\}/g, creativeManifesto)
    .replace(/\{\{COLORES_BASE\}\}/g, paletteBase)
    .replace(/\{\{COLORES_NARRATIVOS\}\}/g, paletteNarrative)
    .replace(/\{\{COLORES_ACENTO\}\}/g, paletteAccent)
    .replace(/\{\{TABLA_PRENDAS\}\}/g, piecesTable)
    .replace(/\{\{ESPECIFICACIONES_TEXTILES\}\}/g, technicalSpecs)
    .replace(/\{\{ESTILISMO_URBANO\}\}/g, stylingUrban)
    .replace(/\{\{ESTILISMO_EVENTOS\}\}/g, stylingEvents);

  fs.writeFileSync(targetPath, output, 'utf8');

  return {
    filePath: targetPath,
    fileName,
    relativeVaultPath: path.relative(ROOT_DIR, targetPath),
    collectionName,
    slug,
    piecesCount: capsulePieces.length
  };
}

// -------------------------------------------------------------
// CLI EXECUTION HANDLER
// -------------------------------------------------------------

function runCli() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    console.log(`
Uso:
  create-collection "<nombre-coleccion>" [concepto] [prenda-heroe] [temporada] [paleta]

Opciones vía Flags:
  --name <nombre>          Nombre oficial de la colección (obligatorio)
  --concept <concepto>     Universo narrativo o deconstrucción estética
  --hero <prenda>          Prenda Insignia / Héroe de la cápsula
  --season <temporada>     Temporada o clima (ej. "Otoño / Invierno Bogotá")
  --palette <paleta>       Paleta de color y contrastes
  --config <path.json>     Archivo JSON con especificación de piezas y datos
  --out-dir <directorio>   Ruta de salida personalizada en el vault
  --force                  Sobrescribir si el archivo ya existe

Ejemplos:
  bash MarketingAgentCore/scripts/create-collection.sh "Sombras de Kioto" "Samurái urbano y misterio oriental" "Sobretodo Haori de Lana"
  bash MarketingAgentCore/scripts/create-collection.sh --name "Vanguardia Estelar" --hero "Capa Comandante Interestelar"
`);
    process.exit(0);
  }

  let options = {
    force: args.includes('--force')
  };

  // Check for JSON config
  const configIdx = args.indexOf('--config');
  if (configIdx !== -1 && args[configIdx + 1]) {
    const configPath = path.resolve(process.cwd(), args[configIdx + 1]);
    if (!fs.existsSync(configPath)) {
      console.error(`Error: Archivo de configuración no encontrado: ${configPath}`);
      process.exit(1);
    }
    const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    options = Object.assign(options, configData);
  }

  // Parse flags if present
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--name' && args[i + 1]) options.name = args[++i];
    else if (arg === '--concept' && args[i + 1]) options.concept = args[++i];
    else if (arg === '--hero' && args[i + 1]) options.hero = args[++i];
    else if (arg === '--season' && args[i + 1]) options.season = args[++i];
    else if (arg === '--palette' && args[i + 1]) options.palette = args[++i];
    else if (arg === '--out-dir' && args[i + 1]) options.outDir = path.resolve(process.cwd(), args[++i]);
  }

  // Positional fallback if --name was not provided
  if (!options.name && args[0] && !args[0].startsWith('--')) {
    options.name = args[0];
    if (args[1] && !args[1].startsWith('--')) options.concept = args[1];
    if (args[2] && !args[2].startsWith('--')) options.hero = args[2];
    if (args[3] && !args[3].startsWith('--')) options.season = args[3];
    if (args[4] && !args[4].startsWith('--')) options.palette = args[4];
  }

  try {
    const result = createCollection(options);
    console.log(`\n✅ Colección Cápsula creada exitosamente:`);
    console.log(`   Colección:  ${result.collectionName}`);
    console.log(`   Prendas:    ${result.piecesCount} piezas en matriz técnica`);
    console.log(`   Archivo:    ${result.fileName}`);
    console.log(`   Ruta Vault: ${result.relativeVaultPath}\n`);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.error(`\n⚠️  ${err.message}\n`);
    } else {
      console.error(`\n❌ Error: ${err.message}\n`);
    }
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  createCollection,
  sanitizeSlug,
  buildDefaultPieces
};
