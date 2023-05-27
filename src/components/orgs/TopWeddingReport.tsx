import React from "react";
import Styles from "../../styles/orgs/TopWeddingReport.module.scss";
import SectionHead from "../mols/SectionHead";
import LinkToLists from "../atoms/LinkToLists";
import ReportLists from "../mols/ReportLists";
import { ReportContents } from "@/pages/api/weddingReport/[id]";
import { ReportLists as List } from "../../../typings/report";

type Props = {
  contents: List["articles"];
  openModal: (id: string) => void;
};

const TopWeddingReport = (props: Props) => {
  const { contents, openModal } = props;

  return (
    <section className={Styles.section}>
      <SectionHead en="Wedding Report" ja="ウェディングレポート" href="report" isShort />
      <div className={Styles.container}>
        <div className={Styles.lists}>
          <ReportLists contents={contents} openModal={openModal} isTop />
        </div>

        <div className={Styles.link}>
          <LinkToLists href="/report" text="レポート一覧を見る" />
        </div>
      </div>
    </section>
  );
};

export default TopWeddingReport;
