import React from "react";
import Styles from "../../styles/orgs/Underlayer1.module.scss";
import Images from "../../styles/atoms/Images.module.scss";
import Image from "next/image";
import { useMediaQuery } from "../../../libs/useMediaQuery";

type Props = {
  image: string;
  spImage: string;
  en: string;
  ja: string;
  copy: string;
};

const Underlayer1 = (props: Props) => {
  const { image, spImage, en, ja, copy } = props;

  const isPc = useMediaQuery(768, "min");

  return (
    <div className={`${Styles.container}`}>
      <div className={Styles.main}>
        <div className={Styles.image}>
          <Image src={image} alt="" width={1440} height={480} priority className={Images.pc} />
          <Image src={spImage} alt="" width={375} height={375} priority className={Images.sp} />
        </div>
        <div className={Styles.title}>
          <div className={Styles.en}>{en}</div>
          <hr className={Styles.hr} />
          <div className={Styles.ja}>{ja}</div>
        </div>
      </div>

      <div
        className={Styles.copy}
        dangerouslySetInnerHTML={{
          __html: copy,
        }}
      ></div>
    </div>
  );
};

export default Underlayer1;
