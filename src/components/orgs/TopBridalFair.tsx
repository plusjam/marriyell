import Image from "next/image";
import Styles from "../../styles/orgs/TopBridalFair.module.scss";
import LinkToLists from "../atoms/LinkToLists";
import SectionHead from "../mols/SectionHead";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { FairList } from "@/pages/api/fair";
import CalendarTOP from "../atoms/CalendarTOP";
import { useState } from "react";
import { FairLists } from "../../../typings/fair";

type Props = {
  lists: FairLists["articles"];
  weekendLists: FairLists["articles"];
  weekend: {
    date: string;
    selected: boolean;
  }[];
  handleSelect: (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  events: { date: string }[];
};

const TopBridalFair = (props: Props) => {
  const { lists, weekendLists, weekend, handleSelect, events } = props;

  const [options, setOptions] = useState(true);

  return (
    <section className={Styles.section}>
      <SectionHead en="Bridal Fair" ja="ブライダルフェア" href="bridal-fair" />
      <div className={Styles.options}>
        <div className={options ? `${Styles.option} ${Styles.active}` : Styles.option} onClick={() => setOptions(true)}>
          {options ? <Image src="/images/icon_top_contents-active.svg" alt="" width={16} height={14} /> : <Image src="/images/icon_top_contents.svg" alt="" width={16} height={14} />}
          <div className={Styles.optionTitle}>フェア内容で探す</div>
        </div>
        <div className={!options ? `${Styles.option} ${Styles.active}` : Styles.option} onClick={() => setOptions(false)}>
          {options ? <Image src="/images/icon_top_date-active.svg" alt="" width={13} height={12} /> : <Image src="/images/icon_top_date.svg" alt="" width={13} height={12} />}
          <div className={Styles.optionTitle}>開催日時で探す</div>
        </div>
      </div>
      <div className={Styles.container}>
        {options ? (
          <>
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
                {lists.map((elem, index) => {
                  //
                  const latestDate = new Date(elem.calendar[0].values.calendar);
                  const yyyymm = latestDate.getFullYear() + "." + ("0" + (latestDate.getMonth() + 1)).slice(-2);
                  const date = ("0" + latestDate.getDate()).slice(-2);
                  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][latestDate.getDay()];

                  return (
                    <SwiperSlide className={`${Styles.block} fadeinTop`} data-delay={0.2 * index} key={`bridalfair0${index + 1}`}>
                      <Link href={`/fair/${elem.code}`}>
                        <div className={Styles.image}>
                          <picture>
                            <source srcSet={elem.mainPc.url} />
                            <img src={elem.mainPc.url} alt="" width={elem.mainPc.attributes.width} height={elem.mainPc.attributes.height} />
                          </picture>
                          <div className={Styles.tag}>
                            <div className={Styles.yyyy_mm}>{yyyymm}</div>
                            <div className={Styles.dd}>{date}</div>
                            <div className={Styles.weekdays}>{weekdays}</div>
                          </div>
                        </div>
                        <div className={Styles.contents}>
                          {/* <div className={Styles.when}>{elem.when}</div> */}
                          <div className={Styles.description} dangerouslySetInnerHTML={{ __html: elem.description }}></div>
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
          </>
        ) : (
          <div className={`${Styles.main} ${Styles.week}`}>
            <div className={Styles.weekends}>
              <div className={Styles.weekendsHead}>
                <div className={Styles.en}>Weekend Fair</div>
                <div className={Styles.ja}>週末開催フェア</div>
              </div>

              <div className={Styles.selects}>
                {weekend.map((date, index) => {
                  if (index > 1) return;
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
                slidesPerView={2}
                centeredSlides={true}
                initialSlide={1}
                breakpoints={{
                  769: {
                    slidesPerView: 2,
                    centeredSlides: false,
                    spaceBetween: 25,
                  },
                }}
              >
                {weekendLists.length ? (
                  weekendLists.map((content, index) => {
                    const date = [...weekend].filter((date, index) => {
                      return date.selected;
                    });

                    if (index > 1) return;
                    // 文字数制限関数
                    const textLimit = (text: string, num: number) => {
                      if (text.length > num) {
                        return text.slice(0, num) + "...";
                      } else {
                        return text;
                      }
                    };

                    return (
                      <SwiperSlide className={`${Styles.content} fadeinTop`} data-delay={0.2 * index} key={`weekendfair${index + 1}`}>
                        <Link href={`/fair/${content.code}`}>
                          <div className={Styles.image}>
                            <img src={content.mainPc.url} alt="" width={content.mainPc.attributes.width} height={content.mainPc.attributes.height} />
                          </div>
                          <div className={Styles.date}>{date[0].date}</div>
                          <div className={Styles.description}>{textLimit(content.description, 50)}</div>
                        </Link>
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <div className={Styles.nothing}>お探しのコンテンツが見つかりませんでした。</div>
                )}
              </Swiper>
            </div>

            <div className={Styles.calendar}>
              <CalendarTOP events={events} toFairLists />
            </div>
          </div>
        )}
        <div className={Styles.link}>
          <LinkToLists href="/fair" text="フェア一覧を見る" />
        </div>
      </div>
    </section>
  );
};

export default TopBridalFair;
