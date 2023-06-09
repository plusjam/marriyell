import Motion from "@/components/layouts/Motion";
import ContactForm from "@/components/orgs/ContactForm";
import { META } from "@/textDate/head";
import Head from "next/head";
import { atom } from "recoil";

export type ContactData = {
  name: string;
  furigana: string;
  phone: string;
  email: string;
  inquiry: string;
};

export const contactData = atom<ContactData>({
  key: "contactData",
  default: {
    name: "",
    furigana: "",
    phone: "",
    email: "",
    inquiry: "",
  },
});

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
