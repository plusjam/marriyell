import React from "react";
import Styles from "../../styles/mols/SectionHead.module.scss";

type Props = {
  en: string;
  ja: string;
  href?: string;
  isShort?: boolean;
};

const SectionHead = (props: Props) => {
  const { en, ja, href, isShort = false } = props;

  return (
    <div className={isShort ? `${Styles.scitonHead} ${Styles.isShort}` : Styles.scitonHead} id={href}>
      <div className={Styles.en}>{en}</div>
      <hr className={Styles.hr} />
      <h2 className={Styles.ja}>{ja}</h2>
    </div>
  );
};

export default SectionHead;
