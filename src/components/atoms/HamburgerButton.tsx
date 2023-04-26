import React from "react";
import Styles from "../../styles/atoms/Atoms.module.scss";
import Header from "../../styles/orgs/Header.module.scss";

type Props = {
  isOpen: Boolean;
  isTop: Boolean;
};

const HamburgerButton = (props: Props) => {
  const { isOpen, isTop } = props;

  return (
    <div className={isOpen ? `${Styles.hamburger} ${Styles.open} ${Header.hamburgerMenu}` : `${Styles.hamburger} ${Header.hamburgerMenu}`}>
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default HamburgerButton;
