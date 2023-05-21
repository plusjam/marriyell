import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Styles from "../../styles/mols/ProcessSlides.module.scss";
import Image from "next/image";
import Link from "next/link";
import SwiperCore, { Navigation } from "swiper";

const ProcessSlides = () => {
  SwiperCore.use([Navigation]);

  return (
    <Swiper
      className={Styles.swiper}
      spaceBetween={19}
      slidesPerView={1.32}
      centeredSlides={true}
      breakpoints={{
        768: {
          slidesPerView: 3,
          centeredSlides: false,
          spaceBetween: 40,
        },
      }}
      navigation={{
        nextEl: ".swiper-process-button-next",
        prevEl: ".swiper-process-button-prev",
      }}
      pagination={{ clickable: true }}
    >
      <SwiperSlide className={Styles.slide}>
        <div className={Styles.head}>Step1</div>
        <div className={Styles.image}>
          <Image src="/images/process_step1.png" alt="" width={287} height={165} />
        </div>
        <div className={Styles.title}>ご予約の確認連絡</div>
        <div className={Styles.description}>
          担当者より、お電話でご連絡させていただきます。わからないことなどございましたら、気兼ねなくお申し付けください。
          <br />
          当サイト内に
          <Link href="/" className={Styles.link}>
            よくあるご質問
          </Link>
          もございますので、ご覧いただけると幸いです。
        </div>
      </SwiperSlide>
      <SwiperSlide className={Styles.slide}>
        <div className={Styles.head}>Step2</div>
        <div className={Styles.image}>
          <Image src="/images/process_step2.png" alt="" width={287} height={165} />
        </div>
        <div className={Styles.title}>ご来館の準備</div>
        <div className={Styles.description}>
          当日のご準備に関しては、
          <Link className={Styles.link} href="">
            はじめてご来館の方へ
          </Link>
          向けたページをご用意しております。ご予約後にキャンセルされる場合は、お電話にてご連絡頂けますようお願い申し上げます。
          <Link className={Styles.phone} href="tel:0773-24-1101">
            ☎ 0773-24-1101
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide className={Styles.slide}>
        <div className={Styles.head}>Step3</div>
        <div className={Styles.image}>
          <Image src="/images/process_step3.png" alt="" width={287} height={165} />
        </div>
        <div className={Styles.title}>ご来館当日</div>
        <div className={Styles.description}>
          ご希望頂いた
          <Link className={Styles.link} href="/fair">
            ブライダルフェア
          </Link>
          や、
          <Link className={Styles.link} href="/plan">
            プラン
          </Link>
          を元に、お二人専任のオペレーターがご案内しますので、ご安心ください。
          <br />
          当式場の場所はサイト内の
          <Link className={Styles.link} href="">
            アクセスページ
          </Link>
          をご参照ください。
        </div>
      </SwiperSlide>

      <div className="swiper-process-button-next"></div>
      <div className="swiper-process-button-prev"></div>
    </Swiper>
  );
};

export default ProcessSlides;
