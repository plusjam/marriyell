import { PlanLists } from "@/pages/api/plan";
import Image from "next/image";
import Styles from "../../styles/orgs/PlanDetail.module.scss";
import PlanCategory from "../atoms/PlanCategory";
import PlanMeta from "../atoms/PlanMeta";
import Previlege from "../mols/Previlege";

type Props = {
  content: PlanLists[0];
};

const PlanDetail = (props: Props) => {
  const { content } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.block}>
          <div
            className={Styles.title}
            dangerouslySetInnerHTML={{
              __html: content.title,
            }}
          ></div>
          <div className={Styles.image}>
            <Image src={content.src} alt="" width={320} height={320} />
          </div>
          <div className={Styles.contents}>
            <PlanMeta content={content} />

            <div className={Styles.categories}>
              {content.categories.map((category, index) => {
                return <PlanCategory category={category} key={`plancategory${index}`} />;
              })}
            </div>

            <div className={Styles.terms}>
              <div className={Styles.term}>
                <div className={Styles.termTag}>適用条件</div>
                <span>10名よりご利用いただけます　※1名様増減　16,940円</span>
              </div>
              <div className={Styles.term}>
                <div className={Styles.termTag}>適用期間</div>
                <span>24年12月末迄の結婚式実施</span>
              </div>
            </div>

            <div className={Styles.description}>
              ＼国産牛&キャビアなど絶品6品コース仕立て！3万円相当大人気試食フェア◎／1軒目来館で1万円相当ギフト贈呈&30名以上の披露宴ご成約で挙式料全額プレゼント！会場費最大25万円&前撮り衣裳プレゼントなど、フェア限定最大100万円優待♪
            </div>
          </div>
        </div>

        <Previlege title="プラン相談特典" />
      </div>
    </section>
  );
};

export default PlanDetail;
