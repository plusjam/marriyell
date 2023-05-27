import { GetStaticProps } from "next";
import React from "react";
import { NewsCategory, NewsContents, NewsLists } from "../../../typings/news";
import UnderlayerHead from "@/components/orgs/UnderlayerHead";
import Motion from "@/components/layouts/Motion";
import Head from "next/head";
import Styles from "@/styles/pages/News.module.scss";
import Link from "next/link";
import { apricotClient } from "../../../libs/cms";
import axios from "axios";

type Props = {
  newsLists: NewsLists;
};

const HOME = (props: Props) => {
  const { newsLists } = props;

  return (
    <>
      <Motion>
        <Head>
          <title>{`記事タイトル｜マリエール高崎`}</title>
        </Head>

        <main>
          <UnderlayerHead en="News ＆ Event" ja="お知らせ・イベント情報" image="" spImage="" />

          <div className={Styles.container}>
            <section className={Styles.header}>
              <div className={Styles.meta}>
                <ul className={Styles.categories}>
                  <li className={Styles.category}>お知らせ</li>
                  <li className={Styles.category}>フェア</li>
                </ul>
                <p className={Styles.date}>2022/12/31</p>
              </div>
              <h2 className={Styles.title}>フォトマルシェ　2023年5月28開催予約スタート</h2>
            </section>

            <section className={Styles.contents}>
              <div className={`${Styles.pattern} ${Styles.pattern01}`}>
                {/* テキストのみ */}
                <div className={Styles.text}>
                  <p className={Styles.p}>テキストのみのセクションテキストのみのセクションテキストのみのセクションテキストのみのセクションテキストのみのセクションテキストのみのセクション。</p>
                  <p className={Styles.p}>テキストのみのセクションテキストのみのセクション</p>
                  <p className={Styles.p}>下は画像のみのセクション</p>
                </div>
              </div>

              <div className={`${Styles.pattern} ${Styles.pattern02}`}>
                {/* 画像のみ */}
                <div className={Styles.image}>
                  <img src="/images/sample01.png" alt="" width={840} height={300} />
                </div>
              </div>

              <div className={`${Styles.pattern} ${Styles.pattern03}`}>
                {/* 左に画像、右にテキスト */}
                <div className={Styles.image}>
                  <img src="/images/sample02.png" alt="" width={620} height={250} />
                </div>

                <div className={Styles.text}>
                  <p className={Styles.p}>
                    左に画像、右にテキスト左に画像、右にテキスト左に画像、右にテキスト左に画像、右にテキスト左に画像、右にテキスト左に画像、右にテキスト左に画像、右にテキスト。左に画像、右にテキスト左に画像、右にテキスト
                  </p>
                  <p className={Styles.p}>左に画像、右にテキスト左に画像、右にテキスト</p>
                </div>
              </div>

              <div className={`${Styles.pattern} ${Styles.pattern04}`}>
                {/* 左にテキスト、右に画像 */}
                <div className={Styles.image}>
                  <img src="/images/sample03.png" alt="" width={300} height={300} />
                </div>

                <div className={Styles.text}>
                  <p className={Styles.p}>左にテキスト、右に画像左にテキスト、右に画像左にテキスト、右に画像左にテキスト、右に画像左にテキスト、右に画像</p>
                  <p className={Styles.p}>左にテキスト、右に画像左にテキスト、右に画像左にテキスト、右に画像</p>
                </div>
              </div>
            </section>

            <section className={Styles.actions}>
              <Link href="" className={Styles.prev}>
                前へ
              </Link>
              <Link href="/news" className={Styles.toLists}>
                一覧に戻る
              </Link>
              <Link href="" className={Styles.next}>
                次へ
              </Link>
            </section>
          </div>

          {/* <InstagramSection /> */}
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
  // try {
  //   const newsUrl = `${process.env.CMS_URL}/api/v1/news/${code}`;
  //   const newsRes: { data: any } = await axios.get(newsUrl, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "account-access-key": accessKey,
  //       "account-secret-key": secretKey,
  //       authorization: `Bearer ${token.token}`,
  //     },
  //   });

  //   const newsLists: any = newsRes.data;

  //   console.log(newsLists);
  // } catch (e) {
  //   console.log(e);
  // }

  const newsLists: any = "newsRes.data";

  return {
    props: {
      newsLists,
    },
  };
};
