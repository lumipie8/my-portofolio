"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, Sparkles } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import { CARD_H, CARD_W, createLanyardTextures } from "./lanyardTextures";

/* ------------------------------ Tuning ------------------------------ */
const ANCHOR_Y = 4; // titik gantung (di atas tepi atas layar)
const ROPE_LENGTH = 1; // panjang tiap ruas tali (3 ruas)
const CARD_ANCHOR = 1.3; // jarak titik tali di atas pusat kartu
const CARD_DEPTH = 0.04;
const CARD_RADIUS = 0.12;
const STRAP_SEGMENTS = 32;
const STRAP_HALF_WIDTH = 0.08;
const STRAP_TILES = 3; // berapa kali teks di tali berulang
const MIN_SPEED = 10; // smoothing tali: makin besar = makin responsif
const MAX_SPEED = 50;
const GRAVITY = -40;

/* ------------------------------ Geometri kartu ------------------------------ */
function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

function buildCardGeometry() {
  const shape = roundedRectShape(CARD_W, CARD_H, CARD_RADIUS);

  // Muka kartu: UV dipetakan ke 0..1 agar tekstur pas satu kartu penuh
  const face = new THREE.ShapeGeometry(shape, 12);
  const pos = face.attributes.position;
  const uv = face.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, (pos.getX(i) + CARD_W / 2) / CARD_W, (pos.getY(i) + CARD_H / 2) / CARD_H);
  }
  uv.needsUpdate = true;

  // Badan kartu (ketebalan + sisi)
  const body = new THREE.ExtrudeGeometry(shape, {
    depth: CARD_DEPTH,
    bevelEnabled: false,
    curveSegments: 12,
  });
  body.translate(0, 0, -CARD_DEPTH / 2);

  return { face, body };
}

/* ------------------------------ Geometri tali (ribbon) ------------------------------ */
function buildRibbonGeometry() {
  const n = STRAP_SEGMENTS;
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array((n + 1) * 2 * 3), 3));

  const uv = new Float32Array((n + 1) * 2 * 2);
  for (let i = 0; i <= n; i++) {
    const u = (i / n) * STRAP_TILES;
    uv.set([u, 1, u, 0], i * 4);
  }
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));

  const idx: number[] = [];
  for (let i = 0; i < n; i++) {
    const a = i * 2, b = i * 2 + 1, c = i * 2 + 2, d = i * 2 + 3;
    idx.push(a, b, c, b, d, c);
  }
  g.setIndex(idx);
  return g;
}

/* ------------------------------ Util ------------------------------ */
type Smoothed = { a: THREE.Vector3 | null; b: THREE.Vector3 | null };

// Haluskan gerak ruas tali supaya tidak jitter saat kartu ditarik kuat
function smooth(
  body: RapierRigidBody,
  store: Smoothed,
  key: "a" | "b",
  delta: number,
  tmp: THREE.Vector3
) {
  const p = body.translation();
  tmp.set(p.x, p.y, p.z);
  let s = store[key];
  if (!s) {
    s = tmp.clone();
    store[key] = s;
  }
  const dist = THREE.MathUtils.clamp(s.distanceTo(tmp), 0.1, 1);
  s.lerp(tmp, Math.min(1, delta * (MIN_SPEED + dist * (MAX_SPEED - MIN_SPEED))));
  return s;
}

/* ------------------------------ Tali + kartu berfisika ------------------------------ */
const segmentProps = {
  canSleep: true,
  colliders: false as const,
  angularDamping: 4,
  linearDamping: 4,
};

