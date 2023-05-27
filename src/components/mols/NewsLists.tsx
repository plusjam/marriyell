import React, { useEffect, useRef, useState } from "react";
import { NewsCategoriesLists, NewsCategory, NewsContents, NewsLists } from "../../../typings/news";
import Styles from "@/styles/mols/NewsLists.module.scss";
import Link from "next/link";
import { gsap } from "gsap";
import ButtonViewMore from "../atoms/ButtonViewMore";
import { NewsCategoriesListsSelect } from "@/pages/news";
import Image from "next/image";

type Props = {
  category: NewsCategoriesListsSelect["articles"];
  originalLists: NewsLists;
  clickViewMore: () => void;
};

const NewsLists = (props: Props) => {
  const { category, originalLists, clickViewMore } = props;

  const ref = useRef<HTMLUListElement | null>(null);

  // トータルの記事数とカウント数から次の記事があるかどうかを判定
  const next = originalLists.total / originalLists.count > 1 ? true : false;

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
        {originalLists.articles.length ? (
          originalLists.articles.map((elem, index) => {
            let formatedDescription: string = "";

            elem.description.values.some((elem) => {
              if (elem.text) {
                formatedDescription = elem.text;
                return true;
              }
            });

            return (
              <li className={Styles.list} key={`newslist${index}`}>
                <Link href={`/news/${elem.code}`} className={Styles.listInner}>
                  <figure className={Styles.image}>
                    <Image src={elem.eyecatch.url} width={elem.eyecatch.attributes.width} height={elem.eyecatch.attributes.height} alt="" />
                  </figure>
                  <div className={Styles.content}>
                    <div className={Styles.meta}>
                      <ul className={Styles.categories}>
                        {elem.categories.articles.map((elem, index) => {
                          return (
                            <li className={Styles.category} key={`category${index}`}>
                              <span>{elem.title}</span>
                            </li>
                          );
                        })}
                      </ul>
                      <p className={Styles.date}>{elem.publishedAt}</p>
                    </div>
                    <h2 className={Styles.title}>{elem.title}</h2>
                    <div className={Styles.description} dangerouslySetInnerHTML={{ __html: formatedDescription }}></div>
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
      {next && <ButtonViewMore clickViewMore={clickViewMore} />}
    </div>
  );
};

export default NewsLists;
