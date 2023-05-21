import React from "react";
import Styles from "@/styles/orgs/BridalProcess.module.scss";
import Image from "next/image";
import { FLOWCONTENTS } from "@/textDate/first";
import BridalProcessBlock from "../atoms/BridalProcessBlock";
import Link from "next/link";

const BridalProcess = () => {
  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <h2 id="flow" className={Styles.head}>
          ブライダルフェア当日のながれ
        </h2>
        <div className={Styles.body}>
          {FLOWCONTENTS.map((content, index) => {
            return <BridalProcessBlock key={index} index={index} src={content.src} title={content.title} time={content.time} description={content.description} link={content.link} />;
          })}
        </div>

        <Link className={Styles.link} href="/fair">
          開催中のブライダルフェア一覧を見る
        </Link>
      </div>
    </section>
  );
};

export default BridalProcess;
