import React from "react";
import Styles from "@/styles/orgs/StaticLayout.module.scss";
import Image from "next/image";
import StaticSubHead from "../atoms/StaticSubHead";
import { useMediaQuery } from "../../../libs/useMediaQuery";
import { ContentBrides } from "@/textDate/brides";

type Props = {
  contents: ContentBrides;
};

const StaticLayoutBrides = (props: Props) => {
  const { contents } = props;

  const isPc = useMediaQuery(768, "min");

  return contents.contentTitle !== undefined ? (
    <section className={`${Styles.section} ${Styles.brides}`}>
      <div className={Styles.container}>
        <div className={Styles.body}>
          <div className={Styles.imageArea}>
            <div className={Styles.title} dangerouslySetInnerHTML={{ __html: contents.title }}></div>
            <div className={Styles.image}>
              <img src={contents.src} alt="" width={496} height={284} />
            </div>
          </div>

          <div className={Styles.contents}>
            <StaticSubHead title={contents.contentTitle!} caption={contents.caption} textAlignment={contents.textAlignment} />
            <div className={Styles.content}>
              {contents.flow!.map((content, index) => {
                return (
                  <div className={Styles.block} key={`content${index}`}>
                    <div className={Styles.number}>{index + 1}</div>
                    <div className={Styles.text} dangerouslySetInnerHTML={{ __html: content }}></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className={`${Styles.section} ${Styles.step7}`}>
      <div className={Styles.container}>
        <div className={Styles.body}>
          <div className={Styles.imageArea}>
            <div className={Styles.title} dangerouslySetInnerHTML={{ __html: contents.title }}></div>
            <div className={Styles.caption} dangerouslySetInnerHTML={{ __html: contents.caption }}></div>
          </div>
        </div>
      </div>
      <div className={Styles.background}>
        {isPc && <Image src={contents.src} alt="" width={1220} height={400} />}
        {!isPc && <Image src={contents.srcSp!} alt="" width={328} height={480} />}
      </div>
    </section>
  );
};

export default StaticLayoutBrides;
