import React, { useEffect, useState } from "react";
import Styles from "@/styles/atoms/QaAccordion.module.scss";
import { set } from "react-hook-form";

type Props = {
  selected?: boolean;
  question: string;
  answer: string;
};

const QaAccordion = (props: Props) => {
  const { question, answer, selected } = props;
  const block = React.createRef<HTMLDivElement>();
  const questionRef = React.createRef<HTMLDivElement>();
  const answerRef = React.createRef<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState(selected);
  const [height, setHeight] = useState(0);

  const handleToggle = () => {
    if (!answerRef.current || !questionRef.current) return;

    if (!isOpen) {
      setHeight(questionRef.current.clientHeight + answerRef.current?.clientHeight);
    } else {
      setHeight(questionRef.current.clientHeight);
    }

    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(selected);

    if (questionRef.current) {
      setHeight(questionRef.current.clientHeight);
    }

    // リサイズした時に高さを再取得する関数
    const resizeHeight = () => {
      setTimeout(() => {
        if (questionRef.current) {
          setHeight(questionRef.current.clientHeight);
        }
      }, 100);
    };

    window.addEventListener("resize", resizeHeight, false);

    return () => {
      window.removeEventListener("resize", resizeHeight, false);
    };
  }, [question]);

  return (
    <div className={Styles.block} onClick={handleToggle} ref={block} style={{ "--height": `${height}px` } as React.CSSProperties}>
      <div className={Styles.question} ref={questionRef}>
        <span>Q.</span>
        <div className={Styles.text} dangerouslySetInnerHTML={{ __html: question }}></div>
        <div className={isOpen ? `${Styles.status} ${Styles.open}` : Styles.status}>
          <div className={Styles.inner}></div>
        </div>
      </div>
      <div className={Styles.answer} ref={answerRef}>
        <span>A.</span>
        <div className={Styles.text} dangerouslySetInnerHTML={{ __html: answer }}></div>
      </div>
    </div>
  );
};

export default QaAccordion;
