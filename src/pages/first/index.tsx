import Motion from "@/components/layouts/Motion";
import BridalProcess from "@/components/orgs/BridalProcess";
import FirstScroll from "@/components/orgs/FirstScroll";
import InstagramSection from "@/components/orgs/InstagramSection";
import QaSection from "@/components/orgs/QaSection";
import ReadyBridal from "@/components/orgs/ReadyBridal";
import ReportModal from "@/components/orgs/ReportModal";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import WeekendFair from "@/components/orgs/WeekendFair";
import WhatBridal from "@/components/orgs/WhatBridal";
import { META } from "@/textDate/head";
import { QA } from "@/textDate/qa";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import useGetWeekend from "../../../libs/useGetWeekend";
import useModalReport from "../../../libs/useModalReport";
import { FairList } from "../api/fair";
import axios from "axios";
import { FairCategoriesLists, FairLists } from "../../../typings/fair";
import { ReportLists } from "../../../typings/report";
import { PlanLists } from "../../../typings/plan";
import { apricotClient } from "../../../libs/cms";

type Props = {
  fairLists: FairLists;
  fairCategoriesLists: FairCategoriesLists;
  planLists: PlanLists;
  reportLists: ReportLists;
};

export default function Home(props: Props) {
  const { reportLists, fairLists, planLists } = props;

  // 今日以降のcalendarMulti.valuesを持つフェアのみを抽出
  const filterdLists = [...fairLists.articles].filter((fair) => {
    return fair.calendarMulti?.values.some((calendar) => {
      const eventDate = new Date(calendar);
      const today = new Date();
      return eventDate >= today;
    });
  });

  const [weekendLists, setWeekendLists] = React.useState([...filterdLists]);

  const { videoID, openModal, closeModal } = useModalReport();
  const { selected: selectedWeekend, handleSelect: handleWeekendSelect } = useGetWeekend();

  useEffect(() => {
    getSelectedWeekendLists();
  }, [selectedWeekend]);

  // weekendListsをselectedWeekendで絞り込み
  const getSelectedWeekendLists = async () => {
    const initLists = [...filterdLists];

    const selectedDate = selectedWeekend.filter((weekend) => {
      return weekend.selected;
    });

    const selectedWeekendLists = [...initLists].filter((weekend) => {
      return weekend.calendarMulti?.values.some((calendar) => {
        const find = selectedDate.find((selectedWeekend) => {
          const eventDate = new Date(calendar);
          const month = eventDate.getMonth();
          const dateNum = eventDate.getDate();

          return selectedWeekend.date.match(`${month + 1}月${dateNum}日`);
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
          <UnderlayerHead ja="はじめて<br>ご来館の方へ" image="/images/first_main.jpg" spImage="/images/first_main-sp.jpg" />

          <FirstScroll />
          <WhatBridal />
          <ReadyBridal />
          <BridalProcess />
          <QaSection qaSet={QA[0]} />
          <WeekendFair lists={weekendLists} weekend={selectedWeekend} handleSelect={handleWeekendSelect} />
          <TopWeddingPlan planLists={[...planLists.articles]} />
          <TopWeddingReport contents={reportLists.articles} openModal={openModal} />

          <InstagramSection />
        </main>

        <ReportModal videoID={videoID} closeModal={closeModal} />
      </Motion>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const accessKey = process.env.API_KEY;
  const secretKey = process.env.API_SECRET;
  const token = await apricotClient(accessKey, secretKey);

  /* ===================================================================
  // フェア
  =================================================================== */
  const fairUrl = `${process.env.CMS_URL}/api/v1/fair`;
  const fairRes: { data: FairLists } = await axios.get(fairUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const fairLists: FairLists = fairRes.data;

  /* ===================================================================
  // フェアカテゴリ
  =================================================================== */
  const fairCategoriesUrl = `${process.env.CMS_URL}/api/v1/fairCategories`;
  const fairCategoriesRes: { data: FairCategoriesLists } = await axios.get(fairCategoriesUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const fairCategoriesLists: FairCategoriesLists = fairCategoriesRes.data;

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
  // レポート
  =================================================================== */
  const reportUrl = `${process.env.CMS_URL}/api/v1/report?limit=4`;
  const reportRes: { data: ReportLists } = await axios.get(reportUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const reportLists: ReportLists = reportRes.data;

  return {
    props: {
      fairLists,
      fairCategoriesLists,
      planLists,
      reportLists,
    },
  };
};
