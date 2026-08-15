/**
 * ORBIT // YATIN — Shared Materials & Geometry Registry
 * Centralized singleton material and geometry instances.
 * Every 3D component references these to eliminate duplicate GPU uploads
 * and reduce draw call overhead without changing visual appearance.
 */

import {
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  MeshBasicMaterial,
  CylinderGeometry,
  BoxGeometry,
  SphereGeometry,
  TorusGeometry,
  RingGeometry,
  ConeGeometry,
  OctahedronGeometry,
  IcosahedronGeometry,
  DodecahedronGeometry,
  PlaneGeometry,
} from "three";

// ─── SHARED BASE MATERIALS ──────────────────────────────────────────────────

/** Dark titanium hull — primary station structure */
export const matTitaniumHull = new MeshStandardMaterial({
  color: "#12141c",
  metalness: 0.92,
  roughness: 0.25,
});

/** Brushed aluminium — precision machined housing */
export const matBrushedAluminum = new MeshStandardMaterial({
  color: "#b0b6c2",
  metalness: 0.88,
  roughness: 0.22,
});

/** Carbon fiber composite panel */
export const matCarbonFiber = new MeshStandardMaterial({
  color: "#15171e",
  metalness: 0.7,
  roughness: 0.45,
});

/** Dark panel — secondary structural surface */
export const matDarkPanel = new MeshStandardMaterial({
  color: "#1a1d28",
  metalness: 0.88,
  roughness: 0.32,
});

/** Collar & truss reinforcement accent */
export const matTrussAccent = new MeshStandardMaterial({
  color: "#252936",
  metalness: 0.95,
  roughness: 0.2,
});

/** Habitation module casing */
export const matHabitationModule = new MeshStandardMaterial({
  color: "#1f2330",
  metalness: 0.9,
  roughness: 0.3,
});

/** Structural interior floor rib */
export const matStructuralRib = new MeshStandardMaterial({
  color: "#2a2c3a",
  metalness: 0.8,
  roughness: 0.35,
});

/** Photovoltaic solar wing panel */
export const matSolarPanel = new MeshStandardMaterial({
  color: "#080c18",
  metalness: 0.98,
  roughness: 0.15,
});

/** High-gain antenna mast */
export const matCommsMast = new MeshStandardMaterial({
  color: "#33384a",
  metalness: 0.95,
  roughness: 0.25,
});

/** Radar parabolic dish */
export const matRadarDish = new MeshStandardMaterial({
  color: "#4a5068",
  metalness: 0.9,
  roughness: 0.3,
});

/** Autonomous drone chassis */
export const matDroneChassis = new MeshStandardMaterial({
  color: "#1a1c26",
  metalness: 0.9,
  roughness: 0.2,
});

// ─── SHARED EMISSIVE MATERIALS ──────────────────────────────────────────────

/** Primary electric cyan accelerator strip / sensor emissive */
export const matCyanEmissive = new MeshStandardMaterial({
  color: "#00e5ff",
  emissive: "#00e5ff",
  emissiveIntensity: 1.2,
});

/** Subtle cyan structural glow */
export const matCyanEmissiveLow = new MeshStandardMaterial({
  color: "#00e5ff",
  emissive: "#00e5ff",
  emissiveIntensity: 0.4,
});

/** Warm amber status / energy chamber emissive */
export const matAmberEmissive = new MeshStandardMaterial({
  color: "#ffbe0b",
  emissive: "#ffbe0b",
  emissiveIntensity: 1.2,
});

/** Navigation beacon red strobe */
export const matRedBeacon = new MeshStandardMaterial({
  color: "#ff3838",
  emissive: "#ff3838",
  emissiveIntensity: 2.5,
});

/** Navigation beacon cyan strobe */
export const matCyanBeacon = new MeshStandardMaterial({
  color: "#00e5ff",
  emissive: "#00e5ff",
  emissiveIntensity: 2.5,
});

/** Photovoltaic grid wireframe */
export const matSolarGrid = new MeshStandardMaterial({
  color: "#0077b6",
  emissive: "#0077b6",
  emissiveIntensity: 0.3,
  wireframe: true,
});

/** Warm white holographic wireframe */
export const matWarmWhiteWireframe = new MeshStandardMaterial({
  color: "#f0ece4",
  emissive: "#f0ece4",
  emissiveIntensity: 0.3,
  wireframe: true,
});

// ─── SHARED OPTICAL & BASIC MATERIALS ───────────────────────────────────────

/** Optical glass transmission material */
export const matGlass = new MeshPhysicalMaterial({
  color: "#ffffff",
  transmission: 0.92,
  roughness: 0.08,
  thickness: 1.6,
  ior: 1.65,
  clearcoat: 1.0,
  metalness: 0.05,
  transparent: true,
  opacity: 0.9,
});

/** Cyan transparent halo / thruster cone */
export const matCyanTransparent = new MeshBasicMaterial({
  color: "#00e5ff",
  transparent: true,
  opacity: 0.6,
});

