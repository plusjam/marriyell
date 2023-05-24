import React from "react";
import Styles from "../../styles/orgs/Underlayer2.module.scss";
import ContentsAndImage from "../mols/ContentsAndImage";
import ImagesView from "../mols/ImagesView";
import { useMediaQuery } from "../../../libs/useMediaQuery";

type Props = {
  contents: {
    en?: string;
    ja?: string;
    description: string;
    image: string;
    spImage: string;
  };
  views: {
    copy?: string;
    description?: string;
    image02: string;
    spImage02: string;
    image03: string;
    spImage03: string;
    image04: string;
    spImage04: string;
    reverse?: boolean;
  };
  isPt?: boolean;
};

const Underlayer2 = (props: Props) => {
  const { contents, views, isPt = true } = props;

  return (
    <div className={isPt ? Styles.container : `${Styles.container} ${Styles.pt0}`}>
      <ContentsAndImage {...contents} />
      <ImagesView {...views} />
    </div>
  );
};

export default Underlayer2;
