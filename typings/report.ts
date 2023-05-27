export type ReportArticle = {
  id: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  place: string;
  title: string;
  description: string;
};

export type ReportLists = {
  articles: ReportArticle[];
  total: number;
  count: number;
};
