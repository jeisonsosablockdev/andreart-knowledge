/**
 * Collection Asset Barrel: Kokusen (v1.4)
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
  name: 'Kokusen',
  slug: 'kokusen',
  version: '1.4',
  updatedAt: '2026-11-07',
  season: 'Atemporal / Clima Frío y Montaña (Bogotá)',
  concept: 'Deconstrucción sastre del uniforme de combate de Yuji Itadori (Jujutsu Kaisen, Shinjuku Showdown) y la técnica Kokusen',
  palette: '100% Total Jet Black (#0D0D0E)',
  specPath: './SPEC.md',
  heroProduct: 'Chaqueta Cuello Chimenea Kokusen'
};

export const GARMENTS: CollectionGarment[] = [
  {
    name: 'Chaqueta Cuello Chimenea Kokusen',
    sku: 'ANDR-KOK-CHQ-01',
    category: 'Prenda Superior Insignia (Exterior)',
    textile: 'Sarga pesada de algodón peinado (310 GSM) con forro 100% en satín negro azabache',
    fit: 'Multitalle adaptable XS-XL con jareta graduable en bajo y cuello chimenea estructurado (11 cm)'
  },
  {
    name: 'Pantalón Globo Plisado Kokusen',
    sku: 'ANDR-KOK-PAN-01',
    category: 'Prenda Inferior Insignia (Pantalón Bombacho)',
    textile: 'Gabardina fluida de algodón peinado (280-300 GSM) con fondos de bolsillo en satín negro',
    fit: 'Tiro alto con pretina sastre, pasadores, doble pliegue profundo y puños elásticos fruncidos en tobillo'
  }
];

export const ASSETS: Record<string, CollectionAsset> = {
  '01-sketch-figurin-pantalon-globo': {
    id: '01-sketch-figurin-pantalon-globo',
    filename: '01-sketch-figurin-pantalon-globo.jpg',
    path: './assets/01-sketch-figurin-pantalon-globo.jpg',
    category: 'figurine',
    garment: 'Pantalón Globo Plisado Kokusen',
    view: 'pasarela',
    description: 'Figurín de autor protagónico mostrando en exclusiva el Pantalón Globo Plisado con top fajado y zapatillas Air Jordan 5 Retro Red Suede en gamuza carmesí.',
    sourceReference: './references/refe-pantalon-globo-01.jpg, ./references/refe-calzado-jordan-5-red-suede.jpg',
    status: 'active',
    approved: true
  },
  '01-sketch-personaje-frente': {
    id: '01-sketch-personaje-frente',
    filename: '01-sketch-personaje-frente.jpg',
    path: './assets/01-sketch-personaje-frente.jpg',
    category: 'figurine',
    garment: 'Conjunto Kokusen',
    view: 'frente-pasarela',
    description: 'Figurín de moda de pasarela del look total black integrado (Chaqueta Cuello Chimenea con tancas + Pantalón Globo Plisado sobre zapatillas Air Jordan 5 Retro Red Suede).',
    sourceReference: './references/refe-pantalon-globo-01.jpg, ./references/refe-calzado-jordan-5-red-suede.jpg',
    status: 'active',
    approved: true
  },
  '04-sketch-chaqueta-frente': {
    id: '04-sketch-chaqueta-frente',
    filename: '04-sketch-chaqueta-frente.jpg',
    path: './assets/04-sketch-chaqueta-frente.jpg',
    category: 'flat-technical',
    garment: 'Chaqueta Cuello Chimenea Kokusen',
    view: 'delantera',
    description: 'Croquis plano frontal de la Chaqueta Blouson con cuello chimenea (11 cm), cremallera metálica continua, ojaletes con tancas carmesí, bolsillos diagonales y capota.',
    sourceReference: null,
    status: 'active',
    approved: true
  },
  '05-sketch-chaqueta-atras': {
    id: '05-sketch-chaqueta-atras',
    filename: '05-sketch-chaqueta-atras.jpg',
    path: './assets/05-sketch-chaqueta-atras.jpg',
    category: 'flat-technical',
    garment: 'Chaqueta Cuello Chimenea Kokusen',
    view: 'trasera',
    description: 'Croquis plano dorsal de la Chaqueta Blouson con canesú sastre, hombros caídos, pretina con elástico y capota drapeada.',
    sourceReference: null,
    status: 'active',
    approved: true
  },
  '06-sketch-pantalon-frente': {
    id: '06-sketch-pantalon-frente',
    filename: '06-sketch-pantalon-frente.jpg',
    path: './assets/06-sketch-pantalon-frente.jpg',
    category: 'flat-technical',
    garment: 'Pantalón Globo Plisado Kokusen',
    view: 'delantera',
    description: 'Croquis plano frontal del Pantalón Globo con pretina sastre, pasadores, botón, doble pliegue y puños elásticos.',
    sourceReference: './references/refe-pantalon-globo-01.jpg',
    status: 'active',
    approved: true
  },
  '07-sketch-pantalon-atras': {
    id: '07-sketch-pantalon-atras',
    filename: '07-sketch-pantalon-atras.jpg',
    path: './assets/07-sketch-pantalon-atras.jpg',
    category: 'flat-technical',
    garment: 'Pantalón Globo Plisado Kokusen',
    view: 'trasera',
    description: 'Croquis plano dorsal del Pantalón Globo con pretina trasera con pasadores, pinzas de entalle y doble vivo.',
    sourceReference: './references/refe-pantalon-globo-01.jpg',
    status: 'active',
    approved: true
  },
  '08-foto-realista-kokusen-hero': {
    id: '08-foto-realista-kokusen-hero',
    filename: '08-foto-realista-kokusen-hero.jpg',
    path: './assets/08-foto-realista-kokusen-hero.jpg',
    category: 'editorial',
    garment: 'Conjunto Kokusen',
    view: 'editorial-lookbook',
    description: 'Fotografía editorial ultra-realista de estudio con modelo real vistiendo el conjunto Kokusen completo con zapatillas Air Jordan 5 Retro Red Suede.',
    sourceReference: './references/refe-pantalon-globo-02.jpg, ./references/refe-calzado-jordan-5-red-suede.jpg',
    status: 'active',
    approved: true
  }
};

export const REFERENCES: Record<string, CollectionReference> = {
  'refe-pantalon-globo-01': {
    filename: 'refe-pantalon-globo-01.jpg',
    path: './references/refe-pantalon-globo-01.jpg',
    type: 'design-flat',
    description: 'Referencia visual de silueta bombacho de tiro alto con pretina sastre formal y despiece en plano.'
  },
  'refe-pantalon-globo-02': {
    filename: 'refe-pantalon-globo-02.jpg',
    path: './references/refe-pantalon-globo-02.jpg',
    type: 'drape-fit',
    description: 'Referencia de caída y drapeado de gabardina de alto gramaje con bota recogida sobre calzado cerrado.'
  },
  'refe-calzado-jordan-5-red-suede': {
    filename: 'refe-calzado-jordan-5-red-suede.jpg',
    path: './references/refe-calzado-jordan-5-red-suede.jpg',
    type: 'footwear-styling',
    description: 'Referencia de calzado insignia: Zapatillas Air Jordan 5 Retro Red Suede en gamuza carmesí (#D01E29), lengüeta reflectiva plateada 3M y seguro de cordones transparente.'
  }
};
