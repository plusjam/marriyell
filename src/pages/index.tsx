import Motion from "@/components/layouts/Motion";
import Footer from "@/components/orgs/Footer";
import HamburgerMenu from "@/components/orgs/HamburgerMenu";
import Header from "@/components/orgs/Header";
import InstagramSection from "@/components/orgs/InstagramSection";
import { MainFlow } from "@/components/orgs/MainFlow";
import MainVideo from "@/components/orgs/MainVideo";
import TopBridalFair from "@/components/orgs/TopBridalFair";
import TopContents from "@/components/orgs/TopContents";
import TopNewsEvent from "@/components/orgs/TopNewsEvent";
import TopOriginalWedding from "@/components/orgs/TopOriginalWedding";
import TopWeddingPlan from "@/components/orgs/TopWeddingPlan";
import TopWeddingReport from "@/components/orgs/TopWeddingReport";
import Head from "next/head";
import React from "react";

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const childProps = {
    toggleOpen,
    isOpen,
  };

  return (
    <>
      <Motion>
        <Head>
          <title>lu CREA ル・クレア</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Header {...childProps} isTop />
          <HamburgerMenu {...childProps} isTop />
          <MainVideo />
          <MainFlow />
          <TopOriginalWedding />
          <TopBridalFair />
          <TopWeddingPlan />
          {/* <TopWeddingReport /> */}
          {/* <TopNewsEvent /> */}
          {/* <TopContents /> */}
          {/* <InstagramSection /> */}
          <Footer />
        </main>
      </Motion>
    </>
  );
}
