import Link from "next/link";
import React from "react";
import Styles from "@/styles/mols/WhatBridalLink.module.scss";

const WhatBridalLink = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.note}>
        季節やキャンペーンなどによって、フェア内容は様々ございます。
        <br />
        まずは気軽にブライダルフェアのお申込みを！
      </div>
      <Link className={Styles.link} href="/fair">
        開催中のブライダルフェア一覧を見る
      </Link>
    </div>
  );
};

export default WhatBridalLink;
