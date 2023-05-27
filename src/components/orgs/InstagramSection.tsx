import React, { useEffect } from "react";
import Styles from "../../styles/orgs/InstagramSection.module.scss";
import Image from "next/image";

const InstagramSection = () => {
  useEffect(() => {
    // const fetchPosts = async () => {
    //   try {
    //     const response = await fetch("/api/instagram");
    //     const data = await response.json();
    //     console.log("データ", data);
    //   } catch (error) {
    //     console.error("エラー", error);
    //   }
    // };
    // fetchPosts();
  }, []);

  return (
    <section className={Styles.section}>
      <div className={Styles.head}>
        <div className={Styles.headText}>Instagram</div>
        <div className={Styles.haedIcon}>
          {/* <Image src="/images/icon_instagram.svg" alt="Instagram" width={41} height={41} /> */}
          <picture>
            <source srcSet="/images/art_logo.svg" type="image/svg" />
            <img src="/images/icon_instagram.svg" alt="Instagram" width={41} height={41} />
          </picture>
        </div>
      </div>
      <div className={Styles.container}>調整中</div>
    </section>
  );
};

export default InstagramSection;
