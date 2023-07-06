import React from "react";
import SectionHead from "../mols/SectionHead";
import Styles from "../../styles/orgs/TopOriginalWedding.module.scss";
import { originalWedding, weddingInfo } from "../../textDate";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "../../../libs/useMediaQuery";
import ContentsAndImage from "../mols/ContentsAndImage";

const TopOriginalWedding = () => {
  const isPc = useMediaQuery(768, "min");

  return (
    <>
      <section className={Styles.section}>
        <SectionHead en="Original Wedding" ja="オリジナルウェディング" href="original-wedding" />
        <div className={Styles.sectionCopy}>
          お2人のスタイルに合わせて選べる披露宴会場と緑豊かなガーデンを兼ね備えております。
          <br />
          ワンフロア貸切でゲストと最高の1日を過ごすことが出来るプライベート空間でお2人の理想の結婚式を叶えます
        </div>
        {/* <div className={Styles.container}>
          {originalWedding.map((item, index) => {
            return <ContentsAndImage {...item} key={index} reverse={index % 2 === 1} />;
          })}
        </div> */}
        <div className={`${Styles.container} ${Styles.plan}`}>
          {weddingInfo.map((info, index) => {
            return (
              <Link href={info.href} key={index} className={`${Styles.info} fadeinTop`} data-delay={0.2 * index}>
                <picture>
                  <Image src={info.image} alt="" width={480} height={480} />
                </picture>
                <div className={Styles.infotitle}>
                  <div className={Styles.infoen}>{info.en}</div>
                  <hr className={Styles.hr} />
                  <div className={Styles.infoja}>{info.ja}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default TopOriginalWedding;
