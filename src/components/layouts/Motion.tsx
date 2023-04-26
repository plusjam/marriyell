import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const Motion = (props: Props) => {
  const { children } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 120,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Motion;
