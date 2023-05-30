import Styles from "@/styles/orgs/ReportBody.module.scss";
import { ReportLists as List } from "../../../typings/report";
import ButtonViewMore from "../atoms/ButtonViewMore";
import ReportLists from "../mols/ReportLists";
import { Status } from "../../../libs/useApi";

type Props = {
  currentReportLists: List;
  clickViewMore: () => void;
  next: boolean;
  openModal: (id: string) => void;
  status: Status;
};

const ReportBody = (props: Props) => {
  const { currentReportLists, clickViewMore, next, openModal, status } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <p className={Styles.copy}>
          先輩カップルによる実際の挙式や、
          <br className={Styles.sp} />
          パーティの模様を一挙ご紹介
        </p>

        <ReportLists contents={currentReportLists.articles} openModal={openModal} />

        {/* more */}
        {next && <ButtonViewMore clickViewMore={clickViewMore} status={status} />}
      </div>
    </section>
  );
};

export default ReportBody;
