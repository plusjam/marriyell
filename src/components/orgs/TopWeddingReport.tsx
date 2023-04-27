import React from "react";
import Styles from "../../styles/orgs/TopWeddingReport.module.scss";
import SectionHead from "../mols/SectionHead";
import LinkToLists from "../atoms/LinkToLists";

const TopWeddingReport = () => {
  return (
    <section className={Styles.section}>
      <SectionHead en="Wedding Report" ja="ウェディングレポート" href="wedding-report" />
      <div className={Styles.container}>
        <div className={Styles.link}>
          <LinkToLists href="/wedding-report" text="レポート一覧を見る" />
        </div>
      </div>
    </section>
  );
};

export default TopWeddingReport;
