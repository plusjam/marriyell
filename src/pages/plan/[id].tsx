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
  const [weekendLists, setWeekendLists] = React.useState([...fairLists.articles]);

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
    const initLists = [...fairLists.articles];

    const selectedDate = selectedWeekend.filter((weekend) => {
      return weekend.selected;
    });

    const selectedWeekendLists = [...initLists].filter((weekend) => {
      return weekend.calendar.values.some((calendar) => {
        const find = selectedDate.find((selectedWeekend) => {
          const eventDate = new Date(calendar.calendar);
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
          <TopWeddingReport contents={reportLists.articles} openModal={openModal} />

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
  const planUrl = `${process.env.CMS_URL}/api/v1/plan`;
  const planRes: { data: PlanLists } = await axios.get(planUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const paths = planRes.data.articles.map((plan) => `/plan/${plan.code}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) return { props: {} };
  const code = context.params.id;
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
  // console.log("フェア", fairLists.articles[0].calendar);

  /* ===================================================================
  // プラン
  =================================================================== */
  const planUrl = `${process.env.CMS_URL}/api/v1/plan/${code}`;
  const planRes: { data: any } = await axios.get(planUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const planList: any = planRes.data;
  // console.log("プラン", planList);

  /* ===================================================================
  // プランカテゴリ
  =================================================================== */
  const planCategoriesUrl = `${process.env.CMS_URL}/api/v1/planCategories`;
  const planCategoriesRes: { data: PlanCategoriesLists } = await axios.get(planCategoriesUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const planCategoriesLists: PlanCategoriesLists = planCategoriesRes.data;

  /* ===================================================================
  // レポート
  =================================================================== */
  const reportUrl = `${process.env.CMS_URL}/api/v1/report?limit=12`;
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
      reportLists,
      fairLists,
      planList,
      planCategoriesLists,
    },
  };
};
