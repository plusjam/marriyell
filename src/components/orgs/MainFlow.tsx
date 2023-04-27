import React from "react";
import Styles from "../../styles/orgs/MainFlow.module.scss";
import Image from "next/image";
import { useMediaQuery } from "../../../libs/useMediaQuery";

export const MainFlow = () => {
  const isPc = useMediaQuery(768, "min");

  return (
    <>
      <div className={Styles.main}>
        {/* <Image className={Styles.image} src="/images/art_logo.svg" alt="" width={170} height={172} /> */}
        <picture>
          <source srcSet="/images/art_logo.svg" type="image/svg" />
          <img className={Styles.image} src="/images/art_logo.svg" alt="" width={170} height={172} />
        </picture>
        {isPc ? (
          <div className={Styles.scroll}>
            {/* <Image src="/images/icon_scroll.svg" alt="" width={16} height={33} /> */}
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
          <span>今日の</span>
          <span>私たちの</span>
          <span>ウェディングが</span>
          <br />
          <span>世界中で</span>
          <span>一番の</span>
          <span>WONDERLAND に</span>
        </h1>
        <p className={Styles.description}>
          大切にしたいのは、「みんなで楽しむウエディング」。
          <br />
          花嫁が着たいドレスを着て、好きなように飾り、
          <br />
          自分達らしいウエディングを思いきり、というスタイルはもちろんのこと、
          <br />
          家族や友人、ゲスト一人ひとりにとっても最高の一日になる。
          <br />
          そんな特別な「HAPPINESS」を叶える場所へ。
          <br />
          今日の私達のウエディングが、
          <br />
          世界中で1番の「WONDDERLAND」になるように。
        </p>
      </div>
    </>
  );
};
