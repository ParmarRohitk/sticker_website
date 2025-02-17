export interface Sticker {
  title: string;
  slug: string;
  description: string;
  sticker_path: string;
  views: number;
  likes: number;
}

export interface Category {
  title: string;
  slug: string;
  description: string;
  stickers: Sticker[];
}
