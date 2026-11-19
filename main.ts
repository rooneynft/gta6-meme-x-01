// Leonida Flu — a gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry itself is the X post: a GTA 6 launch-day meme (a fan calls in
// sick with "Leonida flu" while his AI agent catches it too), posted from a
// public account with make.fun and the entrant's play code in its text.
// This program does the one job the grader needs: it copies POST.json, which
// names that post, from the repository into /output, where the gate reads it.
// The house then reads the post itself from X (first picture + text) and
// hands that dossier to the judge. Nothing this program writes is judged.
//
// Run it outside the grader with:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const POST_FILE = 'POST.json';

const source = join(BOT_DIR, POST_FILE);
if (!existsSync(source)) {
  console.error(`No ${POST_FILE} found in ${BOT_DIR}; nothing to hand in.`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(source, join(OUTPUT_DIR, POST_FILE));

// Make sure the copy is a readable POST.json naming an X post address,
// so a broken hand-in fails loudly here instead of at the gate.
const handedIn = JSON.parse(readFileSync(join(OUTPUT_DIR, POST_FILE), 'utf8')) as {
  url?: unknown;
};
if (typeof handedIn.url !== 'string' || !handedIn.url.startsWith('https://x.com/')) {
  console.error(`Handed-in ${POST_FILE} does not name an x.com post address.`);
  process.exit(1);
}
console.log(`Handed in ${POST_FILE} from ${BOT_DIR} to ${OUTPUT_DIR}.`);
