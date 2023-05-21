import Motion from "@/components/layouts/Motion";
import ContactForm from "@/components/orgs/ContactForm";
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
          <ContactForm />
        </main>
      </Motion>
    </>
  );
}
