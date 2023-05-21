import Motion from "@/components/layouts/Motion";
import ReportBody from "@/components/orgs/ReportBody";
import ReportModal from "@/components/orgs/ReportModal";
import TopContents from "@/components/orgs/TopContents";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import WeekendFair from "@/components/orgs/WeekendFair";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import useGetWeekend from "../../../libs/useGetWeekend";
import useModalReport from "../../../libs/useModalReport";
import { FairList } from "../api/fair";
import { ReportContents } from "../api/weddingReport/[id]";
import { META } from "@/textDate/head";

type Props = {
  lists: {
    contents: ReportContents[];
    next: number | null;
  };
  fairLists: FairList;
};

export default function Home(props: Props) {
  const { lists, fairLists } = props;

  const [reportLists, setReportLists] = React.useState({ ...lists });
  const [page, setPage] = React.useState<number | null>(1);
  const { videoID, openModal, closeModal } = useModalReport();

  // ビデ

  // 対象のページのデータを取得
  const getReportData = async (page: number) => {
    const url = `/api/weddingReport/${page}`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
  };

  // 次ページ読み込み
  const clickViewMore = async () => {
    const nextPage = page ? page + 1 : 1;
    setPage(nextPage);

    const data = await getReportData(nextPage);

    if (!data) return;

    setReportLists({ ...reportLists, contents: [...reportLists.contents, ...data] });
  };

  const [weekendLists, setWeekendLists] = React.useState([...fairLists]);
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

  return (
    <>
      <Motion>
        <Head>
          <title>{META.report.title}</title>
        </Head>

        <main>
          <UnderlayerHead en="Wedding Report" ja="ウェディングレポート" image="" spImage="" />

          <ReportBody {...reportLists} next={page} clickViewMore={clickViewMore} openModal={openModal} />

          <WeekendFair lists={weekendLists} weekend={selectedWeekend} handleSelect={handleWeekendSelect} />
          <TopWeddingPlan />

          <TopContents />
        </main>

        <ReportModal videoID={videoID} closeModal={closeModal} />
      </Motion>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`http://localhost:${process.env.PORT}/api/weddingReport/1`);
  const lists: ReportContents[] = await res.json();

  const fairRes = await fetch(`http://localhost:${process.env.PORT}/api/fair`);
  const fairLists: FairList = await fairRes.json();

  return {
    props: {
      lists: {
        contents: lists,
        next: 2,
      },
      fairLists,
    },
  };
};
