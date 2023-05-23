import React from "react";
import Styles from "@/styles/mols/WhatBridalTitle.module.scss";
import Image from "next/image";

const WhatBridalTitle = () => {
  return (
    <div className={Styles.container}>
      <h2 id="what" className={Styles.title}>
        ブライダルフェアとは？
      </h2>
      <div className={Styles.body}>
        <div className={Styles.image}>
          <Image src="/images/first_whatBridal.jpg" alt="" width={284} height={197} />
        </div>
        <div className={Styles.description}>
          <p>ブライダルフェアとは、結婚式場内の施設見学や、結婚式に関する相談会など、結婚式を挙げたい皆さまが参加されるイベントのことを言います。</p>
          <p>
            式場内をじっくり見学できるのはもちろん、料理試食や挙式体験ができるのがブライダルフェアの特徴です。結婚式のイメージを一緒に膨らませていただきながら、不安や悩みをプランナーに相談していただくことができます。
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatBridalTitle;
