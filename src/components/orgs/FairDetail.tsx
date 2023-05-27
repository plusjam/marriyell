import { PlanLists } from "@/pages/api/plan";
import Image from "next/image";
import Styles from "../../styles/orgs/FairDetail.module.scss";
import Previlege from "../mols/Previlege";
import Calendar from "../atoms/Calendar";
import BridalCategories from "../mols/BridalCategories";
import { useMediaQuery } from "../../../libs/useMediaQuery";
import { FairCategoriesLists, FairList } from "../../../typings/fair";

type Props = {
  fairList: FairList;
  fairCategoriesLists: FairCategoriesLists["articles"];
};

const FairDetail = (props: Props) => {
  const { fairList, fairCategoriesLists } = props;

  const isPc = useMediaQuery(768, "max");

  const events = fairList.calendar.values.map((date) => {
    return { date: date.calendar };
  });

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.block}>
          <div
            className={Styles.title}
            dangerouslySetInnerHTML={{
              __html: fairList.title,
            }}
          ></div>

          <div className={Styles.contents}>
            <div className={Styles.image}>
              <Image src={fairList.mainPc.url} alt="" width={fairList.mainPc.attributes.width} height={fairList.mainPc.attributes.height} />
            </div>
            <div className={Styles.categories}>
              <BridalCategories categories={fairList.categories} fairCategoriesLists={fairCategoriesLists} />
            </div>
            {!isPc && <div className={Styles.description}>{fairList.description}</div>}
          </div>

          <div className={Styles.info}>
            <div className={Styles.calendar}>
              <Calendar events={events} />
            </div>

            {isPc && <div className={Styles.description}>{fairList.description}</div>}

            <div className={Styles.terms}>
              <div className={Styles.term}>
                <div className={Styles.termTag}>所要時間</div>
                <span>{fairList.requireTime}分</span>
              </div>
              <div className={Styles.term}>
                <div className={Styles.termTag}>開催時間</div>
                <div>
                  {fairList.openTime.values.map((elem, index) => {
                    return <span key={index}>{elem.timeRange} ｜ </span>;
                  })}
                </div>
              </div>
              <div className={Styles.term}>
                <div className={Styles.termTag}>適用期間</div>
                <span>{fairList.limited}</span>
              </div>
              <div className={Styles.term}>
                <div className={Styles.termTag}>備考</div>
                <span>{fairList.remarks}</span>
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
