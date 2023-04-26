import Image from "next/image";
import Link from "next/link";
import { navList } from "../../../textDate";
import Styles from "../../styles/orgs/Header.module.scss";
import HamburgerButton from "../atoms/HamburgerButton";
import LinkToBridalFair from "../atoms/LinkToBridalFair";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useEffect } from "react";

type Props = {
  toggleOpen: () => void;
  isOpen: Boolean;
  isTop?: Boolean;
};

const Header = (props: Props) => {
  const { toggleOpen, isOpen, isTop = false } = props;

  const ref = React.useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const header = document.querySelector("header") as HTMLElement;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#original-wedding",
        start: "top top",
        onEnter: () => {
          header.classList.add(Styles.colored);
        },
        onLeaveBack: () => {
          header.classList.remove(Styles.colored);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className={isTop ? `${Styles.header} ${Styles.isTop}` : Styles.header} ref={ref}>
      <div className={Styles.logo}>
        <Link href="/">
          <Image src="/images/art_logo_long.svg" alt="ル・クレア" width={145} height={34} />
        </Link>
      </div>

      <div className={Styles.main}>
        <div className={Styles.phone}>
          <div className={Styles.phoneIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
              <path
                id="icon_phone"
                d="M4.071,0H8.036a2.283,2.283,0,0,1,2.217,1.73L11.3,5.918A2.3,2.3,0,0,1,9.8,8.639L7.826,9.3a1.663,1.663,0,0,0-1.1,1.9A10.3,10.3,0,0,0,14.8,19.279a1.659,1.659,0,0,0,1.9-1.1l.53-1.594a2.286,2.286,0,0,1,3.191-1.322l4.314,2.157A2.273,2.273,0,0,1,26,19.46v2.468A4.076,4.076,0,0,1,21.929,26H18.357A18.3,18.3,0,0,1,5.377,20.623,18.3,18.3,0,0,1,0,7.643V4.071A4.076,4.076,0,0,1,4.071,0ZM15.126,20.312a2.674,2.674,0,0,1-.523-.052A11.3,11.3,0,0,1,5.742,11.4,2.665,2.665,0,0,1,7.51,8.351L9.488,7.69a1.292,1.292,0,0,0,.841-1.53L9.283,1.973A1.284,1.284,0,0,0,8.036,1H4.071A3.075,3.075,0,0,0,1,4.071V7.643A17.357,17.357,0,0,0,18.357,25h3.571A3.075,3.075,0,0,0,25,21.929V19.461a1.279,1.279,0,0,0-.711-1.149l-4.314-2.157a1.292,1.292,0,0,0-.575-.136,1.286,1.286,0,0,0-1.22.879l-.53,1.594A2.657,2.657,0,0,1,15.126,20.312Z"
              />
            </svg>
          </div>
          <Link className={Styles.number} href="tel:0773-24-1101">
            0773-24-1101
          </Link>
        </div>
        <div className={Styles.nav}>
          {navList.map((item, index) => {
            return (
              <Link href={item.href} key={index} className={Styles.navItem} target={item?.blank ? "_blank" : ""}>
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>

      <div className={Styles.bridal}>
        <LinkToBridalFair isOpen={isOpen} />
      </div>

      <div className={Styles.hamburger} onClick={() => toggleOpen()}>
        <HamburgerButton isOpen={isOpen} isTop={isTop} />
      </div>
    </header>
  );
};

export default Header;
