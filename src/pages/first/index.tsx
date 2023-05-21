import Motion from "@/components/layouts/Motion";
import InstagramSection from "@/components/orgs/InstagramSection";
import ReportModal from "@/components/orgs/ReportModal";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import WeddingPlan from "@/components/orgs/WeddingPlan";
import WeekendFair from "@/components/orgs/WeekendFair";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import useGetWeekend from "../../../libs/useGetWeekend";
import useModalReport from "../../../libs/useModalReport";
import { FairList } from "../api/fair";
import { PlanLists } from "../api/plan";
import { ReportContents } from "../api/weddingReport/[id]";
import axios from "axios";
import { apricotClient } from "../../../libs/cms";
import FirstScroll from "@/components/orgs/FirstScroll";
import WhatBridal from "@/components/orgs/WhatBridal";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import ReadyBridal from "@/components/orgs/ReadyBridal";
import BridalProcess from "@/components/orgs/BridalProcess";
import QaSection from "@/components/orgs/QaSection";
import { QA } from "@/textDate/qa";
import { META } from "@/textDate/head";

type Props = {
  reportLists: ReportContents[];
  fairLists: FairList;
  planLists: PlanLists;
};

export default function Home(props: Props) {
  const { reportLists, fairLists } = props;
  const [weekendLists, setWeekendLists] = React.useState([...fairLists]);

  const { videoID, openModal, closeModal } = useModalReport();
  const { selected: selectedWeekend, handleSelect: handleWeekendSelect } = useGetWeekend();

  useEffect(() => {
    getSelectedWeekendLists();
  }, [selectedWeekend]);

  // weekendListsをselectedWeekendで絞り込み
  const getSelectedWeekendLists = async () => {
    const initLists = [...fairLists];

    const selectedDate = selectedWeekend.filter((weekend) => {
      return weekend.selected;
    });

    const selectedWeekendLists = initLists.filter((weekend) => {
      return weekend.events.some((event) => {
        const find = selectedDate.find((selectedWeekend) => {
          const eventDate = new Date(event.date);
          const month = eventDate.getMonth();
          const dateNum = eventDate.getDate();

          return selectedWeekend.date === `${month + 1}月${dateNum}日`;
        });

        if (find) return true;
      });
    });

    setWeekendLists(selectedWeekendLists);
  };

  return (
    <>
      <Motion>
        <Head>
          <title>{META.first.title}</title>
        </Head>

        <main>
          <UnderlayerHead ja="はじめてご来館の方へ" image="/images/plan_main.jpg" spImage="/images/plan_main-sp.jpg" />

          <FirstScroll />
          <WhatBridal />
          <ReadyBridal />
          <BridalProcess />
          <QaSection qaSet={QA[0]} />
          <WeekendFair lists={weekendLists} weekend={selectedWeekend} handleSelect={handleWeekendSelect} />
          <TopWeddingPlan />
          <TopWeddingReport contents={reportLists} openModal={openModal} />

          <InstagramSection />
        </main>

        <ReportModal videoID={videoID} closeModal={closeModal} />
      </Motion>
    </>
  );
}

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

  const fairRes = await fetch(`http://localhost:${process.env.PORT}/api/fair`);
  const fairLists: FairList = await fairRes.json();

  const planRef = await fetch(`http://localhost:${process.env.PORT}/api/plan`);
  const planLists: PlanLists = await planRef.json();

  return {
    props: {
      reportLists,
      fairLists,
      planLists,
    },
  };
};
