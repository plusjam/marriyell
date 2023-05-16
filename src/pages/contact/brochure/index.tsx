import Motion from "@/components/layouts/Motion";
import ContactFormBrochure from "@/components/orgs/ContactFormBrochure";
import Head from "next/head";
import { atom } from "recoil";

export type ContactBrochureData = {
  name: string;
  furigana: string;
  phone: string;
  email: string;
  zipcode: string;
  address: string;
  inquiry: string;
};

export const contactBrochureData = atom<ContactBrochureData>({
  key: "contactData",
  default: {
    name: "",
    furigana: "",
    phone: "",
    email: "",
    zipcode: "",
    address: "",
    inquiry: "",
  },
});

export default function Home() {
  return (
    <>
      <Motion>
        <Head>
          <title>lu CREA ル・クレア｜資料請求</title>
        </Head>

        <main>
          <ContactFormBrochure />
        </main>
      </Motion>
    </>
  );
}
