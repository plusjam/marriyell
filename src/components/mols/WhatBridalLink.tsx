import Link from "next/link";
import React from "react";
import Styles from "@/styles/mols/WhatBridalLink.module.scss";

const WhatBridalLink = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.note}>
        季節やキャンペーンによりフェア内容は様々！
        <br />
        まずは気軽にブライダルフェアにお申込を！
      </div>
      <Link className={Styles.link} href="/fair">
        開催中のブライダルフェア一覧を見る
      </Link>
    </div>
  );
};

export default WhatBridalLink;
