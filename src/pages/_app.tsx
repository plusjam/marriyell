import type { AppProps } from "next/app";
import "../styles/reset.scss";
import "../styles/global.scss";
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
import { useEffect } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import FixedLinks from "@/components/orgs/FixedLinks";

export const AppTrigger = ScrollTrigger;

export default function App({ Component, pageProps }: AppProps) {
  const location = useRouter().pathname;

  const { childProps } = useNav();

  useEffect(() => {
    childProps.toggleOpen(false);
  }, [location]);

  return (
    <>
      <Head>
        <GtmHead />
        <meta
          name="description"
          content="京都 福知山の結婚式場・ウェディングならlu Crea（ル・クレア）。福知山駅徒歩3分でアクセス至便！北近畿最大級、天井高10mの白亜の大聖堂と、1件貸切の邸宅会場でゲストをおもてなしいたします。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* OG */}
        <meta property="og:image" content=" https://lu-crea.jp/ogp.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lu-crea.jp/" />
        <meta property="og:title" content="【公式】lu CREA ル・クレア┃京都 福知山の結婚式場" />
        <meta property="og:site_name" content="lu CREA -ル・クレア- │京都 福知山の結婚式場" />
        <meta
          property="og:description"
          content="京都 福知山の結婚式場・ウェディングならlu Crea（ル・クレア）。福知山駅徒歩3分でアクセス至便！北近畿最大級、天井高10mの白亜の大聖堂と、1件貸切の邸宅会場でゲストをおもてなしいたします。"
        ></meta>
      </Head>

      <AnimatePresence mode="wait" initial>
        <Pagination location={location} />
        <Animation location={location}>
          <Header {...childProps} isTop={location === "/"} />
          <HamburgerMenu {...childProps} />
          <FixedLinks />
          <Component {...pageProps} />
          <Footer />
        </Animation>
      </AnimatePresence>
    </>
  );
}
