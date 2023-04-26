import React from "react";
import Styles from "../../styles/orgs/TopNewsEvent.module.scss";
import SectionHead from "../mols/SectionHead";
import LinkToLists from "../atoms/LinkToLists";

const TopNewsEvent = () => {
  return (
    <section className={Styles.section}>
      <SectionHead en="News & Envent" ja="お知らせ・イベント" href="news-event" />
      <div className={Styles.container}>
        <div className={Styles.link}>
          <LinkToLists href="/news-event" text="お知らせ一覧を見る" />
        </div>
      </div>
    </section>
  );
};

export default TopNewsEvent;
