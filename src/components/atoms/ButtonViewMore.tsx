import React from "react";
import Styles from "@/styles/atoms/ButtonViewMore.module.scss";

type Props = {
  clickViewMore: () => void;
};

const ButtonViewMore = (props: Props) => {
  const { clickViewMore } = props;

  return (
    <div className={Styles.more}>
      <button className={Styles.button} onClick={() => clickViewMore()}>
        View More
      </button>
    </div>
  );
};

export default ButtonViewMore;
