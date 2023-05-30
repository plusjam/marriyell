import React from "react";
import Styles from "@/styles/orgs/NewsBody.module.scss";
import SearchNews from "../mols/SearchNews";
import NewsLists from "../mols/NewsLists";
import { NewsLists as List } from "../../../typings/news";
import { NewsCategoriesListsSelect } from "@/pages/news";
import { Status } from "../../../libs/useApi";
import LoadingForm from "../mols/LoadingForm";

type Props = {
  clickCategory: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  clickViewMore: () => void;
  category: NewsCategoriesListsSelect["articles"];
  originalLists: List;
  status: Status;
  buttonStatus: Status;
};

const NewsBody = (props: Props) => {
  const { clickCategory, clickViewMore, category, originalLists, status, buttonStatus } = props;

  return (
    <section className={Styles.section}>
      <SearchNews clickCategory={clickCategory} category={category} />
      {status === "idle" && <NewsLists originalLists={originalLists} category={category} clickViewMore={clickViewMore} status={buttonStatus} />}
      {status === "loading" && <LoadingForm />}
      {status === "error" && <p>error...</p>}
      {status === "success" && <NewsLists originalLists={originalLists} category={category} clickViewMore={clickViewMore} status={buttonStatus} />}
    </section>
  );
};

export default NewsBody;
