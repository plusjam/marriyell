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
  // const res = await fetch(`http://localhost:${process.env.PORT}/api/weddingReport/1`);
  // const lists: ReportContents[] = await res.json();

  // const fairRes = await fetch(`http://localhost:${process.env.PORT}/api/fair`);
  // const fairLists: FairList = await fairRes.json();

  const lists: ReportContents[] = [
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      lists: {
        contents: lists,
        next: 2,
      },
      fairLists,
    },
  };
};
