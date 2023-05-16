import InstagramSection from "@/components/orgs/InstagramSection";
import Head from "next/head";
import React from "react";
import Motion from "@/components/layouts/Motion";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import NewsBody from "@/components/orgs/NewsBody";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import { NewsCategory, NewsContents } from "../../../typings/news";
import { GetStaticProps } from "next";
import { ReportContents } from "../api/weddingReport/[id]";
import ReportBody from "@/components/orgs/ReportBody";
import useModalReport from "../../../libs/useModalReport";
import ReportModal from "@/components/orgs/ReportModal";

type Props = {
  lists: {
    contents: ReportContents[];
    next: number | null;
  };
};

export default function Home(props: Props) {
  const { lists } = props;

  const [reportLists, setReportLists] = React.useState({ ...lists });
  const [page, setPage] = React.useState<number | null>(1);
  const { videoID, openModal, closeModal } = useModalReport();

  // ビデ

  // 対象のページのデータを取得
  const getReportData = async (page: number) => {
    const url = `/api/weddingReport/${page}`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
  };

  // 次ページ読み込み
  const clickViewMore = async () => {
    const nextPage = page ? page + 1 : 1;
    setPage(nextPage);

    const data = await getReportData(nextPage);

    if (!data) return;

    setReportLists({ ...reportLists, contents: [...reportLists.contents, ...data] });
  };

  return (
    <>
      <Motion>
        <Head>
          <title>lu CREA ル・クレア｜Wedding Report</title>
        </Head>

        <main>
          <UnderlayerHead en="Wedding Report" ja="ウェディングレポート" image="" spImage="" />

          <ReportBody {...reportLists} next={page} clickViewMore={clickViewMore} openModal={openModal} />

          <TopWeddingPlan />

          {/* <InstagramSection /> */}
        </main>

        <ReportModal videoID={videoID} closeModal={closeModal} />
      </Motion>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`http://localhost:${process.env.PORT}/api/weddingReport/1`);
  const lists: ReportContents[] = await res.json();

  return {
    props: {
      lists: {
        contents: lists,
        next: 2,
      },
    },
  };
};
