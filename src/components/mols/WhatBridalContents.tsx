import React from "react";
import Styles from "@/styles/mols/WhatBridalContents.module.scss";
import Image from "next/image";
import { FAIRCONTENTS } from "@/textDate/first";

const WhatBridalContents = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.head}>フェア内容</div>
      <div className={Styles.body}>
        {FAIRCONTENTS.map((content, index) => {
          return (
            <div className={Styles.block} key={`whatbridalcontents${index}`}>
              <div className={Styles.image}>
                <Image src={content.src} alt="" width={128} height={128} />
              </div>
              <div className={Styles.content}>
                <div className={Styles.title}>{content.title}</div>
                <div className={Styles.description}>{content.descritpion}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhatBridalContents;
