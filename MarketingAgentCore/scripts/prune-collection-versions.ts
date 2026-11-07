#!/usr/bin/env node

/**
 * Spec-Driven Asset Version Pruner & Collection Manager for AndreArt Vestuario
 * 
 * Multiplatform (Windows & macOS) TypeScript utility to audit, prune, and archive
 * fashion collection visual assets against the master specification (SPEC.md).
 * 
 * Usage:
 *   node MarketingAgentCore/scripts/prune-collection-versions.ts <collection-name-or-slug> [options]
 *   npx tsx MarketingAgentCore/scripts/prune-collection-versions.ts <collection-name-or-slug> [options]
 * 
 * Options:
 *   --inspect    Audit and report references without moving or modifying files
 *   --dry-run    Simulate pruning actions without making disk changes
 *   --hard       Permanently delete unreferenced files instead of moving to .archive/
 *   --verbose    Print detailed file comparison logs
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PruneOptions {
  collection: string;
  inspectOnly: boolean;
  dryRun: boolean;
  hardDelete: boolean;
  verbose: boolean;
}

interface AuditResult {
  collectionDir: string;
  specPath: string;
  assetsDir: string;
  archiveDir: string;
  referencesDir: string;
  referencedInSpec: Set<string>;
  activeAssetFiles: string[];
  orphanedFiles: string[];
  archivedFiles: string[];
  keptFiles: string[];
}

// Locate repository root
function getRootDir(): string {
  let current = path.resolve(__dirname);
  while (current !== path.dirname(current)) {
    if (fs.existsSync(path.join(current, 'Andreart Brain')) || fs.existsSync(path.join(current, 'MarketingAgentCore'))) {
      return current;
    }
    current = path.dirname(current);
  }
  return path.resolve(__dirname, '../..');
}

function parseArgs(args: string[]): PruneOptions {
  let collection = '';
  let inspectOnly = false;
  let dryRun = false;
  let hardDelete = false;
  let verbose = false;

  for (const arg of args) {
    if (arg === '--inspect') inspectOnly = true;
    else if (arg === '--dry-run') dryRun = true;
    else if (arg === '--hard') hardDelete = true;
    else if (arg === '--verbose') verbose = true;
    else if (!arg.startsWith('-') && !collection) collection = arg;
  }

  if (!collection) {
    console.error('Error: Debes proporcionar el nombre o slug de la colección.');
    console.error('Ejemplo: node prune-collection-versions.ts Kokusen [--dry-run|--hard|--inspect]');
    process.exit(1);
  }

  return { collection, inspectOnly, dryRun, hardDelete, verbose };
}

function findCollectionDir(rootDir: string, collectionName: string): string | null {
  const collectionsBase = path.join(rootDir, 'Andreart Brain', '01 Brand Context', 'Colecciones');
  if (!fs.existsSync(collectionsBase)) return null;

  // 1. Direct folder match: Colecciones/<CollectionName>
  const directPath = path.join(collectionsBase, collectionName);
  if (fs.existsSync(directPath) && fs.statSync(directPath).isDirectory()) {
    return directPath;
  }

  // 2. Case-insensitive / slug match
  const entries = fs.readdirSync(collectionsBase);
  for (const entry of entries) {
    const fullPath = path.join(collectionsBase, entry);
    if (fs.statSync(fullPath).isDirectory() && entry.toLowerCase() === collectionName.toLowerCase()) {
      return fullPath;
    }
  }

  // 3. Fallback: check legacy single file
  for (const entry of entries) {
    if (entry.toLowerCase().includes(collectionName.toLowerCase()) && entry.endsWith('.md')) {
      return collectionsBase; // legacy container
    }
  }

  return null;
}

function findSpecFile(collectionDir: string, collectionName: string): string | null {
  // Prefer SPEC.md inside autonomous collection directory
  const specStandard = path.join(collectionDir, 'SPEC.md');
  if (fs.existsSync(specStandard)) return specStandard;

  // Check any .md file inside collection directory
  if (fs.statSync(collectionDir).isDirectory()) {
    const files = fs.readdirSync(collectionDir).filter(f => f.endsWith('.md'));
    if (files.length === 1) return path.join(collectionDir, files[0]);
    for (const f of files) {
      if (f.toLowerCase().includes(collectionName.toLowerCase())) return path.join(collectionDir, f);
    }
  }

  return null;
}

function extractImageReferences(specContent: string): Set<string> {
  const referenced = new Set<string>();

  // Regex for Obsidian wikilinks: ![[path/to/image.ext]] or ![[image.ext]]
  const wikiRegex = /!\[\[([^\]]+)\]\]/g;
  let match: RegExpExecArray | null;
  while ((match = wikiRegex.exec(specContent)) !== null) {
    const rawPath = match[1].split('|')[0].trim();
    const basename = path.basename(rawPath);
    referenced.add(basename.toLowerCase());
  }

  // Regex for standard markdown: ![alt](path/to/image.ext)
  const mdRegex = /!\[.*?\]\((.*?)\)/g;
  while ((match = mdRegex.exec(specContent)) !== null) {
    const rawUrl = match[1].split(/[?#]/)[0].trim();
    // Decode file:// URI if present
    const decoded = decodeURIComponent(rawUrl.replace(/^file:\/\//, ''));
    const basename = path.basename(decoded);
    referenced.add(basename.toLowerCase());
  }

  return referenced;
}

function auditCollection(opts: PruneOptions): AuditResult {
  const rootDir = getRootDir();
  const collectionDir = findCollectionDir(rootDir, opts.collection);

  if (!collectionDir) {
    console.error(`Error: No se encontró el directorio para la colección "${opts.collection}".`);
    process.exit(1);
  }

  const specPath = findSpecFile(collectionDir, opts.collection);
  if (!specPath || !fs.existsSync(specPath)) {
    console.error(`Error: No se encontró el archivo de especificación (SPEC.md) en ${collectionDir}.`);
    process.exit(1);
  }

  const specContent = fs.readFileSync(specPath, 'utf8');
  const referencedInSpec = extractImageReferences(specContent);

  // Assets directory
  let assetsDir = path.join(collectionDir, 'assets');
  if (!fs.existsSync(assetsDir)) {
    // Check legacy assets location: Colecciones/Assets/<CollectionName>
    const legacyAssets = path.join(rootDir, 'Andreart Brain', '01 Brand Context', 'Colecciones', 'Assets', opts.collection);
    if (fs.existsSync(legacyAssets)) {
      assetsDir = legacyAssets;
    } else {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
  }

  const archiveDir = path.join(assetsDir, '.archive');
  const referencesDir = path.join(collectionDir, 'references');

  const allEntries = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];
  const activeAssetFiles: string[] = [];
  const orphanedFiles: string[] = [];
  const keptFiles: string[] = [];

  for (const entry of allEntries) {
    if (entry.startsWith('.')) continue; // skip hidden dirs (.archive, etc)
    const fullEntryPath = path.join(assetsDir, entry);
    if (fs.statSync(fullEntryPath).isDirectory()) continue;

    const lowerName = entry.toLowerCase();
    activeAssetFiles.push(entry);

    if (referencedInSpec.has(lowerName)) {
      keptFiles.push(entry);
    } else {
      orphanedFiles.push(entry);
    }
  }

  const archivedFiles = fs.existsSync(archiveDir)
    ? fs.readdirSync(archiveDir).filter(f => !f.startsWith('.'))
    : [];

  return {
    collectionDir,
    specPath,
    assetsDir,
    archiveDir,
    referencesDir,
    referencedInSpec,
    activeAssetFiles,
    orphanedFiles,
    archivedFiles,
    keptFiles
  };
}

function executePrune(audit: AuditResult, opts: PruneOptions): void {
  console.log('\n═══════════════════════════════════════════════════════════════════════════');
  console.log(`📦 SPEC-DRIVEN ASSET MANAGER: Colección "${opts.collection}"`);
  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log(`📍 Carpeta:         ${audit.collectionDir}`);
  console.log(`📄 Especificación:  ${path.basename(audit.specPath)}`);
  console.log(`🖼️  Directorio Assets: ${audit.assetsDir}`);
  console.log(`🔗 Referencias en Spec: ${audit.referencedInSpec.size} imágenes`);
  console.log(`📁 Archivos en Assets:  ${audit.activeAssetFiles.length} archivos`);

  console.log('\n✅ ACTIVOS ACTIVOS APROBADOS (Conservados en assets/):');
  if (audit.keptFiles.length === 0) {
    console.log('   (Ninguno referenciado en el spec)');
  } else {
    for (const f of audit.keptFiles) {
      const fsize = Math.round(fs.statSync(path.join(audit.assetsDir, f)).size / 1024);
      console.log(`   • ${f} (${fsize} KB)`);
    }
  }

  console.log('\n⚠️  ACTIVOS OBSOLETOS / DESCARTADOS (No referenciados en spec):');
  if (audit.orphanedFiles.length === 0) {
    console.log('   • Cero activos huérfanos. La carpeta assets/ está 100% limpia y sincronizada.');
  } else {
    for (const f of audit.orphanedFiles) {
      console.log(`   • ${f}`);
    }
  }

  if (opts.inspectOnly) {
    console.log('\n🔍 Modo --inspect: no se realizaron modificaciones en disco.');
    console.log('═══════════════════════════════════════════════════════════════════════════\n');
    return;
  }

  if (audit.orphanedFiles.length > 0) {
    if (opts.dryRun) {
      console.log(`\n🧪 Modo --dry-run: se habrían ${opts.hardDelete ? 'eliminado' : 'archivado'} ${audit.orphanedFiles.length} archivo(s).`);
    } else {
      if (opts.hardDelete) {
        console.log(`\n🗑️  Eliminación permanente (--hard)...`);
        for (const f of audit.orphanedFiles) {
          const target = path.join(audit.assetsDir, f);
          fs.unlinkSync(target);
          console.log(`   ✓ Eliminado: ${f}`);
        }
      } else {
        fs.mkdirSync(audit.archiveDir, { recursive: true });
        console.log(`\n📦 Archivando activos en assets/.archive/...`);
        for (const f of audit.orphanedFiles) {
          const src = path.join(audit.assetsDir, f);
          const dst = path.join(audit.archiveDir, f);
          fs.renameSync(src, dst);
          console.log(`   ✓ Movido a .archive/: ${f}`);
        }
      }
    }
  }

  // Ensure references/ directory exists
  if (!fs.existsSync(audit.referencesDir) && !opts.dryRun) {
    fs.mkdirSync(audit.referencesDir, { recursive: true });
  }

  console.log('\n🎉 Estado final: Carpeta assets/ contiene exclusivamente los activos aprobados.');
  console.log('═══════════════════════════════════════════════════════════════════════════\n');
}

// Main execution
const opts = parseArgs(process.argv.slice(2));
const audit = auditCollection(opts);
executePrune(audit, opts);
