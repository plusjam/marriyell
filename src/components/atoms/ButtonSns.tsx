import Link from "next/link";
import React from "react";
import Atoms from "../../styles/atoms/Atoms.module.scss";
import Image from "next/image";
import { useMediaQuery } from "../../../libs/useMediaQuery";

const ButtonSns = () => {
  const isPc = useMediaQuery(768, "min");

  return (
    <div className={Atoms.buttons}>
      <Link className={Atoms.button} href="https://www.facebook.com/marriyell.takasaki" target="_blank">
        <picture>
          <img src={isPc ? "/images/button_facebook.svg" : "/images/button_facebook-dark.svg"} alt="Facebook" width={40} height={40} />
        </picture>
      </Link>
      <Link className={Atoms.button} href="https://www.instagram.com/marriyell.takasaki/" target="_blank">
        <picture>
          <img src={isPc ? "/images/button_instagram.svg" : "/images/button_instagram-dark.svg"} alt="Instagram" width={40} height={40} />
        </picture>
      </Link>
    </div>
  );
};

export default ButtonSns;
