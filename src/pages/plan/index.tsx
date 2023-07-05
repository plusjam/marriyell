import Motion from "@/components/layouts/Motion";
import InstagramSection from "@/components/orgs/InstagramSection";
import ReportModal from "@/components/orgs/ReportModal";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import WeddingPlan from "@/components/orgs/WeddingPlan";
import WeekendFair from "@/components/orgs/WeekendFair";
import { META } from "@/textDate/head";
import axios from "axios";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { apricotClient } from "../../../libs/cms";
import useGetWeekend from "../../../libs/useGetWeekend";
import useModalReport from "../../../libs/useModalReport";
import { FairLists } from "../../../typings/fair";
import { PlanCategoriesLists, PlanLists } from "../../../typings/plan";
import { ReportLists } from "../../../typings/report";

type Props = {
  fairLists: FairLists;
  planLists: PlanLists;
  planCategoriesLists: PlanCategoriesLists;
  reportLists: ReportLists;
};

export default function Home(props: Props) {
  const { fairLists, planLists, planCategoriesLists, reportLists } = props;

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
          <title>{META.plan.title}</title>
        </Head>

        <main>
          <UnderlayerHead en="Bridal Plan" ja="ブライダルプラン" image="/images/plan_main.jpg" spImage="/images/plan_main-sp.jpg" />

          <WeddingPlan planLists={[...planLists.articles]} planCategoriesLists={[...planCategoriesLists.articles]} />
          <WeekendFair lists={weekendLists} weekend={selectedWeekend} handleSelect={handleWeekendSelect} />
          {/* <TopWeddingReport contents={reportLists.articles} openModal={openModal} /> */}

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

  const option = {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  };

  /* ===================================================================
  // フェア
  =================================================================== */
  const fairUrl = `${process.env.CMS_URL}/api/v1/fair`;
  const fairRes = axios.get<{ data: FairLists }>(fairUrl, option);

  /* ===================================================================
  // プラン
  =================================================================== */
  const planUrl = `${process.env.CMS_URL}/api/v1/plan?limit=100`;
  const planRes = axios.get<{ data: PlanLists }>(planUrl, option);

  /* ===================================================================
  // プランカテゴリ
  =================================================================== */
  const planCategoriesUrl = `${process.env.CMS_URL}/api/v1/planCategories?limit=100`;
  const planCategoriesRes = axios.get<{ data: PlanCategoriesLists }>(planCategoriesUrl, option);

  /* ===================================================================
  // レポート
  =================================================================== */
  const reportUrl = `${process.env.CMS_URL}/api/v1/report`;
  const reportRes = axios.get<{ data: ReportLists }>(reportUrl, option);

  const results = await Promise.all([fairRes, planRes, planCategoriesRes, reportRes]);
  const fairLists = results[0].data;
  const planLists = results[1].data;
  const planCategoriesLists = results[2].data;
  const reportLists = results[3].data;

  return {
    props: {
      fairLists,
      planLists,
      planCategoriesLists,
      reportLists,
    },
    revalidate: 10,
  };
};
