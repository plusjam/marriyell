import React from "react";
import Styles from "../../styles/orgs/WeddingPlan.module.scss";
import Image from "next/image";
import Link from "next/link";
import WeddingPlanContent from "../mols/WeddingPlanContent";
import { PlanLists } from "@/pages/api/plan";

type Props = {
  planLists: PlanLists;
};

const WeddingPlan = (props: Props) => {
  const { planLists } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.body}>
          {planLists.map((content, index) => {
            return <WeddingPlanContent content={content} key={`weddingplancontent${index}`} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default WeddingPlan;
