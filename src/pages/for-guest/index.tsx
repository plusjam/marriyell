import Motion from "@/components/layouts/Motion";
import Access from "@/components/orgs/Access";
import GuestServices from "@/components/orgs/GuestServices";
import QaSection from "@/components/orgs/QaSection";
import StaticHead from "@/components/orgs/StaticHead";
import StaticLayout from "@/components/orgs/StaticLayout";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import { CONTENT } from "@/textDate/guest";
import { META } from "@/textDate/head";
import { QA } from "@/textDate/qa";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Motion>
        <Head>
          <title>{META.forGuest.title}</title>
        </Head>

        <main>
          <UnderlayerHead en="For Guest" ja="ご列席の方へ" image="/images/guest_main.jpg" spImage="/images/guest_main-sp.jpg" />

          <StaticHead title={CONTENT.title} caption={CONTENT.caption} />

          <div>
            {CONTENT.section.map((content, index) => {
              return <StaticLayout contents={content} key={`staticlayout${index}`} />;
            })}
          </div>

          <GuestServices title={CONTENT.service.title} contents={CONTENT.service.contents} />
          <QaSection qaSet={QA[5]} />
          <Access />
        </main>
      </Motion>
    </>
  );
}
