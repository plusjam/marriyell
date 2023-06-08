import Motion from "@/components/layouts/Motion";
import ThanksForm from "@/components/mols/ThanksForm";
import ContactHeader from "@/components/orgs/ContactHeader";
import { META } from "@/textDate/head";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Motion>
        <Head>
          <title>{META.contact.title}</title>
        </Head>

        <main>
          <ContactHeader status={"success"} ja="お問い合わせ" en="Contact" />
          <ThanksForm description="この度はお問い合わせいただき誠にありがとうございました。" />
        </main>
      </Motion>
    </>
  );
}
