import InstagramSection from "@/components/orgs/InstagramSection";
import Head from "next/head";
import React from "react";
import Motion from "@/components/layouts/Motion";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import NewsBody from "@/components/orgs/NewsBody";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import { NewsCategory, NewsContents, NewsLists } from "../../../typings/news";
import { GetStaticProps } from "next";
import { apricotClient } from "../../../libs/cms";
import { PlanLists } from "../../../typings/plan";
import axios from "axios";
import { NewsCategoriesLists } from "../../../typings/news";
import { META } from "@/textDate/head";

type NewsCategoriesSelect = NewsCategoriesLists["articles"][0] & { selected: boolean };
export type NewsCategoriesListsSelect = {
  articles: NewsCategoriesSelect[];
  total: number;
  count: number;
};

type Props = {
  planLists: PlanLists;
  newsCategoriesLists: NewsCategoriesLists;
  newsLists: NewsLists;
};

const categoryAll: NewsCategoriesSelect = {
  selected: true,
  id: 9999999,
  code: "string",
  createdAt: "string",
  updatedAt: "string",
  publishedAt: "string",
  title: "すべて",
};

export default function Home(props: Props) {
  const { newsLists, newsCategoriesLists, planLists } = props;

  const selectCategories = newsCategoriesLists.articles.map((elem) => {
    return { ...elem, selected: false };
  });

  const newsCategoriesListsSelect: NewsCategoriesListsSelect["articles"] = [categoryAll, ...selectCategories];

  const [originalLists, setOriginalLists] = React.useState({ ...newsLists });
  const [category, setCategory] = React.useState([...newsCategoriesListsSelect]);
  const [title, settitle] = React.useState("all");
  const [page, setPage] = React.useState<number | null>(1);

  // 対象のページのデータを取得
  const getNewsData = async (offset: number, q: string) => {
    const url = `/api/news`;
    const res = await axios.post(url, {
      offset: offset,
      q: q,
    });
    const data = await res.data;

    return data;
  };

  // 絞り込み機能
  const clickCategory = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const initLists = { ...newsLists };
    const target = e.target as HTMLElement;
    const title = target.getAttribute("data-title") as string;

    const resetPage = 1;

    settitle(title!);
    setPage(resetPage);

    if (title === "すべて") {
      setOriginalLists({ ...initLists });
      setCategory([...newsCategoriesListsSelect]);

      return;
    }

    // const data = await getNewsData(3, `{"categories.articles.title.exists":${title}}`);

    const newCategorytitle = [...newsCategoriesListsSelect].map((elem) => {
      if (elem.title === title) {
        return { ...elem, selected: true };
      } else {
        return { ...elem, selected: false };
      }
    });

    setCategory(newCategorytitle);

    const newContents = [...initLists.articles].filter((elem) => {
      return elem.categories.articles.some((elem) => {
        return elem.title === title;
      });
    });

    setOriginalLists({ ...initLists, articles: newContents });
  };

  // 次ページ読み込み
  const clickViewMore = async () => {
    const nextPage = page ? page + 1 : 1;
    setPage(nextPage);

    const data = await getNewsData(2, "{categories.articles.title.exists: “news”}");

    if (!data) return;

    setOriginalLists({ ...originalLists, articles: [...originalLists.articles, ...data] });
  };

  return (
    <>
      <Motion>
        <Head>
          <title>{META.news.title}</title>
        </Head>

        <main>
          <UnderlayerHead en="News ＆ Event" ja="お知らせ・イベント情報" image="" spImage="" />
          <NewsBody originalLists={originalLists} clickCategory={clickCategory} clickViewMore={clickViewMore} category={category} />

          <TopWeddingPlan planLists={[...planLists.articles]} />

          {/* <InstagramSection /> */}
        </main>
      </Motion>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const accessKey = process.env.API_KEY;
  const secretKey = process.env.API_SECRET;
  const token = await apricotClient(accessKey, secretKey);

  /* ===================================================================
  // プラン
  =================================================================== */
  const planUrl = `${process.env.CMS_URL}/api/v1/plan`;
  const planRes: { data: PlanLists } = await axios.get(planUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const planLists: PlanLists = planRes.data;

  /* ===================================================================
  // お知らせ
  =================================================================== */
  const newsUrl = `${process.env.CMS_URL}/api/v1/news`;
  const newsRes: { data: NewsLists } = await axios.get(newsUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const newsLists: NewsLists = newsRes.data;

  /* ===================================================================
  // お知らせカテゴリ
  =================================================================== */
  const newsCategoriesUrl = `${process.env.CMS_URL}/api/v1/newsCategories`;
  const newsCategoriesRes: { data: NewsCategoriesLists } = await axios.get(newsCategoriesUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const newsCategoriesLists: NewsCategoriesLists = newsCategoriesRes.data;

  return {
    props: {
      newsLists,
      newsCategoriesLists,
      planLists,
    },
  };
};
