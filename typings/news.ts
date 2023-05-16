export type NewsCategoryLabel = "すべて" | "お知らせ" | "イベント" | "メディア情報" | "コロナ対策";

export type NewsCategoruSlug<T extends NewsCategoryLabel> = T extends "すべて"
  ? "all"
  : T extends "お知らせ"
  ? "news"
  : T extends "イベント"
  ? "event"
  : T extends "メディア情報"
  ? "media"
  : T extends "コロナ対策"
  ? "covid"
  : never;

export type NewsCategory = {
  label: NewsCategoryLabel;
  slug: NewsCategoruSlug<NewsCategoryLabel>;
  checked?: boolean;
};

export type NewsContents = {
  id: number;
  src: string;
  category: NewsCategory[];
  publishDate: string;
  createdDate: string;
  updatedDate: string;
  title: string;
  description: string;
};
