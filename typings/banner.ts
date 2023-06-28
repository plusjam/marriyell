import { ImageObject } from "./global";

export type BannerArticle = {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: ImageObject;
  href: string;
};

export type BannerLists = {
  articles: BannerArticle[];
  total: number;
  count: number;
};
