import Motion from "@/components/layouts/Motion";
import SectionHead from "@/components/mols/SectionHead";
import InstagramSection from "@/components/orgs/InstagramSection";
import ReportModal from "@/components/orgs/ReportModal";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import Underlayer1 from "@/components/orgs/Underlayer1";
import Underlayer2 from "@/components/orgs/Underlayer2";
import Underlayer3 from "@/components/orgs/Underlayer3";
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
import { ReportLists } from "../../../typings/report";
import { GRANMANIE, MAIN, NATURE } from "../../textDate/dress";

type Props = {
  fairLists: FairLists;
  reportLists: ReportLists;
};

export default function Home(props: Props) {
  const { reportLists, fairLists } = props;

  // 今日以降のcalendarMulti.valuesを持つフェアのみを抽出
  const filterdLists = [...fairLists.articles].filter((fair) => {
    return fair.calendarMulti?.values.some((calendar) => {
      const eventDate = new Date(calendar);
      const today = new Date();
      return eventDate >= today;
    });
  });

  const [weekendLists, setWeekendLists] = React.useState([...filterdLists]);
  const { selected: selectedWeekend, handleSelect: handleWeekendSelect } = useGetWeekend();

  const { videoID, openModal, closeModal } = useModalReport();

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
          <title>{META.dress.title}</title>
        </Head>

        <main>
          <section>
            <Underlayer1 {...MAIN} />
          </section>

          <section>
            <SectionHead {...GRANMANIE} />
            <div>
              <Underlayer2 {...NATURE} />
            </div>
          </section>

          <section>
            <Underlayer3 />
          </section>

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
      reportLists,
      fairLists,
    },
  };
};
