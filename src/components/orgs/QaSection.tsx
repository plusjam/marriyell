import React from "react";
import Styles from "@/styles/orgs/QaSection.module.scss";
import QaSet from "../mols/QaSet";
import { QASet } from "../../../typings/qa";

type Props = {
  qaSet: QASet;
};

const QaSection = (props: Props) => {
  const { qaSet } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <h2 id="qa" className={Styles.title}>
          よくあるご質問
        </h2>
        <QaSet qaSet={qaSet} />
      </div>
    </section>
  );
};

export default QaSection;
