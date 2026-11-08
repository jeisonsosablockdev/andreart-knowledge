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
    fit: 'Corte ergonómico precurvado para moto, cremallera completa lateral derecha (cuello a bota), cremallera interna de entrepierna en pierna izquierda, drop-seat trasero y serigrafía reflectiva kanjis Toman'
  },
  {
    name: 'Enterizo Over-Rider The Capsules',
    sku: 'ANDR-OVR-AKI-01',
    category: 'Prenda Enteriza Exterior (Oversuit)',
    textile: 'Cordura / Nylon Oxford 600D impermeable en Rojo Escarlata Kaneda (#D01E29) con forro térmico capitonado desmontable',
    fit: 'Corte ergonómico precurvado para moto en rojo escarlata, hombreras acolchadas acanaladas estilo Akira, cremallera completa lateral derecha (cuello a bota), cremallera interna de entrepierna en pierna izquierda, drop-seat trasero y gran emblema dorsal de la píldora "Good for health, Bad for education"'
  }
];

export const ASSETS: Record<string, CollectionAsset> = {
  '01-figurin-toman-shodai-frente': {
    id: '01-figurin-toman-shodai-frente',
    filename: '01-figurin-toman-shodai-frente.jpg',
    path: './assets/01-figurin-toman-shodai-frente.jpg',
    category: 'figurine',
    garment: 'Enterizo Over-Rider Toman Shodai',
    view: 'frente-pasarela',
    description: 'Figurín de autor a mano alzada en acuarela sobre papel marfil (#F6F4EE) luciendo el enterizo técnico motero en Jet Black (#0D0D0E) con cremallera completa lateral derecha (cuello a bota), cremallera interna de entrepierna en pierna izquierda, bolsillo táctico de pecho, kanjis dorados reflectivos "初代総長", llamadas técnicas y sello Andreart.',
    sourceReference: './references/refe-vista-frontal-puesta.jpg, ./references/refe-apertura-total-capullo.jpg',
    status: 'active',
    approved: true
  },
  '02-figurin-toman-shodai-espalda': {
    id: '02-figurin-toman-shodai-espalda',
    filename: '02-figurin-toman-shodai-espalda.jpg',
    path: './assets/02-figurin-toman-shodai-espalda.jpg',
    category: 'figurine',
    garment: 'Enterizo Over-Rider Toman Shodai',
    view: 'espalda-dorsal',
    description: 'Figurín de autor a mano alzada en acuarela sobre papel marfil (#F6F4EE) dorsal mostrando la gráfica caligráfica en oro reflectivo de la Tokyo Manji Gang ("初代", "東京卍會", "初代総長"), canesú con compartimento de capota, solapa drop-seat lumbar con banda reflectiva, llamadas técnicas sutiles y sello Andreart.',
    sourceReference: './references/refe-dropseat-lumbar-1.jpg',
    status: 'active',
    approved: true
  },
  '03-figurin-capsules-akira-frente': {
    id: '03-figurin-capsules-akira-frente',
    filename: '03-figurin-capsules-akira-frente.jpg',
    path: './assets/03-figurin-capsules-akira-frente.jpg',
    category: 'figurine',
    garment: 'Enterizo Over-Rider The Capsules',
    view: 'frente-pasarela-hombre-rojo',
    description: 'Figurín de autor a mano alzada en acuarela roja escarlata (#D01E29) sobre papel marfil (#F6F4EE) con modelo masculino inspirado en Kaneda luciendo el enterizo técnico motero, hombreras acolchadas acanaladas estilo Akira, cremallera completa lateral derecha (cuello a bota), cremallera interna de entrepierna en pierna izquierda, llamadas técnicas y sello Andreart.',
    sourceReference: './references/refe-kaneda-akira-suit.jpg, ./references/refe-vista-frontal-puesta.jpg',
    status: 'active',
    approved: true
  },
  '04-figurin-capsules-akira-espalda': {
    id: '04-figurin-capsules-akira-espalda',
    filename: '04-figurin-capsules-akira-espalda.jpg',
    path: './assets/04-figurin-capsules-akira-espalda.jpg',
    category: 'figurine',
    garment: 'Enterizo Over-Rider The Capsules',
    view: 'espalda-dorsal-hombre-rojo',
    description: 'Figurín de autor a mano alzada en acuarela dorsal mostrando a gran escala en el centro de la espalda el emblemático diseño circular de la píldora cápsula con el lema "Good for health, Bad for education", hombreras acanaladas, canesú con capota escamoteable y solapa lumbar drop-seat con banda reflectiva.',
    sourceReference: './references/refe-kaneda-akira-suit.jpg, ./references/refe-dropseat-lumbar-1.jpg',
    status: 'active',
    approved: true
  }
};

export const REFERENCES: Record<string, CollectionReference> = {
  'refe-kaneda-akira-suit': {
    filename: 'refe-kaneda-akira-suit.jpg',
    path: './references/refe-kaneda-akira-suit.jpg',
    type: 'character-design-reference',
    description: 'Referencia oficial de Shotaro Kaneda (Akira): traje y chaqueta en rojo escarlata, hombreras acolchadas acanaladas y cuello motero con broches provista por el usuario.'
  },
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
