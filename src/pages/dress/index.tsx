import InstagramSection from "@/components/orgs/InstagramSection";
import Underlayer1 from "@/components/orgs/Underlayer1";
import Head from "next/head";
import React, { useEffect } from "react";
import { CATCHCOPY, CATCHCOPY3, MAIN } from "../../textDate/dress";
import Underlayer2 from "@/components/orgs/Underlayer2";
import Underlayer3 from "@/components/orgs/Underlayer3";
import SectionHead from "@/components/mols/SectionHead";
import Motion from "@/components/layouts/Motion";
import ReportModal from "@/components/orgs/ReportModal";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import WeekendFair from "@/components/orgs/WeekendFair";
import { META } from "@/textDate/head";
import { ReportContents } from "../api/weddingReport/[id]";
import { FairList } from "../api/fair";
import useGetWeekend from "../../../libs/useGetWeekend";
import useModalReport from "../../../libs/useModalReport";
import { GetStaticProps } from "next";

type Props = {
  reportLists: ReportContents[];
  fairLists: FairList;
};

export default function Home(props: Props) {
  const { reportLists, fairLists } = props;

  const [weekendLists, setWeekendLists] = React.useState([...fairLists]);
  const { selected: selectedWeekend, handleSelect: handleWeekendSelect } = useGetWeekend();

  const { videoID, openModal, closeModal } = useModalReport();

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
          <title>{META.dress.title}</title>
        </Head>

        <main>
          <section>
            <Underlayer1 {...MAIN} />
          </section>

          <section>
            <SectionHead {...CATCHCOPY} />
            <div>
              <Underlayer2 {...CATCHCOPY3} />
            </div>
          </section>

          <section>
            <Underlayer3 />
          </section>

          <WeekendFair lists={weekendLists} weekend={selectedWeekend} handleSelect={handleWeekendSelect} />
          <TopWeddingReport contents={reportLists} openModal={openModal} />
          <InstagramSection />
        </main>

        <ReportModal videoID={videoID} closeModal={closeModal} />
      </Motion>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const reportRes = await fetch(`http://localhost:${process.env.PORT}/api/weddingReport/2`);
  const reportLists: ReportContents[] = await reportRes.json();

  const fairRes = await fetch(`http://localhost:${process.env.PORT}/api/fair`);
  const fairLists: FairList = await fairRes.json();

  return {
    props: {
      reportLists,
      fairLists,
    },
  };
};
