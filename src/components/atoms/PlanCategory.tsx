import React from "react";
import Styles from "../../styles/atoms/PlanCategory.module.scss";
import { PlanLists } from "@/pages/api/plan";

type Props = {
  category: PlanLists[0]["categories"][0];
};

const PlanCategory = (props: Props) => {
  const { category } = props;

  const slug = () => {
    if (category.slug === "many") return Styles.many;
    if (category.slug === "less") return Styles.less;
    if (category.slug === "photo") return Styles.photo;
    if (category.slug === "limited") return Styles.limited;
  };
  return (
    <>
      <div className={category.selected ? `${Styles.category} ${slug()} ${Styles.selected}` : `${Styles.category} ${slug()}`}>
        <div className={Styles.categoryLabel}>{category.label}</div>
      </div>
    </>
  );
};

export default PlanCategory;
