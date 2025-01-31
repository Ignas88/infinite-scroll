export interface Params {
  query?: string;
  page?: number;
  per_page?: number;
}

export interface Photo {
  id: number;
  alt: string;
  photographer: string;
  src: { small: string; medium: string; large: string; };
}