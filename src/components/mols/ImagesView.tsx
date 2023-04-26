import React from "react";
import Styles from "../../styles/mols/ImagesView.module.scss";
import Image from "next/image";
import { useMediaQuery } from "../../../libs/useMediaQuery";

type Props = {
  copy: string;
  description: string;
  image02: string;
  spImage02: string;
  image03: string;
  spImage03: string;
  image04: string;
  spImage04: string;
  reverse?: boolean;
};

const ImagesView = (props: Props) => {
  const { copy, description, image02, spImage02, image03, spImage03, image04, spImage04, reverse = false } = props;

  const isPc = useMediaQuery(768, "min");

  return (
    <div className={reverse ? `${Styles.container} ${Styles.reverse}` : Styles.container}>
      <div className={Styles.main}>
        <div className={Styles.image02}>
          <picture>
            <source srcSet={image02} type="image/png" media="(min-width: 768px)" />
            <source srcSet={spImage02} type="image/png" />
            <img src={image02} alt="" loading="lazy" className="fadein" />
          </picture>
        </div>
        <div className={Styles.contents}>
          <div className={Styles.copy}>{copy}</div>
          <div className={Styles.description}>{description}</div>
        </div>
      </div>
      <div className={Styles.images}>
        <div className={Styles.image03}>
          {/* <Image src={isPc ? image03 : spImage03} alt="" width={306} height={306} loading="eager" className="fadein" /> */}
          <picture>
            <source srcSet={image03} type="image/png" media="(min-width: 768px)" />
            <source srcSet={spImage03} type="image/png" />
            <img src={image03} alt="" loading="lazy" className="fadein" />
          </picture>
        </div>
        <div className={Styles.image04}>
          {/* <Image src={isPc ? image04 : spImage04} alt="" width={306} height={306} loading="eager" className="fadein" /> */}
          <picture>
            <source srcSet={image04} type="image/png" media="(min-width: 768px)" />
            <source srcSet={spImage04} type="image/png" />
            <img src={image04} alt="" loading="lazy" className="fadein" />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default ImagesView;
