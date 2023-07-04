import { ImageObject } from "./global";

export type CategoryArticle = {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  icon: ImageObject | null;
  iconFocus: ImageObject | null;
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
  image: string | null;
  title: string;
  description: string;
};

export type Content = {
  scheme: {
    unique_id: string;
    name: string;
  };
  values: {
    content: { multiple: boolean; select: string[] };
    text: string;
  };
};

export type ContentDescription = {
  scheme: {
    unique_id: string;
    name: string;
  };
  values: {
    content: PlanContent;
    text: string;
  };
};

export type Previleges = {
  scheme: {
    unique_id: string;
    name: string;
  };
  values: {
    previlege: string;
  };
};

export type PlanArticle = {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  mainPc: ImageObject;
  mainSp: ImageObject;
  price: number;
  member: string;
  categories: Category;
  term: string | null;
  limited: string | null;
  description: string;
  visitPrevileges: Previleges[] | null;
  signingPrevileges: Previleges[] | null;
  // contents: Content[];
  contentDescription: ContentDescription[];
};

export type PlanLists = {
  articles: PlanArticle[];
  total: number;
  count: number;
};

export type PlanList = {
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
  price: number;
  member: string;
  categories: Category;
  term: string | null;
  limited: string | null;
  description: string;
  visitPrevileges: Previleges[] | null;
  signingPrevileges: Previleges[] | null;
  // contents: Content[];
  contentDescription: ContentDescription[];
};

/* ------------------------------ */
// プランカテゴリ
/* ------------------------------ */
export type PlanCategory = {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  icon: ImageObject | null;
  iconFocus: ImageObject | null;
};

export type PlanCategoriesLists = {
  articles: PlanCategory[];
  total: number;
  count: number;
};

/* ------------------------------ */
// プラン内容詳細
/* ------------------------------ */
export type PlanContent = {
  multiple: boolean;
  articles: {
    id: number | string;
    code: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    title: string;
    icon: ImageObject | null;
  }[];
};
