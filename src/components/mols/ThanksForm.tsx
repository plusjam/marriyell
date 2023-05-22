import Link from "next/link";
import React from "react";
import Styles from "../../styles/mols/FormStatus.module.scss";
import LinkToLists from "../atoms/LinkToLists";
import Image from "next/image";

type Props = {
  description: string;
};

const ThanksForm = (props: Props) => {
  const { description } = props;

  return (
    <div className={Styles.container}>
      <div className={Styles.head}>
        <div className={Styles.title}>
          <Image src="/images/icon_mail.svg" alt="" width={80} height={80} />
          送信が完了しました。
        </div>
        <div className={Styles.description} dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
      <div className={Styles.links}>
        <LinkToLists text="TOPへ戻る" href="/" />
      </div>
    </div>
  );
};

export default ThanksForm;
