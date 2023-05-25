import type { AppProps } from "next/app";
import "../styles/reset.scss";
import "../styles/global.scss";
import "../styles/calendar.scss";
import "../styles/custom.scss";
import Animation from "@/components/libs/Animation";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import GtmHead from "@/components/libs/GtmHead";
import Pagination from "@/components/libs/Pagination";
import Header from "@/components/orgs/Header";
import HamburgerMenu from "@/components/orgs/HamburgerMenu";
import Footer from "@/components/orgs/Footer";
import useNav from "../../libs/useNav";
import "swiper/css";
import React, { useEffect } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import FixedLinks from "@/components/orgs/FixedLinks";
import { RecoilRoot, atom } from "recoil";

export const AppTrigger = ScrollTrigger;

export const selectFairDate = atom({
  key: "selectFairDate",
  default: "",
});

export default function App({ Component, pageProps, router }: AppProps) {
  const location = useRouter().pathname;

  const { childProps } = useNav();

  useEffect(() => {
    childProps.toggleOpen(false);
  }, [location]);

  return (
    <RecoilRoot>
      <Head>
        <GtmHead />
        <meta name="description" content="群馬県高崎市の結婚式場「マリエール高崎」。県内初の挙式・​ウェルカムパーティー・披露宴の3つのイベントを1日で行える特別なウェディングスタイルをご用意。" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0" />

        {/* favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* OG */}
        <meta property="og:image" content=" https://takasaki.marriyellclub.co.jp/ogp.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://takasaki.marriyellclub.co.jp/" />
        <meta property="og:title" content="【公式】マリエール高崎 │群馬 高崎市の結婚式場" />
        <meta property="og:site_name" content="マリエール高崎 │群馬 高崎市の結婚式場" />
        <meta
          property="og:description"
          content="群馬県高崎市の結婚式場「マリエール高崎」。県内初の挙式・​ウェルカムパーティー・披露宴の3つのイベントを1日で行える特別なウェディングスタイルをご用意。"
        ></meta>
      </Head>

      <Pagination location={location} />
      {/* <AnimatePresence mode="wait" initial> */}
      <Animation location={location} key={router.route}>
        <Header {...childProps} isTop={location === "/"} />
        <HamburgerMenu {...childProps} />
        <FixedLinks />
        <Component {...pageProps} />
        <Footer />
      </Animation>
      {/* </AnimatePresence> */}
    </RecoilRoot>
  );
}
