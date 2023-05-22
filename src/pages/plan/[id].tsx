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
import WeddingPlan from "@/components/orgs/WeddingPlan";
import { PlanLists } from "../api/plan";
import PlanDetail from "@/components/orgs/PlanDetail";
import PlanContents from "@/components/orgs/PlanContents";
import DetailForm from "@/components/orgs/DetailForm";
import Process from "@/components/orgs/Process";

type Props = {
  reportLists: ReportContents[];
  fairLists: FairList;
  planList: PlanLists[0];
};

export default function Home(props: Props) {
  const { reportLists, fairLists, planList } = props;
  const [weekendLists, setWeekendLists] = React.useState([...fairLists]);

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

  return (
    <>
      <Motion>
        <Head>
          <title>lu CREA ル・クレア｜Wedding Plan</title>
        </Head>

        <main>
          <PlanDetail content={planList} />
          <PlanContents />
          <DetailForm title={planList.title} />
          <Process />
          <WeekendFair lists={weekendLists} weekend={selectedWeekend} handleSelect={handleWeekendSelect} />
          <TopWeddingReport contents={reportLists} openModal={openModal} />

          <InstagramSection />
        </main>

        <ReportModal videoID={videoID} closeModal={closeModal} />
      </Motion>
    </>
  );
}

