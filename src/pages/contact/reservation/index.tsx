import Motion from "@/components/layouts/Motion";
import ContactFormReservation from "@/components/orgs/ContactFormReservation";
import { META } from "@/textDate/head";
import Head from "next/head";
import { atom } from "recoil";

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

export const contactReservationData = atom<ContactReservationData>({
  key: "contactData",
  default: {
    name: "",
    furigana: "",
    phone: "",
    email: "",
    date: "",
    hh: "",
    mm: "",
    inquiry: "",
  },
});

export default function Home() {
  return (
    <>
      <Motion>
        <Head>
          <title>{META.contactReservation.title}</title>
        </Head>

        <main>
          <ContactFormReservation />
        </main>
      </Motion>
    </>
  );
}
