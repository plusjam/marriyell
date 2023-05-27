import React from "react";
import Styles from "../../styles/orgs/TopWeddingPlan.module.scss";
import SectionHead from "../mols/SectionHead";
import LinkToLists from "../atoms/LinkToLists";
import { Swiper, SwiperSlide } from "swiper/react";
import { WEDDINGPLAN } from "../../textDate";
import Link from "next/link";
import { PlanLists } from "../../../typings/plan";

type Props = {
  planLists: PlanLists["articles"];
};

const TopWeddingPlan = (props: Props) => {
  const { planLists } = props;

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
            {planLists.map((elem, index) => {
              return (
                <SwiperSlide className={`${Styles.block} fadeinTop`} data-delay={0.2 * index} key={`weddingplan0${index + 1}`}>
                  <Link href={`/plan/${elem.code}`}>
                    <div className={Styles.image}>
                      <picture>
                        <source srcSet={elem.mainPc.url} media="(min-width: 768px)" />
                        <source srcSet={elem.mainSp.url} width={elem.mainSp.attributes.width} height={elem.mainSp.attributes.height} />
                        <img src={elem.mainPc.url} alt="" width={elem.mainPc.attributes.width} height={elem.mainPc.attributes.height} />
                      </picture>
                    </div>
                    <div className={Styles.contents}>
                      <div className={Styles.contentsHead}>{elem.title}</div>
                      <div className={Styles.price}>¥{elem.price}～</div>
                      <div className={Styles.description} dangerouslySetInnerHTML={{ __html: elem.description }}></div>
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
