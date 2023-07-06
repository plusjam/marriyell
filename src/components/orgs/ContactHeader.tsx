import React from "react";
import Styles from "@/styles/orgs/ContactHeader.module.scss";
import { Status } from "../../../libs/useApi";
import Image from "next/image";

type Props = {
  en: string;
  ja: string;
  status: Status;
};

const ContactHeader = (props: Props) => {
  const { en, ja, status } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <h1 className={Styles.title}>
          {ja}
          <span className={Styles.span}>{en}</span>
        </h1>
        <ul className={Styles.flow}>
          <li className={status === "idle" ? `${Styles.text} ${Styles.done}` : Styles.text}>項目入力</li>
          <li className={Styles.arrow}>
            <Image src="/images/icon_arrow-contact.svg" alt="" width={16} height={25} />
          </li>
          <li className={status === "confirm" ? `${Styles.text} ${Styles.done}` : Styles.text}>ご確認</li>
          <li className={Styles.arrow}>
            <Image src="/images/icon_arrow-contact.svg" alt="" width={16} height={25} />
          </li>
          <li className={status === "success" ? `${Styles.text} ${Styles.done}` : Styles.text}>完　了</li>
        </ul>
      </div>
    </section>
  );
};

export default ContactHeader;
