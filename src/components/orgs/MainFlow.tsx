import React from "react";
import Styles from "../../styles/orgs/MainFlow.module.scss";
import Image from "next/image";
import { useMediaQuery } from "../../../libs/useMediaQuery";

export const MainFlow = () => {
  const isPc = useMediaQuery(768, "min");

  return (
    <>
      <div className={Styles.main}>
        <picture>
          <source srcSet="/images/main_copy.svg" type="image/svg" />
          <img className={Styles.image} src="/images/main_copy.svg" alt="" width={283} height={64} />
        </picture>
        {isPc ? (
          <div className={Styles.scroll}>
            <picture>
              <source srcSet="/images/icon_scroll.svg" type="image/svg" />
              <img src="/images/icon_scroll.svg" alt="" width={16} height={33} />
            </picture>
            <div className={Styles.scrollText}>Scroll</div>
          </div>
        ) : (
          <div className={Styles.scroll}>
            <span></span>
            <div className={Styles.scrollText}>Scroll</div>
          </div>
        )}
      </div>
      <div className={Styles.flow}>
        <h1 className={Styles.heading}>
          <span>北関東最大級の</span>
          <span>スケールを</span>
          <span>誇る</span>
          <br />
          <span>独立型大聖堂が</span>
          <span>ある結婚式場</span>
        </h1>
        <p className={Styles.description}>コンセプトを伝えるボディーコピーが入ります。端的に想いや特徴を伝える文言をご用意ください。適度な文章量でご指示時ください。</p>
      </div>
    </>
  );
};
