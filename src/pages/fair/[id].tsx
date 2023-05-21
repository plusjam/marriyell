import Motion from "@/components/layouts/Motion";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { use, useEffect } from "react";
import WeekendFair from "@/components/orgs/WeekendFair";
import SelectFair from "@/components/orgs/SelectFair";
import BridalFair from "@/components/orgs/BridalFair";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import { ReportContents } from "../api/weddingReport/[id]";
import useModalReport from "../../../libs/useModalReport";
import ReportModal from "@/components/orgs/ReportModal";
import InstagramSection from "@/components/orgs/InstagramSection";
import useSelectFair from "../../../libs/useSelectFair";
import { FairList } from "../api/fair";
import useGetWeekend from "../../../libs/useGetWeekend";
import axios from "axios";
import { apricotClient } from "../../../libs/cms";
import WeddingPlan from "@/components/orgs/WeddingPlan";
import { PlanLists } from "../api/plan";
import PlanDetail from "@/components/orgs/PlanDetail";
import PlanContents from "@/components/orgs/PlanContents";
import DetailForm from "@/components/orgs/DetailForm";
import Process from "@/components/orgs/Process";
import FairDetail from "@/components/orgs/FairDetail";
import FairContents from "@/components/orgs/FairContents";

type Props = {
  reportLists: ReportContents[];
  fairList: FairList[0];
  planLists: PlanLists;
};

export default function Home(props: Props) {
  const { reportLists, fairList, planLists } = props;

  const { videoID, openModal, closeModal } = useModalReport();

  return (
    <>
      <Motion>
        <Head>
          <title>{"フェア名"}｜lu CREA ル・クレア</title>
        </Head>

        <main>
          <FairDetail />
          <FairContents />
          <DetailForm title={"フェア名"} />

          <Process />
          <TopWeddingPlan />
          <TopWeddingReport contents={reportLists} openModal={openModal} />

          <InstagramSection />
        </main>

        <ReportModal videoID={videoID} closeModal={closeModal} />
      </Motion>
    </>
  );
}

export const getStaticPaths = async () => {
  // ここでパスを生成します。仮に、1から5までのidを生成するとします。

  return {
    paths: [{ params: { id: "1" } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  // const accessKey = process.env.API_KEY;
  // const secretKey = process.env.API_SECRET;
  // const cmsUrl = process.env.CMS_URL;
  // const { token } = await apricotClient(accessKey, secretKey);

  // const endpoint = "event";
  // const url = `${cmsUrl}/api/v1/${endpoint}`;

  // if (!accessKey || !secretKey || !token) {
  //   throw new Error("APIキーが設定されていません。");
  // }

  // try {
  //   const res = await axios.get(url, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "account-access-key": accessKey,
  //       "account-secret-key": secretKey,
  //       authorization: `Bearer ${token}`,
  //     },
  //   });

  //   console.log("レスすすすすすすす", res);

  //   console.log("デーーーーーーーーた！！！", await res.data);
  // } catch (e) {
  //   console.log("エラーだよ！！！", e.response ? e.response : e);
  // }

  const reportRes = await fetch(`http://localhost:${process.env.PORT}/api/weddingReport/2`);
  const reportLists: ReportContents[] = await reportRes.json();

  const fairRes = await fetch(`http://localhost:${process.env.PORT}/api/fair/1`);
  const fairList: FairList[0] = await fairRes.json();

  const planRef = await fetch(`http://localhost:${process.env.PORT}/api/plan/`);
  const planLists: PlanLists = await planRef.json();

  return {
    props: {
      reportLists,
      fairList,
      planLists,
    },
  };
};
