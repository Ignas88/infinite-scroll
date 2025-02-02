export interface Params {
  query?: string;
  page?: number;
  per_page?: number;
  signal: AbortSignal;
}

export interface Photo {
  id: number;
  alt: string;
  photographer: string;
  src: { small: string; medium: string; large: string; };
}

export interface ResponseJSON {
  photos: Photo[];
}