import React, { useEffect } from "react";
import Styles from "../../styles/orgs/Underlayer3.module.scss";
import { Link as Scroll } from "react-scroll";
import Link from "next/link";
import { useRouter } from "next/router";

const Underlayer3 = () => {
  const pathname = useRouter().pathname;
  const isFacility = pathname === "/facility";

  return (
    <div className={Styles.container}>
      <div className={Styles.main}>
        <div className={Styles.row}>
          <Link className={Styles.link} href="/facility">
            <div className={Styles.en}>Facility</div>
            <div className={Styles.ja}>施設紹介</div>
          </Link>
        </div>
        <div className={Styles.row}>
          {isFacility ? (
            <>
              <Scroll className={`${Styles.link} ${Styles.inner} ${Styles.h3}`} to="chapel" smooth={true} duration={500} offset={-80}>
                <div className={Styles.en}>Chapel</div>
                <div className={Styles.ja}>チャペル</div>
              </Scroll>
              <Scroll className={`${Styles.link} ${Styles.inner} ${Styles.h3}`} to="garden" smooth={true} duration={500} offset={-80}>
                <div className={Styles.en}>Garden</div>
                <div className={Styles.ja}>庭園</div>
              </Scroll>
            </>
          ) : (
            <>
              <Link className={Styles.link} href="/facility#chapel">
                <div className={Styles.en}>Chapel</div>
                <div className={Styles.ja}>チャペル</div>
              </Link>
              <Link className={Styles.link} href="/facility#garden">
                <div className={Styles.en}>Garden</div>
                <div className={Styles.ja}>庭園</div>
              </Link>
            </>
          )}
        </div>
        <div className={Styles.row}>
          {isFacility ? (
            <>
              <Scroll className={`${Styles.link} ${Styles.inner}`} to="banquet" smooth={true} duration={500}>
                <div className={Styles.en}>Banquet</div>
                <div className={Styles.ja}>宴会場</div>
              </Scroll>
            </>
          ) : (
            <>
              <Link className={Styles.link} href="/facility#banquet">
                <div className={Styles.en}>Banquet</div>
                <div className={Styles.ja}>宴会場</div>
              </Link>
            </>
          )}
        </div>
        <div className={Styles.row}>
          <Link className={Styles.link} href="/cuisine">
            <div className={Styles.en}>Cuisine</div>
            <div className={Styles.ja}>お料理</div>
          </Link>
        </div>
        <div className={Styles.row}>
          <Link className={Styles.link} href="/dress-item">
            <div className={Styles.en}>Dress</div>
            <div className={Styles.ja}>ドレス・和装</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Underlayer3;
