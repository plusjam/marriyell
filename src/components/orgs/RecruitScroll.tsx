import React from "react";
import Styles from "@/styles/orgs/RecruitScroll.module.scss";
import ScrollBox from "../mols/ScrollBox";

type Props = {
  links: {
    title: string;
    to: string;
  }[];
};

const RecruitScroll = (props: Props) => {
  const { links } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.body}>
          <ScrollBox scrolls={links} />
        </div>
      </div>
    </section>
  );
};

export default RecruitScroll;
