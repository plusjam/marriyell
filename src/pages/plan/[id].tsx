import Motion from "@/components/layouts/Motion";
import DetailPlanForm from "@/components/orgs/DetailPlanForm";
import InstagramSection from "@/components/orgs/InstagramSection";
import PlanContents from "@/components/orgs/PlanContents";
import PlanDetail from "@/components/orgs/PlanDetail";
import Process from "@/components/orgs/Process";
import ReportModal from "@/components/orgs/ReportModal";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import WeekendFair from "@/components/orgs/WeekendFair";
import axios from "axios";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { apricotClient } from "../../../libs/cms";
import useGetWeekend from "../../../libs/useGetWeekend";
import useModalReport from "../../../libs/useModalReport";
import { FairLists } from "../../../typings/fair";
import { PlanCategoriesLists, PlanList, PlanLists } from "../../../typings/plan";
import { ReportLists } from "../../../typings/report";

type Props = {
  fairLists: FairLists;
  planList: PlanList;
  planCategoriesLists: PlanCategoriesLists;
  reportLists: ReportLists;
};

export default function Home(props: Props) {
  const { fairLists, planList, planCategoriesLists, reportLists } = props;

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
  const router = useRouter();

  gsap.registerPlugin(ScrollToPlugin);

  useEffect(() => {
    getSelectedWeekendLists();
  }, [selectedWeekend]);

  useEffect(() => {
    setTimeout(() => {
      const url = new URL(router.asPath, "http://dummy.com");
      const params = new URLSearchParams(url.search.split("?")[1]);
      const target = params.get("id");

      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: `#${target}`,
            autoKill: false,
          },
        });
      }
    }, 2500);
  }, []);

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
          <title>{`${planList.title}｜マリエール高崎`}</title>
        </Head>

        <main>
          <PlanDetail content={planList} planCategoriesLists={planCategoriesLists.articles} />
          <PlanContents content={planList} />
          <DetailPlanForm title={planList.title} />

          {/* <Process /> */}
          <WeekendFair lists={weekendLists} weekend={selectedWeekend} handleSelect={handleWeekendSelect} />
          {/* <TopWeddingReport contents={reportLists.articles} openModal={openModal} /> */}

          <InstagramSection />
        </main>

        <ReportModal videoID={videoID} closeModal={closeModal} />
      </Motion>
    </>
  );
}

export const getStaticPaths = async () => {
  const accessKey = process.env.API_KEY;
  const secretKey = process.env.API_SECRET;
  const token = await apricotClient(accessKey, secretKey);

  /* ===================================================================
  // プラン
  =================================================================== */
  const planUrl = `${process.env.CMS_URL}/api/v1/plan?limit=100`;
  const option = {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  };

  const planRes: { data: PlanLists } = await axios.get(planUrl, option);

  const paths = planRes.data.articles.map((plan) => `/plan/${plan.code}`);

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) return { props: {} };
  const code = context.params.id;
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
  const fairRes = axios.get<FairLists>(fairUrl, option);

  /* ===================================================================
  // プラン
  =================================================================== */
  const planUrl = `${process.env.CMS_URL}/api/v1/plan/${code}`;
  const planRes = axios.get<PlanList>(planUrl, option);

  /* ===================================================================
  // プランカテゴリ
  =================================================================== */
  const planCategoriesUrl = `${process.env.CMS_URL}/api/v1/planCategories?limit=100`;
  const planCategoriesRes = axios.get<PlanCategoriesLists>(planCategoriesUrl, option);

  /* ===================================================================
  // レポート
  =================================================================== */
  const reportUrl = `${process.env.CMS_URL}/api/v1/report`;
  const reportRes = axios.get<ReportLists>(reportUrl, option);

  const results = await Promise.all([fairRes, planRes, planCategoriesRes, reportRes]);
  const fairLists = results[0].data;
  const planList = results[1].data;
  const planCategoriesLists = results[2].data;
  const reportLists = results[3].data;

  return {
    props: {
      fairLists,
      planList,
      planCategoriesLists,
      reportLists,
    },
    revalidate: 10,
  };
};
