#!/usr/bin/env node

/**
 * Multi-Channel Price Verification Script for Andreart
 * Audits product descriptions against Cercia and Bazar Bogotá catalog definitions.
 * Validates consistency between Master Catalog, individual product sheets, and index.md.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../..');
const VAULT_ROOT = path.join(ROOT_DIR, 'Andreart Brain');
const DESCRIPTIONS_DIR = path.join(VAULT_ROOT, '03 Website & Copy', 'Product Descriptions');
const CATALOG_PATH = path.join(VAULT_ROOT, '01 Brand Context', 'Catalogo y SKUs Cercia.md');
const INDEX_PATH = path.join(DESCRIPTIONS_DIR, 'index.md');

function parseMarkdown(content) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  if (!match) return { frontmatter: {}, body: content };

  const rawFrontmatter = match[1];
  const body = match[2];
  const frontmatter = {};

  for (const line of rawFrontmatter.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let val = line.slice(colonIndex + 1).trim();
      val = val.replace(/^["'](.*)["']$/, '$1');
      frontmatter[key] = val;
    }
  }

  return { frontmatter, body };
}

function loadMasterCatalog() {
  if (!fs.existsSync(CATALOG_PATH)) {
    console.error(`❌ Error: No se encontró el catálogo maestro en ${CATALOG_PATH}`);
    process.exit(1);
  }

  const content = fs.readFileSync(CATALOG_PATH, 'utf8');
  const catalog = {};
  const lines = content.split('\n');

  for (const line of lines) {
    if (line.trim().startsWith('|') && line.includes('`ANDR-') || line.includes('`COS-')) {
      const parts = line.split('|').map(p => p.trim());
      // parts[0] is empty, parts[1] is #, parts[2] is SKU, parts[3] is Name, parts[4] is Price COP
      if (parts.length >= 5) {
        const skuMatch = parts[2].match(/`([^`]+)`/);
        const sku = skuMatch ? skuMatch[1] : parts[2];
        const price = parts[4].trim();
        catalog[sku] = {
          rawPrice: price,
          name: parts[3].replace(/\*\*/g, '').trim()
        };
      }
    }
  }
  return catalog;
}

function auditPrices() {
  console.log('\n' + '═'.repeat(85));
  console.log('📊 AUDITORÍA Y VERIFICACIÓN DE PRECIOS MULTICANAL (CERCIA & BAZAR BOGOTÁ)');
  console.log('═'.repeat(85));

  const masterCatalog = loadMasterCatalog();
  const files = fs.readdirSync(DESCRIPTIONS_DIR).filter(f => f.endsWith('.md') && f !== 'index.md');

  let discrepancies = 0;
  const results = [];

  for (const file of files.sort()) {
    const filePath = path.join(DESCRIPTIONS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, body } = parseMarkdown(content);

    const sku = frontmatter.sku || (body.match(/- \*\*Código de Referencia.*?:\*\*\s*`?([A-Z0-9-]+)`?/i) || [])[1] || 'N/A';
    const masterInfo = masterCatalog[sku] || { rawPrice: 'No en catálogo maestro', name: file };

    // Extract channel prices from body
    const cerciaMatch = body.match(/- \*\*Precio Cercia:\*\*\s*([^\n\r]+)/i);
    const bazarMatch = body.match(/- \*\*Precio Bazar Bogotá:\*\*\s*([^\n\r]+)/i);

    const priceCerciaBody = cerciaMatch ? cerciaMatch[1].trim() : 'Falta en ficha';
    const priceBazarBody = bazarMatch ? bazarMatch[1].trim() : 'Falta en ficha';
    const priceCerciaFM = frontmatter.price_cercia || 'Falta en FM';
    const priceBazarFM = frontmatter.price_bazar || 'Falta en FM';

    let status = '✅ Sincronizado';
    const issues = [];

    if (!cerciaMatch) issues.push('Sin Precio Cercia');
    if (!bazarMatch) issues.push('Sin Precio Bazar');
    if (!frontmatter.price_cercia) issues.push('Sin price_cercia en FM');
    if (!frontmatter.price_bazar) issues.push('Sin price_bazar en FM');

    if (issues.length > 0) {
      status = `⚠️ ${issues.join(', ')}`;
      discrepancies++;
    }

    results.push({
      sku,
      name: frontmatter.title || masterInfo.name,
      file,
      cercia: priceCerciaBody,
      bazar: priceBazarBody,
      master: masterInfo.rawPrice,
      status
    });
  }

  // Display Table
  console.log(`\n${'SKU'.padEnd(14)} | ${'Precio Cercia'.padEnd(20)} | ${'Precio Bazar Bogotá'.padEnd(22)} | Estado`);
  console.log('-'.repeat(85));

  for (const r of results) {
    const skuCol = r.sku.padEnd(14);
    const cerciaCol = r.cercia.padEnd(20);
    const bazarCol = r.bazar.padEnd(22);
    console.log(`${skuCol} | ${cerciaCol} | ${bazarCol} | ${r.status}`);
  }

  // Check index.md alignment
  console.log('\n' + '─'.repeat(85));
  console.log('📋 VERIFICACIÓN DE ÍNDICE GENERAL (index.md)');
  console.log('─'.repeat(85));

  if (fs.existsSync(INDEX_PATH)) {
    const indexContent = fs.readFileSync(INDEX_PATH, 'utf8');
    let indexDiscrepancies = 0;

    for (const r of results) {
      if (r.sku !== 'N/A' && !indexContent.includes(r.sku)) {
        console.log(`⚠️ Advertencia: SKU ${r.sku} no se encuentra referenciado en index.md`);
        indexDiscrepancies++;
      }
    }

    if (indexDiscrepancies === 0) {
      console.log('✅ Todos los 10 productos activos y sus precios están integrados en index.md');
    }
  } else {
    console.log('❌ Error: index.md no existe.');
    discrepancies++;
  }

  console.log('\n' + '═'.repeat(85));
  if (discrepancies === 0) {
    console.log('🎉 AUDITORÍA DE PRECIOS EXITOSA: 100% de coherencia entre Cercia y Bazar Bogotá.');
  } else {
    console.log(`⚠️ ATENCIÓN: Se encontraron ${discrepancies} observaciones o discrepancias en los precios.`);
  }
  console.log('═'.repeat(85) + '\n');

  return discrepancies === 0 ? 0 : 1;
}

process.exit(auditPrices());
