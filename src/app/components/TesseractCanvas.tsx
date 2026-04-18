'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// 16 vertices: all ±1 combinations in 4D
const VERTS_4D: [number, number, number, number][] = [];
for (const x of [-1, 1])
  for (const y of [-1, 1])
    for (const z of [-1, 1])
      for (const w of [-1, 1])
        VERTS_4D.push([x, y, z, w]);

// 32 edges: pairs differing in exactly one coordinate
const EDGES: [number, number][] = [];
for (let i = 0; i < 16; i++)
  for (let j = i + 1; j < 16; j++) {
    let d = 0;
    for (let k = 0; k < 4; k++) if (VERTS_4D[i][k] !== VERTS_4D[j][k]) d++;
    if (d === 1) EDGES.push([i, j]);
  }

function rotate4D(
  [x, y, z, w]: [number, number, number, number],
  t: number
): [number, number, number, number] {
  // XW plane — the "folding through 4D" illusion
  const a1 = t * 0.38;
  const c1 = Math.cos(a1), s1 = Math.sin(a1);
  const rx = x * c1 - w * s1;
  const rw = x * s1 + w * c1;

  // YZ plane
  const a2 = t * 0.22;
  const c2 = Math.cos(a2), s2 = Math.sin(a2);
  const ry = y * c2 - z * s2;
  const rz = y * s2 + z * c2;

  // XY plane (slow drift)
  const a3 = t * 0.14;
  const c3 = Math.cos(a3), s3 = Math.sin(a3);
  return [rx * c3 - ry * s3, rx * s3 + ry * c3, rz, rw];
}

function project4to3([x, y, z, w]: [number, number, number, number]): [number, number, number] {
  const scale = 2.5 / (2.5 + w);
  return [x * scale, y * scale, z * scale];
}

export default function TesseractCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 3.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Bloom post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 1.8, 0.5, 0.05);
    composer.addPass(bloom);

    // Tesseract geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(EDGES.length * 6), 3)
    );
    const material = new THREE.LineBasicMaterial({ color: 0x00e5ff, toneMapped: false });
    const lines = new THREE.LineSegments(geometry, material);
    lines.scale.setScalar(1.25);
    scene.add(lines);

    // Animation loop
    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      const pts = VERTS_4D.map(v => project4to3(rotate4D(v, t)));
      const attr = geometry.attributes.position as THREE.BufferAttribute;
      let i = 0;
      for (const [a, b] of EDGES) {
        attr.setXYZ(i++, pts[a][0], pts[a][1], pts[a][2]);
        attr.setXYZ(i++, pts[b][0], pts[b][1], pts[b][2]);
      }
      attr.needsUpdate = true;

      lines.rotation.y = t * 0.07;
      lines.rotation.x = Math.sin(t * 0.11) * 0.15;

      composer.render();
    };
    animate();

    // Responsive resize
    const observer = new ResizeObserver(() => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      composer.setSize(nw, nh);
    });
    observer.observe(mount);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
