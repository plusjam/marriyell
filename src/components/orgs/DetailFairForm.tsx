import React from "react";
import Styles from "../../styles/orgs/DetailForm.module.scss";
import DetailFairFormInput from "../mols/DetailFairFormInput";
import useApi from "../../../libs/useApi";
import LoadingForm from "../mols/LoadingForm";
import ThanksForm from "../mols/ThanksForm";
import ErrorForm from "../mols/ErrorForm";

type Props = {
  title: string;
};

const DetailFairForm = (props: Props) => {
  const { title } = props;

  const { status, handleStatus } = useApi();

  return (
    <section className={Styles.section} id="reservation">
      <div className={Styles.container}>
        <div className={Styles.head}>
          <div className={Styles.title}>このプランの相談をする</div>
          {status === "idle" && (
            <div className={Styles.description}>
              各項目をご入力後、「確認画面に進む」ボタンを押してください。
              <br />
              「※」の項目は必須事項です。
            </div>
          )}
        </div>

        <div className={Styles.body}>
          {status === "idle" && <DetailFairFormInput title={title} handleStatus={handleStatus} />}
          {status === "loading" && <LoadingForm />}
          {status === "success" && <ThanksForm description="この度はお問い合わせいただき誠にありがとうございました。" />}
          {status === "error" && <ErrorForm />}
        </div>
      </div>
    </section>
  );
};

export default DetailFairForm;
