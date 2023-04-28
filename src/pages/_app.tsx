import type { AppProps } from "next/app";
import "../styles/reset.scss";
import "../styles/global.scss";
import Animation from "@/components/libs/Animation";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Loading from "@/components/layouts/Loading";
import Head from "next/head";
import GtmHead from "@/components/libs/GtmHead";
import GtmBody from "@/components/libs/GtmBody";
import Pagination from "@/components/libs/Pagination";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const location = useRouter().pathname;

  return (
    <>
      <Head>
        <GtmHead />
        <meta
          name="description"
          content="京都 福知山の結婚式場・ウェディングなら“ル・クレア”。福知山駅徒歩3分でアクセス至便！北近畿最大級、天井高10mの白亜の大聖堂と、1件貸切の邸宅会場でゲストとともに心から楽しむウェディングを。"
        />

        {/* OG */}
        <meta property="og:image" content=" https://lu-crea.jp/ogp.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lu-crea.jp/" />
        <meta property="og:title" content="【公式】lu CREA ル・クレア┃京都 福知山の結婚式場" />
        <meta property="og:site_name" content="lu CREA -ル・クレア- │京都 福知山の結婚式場" />
        <meta
          property="og:description"
          content="京都 福知山の結婚式場・ウェディングなら“ル・クレア”。福知山駅徒歩3分でアクセス至便！北近畿最大級、天井高10mの白亜の大聖堂と、1件貸切の邸宅会場でゲストとともに心から楽しむウェディングを。"
        ></meta>
      </Head>

      <AnimatePresence mode="wait" initial={false}>
        <Pagination location={location} />
        <Animation location={location}>
          <Component {...pageProps} />
        </Animation>
      </AnimatePresence>
    </>
  );
}
