import Motion from "@/components/layouts/Motion";
import InstagramSection from "@/components/orgs/InstagramSection";
import { MainFlow } from "@/components/orgs/MainFlow";
import MainVideo from "@/components/orgs/MainVideo";
import ReportModal from "@/components/orgs/ReportModal";
import TopBridalFair from "@/components/orgs/TopBridalFair";
import TopOriginalWedding from "@/components/orgs/TopOriginalWedding";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
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
import TopNewsEvent from "@/components/orgs/TopNewsEvent";
import { BannerLists } from "../../typings/banner";

type Props = {
  fairLists: FairLists;
  planLists: PlanLists;
  reportLists: ReportLists;
  newsLists: NewsLists;
  newsCategoriesLists: NewsCategoriesLists;
  bannerLists: BannerLists;
};

export default function Home(props: Props) {
  const { fairLists, planLists, reportLists, newsLists, newsCategoriesLists, bannerLists } = props;

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
  const getSelectedWeekendLists = () => {
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
          <title>{META.top.title}</title>
        </Head>

        <main>
          <MainVideo />
          <MainFlow />
          <TopOriginalWedding />
          <TopBridalFair lists={[...filterdLists]} weekendLists={weekendLists} weekend={selectedWeekend} handleSelect={handleWeekendSelect} events={removeDuplicates([...filterdLists])} />
          <TopWeddingPlan planLists={[...planLists.articles]} />
          {/* <TopWeddingReport contents={reportLists.articles} openModal={openModal} /> */}
          <TopNewsEvent contents={newsLists.articles} bannerLists={bannerLists.articles} />
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
  const planUrl = `${process.env.CMS_URL}/api/v1/plan`;
  const planRes = axios.get<{ data: PlanLists }>(planUrl, option);

  /* ===================================================================
  // レポート
  =================================================================== */
  const reportUrl = `${process.env.CMS_URL}/api/v1/report?limit=4`;
  const reportRes = axios.get<{ data: ReportLists }>(reportUrl, option);

  /* ===================================================================
  // お知らせ
  =================================================================== */
  const newsUrl = `${process.env.CMS_URL}/api/v1/news?limit=4`;
  const newsRes = axios.get<{ data: NewsLists }>(newsUrl, option);

  /* ===================================================================
  // バナー
  =================================================================== */
  const bannerUrl = `${process.env.CMS_URL}/api/v1/banner`;
  const bannerRes = axios.get<{ data: BannerLists }>(bannerUrl, option);

  const results = await Promise.all([fairRes, planRes, reportRes, newsRes, bannerRes]);
  const fairLists = results[0].data;
  const planLists = results[1].data;
  const reportLists = results[2].data;
  const newsLists = results[3].data;
  const bannerLists = results[4].data;

  return {
    props: {
      fairLists,
      planLists,
      reportLists,
      newsLists,
      bannerLists,
    },
    revalidate: 10,
  };
};
