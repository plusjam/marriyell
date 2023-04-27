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
      </Head>

      {/* <AnimatePresence mode="wait" initial={false}> */}
      {/* <Pagination location={location} /> */}
      <Animation location={location}>
        <Component {...pageProps} />
      </Animation>
      {/* </AnimatePresence> */}
    </>
  );
}
