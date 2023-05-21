import Motion from "@/components/layouts/Motion";
import Access from "@/components/orgs/Access";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import { META } from "@/textDate/head";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Motion>
        <Head>
          <title>{META.access.title}</title>
        </Head>

        <main>
          <UnderlayerHead en="Access" ja="アクセス" image="/images/access_main.jpg" spImage="/images/access_main-sp.jpg" />

          <Access />
        </main>
      </Motion>
    </>
  );
}
