import { MouseEvent } from "react";
import Styles from "../../styles/mols/BridalCategoriesSelect.module.scss";
import { FairCategoryArticleWithSelected } from "../orgs/SelectFair";

type Props = {
  categories: FairCategoryArticleWithSelected[];
  handleSelect: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
};
const BridalCategoriesSelected = (props: Props) => {
  const { categories, handleSelect } = props;

  return (
    <div className={Styles.categories}>
      {categories.map((category, index) => {
        return (
          <div className={category.selected ? `${Styles.category} ${Styles.selected}` : `${Styles.category}`} key={index} onClick={(e) => handleSelect(e)} data-name={category.name}>
            <div className={Styles.image}>{category.selected ? <img src={category.iconFocus.url} alt="" /> : <img src={category.icon.url} alt="" />}</div>
            <span>{category.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BridalCategoriesSelected;
