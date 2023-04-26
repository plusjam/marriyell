import Image from "next/image";
import React from "react";
import Styles from "../../styles/layouts/Loading.module.scss";

type Props = {
  isLoading: boolean;
};

const Loading = (props: Props) => {
  const { isLoading } = props;

  return (
    <div className={isLoading ? `${Styles.logo} ${Styles.active}` : Styles.logo}>
      <Image src="/images/art_logo-nocolor.svg" alt="" width={171} height={173} />
    </div>
  );
};

export default Loading;
