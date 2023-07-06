import Link from "next/link";
import Styles from "../../styles/orgs/HamburgerMenu.module.scss";
import { sitemapLinks } from "../../textDate";
import ButtonSns from "../atoms/ButtonSns";
import HamburgerButton from "../atoms/HamburgerButton";
import LinkToBridalFair from "../atoms/LinkToBridalFair";
import Image from "next/image";

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
        <div className={Styles.main}>
          <Link href="tel:0120-362-241" className={Styles.phone}>
            <span className={Styles.phoneIcon}>
              <Image src="/images/icon_phone-white.svg" alt="" width={25} height={25} />
            </span>
            0120-362-241
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
              <Link href={link.href} className={Styles.link} key={index} target={""}>
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>

      <div className={Styles.foot}>
        <div className={Styles.name}>
          『マリエール高崎』
          <br />
          <span>群馬・高崎の結婚式場</span>
        </div>
        <ButtonSns />
        {/* <LinkToRecruit /> */}
      </div>
    </div>
  );
};

export default HamburgerMenu;
