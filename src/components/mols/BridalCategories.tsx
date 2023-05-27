import { FairCategoriesLists, FairLists } from "../../../typings/fair";
import Styles from "../../styles/mols/BridalCategories.module.scss";

type Props = {
  categories: FairLists["articles"][0]["categories"];
  fairCategoriesLists: FairCategoriesLists["articles"];
};
const BridalCategories = (props: Props) => {
  const { categories, fairCategoriesLists } = props;

  return (
    <>
      {fairCategoriesLists.map((category, index) => {
        const isCategory = categories.articles.some((article) => {
          return article.name === category.name;
        });

        return (
          <div className={isCategory ? `${Styles.category} ${Styles.selected}` : Styles.category} key={index}>
            <div className={Styles.image}>{isCategory ? <img src={category.iconFocus.url} alt="" /> : <img src={category.icon.url} alt="" />}</div>
            <span>{category.name}</span>
          </div>
        );
      })}
    </>
  );
};

export default BridalCategories;
