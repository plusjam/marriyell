import React from "react";
import Styles from "@/styles/atoms/BridalProcessBlock.module.scss";
import Image from "next/image";
import Link from "next/link";

type Props = {
  index: number;
  src: string;
  title: string;
  time?: string;
  description: string;
  link?: {
    to: string;
    text: string;
  };
};

const BridalProcessBlock = (props: Props) => {
  const { index, src, title, time, description, link } = props;
  return (
    <div className={Styles.block}>
      <div className={Styles.image}>
        <Image src={src} alt="" width={180} height={180} />
      </div>
      <div className={Styles.contents}>
        <div className={Styles.head}>
          <div className={Styles.step}>Step0{index + 1}</div>
          <div className={Styles.title}>{title}</div>
          {time && (
            <div className={Styles.time}>
              所要時間：<span>{time}</span>分
            </div>
          )}
        </div>
        <div className={Styles.description} dangerouslySetInnerHTML={{ __html: description }}></div>
        {link && (
          <Link className={Styles.link} href={link.to}>
            {link.text}
          </Link>
        )}
      </div>
    </div>
  );
};

export default BridalProcessBlock;
