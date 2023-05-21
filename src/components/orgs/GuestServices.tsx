import React from "react";
import Styles from "@/styles/orgs/GuestServices.module.scss";
import Image from "next/image";

type Props = {
  title: string;
  contents: {
    title: string;
    caption: string;
    src: string;
  }[];
};

const GuestServices = (props: Props) => {
  const { title, contents } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <h2 id="service" className={Styles.head}>
          {title}
        </h2>
        <div className={Styles.body}>
          {contents.map((content, index) => {
            return (
              <div className={Styles.block} key={`guestservices${index}`}>
                <div className={Styles.image}>
                  <Image src={content.src} alt="" width={100} height={100} />
                </div>
                <div className={Styles.content}>
                  <div className={Styles.title}>{content.title}</div>
                  <div className={Styles.caption} dangerouslySetInnerHTML={{ __html: content.caption }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GuestServices;
