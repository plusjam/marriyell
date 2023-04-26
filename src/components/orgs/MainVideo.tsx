import React, { use, useEffect, useRef } from "react";
import Styles from "../../styles/orgs/MainVideo.module.scss";
import { useMediaQuery } from "../../../libs/useMediaQuery";
import YouTubePlayer from "../libs/Youtube";
import { Options } from "youtube-player/dist/types";
import YouTube from "react-youtube";

const MainVideo = () => {
  const isPc = useMediaQuery(768, "max");
  const ref = useRef<HTMLDivElement | null>(null);
  const opts: any = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      modestbranding: 1,
      iv_load_policy: 3,
      playlist: "vcZWQS9-tSw",
      fs: 0,
      playsinline: 1,
      mute: 1,
      showinfo: 0,
    },
  };

  useEffect(() => {
    // const resize = () => {
    //   if (ref.current) {
    //     const iframe = document.querySelector("iframe") as HTMLIFrameElement;
    //     console.log(iframe);
    //     const parent = iframe.parentElement as HTMLDivElement;
    //     // iframeの横幅が画面横幅より小さかったら
    //     if (parent.offsetWidth > (iframe.offsetHeight * 16) / 9) {
    //       console.log("iframeの横幅が画面横幅より小さかったら");
    //       iframe.style.width = `${parent.offsetWidth}px`;
    //       iframe.style.height = `${(parent.offsetWidth * 9) / 16}px`;
    //       // player.setSize(iframe.offsetWidth, (iframe.offsetWidth * 9) / 16);
    //     }
    //     // iframeの縦幅が画面縦幅より小さかったら
    //     if (parent.offsetHeight > (iframe.offsetWidth * 9) / 16) {
    //       console.log("iframeの縦幅が画面縦幅より小さかったら");
    //       iframe.style.width = `${(parent.offsetHeight * 16) / 9}px`;
    //       iframe.style.height = `${parent.offsetHeight}px`;
    //       // player.setSize((iframe.offsetHeight * 16) / 9, iframe.offsetHeight);
    //     }
    //   }
    //   // if (iframe) {
    //   // console.log(`${(-iframe.offsetHeight * 16) / 9 + iframe.offsetWidth}`);
    //   // iframe.current.transform = `${(-iframe.offsetHeight * 16) / 9 + iframe.offsetWidth}px}`;
    //   // }
    // };
    // resize();
    // window.addEventListener("resize", resize);
    // return () => {
    //   window.removeEventListener("resize", resize);
    // };
  }, []);

  return (
    <div className={Styles.main} id="youtube_pc" ref={ref}>
      {!isPc && (
        <>
          {/* <video className={Styles.video} loop autoPlay muted playsInline controlsList="nodownload">
            <source src="/videos/yoko.mp4" type="video/mp4" />
          </video> */}
          {/* <iframe
            ref={iframe}
            className={Styles.iframe}
            width={position.width}
            height={position.height}
            src="https://www.youtube.com/embed/vcZWQS9-tSw?autoplay=1&amp;fs=0&amp;playsinline=1&amp;mute=1&amp;loop=1&amp;controls=0&amp;modestbranding=1&amp;iv_load_policy=3&amp;playlist=vcZWQS9-tSw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
          {/* <YouTubePlayer videoId="vcZWQS9-tSw" /> */}
          <YouTube videoId="2g811Eo7K8U" opts={opts} />
        </>
      )}
      {isPc && (
        // <video className={Styles.video} loop autoPlay muted playsInline controlsList="nodownload">
        //   <source src="/videos/tate2.mp4" type="video/mp4" />
        // </video>
        // <iframe
        //   ref={iframe}
        //   className={Styles.iframe}
        //   width={position.width}
        //   height={position.height}
        //   src="https://www.youtube.com/embed/vcZWQS9-tSw?autoplay=1&amp;fs=0&amp;playsinline=1&amp;mute=1&amp;loop=1&amp;controls=0&amp;modestbranding=1&amp;iv_load_policy=3&amp;playlist=vcZWQS9-tSw"
        //   title="YouTube video player"
        //   frameBorder="0"
        //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        //   allowFullScreen
        // ></iframe>
        // <YouTubePlayer videoId="vcZWQS9-tSw" />
        <div></div>
      )}
    </div>
  );
};

export default MainVideo;
