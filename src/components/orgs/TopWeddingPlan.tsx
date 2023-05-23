import React from "react";
import Styles from "../../styles/orgs/TopWeddingPlan.module.scss";
import SectionHead from "../mols/SectionHead";
import LinkToLists from "../atoms/LinkToLists";
import { Swiper, SwiperSlide } from "swiper/react";
import { WEDDINGPLAN } from "../../textDate";
import Link from "next/link";

const TopWeddingPlan = () => {
  return (
    <section className={Styles.section}>
      <SectionHead en="Wedding Plan" ja="ウェディングプラン" href="wedding-plan" />
      <div className={Styles.container}>
        <div className={Styles.main}>
          <Swiper
            className={Styles.swiper}
            spaceBetween={32}
            slidesPerView={1.84}
            centeredSlides={true}
            initialSlide={1}
            breakpoints={{
              768: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 80,
              },
            }}
          >
            {WEDDINGPLAN.map((elem, index) => {
              return (
                <SwiperSlide className={`${Styles.block} fadeinTop`} data-delay={0.2 * index} key={`weddingplan0${index + 1}`}>
                  <Link href={elem.href} target="_blank">
                    <div className={Styles.image}>
                      <picture>
                        <source srcSet={elem.src} type="image/png" media="(min-width: 768px)" />
                        <source srcSet={elem.src} type="image/png" />
                        <img src={elem.src} alt="" width={317} height={540} />
                      </picture>
                    </div>
                    <div className={Styles.contents}>
                      <div className={Styles.contentsHead}>{elem.title}</div>
                      <div className={Styles.price}>¥{elem.price}～</div>
                      <div className={Styles.description}>{elem.description}</div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className={Styles.link}>
          <LinkToLists href="/plan" text="プラン一覧を見る" />
        </div>
      </div>
    </section>
  );
};

export default TopWeddingPlan;
