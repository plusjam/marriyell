import React from "react";
import Styles from "@/styles/orgs/NewsBody.module.scss";
import SearchNews from "../mols/SearchNews";
import NewsLists from "../mols/NewsLists";
import { NewsCategory, NewsContents } from "../../../typings/news";

type Props = {
  category: NewsCategory[];
  contents: NewsContents[];
  clickCategory: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  clickViewMore: () => void;
  next: number | null;
};

const NewsBody = (props: Props) => {
  const { category, contents, clickCategory, clickViewMore, next } = props;

  return (
    <section className={Styles.section}>
      <SearchNews category={category} clickCategory={clickCategory} />
      <NewsLists category={category} lists={contents} next={next} clickViewMore={clickViewMore} />
    </section>
  );
};

export default NewsBody;
