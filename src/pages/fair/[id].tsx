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
  const todayDateList = fairList.calendarMulti ? fairList.calendarMulti?.values.filter((item) => item >= todayDate) : [];

  const todayDateListSort = todayDateList
    ? todayDateList?.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      })
    : [];

  const todayDateListSortFirst = todayDateList.length > 0 ? todayDateListSort[0] : todayDate;

  const [data, setData] = useState<ContactDataDetailFair>({
    title: fairList.title.replaceAll("<br>", " "),
    name: "",
    furigana: "",
    phone: "",
    email: "",
    date: selectDate !== "" ? selectDate : todayDateListSortFirst,
    time: fairList.openTimePulldown
      ? `${fairList.openTimePulldown[0].values.startHour.select[0]}:${fairList.openTimePulldown[0].values.startMinutes.select[0]}~${fairList.openTimePulldown[0].values.endHour.select[0]}:${fairList.openTimePulldown[0].values.endMinutes.select[0]}`
      : "",
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
          {todayDateList.length > 0 && <DetailFairForm data={data} handleData={handleData} date={fairList.calendarMulti} time={fairList.openTimePulldown} />}

          <Process />
          <TopWeddingPlan planLists={[...planLists.articles]} />
          <TopWeddingReport contents={reportLists.articles} openModal={openModal} />

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
  const fairUrl = `${process.env.CMS_URL}/api/v1/fair?limit=100`;
  const option = {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  };
  const fairRes: { data: FairLists } = await axios.get(fairUrl, option);

  const paths = fairRes.data.articles.map((fair) => `/fair/${fair.code}`);

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) return { props: {} };
  const code = context.params.id;
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
  const fairUrl = `${process.env.CMS_URL}/api/v1/fair/${code}`;
  const fairRes = axios.get<FairList>(fairUrl, option);

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
  const fairList = results[0].data;
  const fairCategoriesLists = results[1].data;
  const planLists = results[2].data;
  const reportLists = results[3].data;

  return {
    props: {
      fairList,
      fairCategoriesLists,
      planLists,
      reportLists,
    },
    revalidate: 10,
  };
};
