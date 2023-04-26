import React from "react";
import Styles from "../../styles/mols/SectionHead.module.scss";

type Props = {
  en: string;
  ja: string;
  href?: string;
};

const SectionHead = (props: Props) => {
  const { en, ja, href } = props;

  return (
    <div className={Styles.scitonHead} id={href}>
      <div className={Styles.en}>{en}</div>
      <hr className={Styles.hr} />
      <h2 className={Styles.ja}>{ja}</h2>
    </div>
  );
};

export default SectionHead;
