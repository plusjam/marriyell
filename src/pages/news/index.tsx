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
import useApi from "../../../libs/useApi";

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
  const { status, handleStatus } = useApi();
  const { status: ButtonStatus, handleStatus: handleButtonStatus } = useApi();

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
    try {
      const initLists = { ...newsLists };
      const target = e.target as HTMLElement;
      const title = target.getAttribute("data-title") as string;

      handleStatus("loading");

      settitle(title!);

      if (title === "すべて") {
        setOriginalLists({ ...initLists });
        setCategory([...newsCategoriesListsSelect]);
        handleStatus("success");

        return;
      }

      const newCategorytitle = [...newsCategoriesListsSelect].map((elem) => {
        if (elem.title === title) {
          return { ...elem, selected: true };
        } else {
          return { ...elem, selected: false };
        }
      });

      setCategory(newCategorytitle);

      const data: NewsLists = await getNewsData(0, `{"categories.contentAt":{"title":"${title}"}}`);
      // console.log("絞り込み", data);

      setOriginalLists({ ...data });
      handleStatus("success");
      // setOriginalLists({ ...initLists, articles: newContents });
    } catch (error) {
      handleStatus("error");
    }
  };

  // 次ページ読み込み
  const clickViewMore = async () => {
    handleButtonStatus("loading");
    const data: NewsLists = await getNewsData(originalLists.articles.length, `{"categories.contentAt":{"title":"${title}"}}`);

    if (!data) return;

    setOriginalLists({ articles: [...originalLists.articles, ...data.articles], total: data.total, count: data.count });
    handleButtonStatus("success");
  };

  return (
    <>
      <Motion>
        <Head>
          <title>{META.news.title}</title>
        </Head>

        <main>
          <UnderlayerHead en="News ＆ Event" ja="お知らせ・イベント情報" image="/images/news_main.jpg" spImage="/images/news_main-sp.jpg" />
          <NewsBody originalLists={originalLists} clickCategory={clickCategory} clickViewMore={clickViewMore} category={category} status={status} buttonStatus={ButtonStatus} />

          <TopWeddingPlan planLists={[...planLists.articles]} />

          <InstagramSection />
        </main>
      </Motion>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const accessKey = process.env.API_KEY;
  const secretKey = process.env.API_SECRET;
  const token = await apricotClient(accessKey, secretKey);

  const option = {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  };

  /* ===================================================================
  // プラン
  =================================================================== */
  const planUrl = `${process.env.CMS_URL}/api/v1/plan`;
  const planRes = axios.get<PlanLists>(planUrl, option);

  /* ===================================================================
  // お知らせ
  =================================================================== */
  const newsUrl = `${process.env.CMS_URL}/api/v1/news`;
  const newsRes = axios.get<NewsLists>(newsUrl, option);

  /* ===================================================================
  // お知らせカテゴリ
  =================================================================== */
  const newsCategoriesUrl = `${process.env.CMS_URL}/api/v1/newsCategories`;
  const newsCategoriesRes = await axios.get<NewsCategoriesLists>(newsCategoriesUrl, option);

  const results = await Promise.all([planRes, newsRes, newsCategoriesRes]);
  const planLists = results[0].data;
  const newsLists = results[1].data;
  const newsCategoriesLists = results[2].data;

  return {
    props: {
      planLists,
      newsLists,
      newsCategoriesLists,
    },
    revalidate: 10,
  };
};
