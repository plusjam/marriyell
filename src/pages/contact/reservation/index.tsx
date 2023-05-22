import Motion from "@/components/layouts/Motion";
import ContactFormReservation from "@/components/orgs/ContactFormReservation";
import { META } from "@/textDate/head";
import Head from "next/head";
import { useState } from "react";

export type ContactReservationData = {
  name: string;
  furigana: string;
  phone: string;
  email: string;
  date: string;
  hh: string;
  mm: string;
  inquiry: string;
};

export default function Home() {
  const [contactReservationData, setContactReservationData] = useState<ContactReservationData>({
    name: "",
    furigana: "",
    phone: "",
    email: "",
    date: "",
    hh: "",
    mm: "",
    inquiry: "",
  });

  const updateContactReservationData = (data: ContactReservationData) => {
    setContactReservationData(data);
  };

  return (
    <>
      <Motion>
        <Head>
          <title>{META.contactReservation.title}</title>
        </Head>

        <main>
          <ContactFormReservation contactReservationData={contactReservationData} updateContactReservationData={updateContactReservationData} />
        </main>
      </Motion>
    </>
  );
}
