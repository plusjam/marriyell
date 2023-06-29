import React from "react";
import useApi from "../../../libs/useApi";
import Styles from "@/styles/orgs/NewsForm.module.scss";
import LoadingForm from "../mols/LoadingForm";
import ErrorForm from "../mols/ErrorForm";
import NewsFormInput from "../mols/NewsFormInput";
import NewsFormConfirmInput from "../mols/NewsFormConfirmInput";
import { ContactDataNews } from "@/pages/news/[id]";
import { NewsList } from "../../../typings/news";

type Props = {
  date: NewsList["date"];
  time: NewsList["time"];
  handleData: (data: ContactDataNews) => void;
  data: ContactDataNews;
  formType: NewsList["form"]["select"][0];
};

const NewsForm = (props: Props) => {
  const { time, date, data, handleData, formType } = props;
  const { status, handleStatus } = useApi();

  return (
    <div className={Styles.container} id="reservation">
      <div className={Styles.head}>
        <div className={Styles.title}>
          {status === "idle"
            ? "予約する"
            : status === "confirm"
            ? "入力内容を確認する"
            : status === "loading"
            ? "送信中"
            : status === "success"
            ? "送信完了"
            : status === "error"
            ? "送信失敗"
            : "予約する"}
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
        {status === "idle" && <NewsFormInput handleStatus={handleStatus} data={data} handleData={handleData} time={time} date={date} formType={formType} />}
        {status === "confirm" && <NewsFormConfirmInput handleStatus={handleStatus} data={data} formType={formType} />}
        {status === "loading" && <LoadingForm />}
        {status === "error" && <ErrorForm />}
      </div>
    </div>
  );
};

export default NewsForm;
