import { FairCategoriesLists, FairLists } from "../../../typings/fair";
import Styles from "../../styles/orgs/BridalFair.module.scss";
import BridalaFairContent from "../mols/BridalaFairContent";
import SectionHead from "../mols/SectionHead";

type Props = {
  lists: FairLists["articles"];
  fairCategoriesLists: FairCategoriesLists["articles"];
};

const BridalFair = (props: Props) => {
  const { lists, fairCategoriesLists } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <SectionHead en="Bridal Fair" ja="ブライダルフェアのご紹介" href="bridal-fair" />
        <div className={Styles.search}>
          検索結果（
          <span className={Styles.number}>{lists.length}</span>
          件）
        </div>
        <div className={Styles.body}>
          {lists.length ? (
            lists.map((content, index) => {
              return <BridalaFairContent content={content} key={`bridalfaircontent${index}`} fairCategoriesLists={fairCategoriesLists} />;
            })
          ) : (
            <div className={Styles.nothing}>お探しのコンテンツが見つかりませんでした。</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BridalFair;
