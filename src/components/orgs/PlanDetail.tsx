import { PlanLists } from "@/pages/api/plan";
import Image from "next/image";
import Styles from "../../styles/orgs/PlanDetail.module.scss";
import PlanCategory from "../atoms/PlanCategory";
import PlanMeta from "../atoms/PlanMeta";
import Previlege from "../mols/Previlege";
import { PlanCategoriesLists, PlanList } from "../../../typings/plan";

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
            <picture>
              <source srcSet={content.mainPc.url} width={content.mainPc.attributes.width} height={content.mainPc.attributes.height} media="(min-width: 768px)" />
              <source srcSet={content.mainSp.url} width={content.mainSp.attributes.width} height={content.mainSp.attributes.height} />
              <img src={content.mainPc.url} alt="" width={content.mainPc.attributes.width} height={content.mainPc.attributes.height} />
            </picture>
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
              <div className={Styles.term}>
                <div className={Styles.termTag}>適用条件</div>
                <span>{content.term}</span>
              </div>
              <div className={Styles.term}>
                <div className={Styles.termTag}>適用期間</div>
                <span>{content.limited}</span>
              </div>
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
