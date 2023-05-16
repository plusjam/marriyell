import { MouseEvent } from "react";
import Styles from "../../styles/mols/BridalCategoriesSelect.module.scss";

type Props = {
  categories: {
    selected: boolean;
    label: string;
    slug: string;
  }[];
  handleSelect: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
};
const BridalCategoriesSelected = (props: Props) => {
  const { categories, handleSelect } = props;

  return (
    <div className={Styles.categories}>
      {categories.map((category, index) => {
        const slug = () => {
          if (category.slug === "all") return Styles.all;
          if (category.slug === "new") return Styles.new;
          if (category.slug === "food") return Styles.food;
          if (category.slug === "season") return Styles.season;
          if (category.slug === "ceremony") return Styles.ceremony;
          if (category.slug === "dress") return Styles.dress;
          if (category.slug === "weekends") return Styles.weekends;
          if (category.slug === "weekdays") return Styles.weekdays;
          if (category.slug === "online") return Styles.online;
        };
        return (
          <div
            className={category.selected ? `${Styles.category} ${Styles.selected} ${slug()}` : `${Styles.category} ${slug()}`}
            key={index}
            onClick={(e) => handleSelect(e)}
            data-slug={category.slug}
          >
            <span>{category.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BridalCategoriesSelected;
