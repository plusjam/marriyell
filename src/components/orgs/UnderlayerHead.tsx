import React from "react";
import Styles from "@/styles/orgs/UnderlayerHead.module.scss";

type Props = {
  en?: string;
  ja: string;
  image: string;
  spImage: string;
};

const UnderlayerHead = (props: Props) => {
  const { en, ja, image, spImage } = props;

  return (
    <section className={Styles.section}>
      <h1 className={Styles.title}>
        {en ? (
          <>
            <span className={Styles.en}>{en}</span>
            <span className={Styles.ja}>{ja}</span>
          </>
        ) : (
          <span className={`${Styles.ja} ${Styles.only}`} dangerouslySetInnerHTML={{ __html: ja }}></span>
        )}
      </h1>
      <picture className={Styles.picture}>
        <source srcSet={image} media="(min-width: 768px)" />
        <source srcSet={spImage} media="" />
        <img src={image} alt="" width={1440} height={318.2} />
      </picture>
    </section>
  );
};

export default UnderlayerHead;
