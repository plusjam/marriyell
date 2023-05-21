import Motion from "@/components/layouts/Motion";
import ScrollBox from "@/components/mols/ScrollBox";
import InstagramSection from "@/components/orgs/InstagramSection";
import RecruitScroll from "@/components/orgs/RecruitScroll";
import StaticHead from "@/components/orgs/StaticHead";
import StaticLayoutRecruit from "@/components/orgs/StaticLayoutRecruit";
import TopContents from "@/components/orgs/TopContents";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import { META } from "@/textDate/head";
import { RECRUIT } from "@/textDate/recruit";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Motion>
        <Head>
          <title>{META.recruit.title}</title>
        </Head>

        <main>
          <UnderlayerHead en="For Recruit" ja="採用紹介" image="/images/recruit_main.jpg" spImage="/images/recruit_main-sp.jpg" />

          <StaticHead title={RECRUIT.title} caption={RECRUIT.caption} />
          <RecruitScroll links={RECRUIT.links} />

          <div>
            {RECRUIT.contents.map((content, index) => {
              return <StaticLayoutRecruit contents={content} key={`staticlayout${index}`} />;
            })}
          </div>

          <TopContents />
          <InstagramSection />
        </main>
      </Motion>
    </>
  );
}
