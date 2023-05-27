import Image from "next/image";
import Link from "next/link";
import Styles from "../../styles/mols/BridalFairContent.module.scss";
import Calendar from "../atoms/Calendar";
import BridalCategories from "./BridalCategories";
import { FairCategoriesLists, FairLists } from "../../../typings/fair";

type Props = {
  content: FairLists["articles"][0];
  fairCategoriesLists: FairCategoriesLists["articles"];
};

const BridalaFairContent = (props: Props) => {
  const { content, fairCategoriesLists } = props;

  return (
    <div className={Styles.content}>
      <div className={Styles.title}>フェアのタイトルが入ります。文章量の確認のため、適当な文章が入っております。</div>

      <div className={Styles.inner}>
        <div className={Styles.image}>
          <Image src={content.mainPc.url} alt="" width={content.mainPc.attributes.width} height={content.mainPc.attributes.height} />
        </div>

        <div className={Styles.categories}>
          <BridalCategories categories={content.categories} fairCategoriesLists={fairCategoriesLists} />
        </div>

        <div className={Styles.calendar}>
          <Calendar
            events={content.calendar.values.map((date) => {
              return { date: date.calendar };
            })}
          />
        </div>

        <div className={Styles.links}>
          <Link className={Styles.toDetail} href={`/fair/${content.code}`}>
            フェア詳細
          </Link>
          <Link className={Styles.toReservation} href={`/fair/${content.code}?id=reservation`}>
            このフェアを予約
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BridalaFairContent;
