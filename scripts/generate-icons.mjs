import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const publicDirectory = new URL("../public/", import.meta.url);
const mark = await readFile(new URL("images/mortorq-logo.png", publicDirectory));

// Keep the original team mark intact inside a rounded, white backplate.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="104" fill="#fff"/><image x="48" y="48" width="416" height="416" preserveAspectRatio="xMidYMid meet" href="data:image/png;base64,${mark.toString("base64")}"/></svg>`;
const source = Buffer.from(svg);
await writeFile(new URL("favicon.svg", publicDirectory), svg);

for (const [name, size] of [
  ["icon.png", 512],
  ["icon-512.png", 512],
  ["icon-192.png", 192],
  ["apple-touch-icon.png", 180],
]) {
  await sharp(source).resize(size, size).png().toFile(fileURLToPath(new URL(name, publicDirectory)));
}

// Supply PNG-backed ICO entries for browsers that do not use SVG favicons.
const sizes = [16, 32, 48, 64, 256];
const frames = await Promise.all(sizes.map((size) => sharp(source).resize(size, size).png().toBuffer()));
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;

frames.forEach((frame, index) => {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index] === 256 ? 0 : sizes[index];
  directory[entry + 1] = directory[entry];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(frame.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});

await writeFile(new URL("favicon.ico", publicDirectory), Buffer.concat([directory, ...frames]));
console.log("Generated rounded SVG, PNG, and ICO team icons.");
