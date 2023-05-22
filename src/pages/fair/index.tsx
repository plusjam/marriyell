import Motion from "@/components/layouts/Motion";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
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
import { AppTrigger } from "../_app";
import { META } from "@/textDate/head";

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

  // const { ScrollTrigger } = useAnimation();

  // 選択されたカテゴリーから絞り込み or検索
  const getSelectedLists = async () => {
    const initLists = [...fairLists];
    let selectedLists = [];

    const selectedCategory = categories.find((category) => {
      return category.selected;
    })?.slug;

    if (selectedCategory !== "all") {
      selectedLists = initLists.filter((list) => {
        return list.categories.some((category) => {
          return category.slug === selectedCategory && category.selected;
        });
      });
    } else {
      selectedLists = initLists;
    }

    setLists(selectedLists);
    setTimeout(() => {
      AppTrigger.refresh();
    }, 1000);

    const target = document.querySelector("#bridal-fair") as HTMLElement;
    // targetのページトップからの距離を取得
    const rect = target.getBoundingClientRect();
    const top = rect.top + window.pageYOffset;
    // スクロール
    window.scrollTo({
      top,
      behavior: "smooth",
    });
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
          <title>{META.fair.title}</title>
        </Head>

        <main>
          <UnderlayerHead en="Bridal Fair" ja="ブライダルフェア" image="/images/fair_main.jpg" spImage="/images/fair_main-sp.jpg" />

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

  // const reportLists: ReportContents[] = [
  //   {
  //     id: "V2Q6aajSyFM",
  //     category: "1THE TOP x GRAND DINING",
  //     title: "2023.3月挙式 scene「Time Leap」",
  //     description:
  //       "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
  //     member: 98,
  //     publishDate: "2021-01-01",
  //     createdDate: "2021-01-01",
  //     updatedDate: "2021-01-01",
  //   },
  //   {
  //     id: "V2Q6aajSyFM",
  //     category: "2THE TOP x GRAND DINING",
  //     title: "2023.3月挙式 scene「Time Leap」",
  //     description:
  //       "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
  //     member: 98,
  //     publishDate: "2021-01-01",
  //     createdDate: "2021-01-01",
  //     updatedDate: "2021-01-01",
  //   },
  //   {
  //     id: "V2Q6aajSyFM",
  //     category: "3THE TOP x GRAND DINING",
  //     title: "2023.3月挙式 scene「Time Leap」",
  //     description:
  //       "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
  //     member: 98,
  //     publishDate: "2021-01-01",
  //     createdDate: "2021-01-01",
  //     updatedDate: "2021-01-01",
  //   },
  //   {
  //     id: "V2Q6aajSyFM",
  //     category: "4THE TOP x GRAND DINING",
  //     title: "2023.3月挙式 scene「Time Leap」",
  //     description:
  //       "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
  //     member: 98,
  //     publishDate: "2021-01-01",
  //     createdDate: "2021-01-01",
  //     updatedDate: "2021-01-01",
  //   },
  //   {
  //     id: "V2Q6aajSyFM",
  //     category: "5THE TOP x GRAND DINING",
  //     title: "2023.3月挙式 scene「Time Leap」",
  //     description:
  //       "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
  //     member: 98,
  //     publishDate: "2021-01-01",
  //     createdDate: "2021-01-01",
  //     updatedDate: "2021-01-01",
  //   },
  //   {
  //     id: "V2Q6aajSyFM",
  //     category: "6THE TOP x GRAND DINING",
  //     title: "2023.3月挙式 scene「Time Leap」",
  //     description:
  //       "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
  //     member: 98,
  //     publishDate: "2021-01-01",
  //     createdDate: "2021-01-01",
  //     updatedDate: "2021-01-01",
  //   },
  //   {
  //     id: "V2Q6aajSyFM",
  //     category: "7THE TOP x GRAND DINING",
  //     title: "2023.3月挙式 scene「Time Leap」",
  //     description:
  //       "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
  //     member: 98,
  //     publishDate: "2021-01-01",
  //     createdDate: "2021-01-01",
  //     updatedDate: "2021-01-01",
  //   },
  //   {
  //     id: "V2Q6aajSyFM",
  //     category: "8THE TOP x GRAND DINING",
  //     title: "2023.3月挙式 scene「Time Leap」",
  //     description:
  //       "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
  //     member: 98,
  //     publishDate: "2021-01-01",
  //     createdDate: "2021-01-01",
  //     updatedDate: "2021-01-01",
  //   },
  //   {
  //     id: "V2Q6aajSyFM",
  //     category: "8THE TOP x GRAND DINING",
  //     title: "2023.3月挙式 scene「Time Leap」",
  //     description:
  //       "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
  //     member: 98,
  //     publishDate: "2021-01-01",
  //     createdDate: "2021-01-01",
  //     updatedDate: "2021-01-01",
  //   },
  //   {
  //     id: "V2Q6aajSyFM",
  //     category: "8THE TOP x GRAND DINING",
  //     title: "2023.3月挙式 scene「Time Leap」",
  //     description:
  //       "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
  //     member: 98,
  //     publishDate: "2021-01-01",
  //     createdDate: "2021-01-01",
  //     updatedDate: "2021-01-01",
  //   },
  //   {
  //     id: "V2Q6aajSyFM",
  //     category: "8THE TOP x GRAND DINING",
  //     title: "2023.3月挙式 scene「Time Leap」",
  //     description:
  //       "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
  //     member: 98,
  //     publishDate: "2021-01-01",
  //     createdDate: "2021-01-01",
  //     updatedDate: "2021-01-01",
  //   },
  //   {
  //     id: "V2Q6aajSyFM",
  //     category: "8THE TOP x GRAND DINING",
  //     title: "2023.3月挙式 scene「Time Leap」",
  //     description:
  //       "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
  //     member: 98,
  //     publishDate: "2021-01-01",
  //     createdDate: "2021-01-01",
  //     updatedDate: "2021-01-01",
  //   },
  // ];
  // const fairLists: FairList = [
  //   {
  //     id: 1,
  //     title: "【新型コロナウイルス感染症対策】",
  //     src: "/images/bridal_fair02.jpg",
  //     description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
  //     categories: [
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_new.svg",
  //         label: "初めての見学",
  //         slug: "new",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_food.svg",
  //         label: "試食会つき",
  //         slug: "food",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_season.svg",
  //         label: "季節・期間限定",
  //         slug: "season",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_ceremony.svg",
  //         label: "挙式体験",
  //         slug: "ceremony",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_dress.svg",
  //         label: "ドレス試着",
  //         slug: "dress",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_weekends.svg",
  //         label: "土日祝開催",
  //         slug: "weekends",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_weekdays.svg",
  //         label: "平日限定開催",
  //         slug: "weekdays",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_online.svg",
  //         label: "オンライン相談会",
  //         slug: "online",
  //       },
  //     ],
  //     events: [{ date: "2023-05-20" }, { date: "2023-05-21" }, { date: "2023-06-03"}],
  //   },
  //   {
  //     id: 2,
  //     title: "【春のウェディングフェア】",
  //     src: "/images/bridal_fair02.jpg",
  //     description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
  //     categories: [
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_new.svg",
  //         label: "初めての見学",
  //         slug: "new",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_food.svg",
  //         label: "試食会つき",
  //         slug: "food",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_season.svg",
  //         label: "季節・期間限定",
  //         slug: "season",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_ceremony.svg",
  //         label: "挙式体験",
  //         slug: "ceremony",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_dress.svg",
  //         label: "ドレス試着",
  //         slug: "dress",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_weekends.svg",
  //         label: "土日祝開催",
  //         slug: "weekends",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_weekdays.svg",
  //         label: "平日限定開催",
  //         slug: "weekdays",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_online.svg",
  //         label: "オンライン相談会",
  //         slug: "online",
  //       },
  //     ],
  //     events: [{ date: "2023-05-03" }, { date: "2023-05-04" }],
  //   },
  //   {
  //     id: 3,
  //     title: "【オンライン見学会】",
  //     src: "/images/bridal_fair02.jpg",
  //     description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
  //     categories: [
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_new.svg",
  //         label: "初めての見学",
  //         slug: "new",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_food.svg",
  //         label: "試食会つき",
  //         slug: "food",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_season.svg",
  //         label: "季節・期間限定",
  //         slug: "season",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_ceremony.svg",
  //         label: "挙式体験",
  //         slug: "ceremony",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_dress.svg",
  //         label: "ドレス試着",
  //         slug: "dress",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_weekends.svg",
  //         label: "土日祝開催",
  //         slug: "weekends",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_weekdays.svg",
  //         label: "平日限定開催",
  //         slug: "weekdays",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_online.svg",
  //         label: "オンライン相談会",
  //         slug: "online",
  //       },
  //     ],
  //     events: [{ date: "2023-05-05" }, { date: "2023-05-06" }],
  //   },
  //   {
  //     id: 4,
  //     title: "【フードフェスティバル】",
  //     src: "/images/bridal_fair02.jpg",
  //     description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
  //     categories: [
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_new.svg",
  //         label: "初めての見学",
  //         slug: "new",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_food.svg",
  //         label: "試食会つき",
  //         slug: "food",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_season.svg",
  //         label: "季節・期間限定",
  //         slug: "season",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_ceremony.svg",
  //         label: "挙式体験",
  //         slug: "ceremony",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_dress.svg",
  //         label: "ドレス試着",
  //         slug: "dress",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_weekends.svg",
  //         label: "土日祝開催",
  //         slug: "weekends",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_weekdays.svg",
  //         label: "平日限定開催",
  //         slug: "weekdays",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_online.svg",
  //         label: "オンライン相談会",
  //         slug: "online",
  //       },
  //     ],
  //     events: [{ date: "2023-05-07" }, { date: "2023-05-08" }, { date: "2023-06-03"}],
  //   },
  //   {
  //     id: 5,
  //     title: "【ドレス試着会】",
  //     src: "/images/bridal_fair02.jpg",
  //     description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
  //     categories: [
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_new.svg",
  //         label: "初めての見学",
  //         slug: "new",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_food.svg",
  //         label: "試食会つき",
  //         slug: "food",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_season.svg",
  //         label: "季節・期間限定",
  //         slug: "season",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_ceremony.svg",
  //         label: "挙式体験",
  //         slug: "ceremony",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_dress.svg",
  //         label: "ドレス試着",
  //         slug: "dress",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_weekends.svg",
  //         label: "土日祝開催",
  //         slug: "weekends",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_weekdays.svg",
  //         label: "平日限定開催",
  //         slug: "weekdays",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_online.svg",
  //         label: "オンライン相談会",
  //         slug: "online",
  //       },
  //     ],
  //     events: [{ date: "2023-05-09" }, { date: "2023-05-10" }],
  //   },
  //   {
  //     id: 6,
  //     title: "【フードフェスティバル】",
  //     src: "/images/bridal_fair02.jpg",
  //     description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
  //     categories: [
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_new.svg",
  //         label: "初めての見学",
  //         slug: "new",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_food.svg",
  //         label: "試食会つき",
  //         slug: "food",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_season.svg",
  //         label: "季節・期間限定",
  //         slug: "season",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_ceremony.svg",
  //         label: "挙式体験",
  //         slug: "ceremony",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_dress.svg",
  //         label: "ドレス試着",
  //         slug: "dress",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_weekends.svg",
  //         label: "土日祝開催",
  //         slug: "weekends",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_weekdays.svg",
  //         label: "平日限定開催",
  //         slug: "weekdays",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_online.svg",
  //         label: "オンライン相談会",
  //         slug: "online",
  //       },
  //     ],
  //     events: [{ date: "2023-05-20" }],
  //   },
  //   {
  //     id: 7,
  //     title: "【ドレス試着会】",
  //     src: "/images/bridal_fair02.jpg",
  //     description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
  //     categories: [
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_new.svg",
  //         label: "初めての見学",
  //         slug: "new",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_food.svg",
  //         label: "試食会つき",
  //         slug: "food",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_season.svg",
  //         label: "季節・期間限定",
  //         slug: "season",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_ceremony.svg",
  //         label: "挙式体験",
  //         slug: "ceremony",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_dress.svg",
  //         label: "ドレス試着",
  //         slug: "dress",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_weekends.svg",
  //         label: "土日祝開催",
  //         slug: "weekends",
  //       },
  //       {
  //         selected: true,
  //         src: "/images/icon_fair_weekdays.svg",
  //         label: "平日限定開催",
  //         slug: "weekdays",
  //       },
  //       {
  //         selected: false,
  //         src: "/images/icon_fair_online.svg",
  //         label: "オンライン相談会",
  //         slug: "online",
  //       },
  //     ],
  //     events: [{ date: "2023-05-21" }, { date: "2023-05-28" }],
  //   },
  // ];

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
    },
  };
};
