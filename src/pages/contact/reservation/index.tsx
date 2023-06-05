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

// 今日の日付を取得
const today = new Date();
const year = today.getFullYear();
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const day = ("0" + today.getDate()).slice(-2);
const todayDate = year + "-" + month + "-" + day;

export const contactReservationData = atom<ContactReservationData>({
  key: "contactReservationData",
  default: {
    name: "",
    furigana: "",
    phone: "",
    email: "",
    date: todayDate,
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
