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
  const splitContents = (contents: any) => {
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
            {content.contents.map((elem, index) => {
              const src = () => {
                if (elem.values.content.select[0] === "挙式") {
                  return "/images/icon_plan_content_ceremony.svg";
                }
                if (elem.values.content.select[0] === "衣装") {
                  return "/images/icon_plan_content_dress.svg";
                }
                if (elem.values.content.select[0] === "披露宴会場") {
                  return "/images/icon_plan_content_hall.svg";
                }
                if (elem.values.content.select[0] === "料理/飲物") {
                  return "/images/icon_plan_content_food.svg";
                }
                if (elem.values.content.select[0] === "美容/着付") {
                  return "/images/icon_plan_content_beauty.svg";
                }
                if (elem.values.content.select[0] === "サポート") {
                  return "/images/icon_plan_content_support.svg";
                }
                if (elem.values.content.select[0] === "装花") {
                  return "/images/icon_plan_content_flower.svg";
                }
                if (elem.values.content.select[0] === "設備") {
                  return "/images/icon_plan_content_facility.svg";
                }
                if (elem.values.content.select[0] === "写真/動画") {
                  return "/images/icon_plan_content_photo.svg";
                }
                if (elem.values.content.select[0] === "印刷物") {
                  return "/images/icon_plan_content_printing.svg";
                }
                if (elem.values.content.select[0] === "引き出物") {
                  return "/images/icon_plan_content_gift.svg";
                }
                if (elem.values.content.select[0] === "その他") {
                  return "/images/icon_plan_content_other.svg";
                }
              };
              return (
                <div className={Styles.block} key={`plancontent${index}`}>
                  <div className={Styles.tag}>
                    <div className={Styles.image}>
                      <Image src={src()!} alt="" width={36} height={36} />
                    </div>
                    <div className={Styles.label}>{elem.values.content.select}</div>
                  </div>
                  <div className={Styles.description} dangerouslySetInnerHTML={{ __html: elem.values.text }}></div>
                </div>
              );
            })}
          </div>
        ) : (
          <Swiper slidesPerView={1} navigation pagination={{ clickable: true }} className={Styles.swiper}>
            {splitContents(content.contents).map((contents, index) => {
              return (
                <SwiperSlide className={Styles.slide} key={`fairswiper${index}`}>
                  {contents.map((elem, index) => {
                    const src = () => {
                      if (elem.values.content.select[0] === "挙式") {
                        return "/images/icon_plan_content_ceremony.svg";
                      }
                      if (elem.values.content.select[0] === "衣装") {
                        return "/images/icon_plan_content_dress.svg";
                      }
                      if (elem.values.content.select[0] === "披露宴会場") {
                        return "/images/icon_plan_content_hall.svg";
                      }
                      if (elem.values.content.select[0] === "料理/飲物") {
                        return "/images/icon_plan_content_food.svg";
                      }
                      if (elem.values.content.select[0] === "美容/着付") {
                        return "/images/icon_plan_content_beauty.svg";
                      }
                      if (elem.values.content.select[0] === "サポート") {
                        return "/images/icon_plan_content_support.svg";
                      }
                      if (elem.values.content.select[0] === "装花") {
                        return "/images/icon_plan_content_flower.svg";
                      }
                      if (elem.values.content.select[0] === "設備") {
                        return "/images/icon_plan_content_facility.svg";
                      }
                      if (elem.values.content.select[0] === "写真/動画") {
                        return "/images/icon_plan_content_photo.svg";
                      }
                      if (elem.values.content.select[0] === "印刷物") {
                        return "/images/icon_plan_content_printing.svg";
                      }
                      if (elem.values.content.select[0] === "引き出物") {
                        return "/images/icon_plan_content_gift.svg";
                      }
                      if (elem.values.content.select[0] === "その他") {
                        return "/images/icon_plan_content_other.svg";
                      }
                    };
                    return (
                      <div className={Styles.block} key={`plancontent${index}`}>
                        <div className={Styles.tag}>
                          <div className={Styles.image}>
                            <Image src={src()!} alt="" width={36} height={36} />
                          </div>
                          <div className={Styles.label}>{elem.values.content.select}</div>
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
