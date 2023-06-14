import useApi from "../../../libs/useApi";
import { FairList } from "../../../typings/fair";
import Styles from "../../styles/orgs/DetailForm.module.scss";
import DetailFairFormConfirmInput from "../mols/DetailFairFormConfirmInput";
import DetailFairFormInput from "../mols/DetailFairFormInput";
import ErrorForm from "../mols/ErrorForm";
import LoadingForm from "../mols/LoadingForm";
import ThanksForm from "../mols/ThanksForm";

export type ContactDataDetailFair = {
  title: string;
  name: string;
  furigana: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  inquiry?: string;
};

type Props = {
  time: FairList["openTime"];
  date: FairList["calendarMulti"];
  handleData: (data: ContactDataDetailFair) => void;
  data: ContactDataDetailFair;
};

const DetailFairForm = (props: Props) => {
  const { time, date, data, handleData } = props;

  const { status, handleStatus } = useApi();

  return (
    <section className={Styles.section} id="reservation">
      <div className={Styles.container}>
        <div className={Styles.head}>
          <div className={Styles.title}>
            {status === "idle"
              ? "このフェアを予約する"
              : status === "confirm"
              ? "入力内容を確認する"
              : status === "loading"
              ? "送信中"
              : status === "success"
              ? "送信完了"
              : status === "error"
              ? "送信失敗"
              : "このフェアを予約する"}
          </div>
          {status === "idle" && (
            <div className={Styles.description}>
              各項目をご入力後、「確認画面に進む」ボタンを押してください。
              <br />
              「※」の項目は必須事項です。
            </div>
          )}
        </div>

        <div className={Styles.body}>
          {status === "idle" && <DetailFairFormInput handleStatus={handleStatus} data={data} handleData={handleData} time={time} date={date} />}
          {status === "confirm" && <DetailFairFormConfirmInput handleStatus={handleStatus} data={data} />}
          {status === "loading" && <LoadingForm />}
          {status === "error" && <ErrorForm />}
        </div>
      </div>
    </section>
  );
};

export default DetailFairForm;
