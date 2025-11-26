export enum TattooStyle {
  REALISM = 'Realismo',
  TRADITIONAL = 'Old School (Tradicional)',
  NEO_TRADITIONAL = 'Neo Tradicional',
  WATERCOLOR = 'Aquarela',
  DOTWORK = 'Pontilhismo/Geométrico',
  JAPANESE = 'Oriental (Irezumi)',
  FINE_LINE = 'Fine Line (Traço Fino)',
  BLACKWORK = 'Blackwork'
}

export interface User {
  email: string;
  name: string;
}

export interface GeneratedSet {
  id: string;
  originalPrompt: string;
  style: TattooStyle;
  colorImage: string; // Base64
  stencilImage: string; // Base64
  timestamp: number;
  viewLabel?: string; // e.g. "External View", "Internal View"
  meaning?: string; // Detailed description of symbolism and elements
}

export interface GenerationRequest {
  description: string;
  style: TattooStyle;
}