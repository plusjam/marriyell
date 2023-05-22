import Motion from "@/components/layouts/Motion";
import ContactForm from "@/components/orgs/ContactForm";
import { META } from "@/textDate/head";
import Head from "next/head";
import { useState } from "react";

export type ContactData = {
  name: string;
  furigana: string;
  phone: string;
  email: string;
  inquiry: string;
};

export default function Home() {
  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    furigana: "",
    phone: "",
    email: "",
    inquiry: "",
  });

  const updateContactData = (data: ContactData) => {
    setContactData(data);
  };

  return (
    <>
      <Motion>
        <Head>
          <title>{META.contact.title}</title>
        </Head>

        <main>
          <ContactForm contactData={contactData} updateContactData={updateContactData} />
        </main>
      </Motion>
    </>
  );
}
