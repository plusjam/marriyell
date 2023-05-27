import { NewsCategoriesListsSelect } from "@/pages/news";
import Styles from "@/styles/mols/SearchNews.module.scss";
import React from "react";

type Props = {
  clickCategory: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  category: NewsCategoriesListsSelect["articles"];
};

const SearchNews = (props: Props) => {
  const { clickCategory, category } = props;

  return (
    <ul className={Styles.ul}>
      {category.map((elem, index) => {
        return (
          <li className={Styles.li} key={`categorylist${index}`}>
            <span className={elem.selected ? `${Styles.active} ${Styles.span}` : Styles.span} data-title={elem.title} onClick={(e) => clickCategory(e)}>
              {elem.title}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchNews;
