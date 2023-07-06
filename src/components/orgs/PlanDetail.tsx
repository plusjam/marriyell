import Image from "next/image";
import { PlanCategoriesLists, PlanList } from "../../../typings/plan";
import Images from "../../styles/atoms/Images.module.scss";
import Styles from "../../styles/orgs/PlanDetail.module.scss";
import PlanCategory from "../atoms/PlanCategory";
import PlanMeta from "../atoms/PlanMeta";
import Previlege from "../mols/Previlege";

type Props = {
  content: PlanList;
  planCategoriesLists: PlanCategoriesLists["articles"];
};

const PlanDetail = (props: Props) => {
  const { content, planCategoriesLists } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.block}>
          <div
            className={Styles.title}
            dangerouslySetInnerHTML={{
              __html: content.title,
            }}
          ></div>
          <div className={Styles.image}>
            <Image src={content.mainPc.url} width={content.mainPc.attributes.width} height={content.mainPc.attributes.height} alt="" className={Images.pc} />
            <Image src={content.mainSp.url} width={content.mainSp.attributes.width} height={content.mainSp.attributes.height} alt="" className={Images.sp} />
          </div>
          <div className={Styles.contents}>
            <PlanMeta price={content.price} member={content.member} />

            <div className={Styles.categories}>
              {planCategoriesLists.map((category, index) => {
                const isPicked = content.categories.articles.some((article) => article.title === category.title);
                return <PlanCategory category={category} key={`plancategory${index}`} isPicked={isPicked} />;
              })}
            </div>

            <div className={Styles.terms}>
              {content.term && (
                <div className={Styles.term}>
                  <div className={Styles.termTag}>適用条件</div>
                  <span>{content.term}</span>
                </div>
              )}
              {content.limited && (
                <div className={Styles.term}>
                  <div className={Styles.termTag}>適用期間</div>
                  <span>{content.limited}</span>
                </div>
              )}
            </div>

            <div className={Styles.description}>{content.description}</div>
          </div>
        </div>

        {content.visitPrevileges || content.signingPrevileges ? <Previlege title="プラン相談特典" visit={content.visitPrevileges} signing={content.signingPrevileges} /> : ""}
      </div>
    </section>
  );
};

export default PlanDetail;
