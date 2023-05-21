import React from "react";
import Styles from "@/styles/orgs/Access.module.scss";
import { ACCESS } from "@/textDate/access";
import Image from "next/image";

const Access = () => {
  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <h2 id="access" className={Styles.head}>
          {ACCESS.title}
        </h2>
        <div className={Styles.logo}>
          <Image src={ACCESS.logo} alt="" width={170} height={172} />
        </div>
        <div className={Styles.body}>
          {ACCESS.contents.map((content, index) => {
            return (
              <div className={Styles.content} key={`access${index}`}>
                <div className={Styles.key}>{content.key}</div>
                <div className={Styles.value} dangerouslySetInnerHTML={{ __html: content.value }}></div>
              </div>
            );
          })}
        </div>
        <div className={Styles.map} dangerouslySetInnerHTML={{ __html: ACCESS.map }}></div>
      </div>
    </section>
  );
};

export default Access;