function Band({
  portraitSrc,
  onDragStart,
}: {
  portraitSrc: string;
  onDragStart?: () => void;
}) {
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);
  const visual = useRef<THREE.Group>(null);
  const ribbonMesh = useRef<THREE.Mesh>(null);

  const [dragged, setDragged] = useState<THREE.Vector3 | null>(null);
  const [hovered, setHovered] = useState(false);

  const textures = useMemo(() => createLanyardTextures(portraitSrc), [portraitSrc]);
  useEffect(() => () => textures.dispose(), [textures]);

  const geo = useMemo(buildCardGeometry, []);
  const ribbon = useMemo(buildRibbonGeometry, []);
  const curve = useMemo(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = "chordal";
    return c;
  }, []);
  const tmp = useMemo(
    () => ({
      pointer: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      p: new THREE.Vector3(),
      tan: new THREE.Vector3(),
      s: new THREE.Vector3(),
    }),
    []
  );
  const smoothed = useRef<Smoothed>({ a: null, b: null });

  // Rantai: titik tetap -> j1 -> j2 -> j3 -> kartu
  useRopeJoint(fixed as any, j1 as any, [[0, 0, 0], [0, 0, 0], ROPE_LENGTH]);
  useRopeJoint(j1 as any, j2 as any, [[0, 0, 0], [0, 0, 0], ROPE_LENGTH]);
  useRopeJoint(j2 as any, j3 as any, [[0, 0, 0], [0, 0, 0], ROPE_LENGTH]);
  useSphericalJoint(j3 as any, card as any, [[0, 0, 0], [0, CARD_ANCHOR, 0]]);

  // Kursor grab / grabbing
  useEffect(() => {
    if (!hovered && !dragged) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const c = card.current, f = fixed.current;
    const a = j1.current, b = j2.current, d = j3.current;
    if (!c || !f || !a || !b || !d) return;

    // 1) Drag: proyeksikan pointer ke bidang z = 0
    if (dragged) {
      tmp.pointer.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      tmp.dir.copy(tmp.pointer).sub(state.camera.position).normalize();
      const t = -state.camera.position.z / tmp.dir.z;
      tmp.pointer.copy(state.camera.position).addScaledVector(tmp.dir, t);
      [c, a, b, d, f].forEach((r) => r.wakeUp());
      c.setNextKinematicTranslation({
        x: tmp.pointer.x - dragged.x,
        y: tmp.pointer.y - dragged.y,
        z: 0,
      });
    }

    // 2) Bentuk kurva tali dari posisi ruas yang sudah dihaluskan
    const sa = smooth(a, smoothed.current, "a", delta, tmp.s);
    const sb = smooth(b, smoothed.current, "b", delta, tmp.s);
    const pd = d.translation();
    const pf = f.translation();
    curve.points[0].set(pd.x, pd.y, pd.z);
    curve.points[1].copy(sb);
    curve.points[2].copy(sa);
    curve.points[3].set(pf.x, pf.y, pf.z);

    // 3) Update ribbon: tiap titik kurva digeser ±lebar ke arah normal (bidang XY)
    const attr = ribbon.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i <= STRAP_SEGMENTS; i++) {
      const t = i / STRAP_SEGMENTS;
      curve.getPoint(t, tmp.p);
      curve.getTangent(t, tmp.tan);
      let nx = -tmp.tan.y;
      let ny = tmp.tan.x;
      const len = Math.hypot(nx, ny) || 1;
      nx = (nx / len) * STRAP_HALF_WIDTH;
      ny = (ny / len) * STRAP_HALF_WIDTH;
      arr.set([tmp.p.x + nx, tmp.p.y + ny, tmp.p.z], i * 6);
      arr.set([tmp.p.x - nx, tmp.p.y - ny, tmp.p.z], i * 6 + 3);
    }
    attr.needsUpdate = true;

    // 4) Jaga kartu tetap menghadap layar (redam putaran sumbu Y)
    if (!dragged && !c.isSleeping()) {
      const ang = c.angvel();
      const rot = c.rotation();
      c.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }

    // 5) Feedback hover/drag: kartu sedikit membesar
    if (visual.current) {
      const target = dragged ? 1.04 : hovered ? 1.02 : 1;
      visual.current.scale.setScalar(
        THREE.MathUtils.damp(visual.current.scale.x, target, 8, delta)
      );
    }
  });

  const clipMaterial = (
    <meshStandardMaterial color="#c9ccd6" metalness={1} roughness={0.22} />
  );

  return (
    <>
      <group position={[0, ANCHOR_Y, 0]}>
        <RigidBody ref={fixed} type="fixed" {...segmentProps} />
        <RigidBody ref={j1} position={[0.5, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j2} position={[1, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j3} position={[1.5, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={card}
          position={[1.5, -CARD_ANCHOR, 0]}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[CARD_W / 2, CARD_H / 2, 0.02]} />

          <group
            ref={visual}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture(e.pointerId);
              const c = card.current;
              if (!c) return;
              const t = c.translation();
              setDragged(
                new THREE.Vector3().copy(e.point).sub(new THREE.Vector3(t.x, t.y, t.z))
              );
              onDragStart?.();
            }}
            onPointerUp={(e) => {
              (e.target as Element).releasePointerCapture(e.pointerId);
              setDragged(null);
            }}
          >
            {/* Badan */}
            <mesh geometry={geo.body}>
              <meshStandardMaterial color="#0f1016" metalness={0.7} roughness={0.35} />
            </mesh>

            {/* Muka depan */}
            <mesh geometry={geo.face} position={[0, 0, CARD_DEPTH / 2 + 0.001]}>
              <meshPhysicalMaterial
                map={textures.front}
                roughness={0.45}
                metalness={0.05}
                clearcoat={0.9}
                clearcoatRoughness={0.15}
                iridescence={0.3}
              />
            </mesh>

            {/* Muka belakang */}
            <mesh
              geometry={geo.face}
              position={[0, 0, -CARD_DEPTH / 2 - 0.001]}
              rotation={[0, Math.PI, 0]}
            >
              <meshPhysicalMaterial
                map={textures.back}
                roughness={0.45}
                metalness={0.05}
                clearcoat={0.9}
                clearcoatRoughness={0.15}
              />
            </mesh>

            {/* Klip + cincin logam */}
            <RoundedBox
              args={[0.34, 0.24, 0.08]}
              radius={0.04}
              smoothness={4}
              position={[0, CARD_H / 2 + 0.07, 0]}
            >
              {clipMaterial}
            </RoundedBox>
            <mesh position={[0, CARD_ANCHOR, 0]}>
              <torusGeometry args={[0.11, 0.025, 16, 32]} />
              {clipMaterial}
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* Tali */}
      <mesh ref={ribbonMesh} geometry={ribbon} frustumCulled={false}>
        <meshBasicMaterial map={textures.strap} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </>
  );
}

