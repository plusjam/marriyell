import { GetStaticProps } from "next";
import React, { useState } from "react";
import { NewsCategory, NewsContents, NewsList, NewsLists } from "../../../typings/news";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import Motion from "@/components/layouts/Motion";
import Head from "next/head";
import Styles from "@/styles/pages/News.module.scss";
import Link from "next/link";
import { apricotClient } from "../../../libs/cms";
import axios from "axios";
import InstagramSection from "@/components/orgs/InstagramSection";

type Props = {
  newsList: NewsList;
};

export type ContactDataNews = {
  title: string;
  name: string;
  furigana: string;
  phone: string;
  email: string;
  date?: string;
  time?: string;
  inquiry?: string;
};

const HOME = (props: Props) => {
  const { newsList } = props;

  const [data, setData] = useState<ContactDataNews>({
    title: newsList.title.replaceAll("<br>", " "),
    name: "",
    furigana: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    inquiry: "",
  });

  const handleData = (data: ContactDataNews) => {
    setData(data);
  };

  const publishDate = new Date(newsList.publishedAt);
  const year = publishDate.getFullYear();
  const month = publishDate.getMonth() + 1;
  const date = publishDate.getDate();
  const formatedDate = `${year}.${month}.${date}`;

  const pattern01 = (image: NewsList["description"][0]["values"]["image"], text: string) => {
    return (
      <div className={`${Styles.pattern} ${Styles.pattern01}`}>
        {/* 左にテキスト、右に画像 */}
        <div className={Styles.text}>
          <p className={Styles.p} dangerouslySetInnerHTML={{ __html: text.replaceAll("\n", "<br/>") }}></p>
        </div>

        <div className={Styles.image}>
          <img src={image?.url} alt="" width={image?.attributes.width} height={image?.attributes.height} />
        </div>
      </div>
    );
  };

  const pattern02 = (image: NewsList["description"][0]["values"]["image"], text: string) => {
    return (
      <div className={`${Styles.pattern} ${Styles.pattern02}`}>
        {/* 左に画像、右にテキスト */}
        <div className={Styles.image}>
          <img src={image?.url} alt="" width={image?.attributes.width} height={image?.attributes.height} />
        </div>

        <div className={Styles.text}>
          <p className={Styles.p} dangerouslySetInnerHTML={{ __html: text.replaceAll("\n", "<br/>") }}></p>
        </div>
      </div>
    );
  };

  const pattern03 = (text: string) => {
    return (
      <div className={`${Styles.pattern} ${Styles.pattern03}`}>
        {/* テキストのみ */}
        <div className={Styles.text}>
          <p className={Styles.p} dangerouslySetInnerHTML={{ __html: text.replaceAll("\n", "<br/>") }}></p>
        </div>
      </div>
    );
  };

  const pattern04 = (image: NewsList["description"][0]["values"]["image"]) => {
    return (
      <div className={`${Styles.pattern} ${Styles.pattern04}`}>
        {/* 画像のみ */}
        <div className={Styles.image}>
          <img src={image?.url} alt="" width={image?.attributes.width} height={image?.attributes.height} />
        </div>
      </div>
    );
  };

  const contents = (content: NewsList["articles"][0]["description"][0], index: number) => {
    let pattern = <></>;
    if (content.scheme.unique_id === "field1") pattern = pattern01(content.values.image!, content.values.text!);
    if (content.scheme.unique_id === "field2") pattern = pattern02(content.values.image!, content.values.text!);
    if (content.scheme.unique_id === "field3") pattern = pattern03(content.values.text!);
    if (content.scheme.unique_id === "field4") pattern = pattern04(content.values.image!);
    return <React.Fragment key={`field${index}`}>{pattern} </React.Fragment>;
  };

  return (
    <>
      <Motion>
        <Head>
          <title>{`${newsList.title}｜マリエール高崎`}</title>
        </Head>

        <main>
          <UnderlayerHead en="News ＆ Event" ja="お知らせ・イベント情報" image="/images/news_main.jpg" spImage="/images/news_main-sp.jpg" />

          <div className={Styles.container}>
            <section className={Styles.header}>
              <div className={Styles.meta}>
                <ul className={Styles.categories}>
                  {newsList.categories.articles.map((category, index) => (
                    <li className={Styles.category} key={`newscategory${index}`}>
                      {category.title}
                    </li>
                  ))}
                </ul>
                <p className={Styles.date}>{formatedDate}</p>
              </div>
              <h2 className={Styles.title}>{newsList.title}</h2>
            </section>

            <section className={Styles.contents}>{newsList.description.map((content, index) => contents(content, index))}</section>

            <section className={Styles.actions}>
              <Link href={`/news/${newsList.prevCode}`} className={newsList.prevCode ? Styles.prev : `${Styles.prev} ${Styles.none}`}>
                前へ
              </Link>
              <Link href="/news" className={Styles.toLists}>
                一覧に戻る
              </Link>
              <Link href={`/news/${newsList.nextCode}`} className={newsList.nextCode ? Styles.next : `${Styles.next} ${Styles.none}`}>
                次へ
              </Link>
            </section>
          </div>

          <InstagramSection />
        </main>
      </Motion>
    </>
  );
};

export default HOME;

export const getStaticPaths = async () => {
  const accessKey = process.env.API_KEY;
  const secretKey = process.env.API_SECRET;
  const token = await apricotClient(accessKey, secretKey);

  /* ===================================================================
  // お知らせ
  =================================================================== */
  const newsUrl = `${process.env.CMS_URL}/api/v1/news`;
  const newsRes: { data: NewsLists } = await axios.get(newsUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const paths = newsRes.data.articles.map((news) => `/news/${news.code}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) return { props: {} };
  const code = context.params.id;
  const accessKey = process.env.API_KEY;
  const secretKey = process.env.API_SECRET;
  const token = await apricotClient(accessKey, secretKey);

  /* ===================================================================
  // お知らせ
  =================================================================== */
  const newsUrl = `${process.env.CMS_URL}/api/v1/news/${code}`;
  const newsRes: { data: NewsList } = await axios.get(newsUrl, {
    headers: {
      "Content-Type": "application/json",
      "account-access-key": accessKey,
      "account-secret-key": secretKey,
      authorization: `Bearer ${token.token}`,
    },
  });

  const newsList: NewsList = newsRes.data;

  return {
    props: {
      newsList,
    },
  };
};
