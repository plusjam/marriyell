import Motion from "@/components/layouts/Motion";
import InstagramSection from "@/components/orgs/InstagramSection";
import QaContents from "@/components/orgs/QaContents";
import ReportModal from "@/components/orgs/ReportModal";
import SelectFaqType from "@/components/orgs/SelectFaqType";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import WeekendFair from "@/components/orgs/WeekendFair";
import { QA } from "@/textDate/qa";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import useGetWeekend from "../../../libs/useGetWeekend";
import useModalReport from "../../../libs/useModalReport";
import { QASet, Qa, QaType } from "../../../typings/qa";
import { FairList } from "../api/fair";
import { PlanLists } from "../api/plan";
import { ReportContents } from "../api/weddingReport/[id]";
import { META } from "@/textDate/head";

type Props = {
  reportLists: ReportContents[];
  fairLists: FairList;
  planLists: PlanLists;
};

export default function Home(props: Props) {
  const { reportLists, fairLists, planLists } = props;
  const [weekendLists, setWeekendLists] = React.useState([...fairLists]);
  const [selectedFaqType, setSelectedFaqType] = React.useState<Qa>([...QA]);
  const [qaSet, setQaSet] = React.useState<QASet>({ ...QA[0] });

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

  // selectedFaqTypeを選択する
  const handleSelectFaqType = (slug: QaType) => {
    const selected = [...QA];
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
