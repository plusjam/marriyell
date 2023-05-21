import Link from "next/link";
import React from "react";
import Styles from "../../styles/atoms/Atoms.module.scss";
import Image from "next/image";

type Props = {
  type: "warning" | "heart" | "member" | "question";
};

const LinkToInfo = (props: Props) => {
  const { type } = props;

  return (
    <>
      {type === "warning" && (
        <Link className={Styles.contentLink} href={"/first"}>
          <div className={Styles.inner}>
            <div className={Styles.image}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path
                  id="icon_waring"
                  d="M8.533,11.2v-.533H7.467V11.2Zm-1.067.011v.533H8.533v-.533Zm0-6.944V8.533H8.533V4.267Zm0,6.933v.011H8.533V11.2ZM8,14.933A6.933,6.933,0,0,1,1.067,8H0a8,8,0,0,0,8,8ZM14.933,8A6.933,6.933,0,0,1,8,14.933V16a8,8,0,0,0,8-8ZM8,1.067A6.933,6.933,0,0,1,14.933,8H16A8,8,0,0,0,8,0ZM8,0A8,8,0,0,0,0,8H1.067A6.933,6.933,0,0,1,8,1.067Z"
                />
              </svg>
            </div>
            <div className={Styles.text}>{"はじめての方へ"}</div>
          </div>
        </Link>
      )}

      {type === "heart" && (
        <Link className={Styles.contentLink} href={"/for-brides"}>
          <div className={Styles.inner}>
            <div className={Styles.image}>
              <svg id="icon_heart" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                <path
                  id="パス_894"
                  data-name="パス 894"
                  d="M5.5,4.586a1.9,1.9,0,0,1,1.354.561l.646.646.646-.646a1.914,1.914,0,0,1,2.707,2.707L7.5,11.207,4.146,7.854A1.914,1.914,0,0,1,5.5,4.586Zm2,2.621L6.146,5.854A.914.914,0,1,0,4.854,7.146L7.5,9.793l2.646-2.646A.914.914,0,0,0,8.854,5.854Z"
                  transform="translate(1 1.068)"
                />
                <path id="パス_895" data-name="パス 895" d="M8.5,0A8.5,8.5,0,1,1,0,8.5,8.51,8.51,0,0,1,8.5,0Zm0,16A7.5,7.5,0,1,0,1,8.5,7.508,7.508,0,0,0,8.5,16Z" />
              </svg>
            </div>
            <div className={Styles.text}>{"ご成約の方へ"}</div>
          </div>
        </Link>
      )}

      {type === "member" && (
        <Link className={Styles.contentLink} href={"/for-guest"}>
          <div className={Styles.inner}>
            <div className={Styles.image}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path
                  id="icon_member"
                  d="M4.8,12.267H4.267A.533.533,0,0,0,4.8,12.8Zm6.4,0V12.8a.533.533,0,0,0,.533-.533ZM4.8,12.8h6.4V11.733H4.8Zm6.933-.533V10.133H10.667v2.133ZM4.267,10.133v2.133H5.333V10.133ZM8,6.4a3.733,3.733,0,0,0-3.733,3.733H5.333A2.667,2.667,0,0,1,8,7.467Zm3.733,3.733A3.733,3.733,0,0,0,8,6.4V7.467a2.667,2.667,0,0,1,2.667,2.667Zm3.2,2.133a1.261,1.261,0,0,1-.433.87,4.512,4.512,0,0,1-1.43.9A13.324,13.324,0,0,1,8,14.933V16a14.354,14.354,0,0,0,5.49-.981,5.568,5.568,0,0,0,1.77-1.132,2.316,2.316,0,0,0,.74-1.62H14.933ZM8,14.933a13.324,13.324,0,0,1-5.07-.894,4.512,4.512,0,0,1-1.43-.9,1.259,1.259,0,0,1-.433-.87H0a2.316,2.316,0,0,0,.74,1.62A5.563,5.563,0,0,0,2.511,15.02,14.357,14.357,0,0,0,8,16ZM1.067,12.267a1.249,1.249,0,0,1,.42-.859,4.441,4.441,0,0,1,1.393-.893l-.427-.977a5.456,5.456,0,0,0-1.73,1.126A2.3,2.3,0,0,0,0,12.267ZM13.12,10.515a4.422,4.422,0,0,1,1.392.893,1.251,1.251,0,0,1,.421.859H16a2.3,2.3,0,0,0-.723-1.6,5.456,5.456,0,0,0-1.73-1.126l-.427.977ZM8,4.267a1.6,1.6,0,0,1-1.6-1.6H5.333A2.667,2.667,0,0,0,8,5.333Zm1.6-1.6A1.6,1.6,0,0,1,8,4.267V5.333a2.667,2.667,0,0,0,2.667-2.667ZM8,1.067a1.6,1.6,0,0,1,1.6,1.6h1.067A2.667,2.667,0,0,0,8,0ZM8,0A2.667,2.667,0,0,0,5.333,2.667H6.4A1.6,1.6,0,0,1,8,1.067Z"
                />
              </svg>
            </div>
            <div className={Styles.text}>{"ご列席の方へ"}</div>
          </div>
        </Link>
      )}

      {type === "question" && (
        <Link className={Styles.contentLink} href={"/faq"}>
          <div className={Styles.inner}>
            <div className={Styles.image}>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                <path
                  id="icon_question"
                  d="M8.5,10.214V8.5h.571a1.714,1.714,0,0,0,1.714-1.714V6.671a1.6,1.6,0,0,0-1.6-1.6H8.5A1.714,1.714,0,0,0,6.786,6.786m1.143,5.143H9.071M8.5,16.5a8,8,0,1,1,8-8A8,8,0,0,1,8.5,16.5Z"
                  fill="none"
                  strokeWidth={1}
                />
              </svg>
            </div>
            <div className={Styles.text}>{"よくある質問"}</div>
          </div>
        </Link>
      )}
    </>
  );
};

export default LinkToInfo;
