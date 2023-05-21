import Motion from "@/components/layouts/Motion";
import InstagramSection from "@/components/orgs/InstagramSection";
import { MainFlow } from "@/components/orgs/MainFlow";
import MainVideo from "@/components/orgs/MainVideo";
import TopBridalFair from "@/components/orgs/TopBridalFair";
import TopContents from "@/components/orgs/TopContents";
import TopNewsEvent from "@/components/orgs/TopNewsEvent";
import TopOriginalWedding from "@/components/orgs/TopOriginalWedding";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { ReportContents } from "./api/weddingReport/[id]";
import useModalReport from "../../libs/useModalReport";
import ReportModal from "@/components/orgs/ReportModal";
import { NewsCategory, NewsContents } from "../../typings/news";
import { META } from "@/textDate/head";

type Props = {
  reportLists: ReportContents[];
  newsLists: { category: NewsCategory[]; contents: NewsContents[] };
};

export default function Home(props: Props) {
  const { reportLists, newsLists } = props;

  const { videoID, openModal, closeModal } = useModalReport();

  return (
    <>
      <Motion>
        <Head>
          <title>{META.top.title}</title>
        </Head>

        <main>
          <MainVideo />
          <MainFlow />
          <TopOriginalWedding />
          <TopBridalFair />
          <TopWeddingPlan />
          <TopWeddingReport contents={reportLists} openModal={openModal} />
          <TopNewsEvent contents={newsLists.contents} />
          <TopContents />
          <InstagramSection />
        </main>

        <ReportModal videoID={videoID} closeModal={closeModal} />
      </Motion>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // const reportRes = await fetch(`http://localhost:${process.env.PORT}/api/weddingReport/2`);
  // const reportLists: ReportContents[] = await reportRes.json();

  // const newsRes = await fetch(`http://localhost:${process.env.PORT}/api/news/1`);
  // const newsLists: { category: NewsCategory[]; contents: NewsContents[] } = await newsRes.json();

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

  const newsLists: {
    category: NewsCategory[];
    contents: NewsContents[];
  } = {
    category: [
      {
        label: "すべて",
        slug: "all",
        checked: true,
      },
      {
        label: "お知らせ",
        slug: "news",
        checked: false,
      },
      {
        label: "イベント",
        slug: "event",
        checked: false,
      },
      {
        label: "メディア情報",
        slug: "media",
        checked: false,
      },
      {
        label: "コロナ対策",
        slug: "covid",
        checked: false,
      },
    ],
    contents: [
      {
        id: 1,
        src: "/images/sample124.jpg",
        category: [
          {
            label: "お知らせ",
            slug: "news",
          },
          {
            label: "イベント",
            slug: "event",
          },
        ],
        publishDate: "2021-01-01",
        createdDate: "2021-01-01",
        updatedDate: "2021-01-01",
        title: "【結婚式場でランチ】　5月17日12：00　大人1,500円",
        description: "シーンズランチ1月OPEN 月に１度だけのランチを開催5月17日（水曜日）12:00 「結婚式だけでなく、シーンズに食べに行ける機会があれば嬉しい！！」「結婚式…",
      },
      {
        id: 2,
        src: "/images/sample124.jpg",
        category: [
          {
            label: "お知らせ",
            slug: "news",
          },
          {
            label: "イベント",
            slug: "event",
          },
        ],
        publishDate: "2021-01-02",
        createdDate: "2021-01-02",
        updatedDate: "2021-01-02",
        title: "【結婚式場でディナー】　5月18日18：00　大人2,500円",
        description: "シーンズディナー1月OPEN 月に１度だけのディナーを開催5月18日（木曜日）18:00 「結婚式だけでなく、シーンズに食べに行ける機会があれば嬉しい！！」「結婚式…",
      },
      {
        id: 3,
        src: "/images/sample124.jpg",
        category: [
          {
            label: "お知らせ",
            slug: "news",
          },
          {
            label: "メディア情報",
            slug: "media",
          },
        ],
        publishDate: "2021-02-05",
        createdDate: "2021-02-05",
        updatedDate: "2021-02-05",
        title: "【メディア掲載】雑誌「ウェディング」4月号に掲載されました！",
        description: "ウェディング雑誌「ウェディング」4月号にシーンズが掲載されました！ 素敵なページで紹介されておりますので、ぜひご覧ください。",
      },
      {
        id: 4,
        src: "/images/sample124.jpg",
        category: [
          {
            label: "イベント",
            slug: "event",
          },
        ],
        publishDate: "2021-03-15",
        createdDate: "2021-03-15",
        updatedDate: "2021-03-15",
        title: "【ブライダルフェア】4月10日開催！結婚式の準備を一緒に始めましょう！",
        description: "4月10日にブライダルフェアを開催いたします。当日は、会場見学や料理試食、ドレス試着などができます。ぜひお越しください。",
      },
      {
        id: 5,
        src: "/images/sample124.jpg",
        category: [
          {
            label: "コロナ対策",
            slug: "covid",
          },
        ],
        publishDate: "2021-04-20",
        createdDate: "2021-04-20",
        updatedDate: "2021-04-20",
        title: "【コロナ対策】シーンズの安全対策について",
        description: "シーンズでは、新型コロナウイルスの感染拡大防止対策として、徹底した消毒・換気を行っております。お客様に安心してご来場いただけるよう、努めてまいります。",
      },
      {
        id: 6,
        src: "/images/sample124.jpg",
        category: [
          {
            label: "イベント",
            slug: "event",
          },
        ],
        publishDate: "2021-05-25",
        createdDate: "2021-05-25",
        updatedDate: "2021-05-25",
        title: "【夏のスペシャルフェア】8月1日開催！素敵な夏の結婚式を一緒に計画しましょう！",
        description: "8月1日に夏のスペシャルフェアを開催いたします。当日は、会場見学や料理試食、ドレス試着などができます。ぜひお越しください。",
      },
      {
        id: 7,
        src: "/images/sample124.jpg",
        category: [
          {
            label: "お知らせ",
            slug: "news",
          },
        ],
        publishDate: "2021-06-10",
        createdDate: "2021-06-10",
        updatedDate: "2021-06-10",
        title: "【新プラン】シーンズの新しい結婚式プランが登場！",
        description: "シーンズでは、お客様のご要望に応じて新しい結婚式プランをご用意いたしました。詳細はお問い合わせください。",
      },
      {
        id: 8,
        src: "/images/sample124.jpg",
        category: [
          {
            label: "メディア情報",
            slug: "media",
          },
        ],
        publishDate: "2021-07-15",
        createdDate: "2021-07-15",
        updatedDate: "2021-07-15",
        title: "【テレビ出演】シーンズが地元テレビ局で紹介されました！",
        description: "地元テレビ局にて、シーンズが紹介されました！放送内容はウェブサイトでご覧いただけます。",
      },
      {
        id: 9,
        src: "/images/sample124.jpg",
        category: [
          {
            label: "お知らせ",
            slug: "news",
          },
          {
            label: "イベント",
            slug: "event",
          },
        ],
        publishDate: "2021-08-30",
        createdDate: "2021-08-30",
        updatedDate: "2021-08-30",
        title: "【秋のブライダルフェア】9月15日開催！美しい秋の結婚式を一緒に計画しましょう！",
        description: "9月15日に秋のブライダルフェアを開催いたします。当日は、会場見学や料理試食、ドレス試着などができます。ぜひお越しください。",
      },
      // {
      //   id: 10,
      //   src: "/images/sample124.jpg",
      //   category: [
      //     {
      //       label: "コロナ対策",
      //       slug: "covid",
      //     },
      //   ],
      //   publishDate: "2021-09-20",
      //   createdDate: "2021-09-20",
      //   updatedDate: "2021-09-20",
      //   title: "【コロナ対策】シーンズの対策強化について",
      //   description: "シーンズでは、新型コロナウイルスの感染拡大防止対策をさらに強化しました。お客様に安心してご来場いただけるよう、最善を尽くしてまいります。",
      // },
    ],
  };

  return {
    props: {
      reportLists,
      newsLists,
    },
  };
};
