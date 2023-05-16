import { ReportContents } from "@/pages/api/weddingReport/[id]";
import React from "react";
import Styles from "@/styles/orgs/ReportBody.module.scss";
import ButtonViewMore from "../atoms/ButtonViewMore";
import ReportLists from "../mols/ReportLists";

type Props = {
  contents: ReportContents[];
  clickViewMore: () => void;
  next: number | null;
  openModal: (id: string) => void;
};

const ReportBody = (props: Props) => {
  const { contents, clickViewMore, next, openModal } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <p className={Styles.copy}>
          先輩カップルによる実際の挙式や、
          <br className={Styles.sp} />
          パーティの模様を一挙ご紹介
        </p>

        <ReportLists contents={contents} openModal={openModal} />

        {/* more */}
        {contents.length >= 0 && typeof next === "number" && <ButtonViewMore clickViewMore={clickViewMore} />}
      </div>
    </section>
  );
};

export default ReportBody;
