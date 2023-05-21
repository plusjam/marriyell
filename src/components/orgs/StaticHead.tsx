import React from "react";
import Styles from "@/styles/orgs/StaticHead.module.scss";

type Props = {
  title: string;
  caption: string;
  textalign?: boolean;
};

const StaticHead = (props: Props) => {
  const { title, caption, textalign = false } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.title}>{title}</div>
        <div className={textalign ? `${Styles.caption} ${Styles.left}` : Styles.caption} dangerouslySetInnerHTML={{ __html: caption }}></div>
      </div>
    </section>
  );
};

export default StaticHead;
