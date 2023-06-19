import Motion from "@/components/layouts/Motion";
import InstagramSection from "@/components/orgs/InstagramSection";
import QaContents from "@/components/orgs/QaContents";
import ReportModal from "@/components/orgs/ReportModal";
import SelectFaqType from "@/components/orgs/SelectFaqType";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import WeekendFair from "@/components/orgs/WeekendFair";
import { META } from "@/textDate/head";
import { QA } from "@/textDate/qa";
import axios from "axios";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { apricotClient } from "../../../libs/cms";
import useGetWeekend from "../../../libs/useGetWeekend";
import useModalReport from "../../../libs/useModalReport";
import { FairLists } from "../../../typings/fair";
import { PlanLists } from "../../../typings/plan";
import { QASet, Qa, QaType } from "../../../typings/qa";
import { ReportLists } from "../../../typings/report";

type Props = {
  fairLists: FairLists;
  planLists: PlanLists;
  reportLists: ReportLists;
};

export default function Home(props: Props) {
  const { fairLists, planLists, reportLists } = props;
  const [weekendLists, setWeekendLists] = React.useState([...fairLists.articles]);
  const [selectedFaqType, setSelectedFaqType] = React.useState<Qa>(QA.map((v) => ({ ...v })));
  const [qaSet, setQaSet] = React.useState<QASet>({ ...QA[0] });

  const { videoID, openModal, closeModal } = useModalReport();
  const { selected: selectedWeekend, handleSelect: handleWeekendSelect } = useGetWeekend();

  useEffect(() => {
    getSelectedWeekendLists();

    return () => {
      setSelectedFaqType(QA.map((v) => ({ ...v })));
    };
  }, [selectedWeekend]);

  // weekendListsをselectedWeekendで絞り込み
  const getSelectedWeekendLists = async () => {
    const initLists = [...fairLists.articles];

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

  // selectedFaqTypeを選択する
  const handleSelectFaqType = (slug: QaType) => {
    // QAをコピー
    const selected = QA.map((v) => ({ ...v }));
    const selectedType = selected.filter((elem) => {
      return elem.slug === slug;
    });

    // 選択されたselectedだけをtrueにする
    selected.map((elem) => {
      if (elem.slug === slug) {
        elem.selected = true;
      } else {
        elem.selected = false;
      }
    });

    setSelectedFaqType(selected);
    setQaSet(selectedType[0]);
  };

  return (
    <>
      <Motion>
        <Head>
          <title>{META.faq.title}</title>
        </Head>

        <main>
          <UnderlayerHead en="FAQ" ja="よくあるご質問" image="/images/faq_main.jpg" spImage="/images/plan_main-sp.jpg" />

          <SelectFaqType handleSelectFaqType={handleSelectFaqType} qa={selectedFaqType} />
          <QaContents qaSet={qaSet} />
          <WeekendFair lists={weekendLists} weekend={selectedWeekend} handleSelect={handleWeekendSelect} />
          <TopWeddingPlan planLists={[...planLists.articles]} />
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
  // const reportUrl = `${process.env.CMS_URL}/api/v1/report?limit=4`;
  // const reportRes: { data: ReportLists } = await axios.get(reportUrl, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "account-access-key": accessKey,
  //     "account-secret-key": secretKey,
  //     authorization: `Bearer ${token.token}`,
  //   },
  // });

  // const reportLists: ReportLists = reportRes.data;
  const reportLists: ReportLists = {
    articles: [],
    total: 0,
    count: 0,
  };

  return {
    props: {
      fairLists,
      planLists,
      reportLists,
    },
  };
};
