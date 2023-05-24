import Image from "next/image";
import React, { useEffect } from "react";
import Styles from "../../styles/libs/Pagination.module.scss";

type Props = {
  location: string;
};

const Pagination = (props: Props) => {
  const { location } = props;
  const [hide, setHide] = React.useState(false);

  useEffect(() => {
    setHide(false);

    setTimeout(() => {
      setHide(true);
    }, 1100);
  }, [location]);

  return (
    <div className={hide ? `${Styles.body} ${Styles.hide}` : Styles.body}>
      {/* <Image src="/images/art_logo-nocolor.svg" alt="" width={171} height={173} /> */}
      <picture>
        <source srcSet="/images/art_logo_tate.png" type="image/png" />
        <img src="/images/art_logo-tater.png" alt="" width={171} height={173} />
      </picture>
    </div>
  );
};

export default Pagination;
