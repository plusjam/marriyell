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
      <div className={Styles.title}>{content.title}</div>

      <div className={Styles.inner}>
        <div className={Styles.image}>
          <picture>
            <source srcSet={content.mainPc.url} width={content.mainPc.attributes.width} height={content.mainPc.attributes.height} media="(min-width: 768px)" />
            <source srcSet={content.mainSp.url} width={content.mainSp.attributes.width} height={content.mainSp.attributes.height} />
            <img src={content.mainPc.url} alt="" width={content.mainPc.attributes.width} height={content.mainPc.attributes.height} />
          </picture>
        </div>

        <div className={Styles.categories}>
          <BridalCategories categories={content.categories} fairCategoriesLists={fairCategoriesLists} />
        </div>

        <div className={Styles.calendar}>
          <Calendar
            events={
              content.calendarMulti
                ? content.calendarMulti?.values.map((date) => {
                    return { date: date };
                  })
                : []
            }
            code={content.code}
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
