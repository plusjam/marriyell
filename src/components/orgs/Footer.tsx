import Image from "next/image";
import React from "react";
import Styles from "../../styles/orgs/Footer.module.scss";
import Atoms from "../../styles/atoms/Atoms.module.scss";
import Link from "next/link";
import { sitemapLinks } from "../../../textDate";
import { useMediaQuery } from "../../../libs/useMediaQuery";
import ButtonSns from "../atoms/ButtonSns";
import LinkToRecruit from "../atoms/LinkToRecruit";

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        <div className={Styles.body}>
          <div className={Styles.logo}>
            <Image src="/images/art_logo-nocolor.svg" alt="lu CREA" width={171} height={173} />
            <div className={Styles.title}>
              <span>lu CREA -ル・クレア- </span>
              <span className={Styles.pc}>│</span>
              <span>京都 福知山の結婚式場</span>
            </div>
          </div>

          <div className={Styles.main}>
            <div className={Styles.title}>
              <span>lu CREA -ル・クレア- </span>
              <span className={Styles.pc}>│</span>
              <span>京都 福知山の結婚式場</span>
            </div>
            <div className={Styles.zipcode}>〒352-0001</div>
            <div className={Styles.address}>
              <span className={Styles.addressIcon}>
                <Image src="/images/icon_spot.svg" alt="" width={23} height={23} />
              </span>
              京都府福知山市駅南町3-52
            </div>
            <Link href="tel:0773-24-1101" className={Styles.phone}>
              <span className={Styles.phoneIcon}>
                <Image src="/images/icon_phone.svg" alt="" width={15} height={15} />
              </span>
              0773-24-1101
            </Link>
            <div className={Styles.info}>営業時間 10:00 - 19:00（祝祭日を除く木曜日休館）</div>
            <div className={Styles.infoLinks}>
              <ButtonSns />
              {/* <LinkToRecruit /> */}
            </div>
          </div>

          <div className={Styles.links}>
            {sitemapLinks.map((link, index) => {
              return (
                <Link href={link.href} className={Styles.link} key={index} target={link?.blank ? "_blank" : ""}>
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>

        <hr className={Styles.hr} />

        <div className={Styles.foot}>
          <div className={Styles.about}>
            <Link href="https://lu-crea.sp-bridal.jp/company/" target="_blank">
              会社概要
            </Link>
            <Link href="https://mariage-collection.com/lucrea/privacy/" target="_blank">
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
