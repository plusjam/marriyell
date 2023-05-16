import Motion from "@/components/layouts/Motion";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { use, useEffect } from "react";
import WeekendFair from "@/components/orgs/WeekendFair";
import SelectFair from "@/components/orgs/SelectFair";
import BridalFair from "@/components/orgs/BridalFair";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import { ReportContents } from "../api/weddingReport/[id]";
import useModalReport from "../../../libs/useModalReport";
import ReportModal from "@/components/orgs/ReportModal";
import InstagramSection from "@/components/orgs/InstagramSection";
import useSelectFair from "../../../libs/useSelectFair";
import { FairList } from "../api/fair";
import useGetWeekend from "../../../libs/useGetWeekend";
import axios from "axios";
import { apricotClient } from "../../../libs/cms";

type Props = {
  reportLists: ReportContents[];
  fairLists: FairList;
};

export default function Home(props: Props) {
  const { reportLists, fairLists } = props;
  const [lists, setLists] = React.useState([...fairLists]);
  const [weekendLists, setWeekendLists] = React.useState([...fairLists]);

  const { videoID, openModal, closeModal } = useModalReport();
  const { categories, handleSelect } = useSelectFair();
  const { selected: selectedWeekend, handleSelect: handleWeekendSelect } = useGetWeekend();

  // カテゴリーの絞り込み検索
  const getSelectedLists = async () => {
    const selectedCategories = categories
      .filter((category) => {
        if (category.selected) {
          return category.slug;
        }
      })
      .map((category) => {
        return category.slug;
      });

    const url = `/api/fair`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(selectedCategories),
    });
    const data = await res.json();

    setLists(data);
    document.querySelector("#bridal-fair")?.scrollIntoView({ behavior: "smooth" });
  };

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

  // 日付からlistsを絞り込み検索
  const getSelectedDateLists = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const targetDate = target.value;

    if (targetDate) {
      // listsからtargetDateと一致するものを抽出
      const initLists = [...fairLists];
      const selectedDateLists = initLists.filter((list) => {
        return list.events.some((event) => {
          return targetDate === event.date;
        });
      });

      setLists(selectedDateLists);
    } else {
      setLists(fairLists);
    }

    console.log(document.querySelector("#bridal-fair"));
    document.querySelector("#bridal-fair")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Motion>
        <Head>
          <title>lu CREA ル・クレア｜Bridal Fair</title>
        </Head>

        <main>
          <UnderlayerHead en="Bridal Fair" ja="ブライダルフェア" image="" spImage="" />

          <WeekendFair lists={weekendLists} weekend={selectedWeekend} handleSelect={handleWeekendSelect} />
          <SelectFair categories={categories} handleSelected={handleSelect} getSelectedLists={getSelectedLists} getSelectedDateLists={getSelectedDateLists} />
          <BridalFair lists={lists} />

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
  const accessKey = process.env.API_KEY;
  const secretKey = process.env.API_SECRET;
  const cmsUrl = process.env.CMS_URL;
  const { token } = await apricotClient(accessKey, secretKey);

  const endpoint = "event";
  const url = `${cmsUrl}/api/v1/${endpoint}`;

  if (!accessKey || !secretKey || !token) {
    throw new Error("APIキーが設定されていません。");
  }

  try {
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "account-access-key": accessKey,
        "account-secret-key": secretKey,
        authorization: `Bearer ${token}`,
      },
    });

    console.log("デーーーーーーーーた！！！", await res.data);
  } catch (e) {
    console.log("エラーだよ！！！", e);
  }

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
