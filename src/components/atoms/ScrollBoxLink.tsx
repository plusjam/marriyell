import React from "react";
import { Link } from "react-scroll";
import Styles from "@/styles/atoms/ScrollBoxLink.module.scss";

type Props = {
  to: string;
  title: string;
};

const ScrollBoxLink = (props: Props) => {
  const { to, title } = props;

  return (
    <Link to={to} className={Styles.scroll} smooth offset={-80}>
      <div className={Styles.title} dangerouslySetInnerHTML={{ __html: title }}></div>
    </Link>
  );
};

export default ScrollBoxLink;
