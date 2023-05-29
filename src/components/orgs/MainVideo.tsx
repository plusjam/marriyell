import { useMediaQuery } from "../../../libs/useMediaQuery";
import Styles from "../../styles/orgs/MainVideo.module.scss";

const MainVideo = () => {
  const isPc = useMediaQuery(768, "max");

  return (
    <div className={Styles.main} id="youtube_pc">
      {!isPc && (
        <>
          <video className={Styles.video} loop autoPlay muted playsInline controlsList="nodownload" preload="metadata">
            <source src="/videos/yoko.mp4" type="video/mp4" />
          </video>
        </>
      )}
      {isPc && (
        <video className={Styles.video} loop autoPlay muted playsInline controlsList="nodownload" preload="metadata">
          <source src="/videos/tate2.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default MainVideo;