function Ready({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  return null;
}

/* ------------------------------ Scene ------------------------------ */
export default function Lanyard3D({
  portraitSrc = "/bg-dark.png",
  onReady,
  onDragStart,
}: {
  portraitSrc?: string;
  onReady?: () => void;
  onDragStart?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Hentikan render & fisika saat di luar layar (hemat baterai)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full" style={{ touchAction: "pan-y" }}>
      <Canvas
        flat
        frameloop={visible ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: [0, 0.8, 12.6], fov: 25, near: 1, far: 60 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
      >
        <ambientLight intensity={Math.PI * 0.55} />
        <directionalLight position={[3, 4, 6]} intensity={Math.PI * 0.25} />

        <Suspense fallback={null}>
          <Physics gravity={[0, GRAVITY, 0]} timeStep={1 / 60} paused={!visible}>
            <Band portraitSrc={portraitSrc} onDragStart={onDragStart} />
          </Physics>

          {/* Pantulan studio buatan sendiri, tanpa file HDR eksternal */}
          <Environment resolution={256} environmentIntensity={0.8}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
              <Lightformer form="circle" intensity={2} color="#c7d2fe" rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
              <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
              <Lightformer form="circle" intensity={2} color="#bfdbfe" rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
            </group>
          </Environment>

          {!reducedMotion && (
            <Sparkles
              count={45}
              scale={[4, 6, 3]}
              position={[0, 0.8, -1.5]}
              size={2.5}
              speed={0.35}
              opacity={0.55}
              color="#a5b4fc"
            />
          )}

          <Ready onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}