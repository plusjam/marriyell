import React from "react";
import Styles from "@/styles/orgs/NewsBody.module.scss";
import SearchNews from "../mols/SearchNews";
import NewsLists from "../mols/NewsLists";
import { NewsLists as List } from "../../../typings/news";
import { NewsCategoriesListsSelect } from "@/pages/news";

type Props = {
  clickCategory: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  clickViewMore: () => void;
  category: NewsCategoriesListsSelect["articles"];
  originalLists: List;
};

const NewsBody = (props: Props) => {
  const { clickCategory, clickViewMore, category, originalLists } = props;

  return (
    <section className={Styles.section}>
      <SearchNews clickCategory={clickCategory} category={category} />
      <NewsLists originalLists={originalLists} category={category} clickViewMore={clickViewMore} />
    </section>
  );
};

export default NewsBody;
