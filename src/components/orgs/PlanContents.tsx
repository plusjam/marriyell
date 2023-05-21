import React from "react";
import Styles from "@/styles/orgs/PlanContents.module.scss";
import Image from "next/image";
import { useMediaQuery } from "../../../libs/useMediaQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

const PlanContents = () => {
  const isPc = useMediaQuery(768, "min");
  SwiperCore.use([Navigation]);

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.head}>プラン内容</div>
        {isPc ? (
          <div className={Styles.body}>
            <div className={Styles.block}>
              <div className={Styles.tag}>
                <div className={Styles.image}>
                  <Image src="/images/icon_plan_content_ceremony.svg" alt="" width={36} height={36} />
                </div>
                <div className={Styles.label}>挙　式</div>
              </div>
              <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
            </div>

            <div className={Styles.block}>
              <div className={Styles.tag}>
                <div className={Styles.image}>
                  <Image src="/images/icon_plan_content_dress.svg" alt="" width={36} height={36} />
                </div>
                <div className={Styles.label}>衣　装</div>
              </div>
              <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
            </div>

            <div className={Styles.block}>
              <div className={Styles.tag}>
                <div className={Styles.image}>
                  <Image src="/images/icon_plan_content_hall.svg" alt="" width={36} height={36} />
                </div>
                <div className={Styles.label}>披露宴会場</div>
              </div>
              <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
            </div>

            <div className={Styles.block}>
              <div className={Styles.tag}>
                <div className={Styles.image}>
                  <Image src="/images/icon_plan_content_food.svg" alt="" width={36} height={36} />
                </div>
                <div className={Styles.label}>料理/飲物</div>
              </div>
              <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
            </div>

            <div className={Styles.block}>
              <div className={Styles.tag}>
                <div className={Styles.image}>
                  <Image src="/images/icon_plan_content_beauty.svg" alt="" width={36} height={36} />
                </div>
                <div className={Styles.label}>美容/着付</div>
              </div>
              <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
            </div>

            <div className={Styles.block}>
              <div className={Styles.tag}>
                <div className={Styles.image}>
                  <Image src="/images/icon_plan_content_support.svg" alt="" width={36} height={36} />
                </div>
                <div className={Styles.label}>サポート</div>
              </div>
              <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
            </div>

            <div className={Styles.block}>
              <div className={Styles.tag}>
                <div className={Styles.image}>
                  <Image src="/images/icon_plan_content_flower.svg" alt="" width={36} height={36} />
                </div>
                <div className={Styles.label}>装　花</div>
              </div>
              <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
            </div>

            <div className={Styles.block}>
              <div className={Styles.tag}>
                <div className={Styles.image}>
                  <Image src="/images/icon_plan_content_facility.svg" alt="" width={36} height={36} />
                </div>
                <div className={Styles.label}>設　備</div>
              </div>
              <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
            </div>

            <div className={Styles.block}>
              <div className={Styles.tag}>
                <div className={Styles.image}>
                  <Image src="/images/icon_plan_content_photo.svg" alt="" width={36} height={36} />
                </div>
                <div className={Styles.label}>写真/動画</div>
              </div>
              <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
            </div>

            <div className={Styles.block}>
              <div className={Styles.tag}>
                <div className={Styles.image}>
                  <Image src="/images/icon_plan_content_printing.svg" alt="" width={36} height={36} />
                </div>
                <div className={Styles.label}>印刷物</div>
              </div>
              <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
            </div>

            <div className={Styles.block}>
              <div className={Styles.tag}>
                <div className={Styles.image}>
                  <Image src="/images/icon_plan_content_gift.svg" alt="" width={36} height={36} />
                </div>
                <div className={Styles.label}>引き出物</div>
              </div>
              <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
            </div>

            <div className={Styles.block}>
              <div className={Styles.tag}>
                <div className={Styles.image}>
                  <Image src="/images/icon_plan_content_other.svg" alt="" width={36} height={36} />
                </div>
                <div className={Styles.label}>その他</div>
              </div>
              <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
            </div>
          </div>
        ) : (
          <Swiper slidesPerView={1} navigation pagination={{ clickable: true }} className={Styles.swiper}>
            <SwiperSlide className={Styles.slide}>
              <div className={Styles.block}>
                <div className={Styles.tag}>
                  <div className={Styles.image}>
                    <Image src="/images/icon_plan_content_ceremony.svg" alt="" width={36} height={36} />
                  </div>
                  <div className={Styles.label}>挙　式</div>
                </div>
                <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
              </div>

              <div className={Styles.block}>
                <div className={Styles.tag}>
                  <div className={Styles.image}>
                    <Image src="/images/icon_plan_content_dress.svg" alt="" width={36} height={36} />
                  </div>
                  <div className={Styles.label}>衣　装</div>
                </div>
                <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
              </div>

              <div className={Styles.block}>
                <div className={Styles.tag}>
                  <div className={Styles.image}>
                    <Image src="/images/icon_plan_content_hall.svg" alt="" width={36} height={36} />
                  </div>
                  <div className={Styles.label}>披露宴会場</div>
                </div>
                <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
              </div>

              <div className={Styles.block}>
                <div className={Styles.tag}>
                  <div className={Styles.image}>
                    <Image src="/images/icon_plan_content_food.svg" alt="" width={36} height={36} />
                  </div>
                  <div className={Styles.label}>料理/飲物</div>
                </div>
                <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
              </div>

              <div className={Styles.block}>
                <div className={Styles.tag}>
                  <div className={Styles.image}>
                    <Image src="/images/icon_plan_content_beauty.svg" alt="" width={36} height={36} />
                  </div>
                  <div className={Styles.label}>美容/着付</div>
                </div>
                <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
              </div>

              <div className={Styles.block}>
                <div className={Styles.tag}>
                  <div className={Styles.image}>
                    <Image src="/images/icon_plan_content_support.svg" alt="" width={36} height={36} />
                  </div>
                  <div className={Styles.label}>サポート</div>
                </div>
                <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
              </div>
            </SwiperSlide>

            <SwiperSlide className={Styles.slide}>
              <div className={Styles.block}>
                <div className={Styles.tag}>
                  <div className={Styles.image}>
                    <Image src="/images/icon_plan_content_flower.svg" alt="" width={36} height={36} />
                  </div>
                  <div className={Styles.label}>装　花</div>
                </div>
                <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
              </div>

              <div className={Styles.block}>
                <div className={Styles.tag}>
                  <div className={Styles.image}>
                    <Image src="/images/icon_plan_content_facility.svg" alt="" width={36} height={36} />
                  </div>
                  <div className={Styles.label}>設　備</div>
                </div>
                <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
              </div>

              <div className={Styles.block}>
                <div className={Styles.tag}>
                  <div className={Styles.image}>
                    <Image src="/images/icon_plan_content_photo.svg" alt="" width={36} height={36} />
                  </div>
                  <div className={Styles.label}>写真/動画</div>
                </div>
                <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
              </div>

              <div className={Styles.block}>
                <div className={Styles.tag}>
                  <div className={Styles.image}>
                    <Image src="/images/icon_plan_content_printing.svg" alt="" width={36} height={36} />
                  </div>
                  <div className={Styles.label}>印刷物</div>
                </div>
                <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
              </div>

              <div className={Styles.block}>
                <div className={Styles.tag}>
                  <div className={Styles.image}>
                    <Image src="/images/icon_plan_content_gift.svg" alt="" width={36} height={36} />
                  </div>
                  <div className={Styles.label}>引き出物</div>
                </div>
                <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
              </div>

              <div className={Styles.block}>
                <div className={Styles.tag}>
                  <div className={Styles.image}>
                    <Image src="/images/icon_plan_content_other.svg" alt="" width={36} height={36} />
                  </div>
                  <div className={Styles.label}>その他</div>
                </div>
                <div className={Styles.description}>チャペル式・神前式・人前式からお選びいただけます。</div>
              </div>
            </SwiperSlide>
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default PlanContents;
