import { useMediaQuery } from "../../../libs/useMediaQuery";
import { FairCategoriesLists, FairList } from "../../../typings/fair";
import Styles from "../../styles/orgs/FairDetail.module.scss";
import Calendar from "../atoms/Calendar";
import BridalCategories from "../mols/BridalCategories";
import Previlege from "../mols/Previlege";
import { ContactDataDetailFair } from "./DetailFairForm";

type Props = {
  fairList: FairList;
  fairCategoriesLists: FairCategoriesLists["articles"];
  handleData: (data: ContactDataDetailFair) => void;
  data: ContactDataDetailFair;
};

const FairDetail = (props: Props) => {
  const { fairList, fairCategoriesLists, handleData, data } = props;

  const isPc = useMediaQuery(768, "max");

  const events = fairList.calendarMulti
    ? fairList.calendarMulti?.values.map((date) => {
        return { date: date };
      })
    : [];

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
              <picture>
                <source srcSet={fairList.mainPc.url} width={fairList.mainPc.attributes.width} height={fairList.mainPc.attributes.height} media="(min-width: 768px)" />
                <source srcSet={fairList.mainSp.url} width={fairList.mainSp.attributes.width} height={fairList.mainSp.attributes.height} />
                <img src={fairList.mainPc.url} alt="" width={fairList.mainPc.attributes.width} height={fairList.mainPc.attributes.height} />
              </picture>
            </div>
            <div className={Styles.categories}>
              <BridalCategories categories={fairList.categories} fairCategoriesLists={fairCategoriesLists} />
            </div>
            {!isPc && <div className={Styles.description}>{fairList.description}</div>}
          </div>

          <div className={Styles.info}>
            <div className={Styles.calendar}>
              <Calendar events={events} code={fairList.code} isDetail handleData={handleData} data={data} />
            </div>

            {isPc && <div className={Styles.description}>{fairList.description}</div>}

            <div className={Styles.terms}>
              {fairList.requireTime && (
                <div className={Styles.term}>
                  <div className={Styles.termTag}>所要時間</div>
                  <span>{fairList.requireTime}分</span>
                </div>
              )}
              {fairList.openTimePulldown && (
                <div className={Styles.term}>
                  <div className={Styles.termTag}>開催時間</div>
                  <div>
                    {fairList.openTimePulldown.map((elem, index) => {
                      return (
                        <span className={Styles.openTime} key={index}>
                          {`${elem.values.startHour.select[0]}:${elem.values.startMinutes.select[0]}~${elem.values.endHour.select[0]}:${elem.values.endMinutes.select[0]}`}{" "}
                          {fairList.openTimePulldown!.length !== index + 1 && `｜ `}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              {fairList.limited && (
                <div className={Styles.term}>
                  <div className={Styles.termTag}>適用期間</div>
                  <span>{fairList.limited}</span>
                </div>
              )}
              {fairList.remarks && (
                <div className={Styles.term}>
                  <div className={Styles.termTag}>備考</div>
                  <span>{fairList.remarks}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {fairList.visitPrevileges || fairList.signingPrevileges ? <Previlege title="ブライダルフェア参加特典" visit={fairList.visitPrevileges} signing={fairList.signingPrevileges} /> : ""}
      </div>
    </section>
  );
};

export default FairDetail;
