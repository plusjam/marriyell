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
      <picture>
        <source srcSet="/images/art_logo_tate.png" type="image/png" />
        <img src="/images/art_logo_tate.png" alt="" width={171} height={173} />
      </picture>
    </div>
  );
};

export default Loading;
