/**
 * Collection Asset Barrel: Over-Rider Bosozoku (v1.0)
 * AndreArt Vestuario - Urban Fantasy Haute Couture
 * 
 * Central entry point defining active assets, garments, and source references.
 */

export interface CollectionGarment {
  name: string;
  sku: string;
  category: string;
  textile: string;
  fit: string;
}

export interface CollectionAsset {
  id: string;
  filename: string;
  path: string;
  category: 'figurine' | 'flat-technical' | 'editorial';
  garment: string;
  view: string;
  description: string;
  sourceReference?: string | null;
  status: 'active' | 'archived';
  approved: boolean;
}

export interface CollectionReference {
  filename: string;
  path: string;
  type: string;
  description: string;
}

export const COLLECTION_INFO = {
  name: 'Over-Rider Bosozoku',
  slug: 'over-rider-bosozoku',
  version: '1.0',
  updatedAt: '2026-11-08',
  season: 'Atemporal / Clima Frío y Carretera (Bogotá)',
  concept: 'Enterizo techwear motero de apertura rápida con influencias bōsōzoku de Tokyo Revengers (Toman) y Akira (The Capsules)',
  palette: '100% Total Jet Black (#0D0D0E) con Serigrafía Reflectiva Microprismática de Seguridad Vial',
  specPath: './SPEC.md',
  heroProduct: 'Enterizo Over-Rider Bosozoku Dual-Zip'
};

export const GARMENTS: CollectionGarment[] = [
  {
    name: 'Enterizo Over-Rider Toman Shodai',
    sku: 'ANDR-OVR-TOM-01',
    category: 'Prenda Enteriza Exterior (Oversuit)',
    textile: 'Cordura / Nylon Oxford 600D impermeable con forro térmico capitonado desmontable',
    fit: 'Corte ergonómico precurvado para moto, cremalleras laterales de pierna completa, drop-seat trasero y serigrafía reflectiva kanjis Toman'
  },
  {
    name: 'Enterizo Over-Rider The Capsules',
    sku: 'ANDR-OVR-AKI-01',
    category: 'Prenda Enteriza Exterior (Oversuit)',
    textile: 'Cordura / Nylon Oxford 600D impermeable con forro térmico capitonado desmontable',
    fit: 'Corte ergonómico precurvado para moto, cremalleras laterales de pierna completa, drop-seat trasero y emblema cápsula Akira reflectivo'
  }
];

export const ASSETS: Record<string, CollectionAsset> = {};

export const REFERENCES: Record<string, CollectionReference> = {
  'refe-apertura-paso-1': {
    filename: 'refe-apertura-paso-1.jpg',
    path: './references/refe-apertura-paso-1.jpg',
    type: 'fast-step-in-demo',
    description: 'Demostración de colocación rápida: apertura inicial envolvente sin descalzarse.'
  },
  'refe-apertura-paso-2-forro': {
    filename: 'refe-apertura-paso-2-forro.jpg',
    path: './references/refe-apertura-paso-2-forro.jpg',
    type: 'thermal-quilted-lining',
    description: 'Vista interior del forro acolchado capitonado en rombos y solapa frontal.'
  },
  'refe-apertura-paso-3-pierna': {
    filename: 'refe-apertura-paso-3-pierna.jpg',
    path: './references/refe-apertura-paso-3-pierna.jpg',
    type: 'leg-zipper-closure',
    description: 'Cierre de cremallera de pierna continua sobre pantalón y calzado urbano.'
  },
  'refe-vista-frontal-puesta': {
    filename: 'refe-vista-frontal-puesta.jpg',
    path: './references/refe-vista-frontal-puesta.jpg',
    type: 'full-body-front-worn',
    description: 'Enterizo cerrado de cuerpo entero: cuello alto, bolsillos frontales y silueta techwear.'
  },
  'refe-apertura-total-capullo': {
    filename: 'refe-apertura-total-capullo.jpg',
    path: './references/refe-apertura-total-capullo.jpg',
    type: 'cocoon-wrap-opening',
    description: 'Apertura perimétrica completa mostrando el despiece tipo capullo envolvente.'
  },
  'refe-dropseat-lumbar-1': {
    filename: 'refe-dropseat-lumbar-1.jpg',
    path: './references/refe-dropseat-lumbar-1.jpg',
    type: 'drop-seat-back-view',
    description: 'Vista posterior: canesú dorsal con estampado, franja reflectiva y solapa abatible.'
  },
  'refe-dropseat-lumbar-2-acceso': {
    filename: 'refe-dropseat-lumbar-2-acceso.jpg',
    path: './references/refe-dropseat-lumbar-2-acceso.jpg',
    type: 'drop-seat-functional-access',
    description: 'Demostración funcional del drop-seat: abatimiento lumbar y acceso a bolsillos interiores.'
  }
};
