import Motion from "@/components/layouts/Motion";
import ContactFormBrochure from "@/components/orgs/ContactFormBrochure";
import { META } from "@/textDate/head";
import Head from "next/head";
import { useState } from "react";

export type ContactBrochureData = {
  type: "download" | "post";
  name: string;
  furigana: string;
  phone: string;
  email: string;
  zipcode: string;
  address: string;
  inquiry: string;
};

export default function Home() {
  const [contactBrochureData, setContactBrochureData] = useState<ContactBrochureData>({
    type: "download",
    name: "",
    furigana: "",
    phone: "",
    email: "",
    zipcode: "",
    address: "",
    inquiry: "",
  });

  const updateContactBrochureData = (data: ContactBrochureData) => {
    setContactBrochureData(data);
  };

  return (
    <>
      <Motion>
        <Head>
          <title>{META.contactBrochure.title}</title>
        </Head>

        <main>
          <ContactFormBrochure contactBrochureData={contactBrochureData} updateContactBrochureData={updateContactBrochureData} />
        </main>
      </Motion>
    </>
  );
}
