import React, { useEffect, useRef, useState } from "react";
import { NewsCategory, NewsContents } from "../../../typings/news";
import Styles from "@/styles/mols/NewsLists.module.scss";
import Link from "next/link";
import { gsap } from "gsap";
import ButtonViewMore from "../atoms/ButtonViewMore";

type Props = {
  category: NewsCategory[];
  lists: NewsContents[];
  next: number | null;
  clickViewMore: () => void;
};

const NewsLists = (props: Props) => {
  const { category, lists, next, clickViewMore } = props;

  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.7,
          ease: "power2.inOut",
        }
      );
    }, ref);

    return () => {
      ctx.revert();
    };
  }, [category]);

  return (
    <div className={Styles.container}>
      <ul className={Styles.lists} ref={ref}>
        {lists.length ? (
          lists.map((elem, index) => {
            return (
              <li className={Styles.list} key={`newslist${index}`}>
                <Link href={`/news/${elem.id}`} className={Styles.listInner}>
                  <figure className={Styles.image}>
                    <img src={elem.src} width={124} height={124} alt="" />
                  </figure>
                  <div className={Styles.content}>
                    <div className={Styles.meta}>
                      <ul className={Styles.categories}>
                        {elem.category.map((elem, index) => {
                          return (
                            <li className={Styles.category} key={`category${index}`}>
                              <span>{elem.label}</span>
                            </li>
                          );
                        })}
                      </ul>
                      <p className={Styles.date}>{elem.publishDate}</p>
                    </div>
                    <h2 className={Styles.title}>{elem.title}</h2>
                    <div className={Styles.description}>{elem.description}</div>
                  </div>
                </Link>
              </li>
            );
          })
        ) : (
          <div className={Styles.nolists}>記事がありません</div>
        )}
      </ul>

      {/* more */}
      {lists.length >= 0 && typeof next === "number" && <ButtonViewMore clickViewMore={clickViewMore} />}
    </div>
  );
};

export default NewsLists;
