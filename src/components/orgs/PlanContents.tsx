import React from "react";
import Styles from "@/styles/orgs/PlanContents.module.scss";
import Image from "next/image";
import { useMediaQuery } from "../../../libs/useMediaQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { PlanList } from "../../../typings/plan";

type Props = {
  content: PlanList;
};

const PlanContents = (props: Props) => {
  const { content } = props;

  const isPc = useMediaQuery(768, "min");
  SwiperCore.use([Navigation]);

  // content.contentsを6つずつに分割
  const splitContents = (contents: PlanList["contentDescription"]) => {
    const initContents = [...contents];
    const splitContents = [];
    const splitNum = 6;

    while (initContents.length > 0) {
      splitContents.push(initContents.splice(0, splitNum));
    }

    return splitContents;
  };

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.head}>プラン内容</div>
        {isPc ? (
          <div className={Styles.body}>
            {content.contentDescription.map((elem, index) => {
              return (
                <div className={Styles.block} key={`plancontent${index}`}>
                  <div className={Styles.tag}>
                    <div className={Styles.image}>
                      <Image src={elem.values.content.articles[0].icon ? elem.values.content.articles[0].icon?.url : ""} alt="" width={36} height={36} />
                    </div>
                    <div className={Styles.label}>{elem.values.content.articles[0].title}</div>
                  </div>
                  <div className={Styles.description} dangerouslySetInnerHTML={{ __html: elem.values.text }}></div>
                </div>
              );
            })}
          </div>
        ) : (
          <Swiper slidesPerView={1} navigation pagination={{ clickable: true }} className={Styles.swiper}>
            {splitContents(content.contentDescription).map((contents, index) => {
              return (
                <SwiperSlide className={Styles.slide} key={`fairswiper${index}`}>
                  {contents.map((elem, index) => {
                    return (
                      <div className={Styles.block} key={`plancontent${index}`}>
                        <div className={Styles.tag}>
                          <div className={Styles.image}>
                            <Image src={elem.values.content.articles[0].icon ? elem.values.content.articles[0].icon?.url : ""} alt="" width={36} height={36} />
                          </div>
                          <div className={Styles.label}>{elem.values.content.articles[0].title}</div>
                        </div>
                        <div className={Styles.description} dangerouslySetInnerHTML={{ __html: elem.values.text }}></div>
                      </div>
                    );
                  })}
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default PlanContents;
