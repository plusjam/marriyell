import Motion from "@/components/layouts/Motion";
import DetailFairForm, { ContactDataDetailFair } from "@/components/orgs/DetailFairForm";
import FairContents from "@/components/orgs/FairContents";
import FairDetail from "@/components/orgs/FairDetail";
import InstagramSection from "@/components/orgs/InstagramSection";
import Process from "@/components/orgs/Process";
import ReportModal from "@/components/orgs/ReportModal";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import axios from "axios";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { apricotClient } from "../../../libs/cms";
import useModalReport from "../../../libs/useModalReport";
import { FairCategoriesLists, FairList, FairLists } from "../../../typings/fair";
import { PlanLists } from "../../../typings/plan";
import { ReportLists } from "../../../typings/report";
import { useRecoilState } from "recoil";
import { selectFairDate } from "../_app";

type Props = {
  fairList: FairList;
  fairCategoriesLists: FairCategoriesLists;
  planLists: PlanLists;
  reportLists: ReportLists;
};

export default function Home(props: Props) {
  const { fairList, fairCategoriesLists, planLists, reportLists } = props;

  const { videoID, openModal, closeModal } = useModalReport();
  const router = useRouter();
  const [selectDate, setSelectDate] = useRecoilState<any>(selectFairDate);

  gsap.registerPlugin(ScrollToPlugin);

  useEffect(() => {
    setTimeout(() => {
      const url = new URL(router.asPath, "http://dummy.com");
      const params = new URLSearchParams(url.search.split("?")[1]);
      const target = params.get("id");

      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: `#${target}`,
            autoKill: false,
          },
        });
      }
    }, 2500);
  }, []);

  // 今日の日付を取得
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const todayDate = year + "-" + month + "-" + day;

  // 今日以降で一番近いfairList.calendar[n].values.calendarを取得
  const todayDateList = fairList.calendar.filter((item) => item.values.calendar >= todayDate);

  const todayDateListSort = todayDateList?.sort((a, b) => {
    if (a.values.calendar > b.values.calendar) return 1;
    if (a.values.calendar < b.values.calendar) return -1;
    return 0;
  });

  const todayDateListSortFirst = todayDateList.length > 0 ? todayDateListSort[0].values.calendar : todayDate;

  const [data, setData] = useState<ContactDataDetailFair>({
    title: fairList.title.replaceAll("<br>", " "),
    name: "",
    furigana: "",
    phone: "",
    email: "",
    date: selectDate !== "" ? selectDate : todayDateListSortFirst,
    time: fairList.openTime[0].values.timeRange,
    inquiry: "",
  });

  const handleData = (data: ContactDataDetailFair) => {
    setData(data);
  };

  return (
    <>
      <Motion>
        <Head>
          <title>{`${fairList.title}｜マリエール高崎`}</title>
        </Head>

        <main>
          <FairDetail fairList={fairList} fairCategoriesLists={fairCategoriesLists.articles} data={data} handleData={handleData} />
          <FairContents fairList={fairList} />
          {todayDateList.length > 0 && <DetailFairForm data={data} handleData={handleData} date={fairList.calendarMulti} time={fairList.openTime} />}

          {/* <Process /> */}
          <TopWeddingPlan planLists={[...planLists.articles]} />
          {/* <TopWeddingReport contents={reportLists.articles} openModal={openModal} /> */}

          <InstagramSection />
        </main>

        <ReportModal videoID={videoID} closeModal={closeModal} />
      </Motion>
    </>
  );
}

export const getStaticPaths = async () => {
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

  const paths = fairRes.data.articles.map((fair) => `/fair/${fair.code}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) return { props: {} };
  const code = context.params.id;
  const accessKey = process.env.API_KEY;
  const secretKey = process.env.API_SECRET;
  const token = await apricotClient(accessKey, secretKey);

  /* ===================================================================
  // フェア
  =================================================================== */
  const fairUrl = `${process.env.CMS_URL}/api/v1/fair/${code}`;
  const fairRes: { data: FairList } = await axios.get(fairUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const fairList: FairList = fairRes.data;

  /* ===================================================================
  // フェアカテゴリ
  =================================================================== */
  const fairCategoriesUrl = `${process.env.CMS_URL}/api/v1/fairCategories`;
  const fairCategoriesRes: { data: FairCategoriesLists } = await axios.get(fairCategoriesUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const fairCategoriesLists: FairCategoriesLists = fairCategoriesRes.data;

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
  // const reportUrl = `${process.env.CMS_URL}/api/v1/report?limit=12`;
  // const reportRes: { data: ReportLists } = await axios.get(reportUrl, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "account-access-key": accessKey,
  //     "account-secret-key": secretKey,
  //     authorization: `Bearer ${token.token}`,
  //   },
  // });

  const reportLists: ReportLists = {
    articles: [],
    total: 0,
    count: 0,
  };

  return {
    props: {
      fairList,
      fairCategoriesLists,
      planLists,
      reportLists,
    },
  };
};
