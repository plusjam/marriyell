import { AppTrigger } from "@/pages/_app";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  location: string;
};

const Animation = (props: Props) => {
  const { children, location } = props;

  const ref = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(AppTrigger);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      /* ==========
      フェードイン
      ========== */
      gsap.utils.toArray(".fadein").forEach((elem: any) => {
        const delay = elem.getAttribute("data-delay");
        const duration = elem.getAttribute("data-duration");
        const start = elem.getAttribute("data-start");
        gsap.fromTo(
          elem,
          {
            alpha: 0,
          },
          {
            alpha: 1,
            duration: duration ? duration : 1,
            delay: delay ? delay : 0,
            scrollTrigger: {
              trigger: elem,
              start: start ? start : "top bottom-=15%",
              // markers: true,
            },
            ease: "none",
            // onComplete: () => {
            //   AppTrigger.refresh();
            // },
          }
        );
      });

      /* ==========
      フェードイン（上から）
      ========== */
      gsap.utils.toArray(".fadeinTop").forEach((elem: any) => {
        const delay = elem.getAttribute("data-delay");
        const duration = elem.getAttribute("data-duration");
        const start = elem.getAttribute("data-start");
        gsap.fromTo(
          elem,
          {
            y: -20,
            alpha: 0,
          },
          {
            y: 0,
            alpha: 1,
            duration: duration ? duration : 1,
            delay: delay ? delay : 0.3,
            scrollTrigger: {
              trigger: elem,
              start: start ? start : "top bottom-=15%",
              // markers: true,
            },
            ease: "none",
            // onComplete: () => {
            //   AppTrigger.refresh();
            // },
          }
        );
      });

      /* ==========
      フェードイン（下から）
      ========== */
      gsap.utils.toArray(".fadeinBottom").forEach((elem: any) => {
        const delay = elem.getAttribute("data-delay");
        const duration = elem.getAttribute("data-duration");
        const start = elem.getAttribute("data-start");
        gsap.fromTo(
          elem,
          {
            y: 20,
            alpha: 0,
          },
          {
            y: 0,
            alpha: 1,
            duration: duration ? duration : 1,
            delay: delay ? delay : 0.3,
            scrollTrigger: {
              trigger: elem,
              start: start ? start : "top bottom-=15%",
              // markers: true,
            },
            ease: "none",
            // onComplete: () => {
            //   AppTrigger.refresh();
            // },
          }
        );
      });

      /* ==========
      フェードイン（左から）
      ========== */
      gsap.utils.toArray(".fadeinLeft").forEach((elem: any) => {
        const delay = elem.getAttribute("data-delay");
        const duration = elem.getAttribute("data-duration");
        const start = elem.getAttribute("data-start");
        gsap.fromTo(
          elem,
          {
            x: -20,
            alpha: 0,
          },
          {
            x: 0,
            alpha: 1,
            duration: duration ? duration : 1,
            delay: delay ? delay : 0,
            scrollTrigger: {
              trigger: elem,
              start: start ? start : "top bottom-=15%",
            },
            ease: "none",
            // onComplete: () => {
            //   AppTrigger.refresh();
            // },
          }
        );
      });

      /* ==========
      フェードイン（右から）
      ========== */
      gsap.utils.toArray(".fadeinRight").forEach((elem: any) => {
        const delay = elem.getAttribute("data-delay");
        const duration = elem.getAttribute("data-duration");
        const start = elem.getAttribute("data-start");
        gsap.fromTo(
          elem,
          {
            x: 20,
            alpha: 0,
          },
          {
            x: 0,
            alpha: 1,
            duration: duration ? duration : 1,
            delay: delay ? delay : 0,
            scrollTrigger: {
              trigger: elem,
              start: start ? start : "top bottom-=15%",
            },
            ease: "none",
            // onComplete: () => {
            //   AppTrigger.refresh();
            // },
          }
        );
      });
    }, ref);

    // setTimeout(() => {
    //   AppTrigger.refresh();
    // }, 400);

    return () => {
      ctx.revert();
    };
  }, [location]);

  return (
    <div ref={ref} className="main">
      {children}
    </div>
  );
};

export default Animation;
