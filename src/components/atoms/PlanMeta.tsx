import React from "react";
import Styles from "../../styles/atoms/PlanMeta.module.scss";

type Props = {
  content: {
    price: number;
    member: number;
  };
};

const PlanMeta = (props: Props) => {
  const { content } = props;

  // content.priceを3桁区切りにする
  const price = () => {
    const price = content.price;
    const priceString = price.toString();
    const priceArray = priceString.split("");
    const priceArrayReverse = priceArray.reverse();
    const priceArrayReverseWithComma = priceArrayReverse.map((num, index) => {
      if (index % 3 === 0 && index !== 0) {
        return num + ",";
      } else {
        return num;
      }
    });
    const priceArrayWithComma = priceArrayReverseWithComma.reverse();
    const priceWithComma = priceArrayWithComma.join("");
    return priceWithComma;
  };

  return (
    <div className={Styles.info}>
      <div className={Styles.meta}>
        <div className={Styles.metaLabel}>
          プラン価格<span>（税・サービス料込）</span>
        </div>
        <div className={Styles.number}>人数：{content.member}名</div>
      </div>
      <div className={Styles.price}>
        {price()}
        <span>円〜</span>
      </div>
    </div>
  );
};

export default PlanMeta;
