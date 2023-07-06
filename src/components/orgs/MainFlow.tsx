import React from "react";
import Styles from "../../styles/orgs/MainFlow.module.scss";
import Image from "next/image";
import { useMediaQuery } from "../../../libs/useMediaQuery";

export const MainFlow = () => {
  const isPc = useMediaQuery(768, "min");

  return (
    <>
      <div className={Styles.main}>
        <Image className={Styles.image} src="/images/main_copy.svg" alt="" width={283} height={64} />
        {isPc ? (
          <div className={Styles.scroll}>
            <Image src="/images/icon_scroll.svg" alt="" width={16} height={33} />
            <div className={Styles.scrollText}>Scroll</div>
          </div>
        ) : (
          <div className={Styles.scroll}>
            <span></span>
            <div className={Styles.scrollText}>Scroll</div>
          </div>
        )}
      </div>
      <div className={Styles.flow} id="mainflow">
        <h1 className={Styles.heading}>
          <span>北関東最大級の</span>
          <span>スケールを</span>
          <span>誇る</span>
          <br />
          <span>独立型大聖堂が</span>
          <span>ある結婚式場</span>
        </h1>
        <p className={Styles.description}>
          天井高18m・バージンロード20mでの厳粛な挙式。
          <br />
          100年の歴史を誇る英国製ステンドグラスのやさしい光に包まれる挙式は感動的です。
        </p>
      </div>
    </>
  );
};
