import React from "react";
import Styles from "@/styles/orgs/StaticLayout.module.scss";
import Image from "next/image";
import StaticSubHead from "../atoms/StaticSubHead";
import { Recruit } from "@/textDate/recruit";
import Link from "next/link";
import LinkToLists from "../atoms/LinkToLists";

type Props = {
  contents: Recruit["contents"][0];
};

const StaticLayoutRecruit = (props: Props) => {
  const { contents } = props;

  return (
    <section className={`${Styles.section} ${Styles.brides}`}>
      <div className={Styles.container} id={contents.id}>
        <div className={Styles.body}>
          <div className={Styles.imageArea}>
            <div className={Styles.title} dangerouslySetInnerHTML={{ __html: contents.title }}></div>
            <div className={Styles.image}>
              <Image src={contents.src} alt="" width={496} height={284} />
            </div>
          </div>

          <div className={Styles.contents}>
            <StaticSubHead title={contents.subtitle} caption={contents.caption} />
            <div className={Styles.link}>
              <LinkToLists href={contents.link.to} text={contents.link.label} target />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticLayoutRecruit;
