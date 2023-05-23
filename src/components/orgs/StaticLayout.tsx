import React from "react";
import Styles from "@/styles/orgs/StaticLayout.module.scss";
import Image from "next/image";
import StaticSubHead from "../atoms/StaticSubHead";
import { Content } from "@/textDate/guest";
import PriceTable from "../mols/PriceTable";
import { useMediaQuery } from "../../../libs/useMediaQuery";

type Props = {
  contents: Content;
};

const StaticLayout = (props: Props) => {
  const { contents } = props;

  const is1440 = useMediaQuery(1440, "min");

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.body}>
          <div className={Styles.imageArea}>
            <div className={Styles.title}>{contents.title}</div>
            <div className={Styles.image}>
              <Image src={contents.src} alt="" width={496} height={284} />
            </div>
          </div>

          <div className={Styles.contents}>
            <StaticSubHead title={contents.contentTitle} caption={contents.caption} />
            <div className={Styles.content}>
              {contents.table.map((content, index) => {
                return <PriceTable title={content.title} prices={content.prices} key={`pricetable${index}`} />;
              })}
            </div>

            {is1440 && (
              <div className={Styles.banners}>
                {contents.banners.map((content, index) => {
                  return (
                    <div className={Styles.banner} key={`banner${index}`}>
                      <Image className={Styles.bannerImage} src={content} alt="" width={336} height={143} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {!is1440 && (
          <div className={Styles.banners}>
            {contents.banners.map((content, index) => {
              return (
                <div className={Styles.banner} key={`banner${index}`}>
                  <Image className={Styles.bannerImage} src={content} alt="" width={336} height={143} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default StaticLayout;
