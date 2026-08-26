#!/usr/bin/env node
/**
 * Automated 3D Asset Compression Pipeline
 * Implements Draco geometry compression (up to 10x reduction) and KTX2 GPU texture transcoding.
 * Grounded in Awwwards production patterns (Cartier 365, Immersive Garden, Tracing Art).
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ASSET_DIR = './public/models';

export async function runPipeline() {
  console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════════');
  console.log('\x1b[32m%s\x1b[0m', '  🚀 AURA 3D ASSET OPTIMIZATION PIPELINE (DRACO + KTX2)');
  console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════════\n');

  if (!fs.existsSync(ASSET_DIR)) {
    fs.mkdirSync(ASSET_DIR, { recursive: true });
    console.log(`[Init] Created asset directory: ${ASSET_DIR}`);
  }

  const files = fs.readdirSync(ASSET_DIR).filter((f) => f.endsWith('.glb') && !f.includes('.opt.'));

  if (files.length === 0) {
    console.log('\x1b[33m%s\x1b[0m', `[Scan] No raw .glb files found in ${ASSET_DIR}. Ready to ingest assets.`);
    return;
  }

  for (const file of files) {
    const input = path.join(ASSET_DIR, file);
    const output = path.join(ASSET_DIR, file.replace('.glb', '.opt.glb'));
    const rawBytes = fs.statSync(input).size;

    console.log(`[Compressing] ${file} (${(rawBytes / 1024 / 1024).toFixed(2)} MB)...`);

    try {
      execSync(
        `npx @gltf-transform/cli optimize "${input}" "${output}" --draco --draco.compression-level 7 --texture-compress etc1s`,
        { stdio: 'inherit' }
      );
      const optBytes = fs.statSync(output).size;
      const reduction = (((rawBytes - optBytes) / rawBytes) * 100).toFixed(1);
      console.log(`\x1b[32m[Success]\x1b[0m ${file}: ${(optBytes / 1024 / 1024).toFixed(2)} MB (${reduction}% reduction)\n`);
    } catch (err) {
      console.error(`\x1b[31m[Error]\x1b[0m Failed to optimize ${file}:`, err.message);
    }
  }
}

runPipeline();
