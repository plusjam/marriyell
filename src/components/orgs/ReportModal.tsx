import React from "react";
import Styles from "@/styles/orgs/ReportModal.module.scss";

type Props = {
  videoID: string | null;
  closeModal: () => void;
};

const ReportModal = (props: Props) => {
  const { videoID, closeModal } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && ref.current === event.target) {
      closeModal();
    }
  };

  // ref.currentが押された時にcloseModalを実行
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);

    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [ref]);

  return (
    <div className={videoID !== null ? `${Styles.modal} ${Styles.on}` : Styles.modal} ref={ref}>
      <iframe src={`https://www.youtube.com/embed/${videoID}`} className={Styles.iframe} frameBorder={0} allowFullScreen></iframe>
      <div className={Styles.close} onClick={closeModal}></div>
    </div>
  );
};

export default ReportModal;
