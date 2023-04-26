import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Router, { useRouter } from "next/router";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import Loading from "../layouts/Loading";

type Props = {
  children: ReactNode;
  location: string;
};

const Animation = (props: Props) => {
  const { children, location } = props;

  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const ctx = gsap.context((self) => {
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
            onComplete: () => {
              ScrollTrigger.refresh();
            },
          }
        );
      });
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
            onComplete: () => {
              ScrollTrigger.refresh();
            },
          }
        );
      });
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
            onComplete: () => {
              ScrollTrigger.refresh();
            },
          }
        );
      });
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
            onComplete: () => {
              ScrollTrigger.refresh();
            },
          }
        );
      });
    }, ref);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      ctx.revert();
    };
  }, [location]);

  return (
    <div ref={ref} className="main">
      {children}
      {/* <Loading isLoading={isLoading} /> */}
    </div>
  );
};

export default Animation;
