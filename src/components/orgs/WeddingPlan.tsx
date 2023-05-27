import { PlanCategoriesLists, PlanLists } from "../../../typings/plan";
import Styles from "../../styles/orgs/WeddingPlan.module.scss";
import WeddingPlanContent from "../mols/WeddingPlanContent";

type Props = {
  planLists: PlanLists["articles"];
  planCategoriesLists: PlanCategoriesLists["articles"];
};

const WeddingPlan = (props: Props) => {
  const { planLists, planCategoriesLists } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.body}>
          {planLists.map((content, index) => {
            return <WeddingPlanContent content={content} key={`weddingplancontent${index}`} planCategoriesLists={planCategoriesLists} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default WeddingPlan;
