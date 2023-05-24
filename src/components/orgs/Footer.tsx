import Image from "next/image";
import React from "react";
import Styles from "../../styles/orgs/Footer.module.scss";
import Atoms from "../../styles/atoms/Atoms.module.scss";
import Link from "next/link";
import { sitemapLinks } from "../../textDate";
import { useMediaQuery } from "../../../libs/useMediaQuery";
import ButtonSns from "../atoms/ButtonSns";
import LinkToRecruit from "../atoms/LinkToRecruit";

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        <div className={Styles.body}>
          <div className={Styles.logo}>
            <picture>
              <source srcSet="/images/art_logo_tate.png" type="image/png" />
              <img src="/images/art_logo-nocolor.svg" alt="lu CREA" width={171} height={173} />
            </picture>
            <div className={Styles.title}>
              <span>マリエール高崎 </span>
              <span className={Styles.pc}>│</span>
              <span>群馬・高崎の結婚式場</span>
            </div>
          </div>

          <div className={Styles.main}>
            <div className={Styles.title}>
              <span>マリエール高崎 </span>
              <span className={Styles.pc}>│</span>
              <span>群馬・高崎の結婚式場</span>
            </div>
            <div className={Styles.zipcode}>〒370-0069</div>
            <div className={Styles.address}>
              <span className={Styles.addressIcon}>
                <picture>
                  <source srcSet="/images/icon_spot.svg" type="image/png" />
                  <img src="/images/icon_spot.svg" alt="" width={23} height={23} />
                </picture>
              </span>
              群馬県高崎市飯塚町1361
            </div>
            <Link href="tel:0120-362-241" className={Styles.phone}>
              <span className={Styles.phoneIcon}>
                <picture>
                  <source srcSet="/images/icon_phone.svg" type="image/svg" />
                  <img src="/images/icon_phone.svg" alt="" width={15} height={15} />
                </picture>
              </span>
              0120-362-241
            </Link>
            <div className={Styles.info}>営業時間 平日：11:00~19:00／土日祝：09:30~20:00 (火曜定休)</div>
            <div className={Styles.infoLinks}>
              <ButtonSns />
              {/* <LinkToRecruit /> */}
            </div>
          </div>

          <div className={Styles.links}>
            {sitemapLinks.map((link, index) => {
              return (
                <Link href={link.href} className={Styles.link} key={index} target={""}>
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>

        <hr className={Styles.hr} />

        <div className={Styles.foot}>
          <div className={Styles.about}>
            <Link href="" target="_blank">
              会社概要
            </Link>
            <Link href="" target="_blank">
              プライバシポリシー
            </Link>
          </div>
          <div className={Styles.copy}>{`© 2016-${new Date().getFullYear()} lu CREA`}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