/** Background star particle material */
export const matStarParticle = new MeshBasicMaterial({
  color: "#f0ece4",
});

/** Foreground atmospheric space dust material */
export const matDustParticle = new MeshBasicMaterial({
  color: "#00e5ff",
  transparent: true,
  opacity: 0.35,
});

// ─── SHARED GEOMETRIES ──────────────────────────────────────────────────────

/** Station core hub octagonal cylinder */
export const geoCoreHub = new CylinderGeometry(1.6, 1.8, 3.8, 8);

/** Collar ring torus (reused 3x on station core) */
export const geoCollarRing = new TorusGeometry(1.85, 0.06, 16, 32);

/** Primary living ring torus */
export const geoPrimaryRing = new TorusGeometry(9.5, 0.35, 24, 96);

/** Accelerator strip torus */
export const geoAcceleratorStrip = new TorusGeometry(9.25, 0.02, 16, 96);

/** Habitation module box (instanced 8x on primary ring) */
export const geoHabitationModule = new BoxGeometry(0.7, 1.2, 0.7);

/** Secondary observation ring torus */
export const geoSecondaryRing = new TorusGeometry(6.2, 0.18, 16, 64);

/** Docking pylon box */
export const geoDockingPylon = new BoxGeometry(7.2, 0.18, 0.35);

/** Pylon reinforcement rib */
export const geoPylonRib = new BoxGeometry(6.8, 0.04, 0.15);

/** Solar panel box */
export const geoSolarPanel = new BoxGeometry(3.2, 0.04, 1.6);

/** Solar grid plane */
export const geoSolarGrid = new PlaneGeometry(3.1, 1.5);

/** Antenna mast cylinder */
export const geoAntennaMast = new CylinderGeometry(0.04, 0.08, 2.0, 8);

/** Radar dish cone */
export const geoRadarDish = new ConeGeometry(0.45, 0.15, 16, 1, true);

/** Navigation beacon sphere */
export const geoBeacon = new SphereGeometry(0.07, 8, 8);

/** Drone chassis box */
export const geoDroneChassis = new BoxGeometry(0.3, 0.08, 0.45);

/** Drone sensor pod sphere */
export const geoDroneSensor = new SphereGeometry(0.06, 8, 8);

/** Drone thruster cone */
export const geoDroneThruster = new ConeGeometry(0.04, 0.2, 8);

/** Observatory glass cylinder */
export const geoObservatoryGlass = new CylinderGeometry(2.6, 2.6, 3.4, 32, 1, true);

/** Observatory deck plate cylinder */
export const geoObservatoryDeck = new CylinderGeometry(2.7, 2.7, 0.15, 32);

/** Observatory structural rib box */
export const geoObservatoryRib = new BoxGeometry(5.0, 0.04, 0.08);

/** Observatory table cylinder */
export const geoObservatoryTable = new CylinderGeometry(0.7, 0.85, 0.7, 16);

/** Holographic projection ring */
export const geoHoloRing = new RingGeometry(0.1, 0.6, 24);

/** Identity matrix octahedron */
export const geoIdentityOctahedron = new OctahedronGeometry(0.45, 0);

/** Telemetry orbit ring */
export const geoTelemetryRing = new TorusGeometry(0.75, 0.015, 16, 48);

/** Star instanced mesh geometry */
export const geoStarSphere = new SphereGeometry(1, 6, 6);

/** Dust instanced mesh geometry */
export const geoDustSphere = new SphereGeometry(1, 4, 4);

/** DevScope glass orb */
export const geoGlassOrb = new SphereGeometry(1.1, 32, 32);

/** DevScope root node */
export const geoRootNode = new OctahedronGeometry(0.3, 0);

/** DevScope code node */
export const geoCodeNode = new BoxGeometry(0.1, 0.1, 0.1);

/** Network analyzer threat core */
export const geoThreatCore = new DodecahedronGeometry(0.45, 0);

/** Network analyzer firewall shield */
export const geoFirewallShield = new IcosahedronGeometry(0.95, 1);

/** Network analyzer threat packet */
export const geoThreatPacket = new SphereGeometry(0.05, 8, 8);

/** SIH ballot anchor octahedron */
export const geoBallotAnchor = new OctahedronGeometry(0.4, 0);

/** SIH ballot chain block */
export const geoChainBlock = new BoxGeometry(0.18, 0.12, 0.12);

/** SIH ballot verification ring */
export const geoBallotRing = new TorusGeometry(0.9, 0.015, 16, 48);

/** Orbit engine processor plates */
export const geoProcessorPlate = new BoxGeometry(1.0, 0.04, 1.0);

/** Orbit engine kernel core */
export const geoKernelCore = new IcosahedronGeometry(0.3, 0);

/** Orbit engine shader ring */
export const geoShaderRing = new TorusGeometry(0.8, 0.02, 16, 48);

/** Archive datum halo ring */
export const geoDatumHalo = new RingGeometry(0.08, 0.75, 32);
