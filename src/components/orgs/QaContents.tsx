import React from "react";
import Styles from "@/styles/orgs/QaContents.module.scss";
import QaSet from "../mols/QaSet";
import { QASet } from "../../../typings/qa";

type Props = {
  qaSet: QASet;
};

const QaContents = (props: Props) => {
  const { qaSet } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.body}>
          <QaSet qaSet={qaSet} />
        </div>
      </div>
    </section>
  );
};

export default QaContents;
