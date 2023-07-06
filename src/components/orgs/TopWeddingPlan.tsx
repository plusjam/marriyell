import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { PlanLists } from "../../../typings/plan";
import Styles from "../../styles/orgs/TopWeddingPlan.module.scss";
import Images from "../../styles/atoms/Images.module.scss";
import LinkToLists from "../atoms/LinkToLists";
import SectionHead from "../mols/SectionHead";
import Image from "next/image";

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
                slidesPerView: 4.2,
                centeredSlides: true,
                spaceBetween: 32,
                initialSlide: planLists.length <= 3 ? 1 : 2,
              },
            }}
          >
            {planLists.map((elem, index) => {
              return (
                <SwiperSlide className={`${Styles.block} fadeinTop`} data-delay={0.2 * index} key={`weddingplan0${index + 1}`}>
                  <Link href={`/plan/${elem.code}`}>
                    <div className={Styles.image}>
                      <picture>
                        <Image src={elem.mainPc.url} alt="" width={elem.mainPc.attributes.width} height={elem.mainPc.attributes.height} className={Images.pc} />
                        <Image src={elem.mainSp.url} alt="" width={elem.mainSp.attributes.width} height={elem.mainSp.attributes.height} className={Images.sp} />
                      </picture>
                    </div>
                    <div className={Styles.contents}>
                      <div className={Styles.contentsHead}>{elem.title}</div>
                      <div className={Styles.price}>¥{Number(elem.price).toLocaleString()}～</div>
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
