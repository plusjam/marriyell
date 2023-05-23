import React, { use } from "react";
import Styles from "../../styles/orgs/TopNewsEvent.module.scss";
import SectionHead from "../mols/SectionHead";
import LinkToLists from "../atoms/LinkToLists";
import { NewsContents } from "../../../typings/news";
import Link from "next/link";
import { IMAGELINKS } from "@/textDate";
import Image from "next/image";
import { useMediaQuery } from "../../../libs/useMediaQuery";

type Props = {
  contents: NewsContents[];
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
      <SectionHead en="News & Event" ja="お知らせ・イベント" href="news-event" />
      <div className={Styles.container}>
        <div className={Styles.lists}>
          {limitedContents.map((content, index) => {
            // content.updatedDateをyyyy/mm/ddに変換
            const date = new Date(content.updatedDate);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const updatedDate = `${year}/${month}/${day}`;

            // content.descriptionの文字数制限
            const description = content.description;
            const limit = isPc ? 42 : 20;
            const descriptionLimit = description.length > limit ? description.substring(0, limit) + "..." : description;

            return (
              <Link href={`/news/${content.id}`} className={Styles.list} key={`news${index}`}>
                <div className={Styles.image}>
                  <img src={content.src} alt={content.title} />
                </div>
                <div className={Styles.content}>
                  <div className={Styles.description}>{descriptionLimit}</div>
                  <div className={Styles.date}>{updatedDate}</div>
                  <div className={Styles.categories}>
                    {content.category.map((category, index) => {
                      return (
                        <div className={Styles.category} key={`category${index}`}>
                          {category.label}
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
