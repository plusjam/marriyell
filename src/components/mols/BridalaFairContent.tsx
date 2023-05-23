import Image from "next/image";
import Link from "next/link";
import Styles from "../../styles/mols/BridalFairContent.module.scss";
import Calendar from "../atoms/Calendar";
import BridalCategories from "./BridalCategories";

type Props = {
  content: {
    id: number;
    title: string;
    src: string;
    categories: {
      selected: boolean;
      src: string;
      label: string;
      slug: string;
    }[];
    events: {
      date: string;
    }[];
  };
};

const BridalaFairContent = (props: Props) => {
  const { content } = props;

  return (
    <div className={Styles.content}>
      <div className={Styles.title}>フェアのタイトルが入ります。文章量の確認のため、適当な文章が入っております。</div>

      <div className={Styles.inner}>
        <div className={Styles.image}>
          <Image src={content.src} alt="" width={560} height={380} />
        </div>

        <div className={Styles.categories}>
          <BridalCategories categories={content.categories} />
        </div>

        <div className={Styles.calendar}>
          <Calendar events={content.events} />
        </div>

        <div className={Styles.links}>
          <Link className={Styles.toDetail} href={`/fair/${content.id}`}>
            フェア詳細
          </Link>
          <Link className={Styles.toReservation} href={`/fair/${content.id}#reservation`}>
            このフェアを予約
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BridalaFairContent;
