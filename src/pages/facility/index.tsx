import Footer from "@/components/orgs/Footer";
import HamburgerMenu from "@/components/orgs/HamburgerMenu";
import Header from "@/components/orgs/Header";
import InstagramSection from "@/components/orgs/InstagramSection";
import Underlayer1 from "@/components/orgs/Underlayer1";
import Head from "next/head";
import React from "react";
import { MAIN, CHAPEL, ANGLEDEBONHEUR, GARDEN, BANQUET, FEARIA, GROWRIA, PLUMERIA } from "../../../textDate/facility";
import Underlayer2 from "@/components/orgs/Underlayer2";
import Underlayer3 from "@/components/orgs/Underlayer3";
import SectionHead from "@/components/mols/SectionHead";
import Motion from "@/components/layouts/Motion";

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
          <title>lu CREA ル・クレア｜Facility</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Header {...childProps} />
          <HamburgerMenu {...childProps} />
          <section>
            <Underlayer1 {...MAIN} />
          </section>

          <section>
            <SectionHead {...CHAPEL} />
            <div>
              <Underlayer2 {...ANGLEDEBONHEUR} />
              <Underlayer2 {...GARDEN} />
            </div>
          </section>

          <section>
            <SectionHead {...BANQUET} />
            <div>
              <Underlayer2 {...FEARIA} />
              <Underlayer2 {...GROWRIA} />
              <Underlayer2 {...PLUMERIA} />
            </div>
          </section>

          <section>
            <Underlayer3 />
          </section>

          {/* <InstagramSection /> */}
          <Footer />
        </main>
      </Motion>
    </>
  );
}
