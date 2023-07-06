import { MouseEvent } from "react";
import Styles from "../../styles/mols/BridalCategoriesSelect.module.scss";
import { FairCategoryArticleWithSelected } from "../orgs/SelectFair";
import Image from "next/image";

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
            <div className={Styles.image}>
              {category.selected ? <Image src={category.iconFocus.url} alt="" width={12} height={12} /> : <Image src={category.icon.url} alt="" width={12} height={12} />}
            </div>
            <span>{category.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BridalCategoriesSelected;
