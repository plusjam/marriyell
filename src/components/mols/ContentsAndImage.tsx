import React from "react";
import Styles from "../../styles/mols/ContentsAndImage.module.scss";
import Image from "next/image";
import IconArrow from "../atoms/IconArrow";
import Link from "next/link";
import { useMediaQuery } from "../../../libs/useMediaQuery";

type Props = {
  en: string;
  ja: string;
  description: string;
  href?: string;
  image: string;
  spImage: string;
  reverse?: boolean;
};

const ContentsAndImage = (props: Props) => {
  const { en, ja, description, href, image, spImage, reverse = false } = props;

  const isPc = useMediaQuery(768, "min");

  return (
    <div className={reverse ? `${Styles.item} ${Styles.reverse} fadein` : `${Styles.item} fadein`} id={en.toLocaleLowerCase().replaceAll(" ", "_")}>
      <div className={Styles.contents}>
        <div className={Styles.title}>
          <div className={Styles.en}>{en}</div>
          <h3 className={Styles.ja}>{ja}</h3>
        </div>
        <div
          className={Styles.description}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></div>
        {href && (
          <Link className={Styles.link} href={href}>
            Read more
            <span className={Styles.arrow}>
              <IconArrow />
            </span>
          </Link>
        )}
      </div>
      <div className={Styles.image}>
        <picture>
          <source srcSet={image} type="image/png" media="(min-width: 768px)" />
          <source srcSet={spImage} type="image/png" />
          <img src={image} alt="" className="fadein" />
        </picture>
      </div>
    </div>
  );
};

export default ContentsAndImage;
