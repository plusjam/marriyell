import React from "react";
import Styles from "@/styles/orgs/UnderlayerHead.module.scss";
import Images from "@/styles/atoms/Images.module.scss";
import Image from "next/image";

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
        <Image src={image} alt="" width={1440} height={318.2} className={Images.pc} />
        <Image src={spImage} alt="" width={375} height={375} className={Images.sp} />
      </picture>
    </section>
  );
};

export default UnderlayerHead;
