import * as THREE from "three";

/** Ukuran kartu dalam unit dunia 3D (rasio ID card ±5:7). */
export const CARD_W = 1.6;
export const CARD_H = 2.25;

const TEX_W = 640;
const TEX_H = Math.round(TEX_W * (CARD_H / CARD_W)); // 900

const ACCENT = "#6366f1";

// Canvas 2D butuh nama font asli. Kita ambil dari <body> supaya cocok dengan next/font.
function bodyFont(): string {
  return getComputedStyle(document.body).fontFamily || "system-ui, sans-serif";
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawSlot(ctx: CanvasRenderingContext2D) {
  roundRectPath(ctx, TEX_W / 2 - 60, 30, 120, 16, 8);
  ctx.fillStyle = "#050507";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

/* ------------------------------ Sisi depan ------------------------------ */
function drawFront(ctx: CanvasRenderingContext2D, portrait: HTMLImageElement | null) {
  const W = TEX_W;
  const H = TEX_H;
  const font = bodyFont();

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#1b1c33");
  bg.addColorStop(0.55, "#101118");
  bg.addColorStop(1, "#0a0a0c");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W * 0.85, 0, 0, W * 0.85, 0, W * 0.9);
  glow.addColorStop(0, "rgba(99,102,241,0.38)");
  glow.addColorStop(1, "rgba(99,102,241,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  drawSlot(ctx);

  // Foto
  const px = 40, py = 70, pw = W - 80, ph = 520;
  ctx.save();
  roundRectPath(ctx, px, py, pw, ph, 28);
  ctx.clip();
  if (portrait && portrait.naturalWidth) {
    const s = Math.max(pw / portrait.naturalWidth, ph / portrait.naturalHeight);
    const dw = portrait.naturalWidth * s;
    const dh = portrait.naturalHeight * s;
    // Bias ke atas supaya wajah tidak terpotong
    ctx.drawImage(portrait, px + (pw - dw) / 2, py + (ph - dh) * 0.2, dw, dh);
  } else {
    const g = ctx.createLinearGradient(px, py, px + pw, py + ph);
    g.addColorStop(0, "#2a2c4a");
    g.addColorStop(1, "#14151f");
    ctx.fillStyle = g;
    ctx.fillRect(px, py, pw, ph);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = `700 160px ${font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("FS", W / 2, py + ph / 2);
  }
  ctx.restore();
  roundRectPath(ctx, px, py, pw, ph, 28);
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Teks
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 58px ${font}`;
  ctx.fillText("Fayza Siti", 44, 655);
  ctx.fillText("Rahmawati", 44, 718);
  ctx.fillStyle = "#a5b4fc";
  ctx.font = `600 30px ${font}`;
  ctx.fillText("Frontend Developer", 44, 768);
  ctx.fillStyle = "#9ca3af";
  ctx.font = `500 24px ${font}`;
  ctx.fillText("Computer Science student", 44, 804);

  // Barcode dekoratif
  ctx.fillStyle = "rgba(255,255,255,0.32)";
  for (let i = 0, x = 56; x < W - 56; i++) {
    const w = 2 + ((i * 7 + 3) % 4);
    if (i % 3 !== 2) ctx.fillRect(x, 832, w, 36);
    x += w + 3;
  }
}

/* ------------------------------ Sisi belakang ------------------------------ */
function drawBack(ctx: CanvasRenderingContext2D) {
  const W = TEX_W;
  const H = TEX_H;
  const font = bodyFont();

  const bg = ctx.createLinearGradient(0, H, W, 0);
  bg.addColorStop(0, "#0a0a0c");
  bg.addColorStop(1, "#1a1b36");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 2;
  for (let r = 80; r <= 560; r += 80) {
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawSlot(ctx);

  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  ctx.font = `700 96px ${font}`;
  const wName = ctx.measureText("Fayza").width;
  const wDot = ctx.measureText(".").width;
  const startX = (W - (wName + wDot)) / 2;
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Fayza", startX, H / 2 + 20);
  ctx.fillStyle = ACCENT;
  ctx.fillText(".", startX + wName, H / 2 + 20);

  ctx.textAlign = "center";
  ctx.fillStyle = "#9ca3af";
  ctx.font = `500 28px ${font}`;
  ctx.fillText("Frontend Developer", W / 2, H / 2 + 72);
  ctx.textAlign = "left";
}

/* ------------------------------ Tali (strap) ------------------------------ */
function drawStrap(ctx: CanvasRenderingContext2D) {
  const g = ctx.createLinearGradient(0, 0, 0, 64);
  g.addColorStop(0, "#6366f1");
  g.addColorStop(1, "#3b82f6");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 64);

  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  for (const y of [8, 56]) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = `700 28px ${bodyFont()}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("FAYZA SITI RAHMAWATI", 256, 33);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
}

/* ------------------------------ Factory ------------------------------ */
function makeCanvas(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return { canvas, ctx: canvas.getContext("2d")! };
}

function makeTexture(canvas: HTMLCanvasElement, repeat = false) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  if (repeat) t.wrapS = THREE.RepeatWrapping;
  return t;
}

/**
 * Membuat tekstur kartu (depan/belakang) dan tali dari Canvas 2D.
 * Foto dimuat async; tekstur digambar ulang setelah foto & font siap.
 */
export function createLanyardTextures(portraitSrc: string) {
  const f = makeCanvas(TEX_W, TEX_H);
  const b = makeCanvas(TEX_W, TEX_H);
  const s = makeCanvas(512, 64);

  const front = makeTexture(f.canvas);
  const back = makeTexture(b.canvas);
  const strap = makeTexture(s.canvas, true);

  let portrait: HTMLImageElement | null = null;

  const redraw = () => {
    drawFront(f.ctx, portrait);
    drawBack(b.ctx);
    drawStrap(s.ctx);
    front.needsUpdate = back.needsUpdate = strap.needsUpdate = true;
  };

  redraw();

  const img = new Image();
  img.onload = () => {
    portrait = img;
    redraw();
  };
  img.src = portraitSrc;

  // Gambar ulang setelah font web benar-benar siap
  document.fonts
    ?.load(`700 58px ${bodyFont()}`)
    .then(redraw)
    .catch(() => {});

  return {
    front,
    back,
    strap,
    dispose() {
      front.dispose();
      back.dispose();
      strap.dispose();
    },
  };
}