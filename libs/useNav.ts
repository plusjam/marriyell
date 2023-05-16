import React, { useState } from "react";

const useNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const childProps = {
    toggleOpen,
    isOpen,
  };

  return { childProps };
};

export default useNav;
