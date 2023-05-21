import React from "react";
import Styles from "@/styles/mols/ScrollBox.module.scss";
import ScrollBoxLink from "../atoms/ScrollBoxLink";

type Props = {
  scrolls: {
    to: string;
    title: string;
  }[];
};

const ScrollBox = (props: Props) => {
  const { scrolls } = props;

  return (
    <div className={Styles.scrolls}>
      {scrolls.map((scroll) => (
        <ScrollBoxLink key={scroll.to} to={scroll.to} title={scroll.title} />
      ))}
    </div>
  );
};

export default ScrollBox;
