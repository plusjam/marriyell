import InstagramSection from "@/components/orgs/InstagramSection";
import Head from "next/head";
import React from "react";
import Motion from "@/components/layouts/Motion";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import NewsBody from "@/components/orgs/NewsBody";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import { NewsCategory, NewsContents } from "../../../typings/news";
import { GetStaticProps } from "next";

type Props = {
  lists: {
    category: NewsCategory[];
    contents: NewsContents[];
    next: number | null;
  };
};

export default function Home(props: Props) {
  const { lists } = props;

  const [newsLists, setNewLists] = React.useState({ ...lists });
  const [slug, setSlug] = React.useState("all");
  const [page, setPage] = React.useState<number | null>(1);

  // 対象のページのデータを取得
  const getNewsData = async (slug: string, page: number) => {
    const url = `/api/news/${slug}/${page}`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
  };

  // 絞り込み機能
  const clickCategory = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const initLists = { ...lists };
    const target = e.target as HTMLElement;
    const slug = target.getAttribute("data-slug") as string;

    const resetPage = 1;

    setSlug(slug!);
    setPage(resetPage);

    if (slug === "all") return setNewLists({ ...initLists });

    const data = await getNewsData(slug, resetPage);

    const newCategorySlug = initLists.category.map((elem) => {
      if (elem.slug === slug) {
        return { ...elem, checked: true };
      } else {
        return { ...elem, checked: false };
      }
    });

    const newContents = initLists.contents.filter((elem) => {
      return elem.category.some((elem) => {
        return elem.slug === slug;
      });
    });

    setNewLists({ ...initLists, contents: [...data], category: [...newCategorySlug] });
  };

  // 次ページ読み込み
  const clickViewMore = async () => {
    const nextPage = page ? page + 1 : 1;
    setPage(nextPage);

    const data = await getNewsData(slug, nextPage);

    if (!data) return;

    setNewLists({ ...newsLists, contents: [...newsLists.contents, ...data] });
  };

  return (
    <>
      <Motion>
        <Head>
          <title>lu CREA ル・クレア｜News</title>
        </Head>

        <main>
          <UnderlayerHead en="News" ja="お知らせ・イベント" image="" spImage="" />
          <NewsBody {...newsLists} next={page} clickCategory={clickCategory} clickViewMore={clickViewMore} />

          <TopWeddingPlan />

          {/* <InstagramSection /> */}
        </main>
      </Motion>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`http://localhost:${process.env.PORT}/api/news/1`);
  const lists: {
    lists: {
      category: NewsCategory[];
      contents: NewsContents[];
    };
  } = await res.json();

  return {
    props: {
      lists: {
        ...lists,
        next: 2,
      },
    },
  };
};
