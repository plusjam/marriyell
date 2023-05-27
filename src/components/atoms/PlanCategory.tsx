import React from "react";
import Styles from "../../styles/atoms/PlanCategory.module.scss";
import { PlanCategoriesLists } from "../../../typings/plan";

type Props = {
  category: PlanCategoriesLists["articles"][0];
  isPicked: boolean;
};

const PlanCategory = (props: Props) => {
  const { category, isPicked } = props;

  return (
    <>
      <div className={isPicked ? `${Styles.category} ${Styles.selected}` : `${Styles.category}`}>
        <div className={Styles.image}>{isPicked ? <img src={category.iconFocus?.url} alt="" /> : <img src={category.icon?.url} alt="" />}</div>
        <div className={Styles.categoryLabel}>{category.title}</div>
      </div>
    </>
  );
};

export default PlanCategory;
