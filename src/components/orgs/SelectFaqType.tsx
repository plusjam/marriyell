import React from "react";
import Styles from "@/styles/orgs/SelectFaqType.module.scss";
import { Qa, QaType } from "../../../typings/qa";

type Props = {
  handleSelectFaqType: (slug: QaType) => void;
  qa: Qa;
};

const SelectFaqType = (props: Props) => {
  const { handleSelectFaqType, qa } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.body}>
          {qa.map((elem, index) => {
            return (
              <div className={elem.selected ? `${Styles.item} ${Styles.active}` : Styles.item} key={index} onClick={() => handleSelectFaqType(elem.slug)}>
                <div className={Styles.title} dangerouslySetInnerHTML={{ __html: elem.title }}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SelectFaqType;
