import React from "react";
import Styles from "../../styles/orgs/TopContents.module.scss";
import SectionHead from "../mols/SectionHead";
import LinkToInfo from "../atoms/LinkToInfo";

const TopContents = () => {
  return (
    <section className={Styles.section}>
      <SectionHead en=" Contetnts" ja="各種ご案内" href="content" />
      <div className={Styles.container}>
        <LinkToInfo type="warning" />
        <LinkToInfo type="heart" />
        <LinkToInfo type="member" />
        <LinkToInfo type="question" />
      </div>
    </section>
  );
};

export default TopContents;
