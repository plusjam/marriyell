import Styles from "../../styles/mols/BridalCategories.module.scss";

type Props = {
  categories: {
    selected: boolean;
    src: string;
    label: string;
    slug: string;
  }[];
};
const BridalCategories = (props: Props) => {
  const { categories } = props;

  return (
    <>
      {categories.map((category, index) => {
        const slug = () => {
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
          <div className={category.selected ? `${Styles.category} ${Styles.selected} ${slug()}` : `${Styles.category} ${slug()}`} key={index}>
            <span>{category.label}</span>
          </div>
        );
      })}
    </>
  );
};

export default BridalCategories;
