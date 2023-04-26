import { useEffect, useState } from "react";

type WidthPrefix = "min" | "max";

const createQuery = (width: number, prefix: WidthPrefix) => `(${prefix}-width: ${width}px)`;

export const useMediaQuery = (width: number, prefix: WidthPrefix = "min"): boolean | undefined => {
  const query = createQuery(width, prefix);
  const [matchQuery, setMatchQuery] = useState<boolean>();

  function setEvent() {
    setMatchQuery(window.matchMedia(query).matches);
  }

  useEffect(() => {
    window.addEventListener("resize", setEvent);
    setEvent();

    return () => {
      window.removeEventListener("resize", setEvent);
    };
  }, [matchQuery]);

  return matchQuery;
};
