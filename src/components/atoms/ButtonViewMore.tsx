import React from "react";
import Styles from "@/styles/atoms/ButtonViewMore.module.scss";
import { Status } from "../../../libs/useApi";

type Props = {
  clickViewMore: () => void;
  status: Status;
};

const ButtonViewMore = (props: Props) => {
  const { clickViewMore, status } = props;

  return (
    <div className={Styles.more}>
      {status === "success" && (
        <button className={Styles.button} onClick={() => clickViewMore()}>
          View More
        </button>
      )}
      {status === "idle" && (
        <button className={Styles.button} onClick={() => clickViewMore()}>
          View More
        </button>
      )}
      {status === "loading" && (
        <button className={Styles.button} disabled>
          Loading...
        </button>
      )}
    </div>
  );
};

export default ButtonViewMore;
