export enum Condition {
  m,
  nm,
  'vg+',
  vg,
  g,
  p,
}

export enum Status {
  sold,
  inStock,
}

export interface Record {
  title: string;
  artist: string[];
  label: string[];
  genre: string[];
  year: number;
  condition: Condition;
  price: number;
  status: Status;
  img_uri: string;
}
