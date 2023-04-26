import Link from "next/link";
import React from "react";
import IconArrow from "./IconArrow";
import Styles from "../../styles/atoms/Atoms.module.scss";

type Props = {
  href: string;
  text: string;
  target?: boolean;
};

const LinkToLists = (props: Props) => {
  const { href, text, target = false } = props;

  return (
    <Link className={Styles.link} href={href} target={target ? "_blank" : ""}>
      <span className={Styles.text}>{text}</span>
      <span className={Styles.arrow}>
        <IconArrow />
      </span>
    </Link>
  );
};

export default LinkToLists;
