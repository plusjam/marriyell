import Motion from "@/components/layouts/Motion";
import ReportBody from "@/components/orgs/ReportBody";
import ReportModal from "@/components/orgs/ReportModal";
import TopContents from "@/components/orgs/TopContents";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
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
import { PlanLists } from "../../../typings/plan";
import { ReportLists } from "../../../typings/report";
import useApi from "../../../libs/useApi";

type Props = {
  fairLists: FairLists;
  planLists: PlanLists;
  reportLists: ReportLists;
};

export default function Home(props: Props) {
  const { fairLists, planLists, reportLists } = props;

  const [currentReportLists, setCurrentReportLists] = React.useState({ ...reportLists });
  const { videoID, openModal, closeModal } = useModalReport();
  const [isNext, setIsNext] = React.useState<boolean>(reportLists.total / currentReportLists.articles.length > 1);
  const { status, handleStatus } = useApi();

  // 対象のページのデータを取得
  const getReportData = async (offset: number) => {
    const url = `/api/report`;
    const res: { data: ReportLists } = await axios.post(url, {
      offset: offset,
    });

    return res.data;
  };

  // 次ページ読み込み
  const clickViewMore = async () => {
    try {
      handleStatus("loading");
      const data = await getReportData(currentReportLists.articles.length);

      if (!data) return;

      setCurrentReportLists({
        articles: [...currentReportLists.articles, ...data.articles],
        total: data.total,
        count: data.count,
      });

      setIsNext(data.total / [...currentReportLists.articles, ...data.articles].length > 1);
    } catch (err) {
      handleStatus("error");
    }
  };

  const [weekendLists, setWeekendLists] = React.useState([...fairLists.articles]);
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
      return weekend.calendar.some((calendar) => {
        const find = selectedDate.find((selectedWeekend) => {
          const eventDate = new Date(calendar.values.calendar);
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
          <title>{META.report.title}</title>
        </Head>

        <main>
          <UnderlayerHead en="Wedding Report" ja="ウェディングレポート" image="/images/report_main.jpg" spImage="/images/report_main-sp.jpg" />

          <ReportBody currentReportLists={currentReportLists} next={isNext} clickViewMore={clickViewMore} openModal={openModal} status={status} />

          <WeekendFair lists={weekendLists} weekend={selectedWeekend} handleSelect={handleWeekendSelect} />
          <TopWeddingPlan planLists={[...planLists.articles]} />

          {/* <TopContents /> */}
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

  return {
    props: {
      fairLists,
      planLists,
      reportLists,
    },
  };
};
