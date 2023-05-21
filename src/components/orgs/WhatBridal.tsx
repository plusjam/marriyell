import React from "react";
import Styles from "@/styles/orgs/WhatBridal.module.scss";
import WhatBridalTitle from "../mols/WhatBridalTitle";
import WhatBridalContents from "../mols/WhatBridalContents";
import WhatBridalLink from "../mols/WhatBridalLink";

const WhatBridal = () => {
  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.body}>
          <WhatBridalTitle />
          <WhatBridalContents />
          <WhatBridalLink />
        </div>
      </div>
    </section>
  );
};

export default WhatBridal;
