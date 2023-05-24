import React, { use, useEffect, useRef } from "react";
import Styles from "@/styles/orgs/FixedLinks.module.scss";
import Link from "next/link";
import { FIXEDLINKS } from "@/textDate";
import { gsap } from "gsap";
import { AppTrigger } from "@/pages/_app";

const FixedLinks = () => {
  const ref = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(AppTrigger);

  useEffect(() => {
    const footer = document.querySelector("footer");

    const ctx = gsap.context((self) => {
      gsap.fromTo(
        ref.current,
        {
          alpha: 1,
        },
        {
          alpha: 0,
          scrollTrigger: {
            trigger: footer,
            start: "bottom bottom",
            // markers: true,
            onEnter: () => {
              // footerが画面内に入ったときに実行されるコード
              gsap.to(ref.current, { autoAlpha: 0 });
            },
            onLeave: () => {
              // footerが画面から出たときに実行されるコード
              gsap.to(ref.current, { autoAlpha: 1 });
            },
            onEnterBack: () => {
              // footerが画面内に戻ったときに実行されるコード
              gsap.to(ref.current, { autoAlpha: 0 });
            },
            onLeaveBack: () => {
              // footerが再び画面から出たときに実行されるコード
              gsap.to(ref.current, { autoAlpha: 1 });
            },
          },
          onComplete: () => {
            AppTrigger.refresh();
          },
        }
      );
    }, ref);

    setTimeout(() => {
      AppTrigger.refresh();
    }, 400);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className={Styles.fixed} ref={ref}>
      {/* <Link className={`${Styles.block} ${Styles.line}`} href={FIXEDLINKS.line.href}>
        <div className={Styles.label}>{FIXEDLINKS.line.label}</div>
      </Link> */}
      <Link className={`${Styles.block} ${Styles.reservation}`} href={FIXEDLINKS.reservation.href}>
        <div className={Styles.label}>{FIXEDLINKS.reservation.label}</div>
      </Link>
      <Link className={`${Styles.block} ${Styles.document}`} href={FIXEDLINKS.document.href}>
        <div className={Styles.label}>{FIXEDLINKS.document.label}</div>
      </Link>
      <Link className={`${Styles.block} ${Styles.phone}`} href={`tel:${FIXEDLINKS.phone.href}`}>
        <div className={Styles.label}>{FIXEDLINKS.phone.label}</div>
      </Link>
      <Link className={`${Styles.block} ${Styles.fair}`} href={FIXEDLINKS.fair.href}>
        <div className={Styles.label}>{FIXEDLINKS.fair.label}</div>
      </Link>
    </div>
  );
};

export default FixedLinks;
