import Motion from "@/components/layouts/Motion";
import BridalFair from "@/components/orgs/BridalFair";
import InstagramSection from "@/components/orgs/InstagramSection";
import ReportModal from "@/components/orgs/ReportModal";
import SelectFair from "@/components/orgs/SelectFair";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import WeekendFair from "@/components/orgs/WeekendFair";
import { META } from "@/textDate/head";
import axios from "axios";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { apricotClient } from "../../../libs/cms";
import useGetWeekend from "../../../libs/useGetWeekend";
import useModalReport from "../../../libs/useModalReport";
import useSelectFair from "../../../libs/useSelectFair";
import { FairCategoriesLists, FairLists } from "../../../typings/fair";
import { PlanLists } from "../../../typings/plan";
import { ReportLists } from "../../../typings/report";
import { AppTrigger } from "../_app";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

type Props = {
  fairLists: FairLists;
  fairCategoriesLists: FairCategoriesLists;
  planLists: PlanLists;
  reportLists: ReportLists;
};

export default function Home(props: Props) {
  const { reportLists, fairCategoriesLists, planLists, fairLists } = props;

  // 今日以降のcalendarMulti.valuesを持つフェアのみを抽出
  const filterdLists = [...fairLists.articles].filter((fair) => {
    return fair.calendarMulti?.values.some((calendar) => {
      const eventDate = new Date(calendar);
      const today = new Date();
      return eventDate >= today;
    });
  });

  const router = useRouter();
  const [lists, setLists] = React.useState([...filterdLists]);
  const [weekendLists, setWeekendLists] = React.useState([...filterdLists]);

  const { videoID, openModal, closeModal } = useModalReport();
  const { categories, handleSelect } = useSelectFair({ init: [...fairCategoriesLists.articles] });
  const { selected: selectedWeekend, handleSelect: handleWeekendSelect } = useGetWeekend();

  gsap.registerPlugin(ScrollToPlugin);

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

  // 選択されたカテゴリーから絞り込み or検索
  const getSelectedLists = async () => {
    const initLists = [...filterdLists];
    let selectedLists = [];

    const selectedCategory = categories.filter((category) => {
      return category.selected;
    });

    if (selectedCategory[0].name === "すべて") {
      setLists(initLists);
    } else {
      selectedLists = initLists.filter((list) => {
        return list.categories.articles.some((category) => {
          return selectedCategory.some((selected) => {
            return selected.selected && selected.name === category.name;
          });
        });
      });

      setLists(selectedLists);
    }

    setTimeout(() => {
      AppTrigger.refresh();
    }, 1000);

    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: `#bridal-fair`,
        autoKill: false,
      },
    });
  };

  // 日付からlistsを絞り込み検索
  const getSelectedDateLists = async (e?: React.ChangeEvent<HTMLInputElement>) => {
    let targetDate: string | undefined | null;

    if (e) {
      const target = e.currentTarget;
      targetDate = target.value;
    } else {
      const url = new URL(router.asPath, "http://dummy.com");
      const params = new URLSearchParams(url.hash.split("?")[1]);
      targetDate = params.get("date");
    }

    if (targetDate) {
      // listsからtargetDateと一致するものを抽出
      const initLists = [...filterdLists];
      const selectedDateLists = initLists.filter((list) => {
        return list.calendarMulti?.values.some((event) => {
          return targetDate === event;
        });
      });

      setLists(selectedDateLists);
    } else {
      setLists(filterdLists);
    }

    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: `#bridal-fair`,
        autoKill: false,
      },
    });
  };

  return (
    <>
      <Motion>
        <Head>
          <title>{META.fair.title}</title>
        </Head>

        <main>
          <UnderlayerHead en="Bridal Fair" ja="ブライダルフェア" image="/images/fair_main.jpg" spImage="/images/fair_main-sp.jpg" />

          <WeekendFair lists={weekendLists} weekend={selectedWeekend} handleSelect={handleWeekendSelect} />
          <SelectFair categories={categories} handleSelected={handleSelect} getSelectedLists={getSelectedLists} getSelectedDateLists={getSelectedDateLists} />
          <BridalFair lists={lists} fairCategoriesLists={fairCategoriesLists.articles} />

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
  const fairUrl = `${process.env.CMS_URL}/api/v1/fair?limit=100`;
  const fairRes = axios.get<FairLists>(fairUrl, option);

  /* ===================================================================
  // フェアカテゴリ
  =================================================================== */
  const fairCategoriesUrl = `${process.env.CMS_URL}/api/v1/fairCategories?limit=100`;
  const fairCategoriesRes = axios.get<FairCategoriesLists>(fairCategoriesUrl, option);

  /* ===================================================================
  // プラン
  =================================================================== */
  const planUrl = `${process.env.CMS_URL}/api/v1/plan`;
  const planRes = axios.get<PlanLists>(planUrl, option);

  /* ===================================================================
  // レポート
  =================================================================== */
  const reportUrl = `${process.env.CMS_URL}/api/v1/report?limit=4`;
  const reportRes = axios.get<ReportLists>(reportUrl, option);

  const results = await Promise.all([fairRes, fairCategoriesRes, planRes, reportRes]);
  const fairLists = results[0].data;
  const fairCategoriesLists = results[1].data;
  const planLists = results[2].data;
  const reportLists = results[3].data;

  return {
    props: {
      fairLists,
      fairCategoriesLists,
      planLists,
      reportLists,
    },
    revalidate: 10,
  };
};
