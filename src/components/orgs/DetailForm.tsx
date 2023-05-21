import React from "react";
import Styles from "../../styles/orgs/DetailForm.module.scss";
import PlanDetailFormInput from "../mols/PlanDetailFormInput";

type Props = {
  title: string;
};

const DetailForm = (props: Props) => {
  const { title } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.head}>
          <div className={Styles.title}>このプランの相談をする</div>
          <div className={Styles.description}>
            各項目をご入力後、「確認画面に進む」ボタンを押してください。
            <br />
            「※」の項目は必須事項です。
          </div>
        </div>

        <div className={Styles.body}>
          <PlanDetailFormInput title={title} />
        </div>
      </div>
    </section>
  );
};

export default DetailForm;
