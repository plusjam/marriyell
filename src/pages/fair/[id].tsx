import Motion from "@/components/layouts/Motion";
import DetailFairForm from "@/components/orgs/DetailFairForm";
import FairContents from "@/components/orgs/FairContents";
import FairDetail from "@/components/orgs/FairDetail";
import InstagramSection from "@/components/orgs/InstagramSection";
import Process from "@/components/orgs/Process";
import ReportModal from "@/components/orgs/ReportModal";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import { GetStaticProps } from "next";
import Head from "next/head";
import useModalReport from "../../../libs/useModalReport";
import { ReportContents } from "../api/weddingReport/[id]";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

type Props = {
  reportLists: ReportContents[];
};

export default function Home(props: Props) {
  const { reportLists } = props;

  const { videoID, openModal, closeModal } = useModalReport();
  const router = useRouter();

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

  return (
    <>
      <Motion>
        <Head>
          <title>{"フェア名"}｜lu CREA マリエール高崎</title>
        </Head>

        <main>
          <FairDetail />
          <FairContents />
          <DetailFairForm title={"フェア名"} />

          <Process />
          <TopWeddingPlan />
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

  // const fairRes = await fetch(`http://localhost:${process.env.PORT}/api/fair/1`);
  // const fairList: FairList[0] = await fairRes.json();

  // const planRef = await fetch(`http://localhost:${process.env.PORT}/api/plan/`);
  // const planLists: PlanLists = await planRef.json();

  const reportLists: ReportContents[] = [
    {
      id: "V2Q6aajSyFM",
      category: "1神前式 × Shikijo",
      title: "レポートのタイトルが入ります",
      description:
        "結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "2神前式 × Shikijo",
      title: "レポートのタイトルが入ります",
      description:
        "結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "3神前式 × Shikijo",
      title: "レポートのタイトルが入ります",
      description:
        "結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "4神前式 × Shikijo",
      title: "レポートのタイトルが入ります",
      description:
        "結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "5神前式 × Shikijo",
      title: "レポートのタイトルが入ります",
      description:
        "結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "6神前式 × Shikijo",
      title: "レポートのタイトルが入ります",
      description:
        "結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "7神前式 × Shikijo",
      title: "レポートのタイトルが入ります",
      description:
        "結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "8神前式 × Shikijo",
      title: "レポートのタイトルが入ります",
      description:
        "結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "8神前式 × Shikijo",
      title: "レポートのタイトルが入ります",
      description:
        "結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "8神前式 × Shikijo",
      title: "レポートのタイトルが入ります",
      description:
        "結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "8神前式 × Shikijo",
      title: "レポートのタイトルが入ります",
      description:
        "結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
    {
      id: "V2Q6aajSyFM",
      category: "8神前式 × Shikijo",
      title: "レポートのタイトルが入ります",
      description:
        "結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない",
      member: 98,
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
    },
  ];

  return {
    props: {
      reportLists,
    },
  };
};
