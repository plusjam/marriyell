import React from "react";
import Styles from "@/styles/atoms/StaticSubHead.module.scss";

type Props = {
  title: string;
  caption: string;
  textAlignment?: boolean;
};

const StaticSubHead = (ptops: Props) => {
  const { title, caption, textAlignment = false } = ptops;

  return (
    <div className={Styles.block}>
      <div className={Styles.title} dangerouslySetInnerHTML={{ __html: title }}></div>
      <div className={textAlignment ? `${Styles.caption} ${Styles.left}` : Styles.caption} dangerouslySetInnerHTML={{ __html: caption }}></div>
    </div>
  );
};

export default StaticSubHead;
