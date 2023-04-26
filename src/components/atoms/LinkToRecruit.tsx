import Link from "next/link";
import React from "react";
import Atoms from "../../styles/atoms/Atoms.module.scss";

const LinkToRecruit = () => {
  return (
    <div className={Atoms.recruit}>
      <Link href="" className={Atoms.recruitInner}>
        2023年度採用情報
      </Link>
    </div>
  );
};

export default LinkToRecruit;
