import React from "react";
import Styles from "../../styles/orgs/FairContents.module.scss";
import Image from "next/image";
import { FairList } from "../../../typings/fair";

type Props = {
  fairList: FairList;
};

const FairContents = (props: Props) => {
  const { fairList } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.head}>フェア内容</div>
        <div className={Styles.body}>
          {fairList.contents.articles.map((content, index) => {
            return (
              <div className={Styles.block} key={index}>
                <div className={Styles.image}>
                  <Image src={content.image?.url ? content.image.url : "/images/sample124.jpg"} alt="" width={130} height={130} />
                </div>
                <div className={Styles.title}>{content.title}</div>
                <div className={Styles.description}>{content.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FairContents;
