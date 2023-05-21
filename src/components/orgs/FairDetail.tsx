import { PlanLists } from "@/pages/api/plan";
import Image from "next/image";
import Styles from "../../styles/orgs/FairDetail.module.scss";
import PlanCategory from "../atoms/PlanCategory";
import PlanMeta from "../atoms/PlanMeta";
import Previlege from "../mols/Previlege";
import { FairList } from "@/pages/api/fair";
import Calendar from "../atoms/Calendar";
import BridalCategories from "../mols/BridalCategories";

const categories = [
  {
    selected: false,
    src: "/images/icon_fair_new.svg",
    label: "初めての見学",
    slug: "new",
  },
  {
    selected: false,
    src: "/images/icon_fair_food.svg",
    label: "試食会つき",
    slug: "food",
  },
  {
    selected: false,
    src: "/images/icon_fair_season.svg",
    label: "季節・期間限定",
    slug: "season",
  },
  {
    selected: false,
    src: "/images/icon_fair_ceremony.svg",
    label: "挙式体験",
    slug: "ceremony",
  },
  {
    selected: false,
    src: "/images/icon_fair_dress.svg",
    label: "ドレス試着",
    slug: "dress",
  },
  {
    selected: false,
    src: "/images/icon_fair_weekends.svg",
    label: "土日祝開催",
    slug: "weekends",
  },
  {
    selected: true,
    src: "/images/icon_fair_weekdays.svg",
    label: "平日限定開催",
    slug: "weekdays",
  },
  {
    selected: false,
    src: "/images/icon_fair_online.svg",
    label: "オンライン相談会",
    slug: "online",
  },
];

const FairDetail = () => {
  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.block}>
          <div
            className={Styles.title}
            dangerouslySetInnerHTML={{
              __html: "content.title",
            }}
          ></div>

          <div className={Styles.contents}>
            <div className={Styles.image}>
              <Image src={"/images/"} alt="" width={560} height={320} />
            </div>
            <div className={Styles.categories}>
              <BridalCategories categories={categories} />
            </div>
            <div className={Styles.description}>
              ＼国産牛&キャビアなど絶品6品コース仕立て！3万円相当大人気試食フェア◎／1軒目来館で1万円相当ギフト贈呈&30名以上の披露宴ご成約で挙式料全額プレゼント！会場費最大25万円&前撮り衣裳プレゼントなど、フェア限定最大100万円優待♪
            </div>
          </div>

          <div className={Styles.info}>
            <div className={Styles.calendar}>
              <Calendar events={[{ date: "2023-05-21" }]} />
            </div>

            <div className={Styles.terms}>
              <div className={Styles.term}>
                <div className={Styles.termTag}>所要時間</div>
                <span>約120分</span>
              </div>
              <div className={Styles.term}>
                <div className={Styles.termTag}>開催時間</div>
                <span>10:00〜12:00 ｜ 10:00〜12:00 ｜ 10:00〜12:00 ｜10:00〜12:00 ｜ 10:00〜12:00 ｜ 10:00〜12:00 ｜</span>
              </div>
              <div className={Styles.term}>
                <div className={Styles.termTag}>適用期間</div>
                <span>オンラインからご依頼いただいた方</span>
              </div>
              <div className={Styles.term}>
                <div className={Styles.termTag}>備考</div>
                <span>挙式披露宴をお考えのカップル様/オンライン参加後おふたりでご来館いただいた方</span>
              </div>
            </div>
          </div>
        </div>

        <Previlege title="ブライダルフェア参加特典" />
      </div>
    </section>
  );
};

export default FairDetail;
