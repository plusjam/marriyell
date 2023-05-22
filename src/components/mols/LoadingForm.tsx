import React from "react";
import Styles from "../../styles/mols/FormStatus.module.scss";

const LoadingForm = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.loader}></div>
    </div>
  );
};

export default LoadingForm;
