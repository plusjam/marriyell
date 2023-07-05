import Motion from "@/components/layouts/Motion";
import SectionHead from "@/components/mols/SectionHead";
import InstagramSection from "@/components/orgs/InstagramSection";
import ReportModal from "@/components/orgs/ReportModal";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import Underlayer1 from "@/components/orgs/Underlayer1";
import Underlayer2 from "@/components/orgs/Underlayer2";
import Underlayer3 from "@/components/orgs/Underlayer3";
import WeekendFair from "@/components/orgs/WeekendFair";
import axios from "axios";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { apricotClient } from "../../../libs/cms";
import useGetWeekend from "../../../libs/useGetWeekend";
import useModalReport from "../../../libs/useModalReport";
import { FairLists } from "../../../typings/fair";
import { ReportLists } from "../../../typings/report";
import { CHEF, CUISINE, MAIN, ORIGINALWEDDING, WEDDINGCAKE } from "../../textDate/cuisine";
import { META } from "@/textDate/head";

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
          <title>{META.cuisine.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <section>
            <Underlayer1 {...MAIN} />
          </section>

          <section>
            <SectionHead {...ORIGINALWEDDING} />
            <div>
              <Underlayer2 {...CUISINE} />
              <Underlayer2 {...WEDDINGCAKE} />
              <Underlayer2 {...CHEF} />
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
  // レポート
  =================================================================== */
  const reportUrl = `${process.env.CMS_URL}/api/v1/report`;
  const reportRes = axios.get<{ data: ReportLists }>(reportUrl, option);

  const results = await Promise.all([fairRes, reportRes]);
  const fairLists = results[0].data;
  const reportLists = results[1].data;

  return {
    props: {
      reportLists,
      fairLists,
    },
    revalidate: 10,
  };
};
