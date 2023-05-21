import React from "react";
import Styles from "@/styles/mols/QaSet.module.scss";
import QaAccordion from "../atoms/QaAccordion";
import { QASet } from "../../../typings/qa";

type Props = {
  qaSet: QASet;
};

const QaSet = (props: Props) => {
  const { qaSet } = props;

  return (
    <div>
      <div className={Styles.head}>
        <div className={Styles.subTitle}>{qaSet.title.replaceAll("<br>", "")}</div>
      </div>
      <div className={Styles.body}>
        {qaSet.qa.map((elem, index) => {
          return <QaAccordion key={index} question={elem.q} answer={elem.a} />;
        })}
      </div>
    </div>
  );
};

export default QaSet;
