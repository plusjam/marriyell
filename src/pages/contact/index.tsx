import Motion from "@/components/layouts/Motion";
import ContactForm from "@/components/orgs/ContactForm";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Motion>
        <Head>
          <title>lu CREA ル・クレア｜お問い合わせ</title>
        </Head>

        <main>
          <ContactForm />
        </main>
      </Motion>
    </>
  );
}
