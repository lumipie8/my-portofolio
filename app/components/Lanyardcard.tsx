"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

// R3F + Rapier hanya jalan di browser, jadi jangan di-SSR.
const Lanyard3D = dynamic(() => import("./Lanyard3D"), { ssr: false, loading: () => null });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Kartu 2D: tampil saat scene 3D masih dimuat, atau bila WebGL tidak tersedia. */
function StaticCard() {
  return (
    <div className="absolute inset-x-0 top-0 flex justify-center">
      <div className="lanyard-swing flex flex-col items-center">
        <div className="h-44 w-3 bg-gradient-to-b from-accent to-accent-2 lg:h-60" />
        <div className="h-5 w-8 rounded-sm border border-white/20 bg-white/10" />
        <div className="glass w-64 overflow-hidden rounded-2xl p-3">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white/5">
            <Image
              src="/bg-abu.png"
              alt="Portrait of Fayza Siti Rahmawati"
              fill
              sizes="256px"
              className="object-cover"
              priority
            />
          </div>
          <div className="px-1 pb-1 pt-4">
            <p className="text-lg font-bold text-white">Fayza Siti Rahmawati</p>
            <p className="text-sm text-muted">Frontend Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Wadah lanyard. Posisinya absolut mengikuti kolom kanan Hero; di layar lebar
 * ia naik sampai tepi atas halaman supaya talinya terlihat menggantung dari atas.
 */
export default function LanyardCard() {
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => setWebgl(hasWebGL()), []);
  const handleReady = useCallback(() => setReady(true), []);
  const handleDragStart = useCallback(() => setTouched(true), []);

  const fade = "linear-gradient(to bottom, transparent 0, #000 6%)";

  return (
    <div
      role="img"
      aria-label="Interactive ID card hanging from a lanyard. Drag it to swing it around."
      className="absolute inset-x-0 bottom-0 top-0 lg:-bottom-16 lg:-top-32"
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[100px]"
      />

      {!ready && <StaticCard />}

      {webgl && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <Lanyard3D onReady={handleReady} onDragStart={handleDragStart} />
        </div>
      )}

      {ready && (
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-6 flex justify-center transition-opacity duration-500 lg:bottom-20 ${
            touched ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="glass rounded-full px-4 py-2 text-xs font-medium text-muted">
            Drag the card
          </span>
        </div>
      )}
    </div>
  );
}