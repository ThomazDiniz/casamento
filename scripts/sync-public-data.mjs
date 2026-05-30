import { copyFile, mkdir, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const srcDir = join(root, "data");
const destDir = join(root, "public", "data");

await mkdir(destDir, { recursive: true });
const files = await readdir(srcDir);
for (const name of files) {
  if (!name.endsWith(".json")) continue;
  await copyFile(join(srcDir, name), join(destDir, name));
}
console.log("Copiado data/ -> public/data/");
