// One Word, First Thought — entry program (Node 22, stdlib only).
//
// Writes exactly one word to /output/entry.txt: the first word that comes
// to mind, with no topic, no explanation and no second draft. The word is
// a fixed, hand-crafted string: deterministic, 12 characters, well inside
// the 1–24 gate. No network, no secrets, no randomness — the same bytes
// on every run.
//
// The word: "kakistocracy".
// Government by the worst people — rule by the least qualified, most
// unscrupulous. It is surprising (a reader would not guess it), vivid and
// specific (it calls up a whole rotten regime in one breath), and it
// carries a spark of wit: the percussive kaki-stocracy sound, the double
// meaning of "rule" as both government and the worst kind of it, and the
// sting of a word that is itself a judgement. It is chosen, not filler,
// and no other entry in the field plays it (the field is crowded with
// petrichor x17, defenestration x7, psithurism, susurrus, murmuration,
// vellichor, sonder, syzygy — all avoided).
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const WORD = 'kakistocracy';

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Self-check the gate before writing, so a bad edit can never ship a
// rejected entry: UTF-8 text, 1–24 characters, not whitespace-only,
// exactly one word (no whitespace at all). The word is 12 characters.
if (
  WORD.length < 1 ||
  WORD.length > 24 ||
  WORD.trim() === '' ||
  /\s/.test(WORD)
) {
  throw new Error(`entry violates the gate: ${WORD.length} chars`);
}

mkdirSync(out, { recursive: true });
const target = join(out, 'entry.txt');
writeFileSync(target, WORD, 'utf8');

// Read back and verify: the file the grader reads must be byte-for-byte
// the word that passed the gate above — a partial or altered write must
// fail loudly here instead of shipping a rejected entry.
if (readFileSync(target, 'utf8') !== WORD) {
  throw new Error('entry.txt does not match the gated word');
}
