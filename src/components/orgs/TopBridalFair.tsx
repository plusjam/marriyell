import Image from "next/image";
import Styles from "../../styles/orgs/TopBridalFair.module.scss";
import LinkToLists from "../atoms/LinkToLists";
import SectionHead from "../mols/SectionHead";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BRIDALFAIR } from "../../../textDate";
import Link from "next/link";

const TopBridalFair = () => {
  return (
    <section className={Styles.section}>
      <SectionHead en="Bridal Fair" ja="ブライダルフェア" href="bridal-fair" />
      <div className={Styles.container}>
        <div className={Styles.main}>
          <Swiper
            className={Styles.swiper}
            spaceBetween={20}
            slidesPerView={1.31}
            centeredSlides={true}
            initialSlide={1}
            breakpoints={{
              768: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 32,
              },
            }}
          >
            {BRIDALFAIR.map((elem, index) => {
              return (
                <SwiperSlide className={`${Styles.block} fadeinTop`} data-delay={0.2 * index} key={`bridalfair0${index + 1}`}>
                  <Link href={elem.href} target="_blank">
                    <div className={Styles.image}>
                      {/* <Image src={elem.src} alt="" width={405} height={295} /> */}
                      <picture>
                        <source srcSet={elem.src} type="image/webp" />
                        <img src={elem.src} alt="" width={405} height={295} />
                      </picture>
                      {/* <div className={Styles.tag}>
                        <div className={Styles.yyyy_mm}>{elem.yyyymm}</div>
                        <div className={Styles.date}>{elem.date}</div>
                        <div className={Styles.weekdays}>{elem.weekdays}</div>
                      </div> */}
                    </div>
                    <div className={Styles.contents}>
                      {/* <div className={Styles.when}>{elem.when}</div> */}
                      <div className={Styles.description}>{elem.description}</div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
            {/* <SwiperSlide className={`${Styles.block} fadeinTop`} data-delay={0.2 * 0}>
              <div className={Styles.image}>
                <Image src="/images/bridal_fair01.jpg" alt="" width={405} height={295} />
                <div className={Styles.tag}>
                  <div className={Styles.yyyy_mm}>2023.00</div>
                  <div className={Styles.date}>04</div>
                  <div className={Styles.weekdays}>Thu</div>
                </div>
              </div>
              <div className={Styles.contents}>
                <div className={Styles.when}>2023年00月00日（土）</div>
                <div className={Styles.description}>ブライダルフェアのタイトルが入ります。ブライダルフェアのタイトルが入ります。</div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={`${Styles.block} fadeinTop`} data-delay={0.2 * 1}>
              <div className={Styles.image}>
                <Image src="/images/bridal_fair02.jpg" alt="" width={405} height={295} />
                <div className={Styles.tag}>
                  <div className={Styles.yyyy_mm}>2023.00</div>
                  <div className={Styles.date}>04</div>
                  <div className={Styles.weekdays}>Thu</div>
                </div>
              </div>
              <div className={Styles.contents}>
                <div className={Styles.when}>2023年00月00日（土）</div>
                <div className={Styles.description}>ブライダルフェアのタイトルが入ります。ブライダルフェアのタイトルが入ります。</div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={`${Styles.block} fadeinTop`} data-delay={0.2 * 2}>
              <div className={Styles.image}>
                <Image src="/images/bridal_fair03.jpg" alt="" width={405} height={295} />
                <div className={Styles.tag}>
                  <div className={Styles.yyyy_mm}>2023.00</div>
                  <div className={Styles.date}>04</div>
                  <div className={Styles.weekdays}>Thu</div>
                </div>
              </div>
              <div className={Styles.contents}>
                <div className={Styles.when}>2023年00月00日（土）</div>
                <div className={Styles.description}>ブライダルフェアのタイトルが入ります。ブライダルフェアのタイトルが入ります。</div>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
        <div className={Styles.link}>
          <LinkToLists href="https://lu-crea.fuwel.wedding/fair" target text="フェア一覧を見る" />
        </div>
      </div>
    </section>
  );
};

export default TopBridalFair;
