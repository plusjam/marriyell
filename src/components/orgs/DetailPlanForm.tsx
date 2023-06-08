import { useState } from "react";
import Styles from "../../styles/orgs/DetailForm.module.scss";
import DetailPlanFormInput from "../mols/DetailPlanFormInput";
import ThanksForm from "../mols/ThanksForm";
import useApi from "../../../libs/useApi";
import LoadingForm from "../mols/LoadingForm";
import Error from "next/error";
import ErrorForm from "../mols/ErrorForm";
import DetailPlanFormConfirmInput from "../mols/DetailPlanFormConfirmInput";

type Props = {
  title: string;
};

export type ContactDataDetailPlan = {
  title: string;
  name: string;
  type: "direct" | "online" | "other" | "";
  furigana: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  inquiry?: string;
};

const DetailPlanForm = (props: Props) => {
  const { title } = props;

  const { status, handleStatus } = useApi();

  /* =====
    フォームの値
  ==== */
  const [data, setData] = useState<ContactDataDetailPlan>({
    title: title.replaceAll("<br>", " "),
    name: "",
    type: "direct",
    furigana: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    inquiry: "",
  });

  const handleData = (newData: ContactDataDetailPlan) => {
    setData(newData);
  };

  return (
    <section className={Styles.section} id="reservation">
      <div className={Styles.container}>
        <div className={Styles.head}>
          <div className={Styles.title}>
            {status === "idle"
              ? "このプランの相談をする"
              : status === "confirm"
              ? "入力内容を確認する"
              : status === "loading"
              ? "送信中"
              : status === "success"
              ? "送信完了"
              : status === "error"
              ? "送信失敗"
              : "このプランの相談をする"}
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
          {status === "idle" && <DetailPlanFormInput title={title} handleStatus={handleStatus} data={data} handleData={handleData} />}
          {status === "confirm" && <DetailPlanFormConfirmInput title={title} handleStatus={handleStatus} data={data} />}
          {status === "loading" && <LoadingForm />}
          {status === "error" && <ErrorForm />}
        </div>
      </div>
    </section>
  );
};

export default DetailPlanForm;
