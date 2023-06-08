import { AppTrigger } from "@/pages/_app";
import Styles from "@/styles/orgs/FixedLinks.module.scss";
import { FIXEDLINKS } from "@/textDate";
import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const FixedLinks = () => {
  const ref = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(AppTrigger);

  let scrollPosition: number;
  // 下スクロールを検知、上スクロールを検知する関数
  const showOrHide = () => {
    const currentScrollPosition = window.pageYOffset;
    if (currentScrollPosition > scrollPosition) {
      // 下スクロール時の処理
      gsap.to(ref.current, { autoAlpha: 0 });
    } else {
      // 上スクロール時の処理
      gsap.to(ref.current, { autoAlpha: 1 });
    }
    scrollPosition = currentScrollPosition;
  };

  useEffect(() => {
    const mainFlow = document.querySelector("#mainflow");

    const ctx = gsap.context((self) => {
      gsap.fromTo(
        ref.current,
        {
          alpha: 0,
        },
        {
          scrollTrigger: {
            trigger: mainFlow,
            start: "bottom bottom",
            // markers: true,
            onEnter: () => {
              // 要素が画面内に入ったときに実行されるコード
              window.addEventListener("scroll", showOrHide);
              gsap.to(ref.current, { autoAlpha: 1 });
            },
            onLeaveBack: () => {
              // 要素が再び画面から出たときに実行されるコード
              window.removeEventListener("scroll", showOrHide);
              gsap.to(ref.current, { autoAlpha: 0 });
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
      <Link className={`${Styles.block} ${Styles.line}`} href={FIXEDLINKS.line.href}>
        <div className={Styles.label}>{FIXEDLINKS.line.label}</div>
      </Link>
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
