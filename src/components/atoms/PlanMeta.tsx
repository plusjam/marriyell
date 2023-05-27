import React from "react";
import Styles from "../../styles/atoms/PlanMeta.module.scss";

type Props = {
  price: number;
  member: string;
};

const PlanMeta = (props: Props) => {
  const { price, member } = props;

  return (
    <div className={Styles.info}>
      <div className={Styles.meta}>
        <div className={Styles.metaLabel}>
          プラン価格<span>（税・サービス料込）</span>
        </div>
        <div className={Styles.number}>人数：{member}名</div>
      </div>
      <div className={Styles.price}>
        {price.toLocaleString()}
        <span>円〜</span>
      </div>
    </div>
  );
};

export default PlanMeta;
