import React, { useState } from "react";

const useNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (boolean?: boolean) => {
    setIsOpen(boolean === false ? boolean : !isOpen);
  };

  const childProps = {
    toggleOpen,
    isOpen,
  };

  return { childProps };
};

export default useNav;
