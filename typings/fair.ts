import { ImageObject } from "./global";

export type CategoryArticle = {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  icon: string | null;
  iconFocus: string | null;
};

export type Category = {
  multiple: boolean;
  articles: CategoryArticle[];
};

export type ContentArticle = {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: ImageObject | null;
  title: string;
  description: string;
};

export type Content = {
  multiple: boolean;
  articles: ContentArticle[];
};

export type Calendar = {
  scheme: {
    inique_id: string;
    name: string;
  };
  values: {
    calendar: string;
  };
};

export type CalendarMulti = {
  multiple: boolean;
  values: string[];
};

export type OpenTime = {
  scheme: {
    inique_id: string;
    name: string;
  };
  values: {
    timeRange: string;
  };
};

export type Previleges = {
  scheme: {
    inique_id: string;
    name: string;
  };
  values: {
    previlege: string;
  };
};

export type FairArticle = {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  mainPc: ImageObject;
  mainSp: ImageObject;
  categories: Category;
  description: string;
  calendar: Calendar[];
  calendarMulti: CalendarMulti | null;
  requireTime: number;
  openTime: OpenTime[];
  limited: string | null;
  remarks: string;
  visitPrevileges: Previleges[] | null;
  signingPrevileges: Previleges[] | null;
  contents: Content;
};

export type FairLists = {
  articles: FairArticle[];
  total: number;
  count: number;
};

export type FairList = {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  prevCode: string | null;
  nextCode: string | null;
  title: string;
  mainPc: ImageObject;
  mainSp: ImageObject;
  categories: Category;
  description: string;
  calendar: Calendar[];
  calendarMulti: CalendarMulti | null;
  requireTime: number;
  openTime: OpenTime[];
  limited: string;
  remarks: string;
  visitPrevileges: Previleges[] | null;
  signingPrevileges: Previleges[] | null;
  contents: Content;
};

/* =====================
フェアカテゴリ
===================== */

export type FairCategoryArticle = {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  icon: ImageObject;
  iconFocus: ImageObject;
};

export type FairCategoriesLists = {
  articles: FairCategoryArticle[];
  total: number;
  count: number;
};
