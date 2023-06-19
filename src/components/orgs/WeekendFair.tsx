import React from "react";
import Styles from "../../styles/orgs/WeekendFair.module.scss";
import SectionHead from "../mols/SectionHead";
import Image from "next/image";
import { FairList } from "@/pages/api/fair";
import { Swiper, SwiperSlide } from "swiper/react";
import { FairLists } from "../../../typings/fair";
import Link from "next/link";

type Props = {
  lists: FairLists["articles"];
  weekend: {
    date: string;
    selected: boolean;
  }[];
  handleSelect: (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
};

const WeekendFair = (props: Props) => {
  const { lists, weekend, handleSelect } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <SectionHead en="Weekend Fair" ja="週末のフェア" isShort />
        <div className={Styles.body}>
          <div className={Styles.selects}>
            {weekend.map((date, index) => {
              return (
                <div className={date.selected ? `${Styles.select} ${Styles.selected}` : `${Styles.select}`} key={index} data-index={index} onClick={(e) => handleSelect(e)}>
                  {date.date}
                </div>
              );
            })}
          </div>

          <Swiper
            className={Styles.contents}
            spaceBetween={20}
            slidesPerView={1.3}
            centeredSlides={true}
            initialSlide={1}
            breakpoints={{
              768: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 25,
                initialSlide: 0,
              },
            }}
          >
            {lists.length ? (
              lists.map((content, index) => {
                const date = weekend.filter((date) => {
                  return date.selected;
                });

                return (
                  <SwiperSlide className={`${Styles.content} fadeinTop`} data-delay={0.2 * index} key={`weekendfair${index + 1}`}>
                    <Link href={`/fair/${content.code}`}>
                      <div className={Styles.image}>
                        <Image src={content.mainPc.url} alt="" width={content.mainPc.attributes.width} height={content.mainPc.attributes.height} />
                      </div>
                      <div className={Styles.date}>{date[0].date}</div>
                      <div className={Styles.description} dangerouslySetInnerHTML={{ __html: content.title }}></div>
                    </Link>
                  </SwiperSlide>
                );
              })
            ) : (
              <div className={Styles.nothing}>お探しのコンテンツが見つかりませんでした。</div>
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default WeekendFair;
