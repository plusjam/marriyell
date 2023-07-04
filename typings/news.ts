import { ImageObject } from "./global";

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

export type Category = {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
};

export type Categories = {
  multiple: boolean;
  articles: Category[];
};

export type Description = {
  scheme: {
    unique_id: "field1" | "field2" | "field3" | "field4";
    name: string;
  };
  values: {
    text?: string;
    image?: ImageObject;
  };
};

export type Form = {
  multiple: boolean;
  select: ["フォームなし"] | ["フォームあり 日付け[無]"] | ["フォームあり 日付け[有]"];
};

export type Date = {
  multiple: boolean;
  values: string[];
};

export type Time = {
  scheme: {
    unique_id: string;
    name: string;
  };
  values: {
    startHour: {
      multiple: boolean;
      select: string[];
    };
    startMinutes: {
      multiple: boolean;
      select: string[];
    };
    endHour: {
      multiple: boolean;
      select: string[];
    };
    endMinutes: {
      multiple: boolean;
      select: string[];
    };
  };
};

export type NewsArticle = {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  eyecatch: ImageObject;
  categories: Categories;
  datetime: string;
  description: Description[];
  form: Form;
  date?: Date | null;
  time?: Time[] | null;
};

export type NewsLists = {
  articles: NewsArticle[];
  total: number;
  count: number;
};

export type NewsList = {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  articles: NewsArticle[];
  prevCode: string | null;
  nextCode: string | null;
  title: string;
  eyecatch: ImageObject;
  categories: Categories;
  datetime: string;
  description: Description[];
  form: Form;
  date?: Date | null;
  time?: Time[] | null;
};

//
// お知らせカテゴリ
//

export type NewsCategoryLabel = "すべて" | "お知らせ" | "イベント" | "メディア情報" | "コロナ対策";

export type NewsCategories = {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: NewsCategoryLabel;
};

export type NewsCategoriesLists = {
  articles: NewsCategories[];
  total: number;
  count: number;
};
