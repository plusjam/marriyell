import Image from "next/image";
import React from "react";
import Styles from "../../styles/atoms/FairCategory.module.scss";

type Props = {
  src: string;
  label: string;
  selected?: boolean;
};

const FairCategory = (props: Props) => {
  const { src, label, selected = false } = props;

  return (
    <div className={selected ? `${Styles.category} ${Styles.selected}` : Styles.category}>
      <div className={Styles.categoryIcon}>
        <Image src={src} alt="" width={20} height={20} />
      </div>
      <span>{label}</span>
    </div>
  );
};

export default FairCategory;
