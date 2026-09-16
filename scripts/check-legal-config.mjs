#!/usr/bin/env node
/**
 * Verifica que no queda ningún dato legal sin completar.
 *
 * BBVA exige, para el alta del TPV Virtual, que la información del art. 10 de la
 * Ley 34/2002 esté publicada y sea real. Este script falla si el fichero de
 * configuración legal todavía contiene marcadores de posición.
 *
 * Uso: npm run legal:check
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const configPath = join(root, 'src/features/legal/legal-config.ts');

const lines = readFileSync(configPath, 'utf8').split('\n');

const pending = [];
lines.forEach((line, index) => {
  // Solo los valores (cadenas entre comillas), no los comentarios explicativos.
  if (line.trimStart().startsWith('*') || line.trimStart().startsWith('//')) return;
  // La propia constante PENDING_MARK no es un dato pendiente.
  if (line.includes('PENDING_MARK =')) return;
  const match = line.match(/['"`](\[COMPLETAR[^'"`]*)['"`]/);
  if (match) pending.push({ line: index + 1, value: match[1] });
});

if (pending.length === 0) {
  console.log('✅ Información legal completa: no quedan marcadores por rellenar.');
  process.exit(0);
}

console.error(`❌ Faltan ${pending.length} datos legales por completar en src/features/legal/legal-config.ts:\n`);
for (const item of pending) {
  console.error(`   línea ${String(item.line).padStart(3)} → ${item.value}`);
}
console.error(
  '\nCompleta estos valores antes de publicar el sitio y de solicitar el alta del TPV Virtual:\n' +
    'el art. 10 de la Ley 34/2002 exige que estos datos sean reales y accesibles de forma permanente.\n'
);
process.exit(1);
