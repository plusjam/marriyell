import React from "react";
import Styles from "../../styles/mols/WeddingPlanContent.module.scss";
import Images from "../../styles/atoms/Images.module.scss";
import Image from "next/image";
import Link from "next/link";
import PlanCategory from "../atoms/PlanCategory";
import { useMediaQuery } from "../../../libs/useMediaQuery";
import PlanMeta from "../atoms/PlanMeta";
import { PlanCategoriesLists, PlanLists } from "../../../typings/plan";

type Props = {
  content: PlanLists["articles"][0];
  planCategoriesLists: PlanCategoriesLists["articles"];
};

const WeddingPlanContent = (props: Props) => {
  const { content, planCategoriesLists } = props;

  const isPc = useMediaQuery(768, "min");

  return (
    <div className={Styles.block}>
      {!isPc && (
        <div
          className={Styles.title}
          dangerouslySetInnerHTML={{
            __html: content.title,
          }}
        ></div>
      )}
      <div className={Styles.image}>
        <Image src={content.mainPc.url} width={content.mainPc.attributes.width} height={content.mainPc.attributes.height} alt="" className={Images.pc} />
        <Image src={content.mainSp.url} width={content.mainSp.attributes.width} height={content.mainSp.attributes.height} alt="" className={Images.sp} />
      </div>
      <div className={Styles.contents}>
        {isPc && (
          <div
            className={Styles.title}
            dangerouslySetInnerHTML={{
              __html: content.title,
            }}
          ></div>
        )}

        <PlanMeta price={content.price} member={content.member} />

        <div className={Styles.categories}>
          {planCategoriesLists.map((category, index) => {
            const isPicked = content.categories.articles.some((article) => article.title === category.title);
            return <PlanCategory category={category} isPicked={isPicked} key={`plancategory${index}`} />;
          })}
        </div>

        <div className={Styles.terms}>
          {content.term && (
            <div className={Styles.term}>
              <div className={Styles.termTag}>適用条件</div>
              <span>{content.term}</span>
            </div>
          )}
        </div>

        <div className={Styles.links}>
          <Link className={Styles.toPlan} href={`/plan/${content.code}`}>
            プラン詳細を見る
          </Link>
          <Link className={Styles.toContact} href={`/plan/${content.code}?id=reservation`}>
            プランの相談をする
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeddingPlanContent;
