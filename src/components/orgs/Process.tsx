import React from "react";
import Styles from "../../styles/orgs/Process.module.scss";
import ProcessSlides from "../mols/ProcessSlides";

const Process = () => {
  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.head}>ご相談から当日までの流れ</div>
        <div className={Styles.body}>
          <ProcessSlides />
        </div>
      </div>
    </section>
  );
};

export default Process;
