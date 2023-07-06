import Link from "next/link";
import React from "react";
import Atoms from "../../styles/atoms/Atoms.module.scss";
import Image from "next/image";

const ButtonSns = () => {
  return (
    <div className={Atoms.buttons}>
      <Link className={Atoms.button} href="https://www.facebook.com/marriyell.takasaki" target="_blank">
        <Image src="/images/button_facebook.svg" alt="Facebook" width={40} height={40} />
      </Link>
      <Link className={Atoms.button} href="https://www.instagram.com/marriyell.takasaki/" target="_blank">
        <Image src="images/button_instagram.svg" alt="Facebook" width={40} height={40} />
      </Link>
    </div>
  );
};

export default ButtonSns;
