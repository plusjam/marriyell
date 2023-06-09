import Link from "next/link";
import React from "react";
import Atoms from "../../styles/atoms/Atoms.module.scss";
import Header from "../../styles/orgs/Header.module.scss";
import Image from "next/image";

type Props = {
  isOpen: Boolean;
};

const LinkToBridalFair = (props: Props) => {
  const { isOpen } = props;

  return (
    <Link href="/fair" target="_blank" className={isOpen ? `${Atoms.linkBridal} ${Atoms.open}` : `${Atoms.linkBridal} ${Header.linkBridal}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18.656" height="16.169" viewBox="0 0 18.656 16.169">
        <g id="icon_heart" transform="translate(-1310.672 -15.916)">
          <path
            className={Atoms.body}
            d="M9.328,16.547l-.44.44a.622.622,0,0,0,.881,0ZM1.91,9.129l-.44.439ZM8.129,2.91l-.44.439Zm1.2,1.2-.44.44c.117.117-.165,2.575,0,2.575s.764-2.458.881-2.575Zm1.2-1.2-.439-.44Zm-.759,13.2L8.888,7.125,1.47,9.568l7.418,7.419.881-.881ZM8.888,7.125v8.981l.881.881,7.418-7.419-8.3-2.443Zm-1.2-3.776,1.2,3.776.881-3.456-1.2-1.2Zm1.2,3.776,2.08-3.776-.879-.879-1.2,1.2ZM13.636,1a5.018,5.018,0,0,0-3.548,1.47l-1.2,4.655c.708-.708-1,0,0,0ZM8.888,7.125c0,1,.709-.708,0,0l8.3,2.443a5.02,5.02,0,0,0,1.47-3.548ZM18.656,6.02A5.02,5.02,0,0,0,13.636,1L8.888,7.125c2.085,0,0-2.085,0,0ZM8.888,7.125c1,0-.708-.709,0,0L8.568,2.47A5.02,5.02,0,0,0,5.02,1Zm0,0c0-2.085-2.085,0,0,0L5.02,1A5.02,5.02,0,0,0,0,6.02Zm0,0c-.708-.708,0,1,0,0L0,6.02A5.018,5.018,0,0,0,1.47,9.568L8.886,7.125Z"
            transform="translate(1310.672 14.916)"
          />
          <path
            className={Atoms.line}
            d="M9.328,16.547l-.44.44a.622.622,0,0,0,.881,0ZM1.91,9.129l-.44.439ZM8.129,2.91l-.44.439Zm1.2,1.2-.44.44a.622.622,0,0,0,.881,0Zm1.2-1.2-.439-.44Zm-.759,13.2L2.349,8.689l-.879.879,7.418,7.419.881-.881Zm6.538-7.418L8.888,16.106l.881.881,7.418-7.419-.879-.879ZM7.689,3.349l1.2,1.2.881-.881-1.2-1.2Zm2.08,1.2,1.2-1.2-.879-.879-1.2,1.2ZM13.636,1a5.018,5.018,0,0,0-3.548,1.47l.879.879a3.777,3.777,0,0,1,2.669-1.106Zm3.776,5.02a3.771,3.771,0,0,1-1.107,2.669l.881.879a5.02,5.02,0,0,0,1.47-3.548Zm1.244,0A5.02,5.02,0,0,0,13.636,1V2.244A3.776,3.776,0,0,1,17.412,6.02ZM5.02,2.244A3.771,3.771,0,0,1,7.689,3.351l.879-.881A5.02,5.02,0,0,0,5.02,1ZM1.244,6.02A3.776,3.776,0,0,1,5.02,2.244V1A5.02,5.02,0,0,0,0,6.02ZM2.351,8.689A3.775,3.775,0,0,1,1.244,6.02H0A5.018,5.018,0,0,0,1.47,9.568l.879-.879Z"
            transform="translate(1310.672 14.916)"
          />
        </g>
      </svg>
      ブライダル
      <br />
      フェア
    </Link>
  );
};

export default LinkToBridalFair;
