import Motion from "@/components/layouts/Motion";
import InstagramSection from "@/components/orgs/InstagramSection";
import { MainFlow } from "@/components/orgs/MainFlow";
import MainVideo from "@/components/orgs/MainVideo";
import TopBridalFair from "@/components/orgs/TopBridalFair";
import TopContents from "@/components/orgs/TopContents";
import TopNewsEvent from "@/components/orgs/TopNewsEvent";
import TopOriginalWedding from "@/components/orgs/TopOriginalWedding";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { ReportContents } from "./api/weddingReport/[id]";
import useModalReport from "../../libs/useModalReport";
import ReportModal from "@/components/orgs/ReportModal";
import { NewsCategory, NewsContents } from "../../typings/news";
import { META } from "@/textDate/head";

type Props = {
  reportLists: ReportContents[];
  newsLists: { category: NewsCategory[]; contents: NewsContents[] };
};

export default function Home(props: Props) {
  const { reportLists, newsLists } = props;

  const { videoID, openModal, closeModal } = useModalReport();

  return (
    <>
      <Motion>
        <Head>
          <title>{META.top.title}</title>
        </Head>

        <main>
          <MainVideo />
          <MainFlow />
          <TopOriginalWedding />
          <TopBridalFair />
          <TopWeddingPlan />
          <TopWeddingReport contents={reportLists} openModal={openModal} />
          <TopNewsEvent contents={newsLists.contents} />
          <TopContents />
          <InstagramSection />
        </main>

        <ReportModal videoID={videoID} closeModal={closeModal} />
      </Motion>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const reportRes = await fetch(`http://localhost:${process.env.PORT}/api/weddingReport/2`);
  const reportLists: ReportContents[] = await reportRes.json();

  const newsRes = await fetch(`http://localhost:${process.env.PORT}/api/news/1`);
  const newsLists: { category: NewsCategory[]; contents: NewsContents[] } = await newsRes.json();

  return {
    props: {
      reportLists,
      newsLists,
    },
  };
};
