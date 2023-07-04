import React from "react";
import Styles from "@/styles/mols/PriceTable.module.scss";

type Props = {
  title: string;
  prices: {
    title: string;
    price: number;
    just: boolean;
  }[];
  isIrregular?: boolean;
};

const PriceTable = (props: Props) => {
  const { title, prices, isIrregular = false } = props;

  return (
    <div className={Styles.block}>
      <div className={Styles.title} dangerouslySetInnerHTML={{ __html: title }}></div>
      <div className={isIrregular ? `${Styles.table} ${Styles.irregular}` : Styles.table}>
        {prices.map((content, index) => {
          //content.priceを３桁区切りにする
          const formatedPrice = Number(content.price).toLocaleString();

          return (
            <div className={Styles.row} key={`pricetable${content.price}${index}`}>
              <div className={Styles.elem} dangerouslySetInnerHTML={{ __html: content.title }}></div>
              <div className={Styles.priceSet}>
                <div className={Styles.price}>{formatedPrice}</div>
                <div className={content.just ? `${Styles.unit} ${Styles.just}` : Styles.unit}>
                  円<span className={Styles.range}>~</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceTable;