export const getStaticPaths = async () => {
  // ここでパスを生成します。仮に、1から5までのidを生成するとします。

  return {
    paths: [{ params: { id: "1" } }],
    fallback: false,
  };
};

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

  // const reportRes = await fetch(`http://localhost:${process.env.PORT}/api/weddingReport/2`);
  // const reportLists: ReportContents[] = await reportRes.json();

  // const fairRes = await fetch(`http://localhost:${process.env.PORT}/api/fair`);
  // const fairLists: FairList = await fairRes.json();

  // const planRef = await fetch(`http://localhost:${process.env.PORT}/api/plan/1`);
  // const planList: PlanLists[0] = await planRef.json();

  const planList: PlanLists[0] = {
    id: 1,
    src: "/images/plan_1.png",
    title: "挙式料＆衣裳無料！40名約215万円⇒135万円<br>特別演出もプレゼント",
    member: 40,
    price: 1352100,
    categories: [
      {
        selected: false,
        label: "大人数可",
        slug: "many",
      },
      {
        selected: true,
        label: "家族婚・少人数",
        slug: "less",
      },
      {
        selected: false,
        label: "フォト婚",
        slug: "photo",
      },
      {
        selected: false,
        label: "期間限定",
        slug: "limited",
      },
    ],
    term: "10名よりご利用いただけます　※1名様増減　16,940円",
  };

  const reportLists: ReportContents[] = [
    {
      id: "V2Q6aajSyFM",
      category: "1THE TOP x GRAND DINING",
      title: "2023.3月挙式 scene「Time Leap」",
      description:
        "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "2THE TOP x GRAND DINING",
      title: "2023.3月挙式 scene「Time Leap」",
      description:
        "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "3THE TOP x GRAND DINING",
      title: "2023.3月挙式 scene「Time Leap」",
      description:
        "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "4THE TOP x GRAND DINING",
      title: "2023.3月挙式 scene「Time Leap」",
      description:
        "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "5THE TOP x GRAND DINING",
      title: "2023.3月挙式 scene「Time Leap」",
      description:
        "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "6THE TOP x GRAND DINING",
      title: "2023.3月挙式 scene「Time Leap」",
      description:
        "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "7THE TOP x GRAND DINING",
      title: "2023.3月挙式 scene「Time Leap」",
      description:
        "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "8THE TOP x GRAND DINING",
      title: "2023.3月挙式 scene「Time Leap」",
      description:
        "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "8THE TOP x GRAND DINING",
      title: "2023.3月挙式 scene「Time Leap」",
      description:
        "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "8THE TOP x GRAND DINING",
      title: "2023.3月挙式 scene「Time Leap」",
      description:
        "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "8THE TOP x GRAND DINING",
      title: "2023.3月挙式 scene「Time Leap」",
      description:
        "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "8THE TOP x GRAND DINING",
      title: "2023.3月挙式 scene「Time Leap」",
      description:
        "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
  ];

  const fairLists: FairList = [
    {
      id: 1,
      title: "【新型コロナウイルス感染症対策】",
      src: "/images/bridal_fair02.jpg",
      description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
      categories: [
        {
          selected: false,
          src: "/images/icon_fair_new.svg",
          label: "初めての見学",
          slug: "new",
        },
        {
          selected: false,
          src: "/images/icon_fair_food.svg",
          label: "試食会つき",
          slug: "food",
        },
        {
          selected: false,
          src: "/images/icon_fair_season.svg",
          label: "季節・期間限定",
          slug: "season",
        },
        {
          selected: false,
          src: "/images/icon_fair_ceremony.svg",
          label: "挙式体験",
          slug: "ceremony",
        },
        {
          selected: true,
          src: "/images/icon_fair_dress.svg",
          label: "ドレス試着",
          slug: "dress",
        },
        {
          selected: false,
          src: "/images/icon_fair_weekends.svg",
          label: "土日祝開催",
          slug: "weekends",
        },
        {
          selected: true,
          src: "/images/icon_fair_weekdays.svg",
          label: "平日限定開催",
          slug: "weekdays",
        },
        {
          selected: false,
          src: "/images/icon_fair_online.svg",
          label: "オンライン相談会",
          slug: "online",
        },
      ],
      events: [{ date: "2023-05-20" }, { date: "2023-05-21" }, { date: "2023-06-03" }],
    },
    {
      id: 1,
      title: "【春のウェディングフェア】",
      src: "/images/bridal_fair02.jpg",
      description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
      categories: [
        {
          selected: false,
          src: "/images/icon_fair_new.svg",
          label: "初めての見学",
          slug: "new",
        },
        {
          selected: false,
          src: "/images/icon_fair_food.svg",
          label: "試食会つき",
          slug: "food",
        },
        {
          selected: false,
          src: "/images/icon_fair_season.svg",
          label: "季節・期間限定",
          slug: "season",
        },
        {
          selected: false,
          src: "/images/icon_fair_ceremony.svg",
          label: "挙式体験",
          slug: "ceremony",
        },
        {
          selected: true,
          src: "/images/icon_fair_dress.svg",
          label: "ドレス試着",
          slug: "dress",
        },
        {
          selected: false,
          src: "/images/icon_fair_weekends.svg",
          label: "土日祝開催",
          slug: "weekends",
        },
        {
          selected: true,
          src: "/images/icon_fair_weekdays.svg",
          label: "平日限定開催",
          slug: "weekdays",
        },
        {
          selected: true,
          src: "/images/icon_fair_online.svg",
          label: "オンライン相談会",
          slug: "online",
        },
      ],
      events: [{ date: "2023-05-03" }, { date: "2023-05-04" }],
    },
    {
      id: 1,
      title: "【オンライン見学会】",
      src: "/images/bridal_fair02.jpg",
      description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
      categories: [
        {
          selected: true,
          src: "/images/icon_fair_new.svg",
          label: "初めての見学",
          slug: "new",
        },
        {
          selected: false,
          src: "/images/icon_fair_food.svg",
          label: "試食会つき",
          slug: "food",
        },
        {
          selected: false,
          src: "/images/icon_fair_season.svg",
          label: "季節・期間限定",
          slug: "season",
        },
        {
          selected: false,
          src: "/images/icon_fair_ceremony.svg",
          label: "挙式体験",
          slug: "ceremony",
        },
        {
          selected: true,
          src: "/images/icon_fair_dress.svg",
          label: "ドレス試着",
          slug: "dress",
        },
        {
          selected: false,
          src: "/images/icon_fair_weekends.svg",
          label: "土日祝開催",
          slug: "weekends",
        },
        {
          selected: true,
          src: "/images/icon_fair_weekdays.svg",
          label: "平日限定開催",
          slug: "weekdays",
        },
        {
          selected: true,
          src: "/images/icon_fair_online.svg",
          label: "オンライン相談会",
          slug: "online",
        },
      ],
      events: [{ date: "2023-05-05" }, { date: "2023-05-06" }],
    },
    {
      id: 1,
      title: "【フードフェスティバル】",
      src: "/images/bridal_fair02.jpg",
      description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
      categories: [
        {
          selected: true,
          src: "/images/icon_fair_new.svg",
          label: "初めての見学",
          slug: "new",
        },
        {
          selected: false,
          src: "/images/icon_fair_food.svg",
          label: "試食会つき",
          slug: "food",
        },
        {
          selected: false,
          src: "/images/icon_fair_season.svg",
          label: "季節・期間限定",
          slug: "season",
        },
        {
          selected: false,
          src: "/images/icon_fair_ceremony.svg",
          label: "挙式体験",
          slug: "ceremony",
        },
        {
          selected: true,
          src: "/images/icon_fair_dress.svg",
          label: "ドレス試着",
          slug: "dress",
        },
        {
          selected: false,
          src: "/images/icon_fair_weekends.svg",
          label: "土日祝開催",
          slug: "weekends",
        },
        {
          selected: true,
          src: "/images/icon_fair_weekdays.svg",
          label: "平日限定開催",
          slug: "weekdays",
        },
        {
          selected: true,
          src: "/images/icon_fair_online.svg",
          label: "オンライン相談会",
          slug: "online",
        },
      ],
      events: [{ date: "2023-05-07" }, { date: "2023-05-08" }, { date: "2023-06-03" }],
    },
    {
      id: 1,
      title: "【ドレス試着会】",
      src: "/images/bridal_fair02.jpg",
      description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
      categories: [
        {
          selected: false,
          src: "/images/icon_fair_new.svg",
          label: "初めての見学",
          slug: "new",
        },
        {
          selected: false,
          src: "/images/icon_fair_food.svg",
          label: "試食会つき",
          slug: "food",
        },
        {
          selected: false,
          src: "/images/icon_fair_season.svg",
          label: "季節・期間限定",
          slug: "season",
        },
        {
          selected: false,
          src: "/images/icon_fair_ceremony.svg",
          label: "挙式体験",
          slug: "ceremony",
        },
        {
          selected: false,
          src: "/images/icon_fair_dress.svg",
          label: "ドレス試着",
          slug: "dress",
        },
        {
          selected: false,
          src: "/images/icon_fair_weekends.svg",
          label: "土日祝開催",
          slug: "weekends",
        },
        {
          selected: true,
          src: "/images/icon_fair_weekdays.svg",
          label: "平日限定開催",
          slug: "weekdays",
        },
        {
          selected: false,
          src: "/images/icon_fair_online.svg",
          label: "オンライン相談会",
          slug: "online",
        },
      ],
      events: [{ date: "2023-05-09" }, { date: "2023-05-10" }],
    },
    {
      id: 1,
      title: "【フードフェスティバル】",
      src: "/images/bridal_fair02.jpg",
      description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
      categories: [
        {
          selected: true,
          src: "/images/icon_fair_new.svg",
          label: "初めての見学",
          slug: "new",
        },
        {
          selected: false,
          src: "/images/icon_fair_food.svg",
          label: "試食会つき",
          slug: "food",
        },
        {
          selected: false,
          src: "/images/icon_fair_season.svg",
          label: "季節・期間限定",
          slug: "season",
        },
        {
          selected: false,
          src: "/images/icon_fair_ceremony.svg",
          label: "挙式体験",
          slug: "ceremony",
        },
        {
          selected: true,
          src: "/images/icon_fair_dress.svg",
          label: "ドレス試着",
          slug: "dress",
        },
        {
          selected: false,
          src: "/images/icon_fair_weekends.svg",
          label: "土日祝開催",
          slug: "weekends",
        },
        {
          selected: true,
          src: "/images/icon_fair_weekdays.svg",
          label: "平日限定開催",
          slug: "weekdays",
        },
        {
          selected: true,
          src: "/images/icon_fair_online.svg",
          label: "オンライン相談会",
          slug: "online",
        },
      ],
      events: [{ date: "2023-05-20" }],
    },
    {
      id: 1,
      title: "【ドレス試着会】",
      src: "/images/bridal_fair02.jpg",
      description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
      categories: [
        {
          selected: false,
          src: "/images/icon_fair_new.svg",
          label: "初めての見学",
          slug: "new",
        },
        {
          selected: false,
          src: "/images/icon_fair_food.svg",
          label: "試食会つき",
          slug: "food",
        },
        {
          selected: false,
          src: "/images/icon_fair_season.svg",
          label: "季節・期間限定",
          slug: "season",
        },
        {
          selected: false,
          src: "/images/icon_fair_ceremony.svg",
          label: "挙式体験",
          slug: "ceremony",
        },
        {
          selected: false,
          src: "/images/icon_fair_dress.svg",
          label: "ドレス試着",
          slug: "dress",
        },
        {
          selected: false,
          src: "/images/icon_fair_weekends.svg",
          label: "土日祝開催",
          slug: "weekends",
        },
        {
          selected: true,
          src: "/images/icon_fair_weekdays.svg",
          label: "平日限定開催",
          slug: "weekdays",
        },
        {
          selected: false,
          src: "/images/icon_fair_online.svg",
          label: "オンライン相談会",
          slug: "online",
        },
      ],
      events: [{ date: "2023-05-21" }, { date: "2023-05-28" }],
    },
  ];

  return {
    props: {
      reportLists,
      fairLists,
      planList,
    },
  };
};
