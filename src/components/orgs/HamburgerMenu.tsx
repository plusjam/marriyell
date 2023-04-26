import React from "react";
import Styles from "../../styles/orgs/HamburgerMenu.module.scss";
import Atoms from "../../styles/atoms/Atoms.module.scss";
import LinkToBridalFair from "../atoms/LinkToBridalFair";
import HamburgerButton from "../atoms/HamburgerButton";
import { sitemapLinks } from "../../../textDate";
import Link from "next/link";
import Image from "next/image";
import ButtonSns from "../atoms/ButtonSns";
import LinkToRecruit from "../atoms/LinkToRecruit";

type Props = {
  toggleOpen: () => void;
  isOpen: Boolean;
  isTop?: Boolean;
};

const HamburgerMenu = (props: Props) => {
  const { toggleOpen, isOpen, isTop = false } = props;

  return (
    <div className={isOpen ? `${Styles.section} ${Styles.open}` : `${Styles.section}`}>
      <div className={Styles.head}>
        <Link href="/" className={Styles.logo}>
          <Image src="/images/art_logo_long.svg" alt="lu CREA" width={145} height={34} />
        </Link>

        <div className={Styles.main}>
          <Link href="tel:0773-24-1101" className={Styles.phone}>
            <span className={Styles.phoneIcon}>
              <Image src="/images/icon_phone.svg" alt="" width={25} height={25} />
            </span>
            0773-24-1101
          </Link>
        </div>

        <div className={Styles.bridal}>
          <LinkToBridalFair isOpen={isOpen} />
        </div>

        <div className={Styles.menu} onClick={() => toggleOpen()}>
          <HamburgerButton isOpen={isOpen} isTop={isTop} />
        </div>
      </div>

      <div className={Styles.body}>
        <div className={Styles.links}>
          {sitemapLinks.map((link, index) => {
            return (
              <Link href={link.href} className={Styles.link} key={index} target={link?.blank ? "_blank" : ""} onClick={() => toggleOpen()}>
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>

      <div className={Styles.foot}>
        <div className={Styles.name}>
          lu CREA -ル・クレア- <br />
          <span>京都 福知山の結婚式場</span>
        </div>
        <ButtonSns />
        {/* <LinkToRecruit /> */}
      </div>
    </div>
  );
};

export default HamburgerMenu;
