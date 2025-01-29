export type Params = { query?: string; page?: number; }
export type Photo = {
  id: number;
  alt: string;
  photographer: string;
  src: { small: string; medium: string; large: string; }
}