import { useMediaQuery } from "../../../libs/useMediaQuery";
import Styles from "../../styles/orgs/MainVideo.module.scss";

const MainVideo = () => {
  const isPc = useMediaQuery(768, "max");

  return (
    <div className={Styles.main} id="youtube_pc">
      {!isPc && (
        <>
          <video className={Styles.video} loop autoPlay muted playsInline controlsList="nodownload" preload="metadata">
            <source
              src="https://player.vimeo.com/progressive_redirect/playback/832282111/rendition/1080p/file.mp4?loc=external&signature=ac1bd42d7b2ea19f0be1a84cc84fc4e0068ef332a7a4b0891af40b6948251858"
              type="video/mp4"
            />
          </video>
        </>
      )}
      {isPc && (
        <video className={Styles.video} loop autoPlay muted playsInline controlsList="nodownload" preload="metadata">
          <source
            src="https://player.vimeo.com/progressive_redirect/playback/832282021/rendition/1080p/file.mp4?loc=external&signature=26bdcf0ca6be8db8402ffc1751ed212211555d6db856ffd4f63a7372e89563f0"
            type="video/mp4"
          />
        </video>
      )}
    </div>
  );
};

export default MainVideo;
