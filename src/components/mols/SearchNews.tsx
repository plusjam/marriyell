import React from "react";
import { NewsCategory } from "../../../typings/news";
import Styles from "@/styles/mols/SearchNews.module.scss";

type Props = {
  category: NewsCategory[];
  clickCategory: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};

const SearchNews = (props: Props) => {
  const { category, clickCategory } = props;

  return (
    <ul className={Styles.ul}>
      {category.map((elem, index) => {
        return (
          <li className={Styles.li} key={`categorylist${index}`}>
            <span className={elem.checked ? `${Styles.active} ${Styles.span}` : Styles.span} data-slug={elem.slug} onClick={(e) => clickCategory(e)}>
              {elem.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchNews;
