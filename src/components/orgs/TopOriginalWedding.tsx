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
          特徴を伝えるボディーコピーが入ります。端的に伝える文言をご用意ください。
          <br />
          適度な文章量でご指示時ください。
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
                  <source srcSet={info.image} type="image/png" media="(min-width: 768px)" />
                  <source srcSet={info.spImage} type="image/png" />
                  <img src={info.image} alt="" width={480} height={480} />
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
