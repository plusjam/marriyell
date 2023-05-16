import React from "react";
import Styles from "@/styles/orgs/ContactHeader.module.scss";

type Props = {
  en: string;
  ja: string;
  step: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
  };
};

const ContactHeader = (props: Props) => {
  const { step1 = false, step2 = false, step3 = false } = props.step;
  const { en, ja } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <h1 className={Styles.title}>
          {ja}
          <span className={Styles.span}>{en}</span>
        </h1>
        <ul className={Styles.flow}>
          <li className={step1 ? `${Styles.text} ${Styles.done}` : Styles.text}>項目入力</li>
          <li className={Styles.arrow}>
            <img src="/images/icon_arrow-contact.svg" alt="" />
          </li>
          <li className={step2 ? `${Styles.text} ${Styles.done}` : Styles.text}>ご確認</li>
          <li className={Styles.arrow}>
            <img src="/images/icon_arrow-contact.svg" alt="" />
          </li>
          <li className={step3 ? `${Styles.text} ${Styles.done}` : Styles.text}>完　了</li>
        </ul>
      </div>
    </section>
  );
};

export default ContactHeader;
