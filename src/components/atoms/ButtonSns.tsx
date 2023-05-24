import Link from "next/link";
import React from "react";
import Atoms from "../../styles/atoms/Atoms.module.scss";
import Image from "next/image";

const ButtonSns = () => {
  return (
    <div className={Atoms.buttons}>
      <Link className={Atoms.button} href="https://www.facebook.com/lucrea.fukuchiyama" target="_blank">
        {/* <Image src="/images/button_facebook.svg" alt="Facebook" width={40} height={40} /> */}
        <picture>
          <source srcSet="/images/art_logo.svg" type="image/svg" />
          <img src="/images/button_facebook.svg" alt="Facebook" width={40} height={40} />
        </picture>
      </Link>
      <Link className={Atoms.button} href="https://www.instagram.com/lucrea_wedding/" target="_blank">
        {/* <Image src="/images/button_instagram.svg" alt="Instagram" width={40} height={40} /> */}
        <picture>
          <source srcSet="/images/art_logo.svg" type="image/svg" />
          <img src="/images/button_instagram.svg" alt="Instagram" width={40} height={40} />
        </picture>
      </Link>
      {/* <Link className={Atoms.button} href="https://page.line.me/kbm7305t" target="_blank">
        <picture>
          <source srcSet="/images/art_logo.svg" type="image/svg" />
          <img src="/images/button_line.svg" alt="LINE" width={40} height={40} />
        </picture>
      </Link> */}
    </div>
  );
};

export default ButtonSns;
