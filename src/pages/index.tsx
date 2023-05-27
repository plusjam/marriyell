import Motion from "@/components/layouts/Motion";
import InstagramSection from "@/components/orgs/InstagramSection";
import { MainFlow } from "@/components/orgs/MainFlow";
import MainVideo from "@/components/orgs/MainVideo";
import ReportModal from "@/components/orgs/ReportModal";
import TopBridalFair from "@/components/orgs/TopBridalFair";
import TopContents from "@/components/orgs/TopContents";
import TopNewsEvent from "@/components/orgs/TopNewsEvent";
import TopOriginalWedding from "@/components/orgs/TopOriginalWedding";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import { META } from "@/textDate/head";
import axios from "axios";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { apricotClient } from "../../libs/cms";
import { removeDuplicates } from "../../libs/removeDuplicatesEvent";
import useGetWeekend from "../../libs/useGetWeekend";
import useModalReport from "../../libs/useModalReport";
import { FairLists } from "../../typings/fair";
import { NewsCategoriesLists, NewsLists } from "../../typings/news";
import { PlanLists } from "../../typings/plan";
import { ReportLists } from "../../typings/report";

type Props = {
  fairLists: FairLists;
  planLists: PlanLists;
  reportLists: ReportLists;
  newsLists: NewsLists;
  newsCategoriesLists: NewsCategoriesLists;
};

export default function Home(props: Props) {
  const { fairLists, planLists, reportLists, newsLists, newsCategoriesLists } = props;

  const [weekendLists, setWeekendLists] = React.useState([...fairLists.articles]);

  const { videoID, openModal, closeModal } = useModalReport();
  const { selected: selectedWeekend, handleSelect: handleWeekendSelect } = useGetWeekend();

  useEffect(() => {
    getSelectedWeekendLists();
  }, [selectedWeekend]);

  // weekendListsをselectedWeekendで絞り込み
  const getSelectedWeekendLists = () => {
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
          <title>{META.top.title}</title>
        </Head>

        <main>
          <MainVideo />
          <MainFlow />
          <TopOriginalWedding />
          <TopBridalFair lists={[...fairLists.articles]} weekendLists={weekendLists} weekend={selectedWeekend} handleSelect={handleWeekendSelect} events={removeDuplicates([...fairLists.articles])} />
          <TopWeddingPlan planLists={[...planLists.articles]} />
          {/* <TopWeddingReport contents={reportLists.articles} openModal={openModal} /> */}
          {/* <TopNewsEvent contents={newsLists.articles} /> */}
          {/* <TopContents /> */}
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
  // console.log("フェア", fairLists.articles[0].calendar);

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
  // console.log("レポート", reportLists);

  /* ===================================================================
  // お知らせ
  =================================================================== */
  const newsUrl = `${process.env.CMS_URL}/api/v1/news`;
  const newsRes: { data: NewsLists } = await axios.get(newsUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const newsLists: NewsLists = newsRes.data;
  // console.log("お知らせ", newsLists.articles[0]);

  /* ===================================================================
  // お知らせカテゴリ
  =================================================================== */
  const newsCategoriesUrl = `${process.env.CMS_URL}/api/v1/newsCategories`;
  const newsCategoriesRes: { data: NewsCategoriesLists } = await axios.get(newsCategoriesUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const newsCategoriesLists: NewsCategoriesLists = newsCategoriesRes.data;
  // console.log("お知らせカテゴリリスト", newsCategoriesLists);

  return {
    props: {
      fairLists,
      planLists,
      reportLists,
      newsLists,
      newsCategoriesLists,
    },
  };
};
