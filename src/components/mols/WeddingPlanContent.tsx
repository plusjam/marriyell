import React from "react";
import Styles from "../../styles/mols/WeddingPlanContent.module.scss";
import Image from "next/image";
import Link from "next/link";
import PlanCategory from "../atoms/PlanCategory";
import { PlanLists } from "@/pages/api/plan";
import { useMediaQuery } from "../../../libs/useMediaQuery";
import PlanMeta from "../atoms/PlanMeta";

type Props = {
  content: PlanLists[0];
};

const WeddingPlanContent = (props: Props) => {
  const { content } = props;

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
        <Image src={content.src} alt="" width={320} height={320} />
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

        <PlanMeta content={content} />

        <div className={Styles.categories}>
          {content.categories.map((category, index) => {
            return <PlanCategory category={category} key={`plancategory${index}`} />;
          })}
        </div>

        <div className={Styles.terms}>
          <div className={Styles.term}>
            <div className={Styles.termTag}>適用条件</div>
            <span>10名よりご利用いただけます　※1名様増減　16,940円</span>
          </div>
        </div>

        <div className={Styles.links}>
          <Link className={Styles.toPlan} href={`/plan/${content.id}`}>
            プラン詳細を見る
          </Link>
          <Link className={Styles.toContact} href={`/plan/${content.id}?id=reservation`}>
            プランの相談をする
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeddingPlanContent;
