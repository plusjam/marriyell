import React, { use } from "react";
import Styles from "../../styles/orgs/TopNewsEvent.module.scss";
import SectionHead from "../mols/SectionHead";
import LinkToLists from "../atoms/LinkToLists";
import { NewsContents, NewsLists } from "../../../typings/news";
import Link from "next/link";
import { IMAGELINKS } from "@/textDate";
import Image from "next/image";
import { useMediaQuery } from "../../../libs/useMediaQuery";

type Props = {
  contents: NewsLists["articles"];
};

const TopNewsEvent = (props: Props) => {
  const { contents } = props;

  // contentsの要素数を4つに制限
  const limitedContents = contents.filter((content, index) => {
    return index < 4;
  });

  const isPc = useMediaQuery(768, "min");

  return (
    <section className={Styles.section}>
      <SectionHead en="News & Event" ja="お知らせ・イベント" href="news-event" isShort />
      <div className={Styles.container}>
        <div className={Styles.lists}>
          {limitedContents.map((content, index) => {
            // content.updatedDateをyyyy/mm/ddに変換
            const date = new Date(content.updatedAt);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const updatedDate = `${year}/${month}/${day}`;

            // descriptionから最初のtextを取得して文字数制限
            let firstText = "";
            content.description.some((elem) => {
              if (elem.values.text) {
                firstText = elem.values.text;
                return true;
              }
            });

            // descriptionの文字数制限
            const limit = isPc ? 45 : 20;
            const descriptionLimit = firstText.length > limit ? firstText.slice(0, limit) + "..." : firstText;
            const titleLimit = content.title.length > limit ? content.title.slice(0, limit) + "..." : content.title;

            return (
              <Link href={`/news/${content.code}`} className={Styles.list} key={`news${index}`}>
                <div className={Styles.image}>
                  <img src={content.eyecatch.url} alt={content.title} />
                </div>
                <div className={Styles.content}>
                  <div className={Styles.description}>{titleLimit}</div>
                  <div className={Styles.date}>{updatedDate}</div>
                  <div className={Styles.categories}>
                    {content.categories.articles.map((category, index) => {
                      if (!isPc && index > 0) return;
                      if (isPc && index > 1) return;

                      return (
                        <div className={Styles.category} key={`category${index}`}>
                          {category.title}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={Styles.link}>
          <LinkToLists href="/news" text="お知らせ一覧を見る" />
        </div>

        <div className={Styles.imageLinks}>
          {IMAGELINKS.map((imageLink, index) => {
            return (
              <Link href={imageLink.href} key={`imageLink${index}`} className={Styles.imageLink}>
                <Image src={imageLink.src} alt="" width={320} height={116} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopNewsEvent;
