import { use, useEffect, useState } from "react";
import useApi from "../../../libs/useApi";
import Styles from "../../styles/orgs/DetailForm.module.scss";
import DetailFairFormConfirmInput from "../mols/DetailFairFormConfirmInput";
import DetailFairFormInput from "../mols/DetailFairFormInput";
import ErrorForm from "../mols/ErrorForm";
import LoadingForm from "../mols/LoadingForm";
import ThanksForm from "../mols/ThanksForm";
import { selectFairDate } from "@/pages/_app";
import { useRecoilState } from "recoil";
import { FairList } from "../../../typings/fair";

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
  title: string;
  time: FairList["openTime"];
  date: FairList["calendar"];
};

const DetailFairForm = (props: Props) => {
  const { title, time, date } = props;

  const { status, handleStatus } = useApi();
  const [selectDate, setSelectDate] = useRecoilState<any>(selectFairDate);

  // 今日の日付を取得
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const todayDate = year + "-" + month + "-" + day;

  const [data, setData] = useState<ContactDataDetailFair>({
    title: title.replaceAll("<br>", " "),
    name: "",
    furigana: "",
    phone: "",
    email: "",
    date: selectDate !== "" ? selectDate : todayDate,
    time: "",
    inquiry: "",
  });

  const handleData = (data: ContactDataDetailFair) => {
    setData(data);
  };

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
          {status === "success" && <ThanksForm description="この度はお問い合わせいただき誠にありがとうございました。" />}
          {status === "error" && <ErrorForm />}
        </div>
      </div>
    </section>
  );
};

export default DetailFairForm;
