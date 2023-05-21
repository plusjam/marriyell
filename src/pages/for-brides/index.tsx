import Motion from "@/components/layouts/Motion";
import Access from "@/components/orgs/Access";
import GuestServices from "@/components/orgs/GuestServices";
import InstagramSection from "@/components/orgs/InstagramSection";
import QaSection from "@/components/orgs/QaSection";
import StaticHead from "@/components/orgs/StaticHead";
import StaticLayoutBrides from "@/components/orgs/StaticLayoutBrides";
import TopContents from "@/components/orgs/TopContents";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import { CONTENT } from "@/textDate/brides";
import { META } from "@/textDate/head";
import { QA } from "@/textDate/qa";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Motion>
        <Head>
          <title>{META.forBrides.title}</title>
        </Head>

        <main>
          <UnderlayerHead en="For Brides" ja="ご成約の皆さまへ" image="/images/brides_main.jpg" spImage="/images/brides_main-sp.jpg" />

          <StaticHead title={CONTENT.title} caption={CONTENT.caption} textalign />

          <div>
            {CONTENT.section.map((content, index) => {
              return <StaticLayoutBrides contents={content} key={`staticlayout${index}`} />;
            })}
          </div>

          <TopContents />
          <InstagramSection />
        </main>
      </Motion>
    </>
  );
}
