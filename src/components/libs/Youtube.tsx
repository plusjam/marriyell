import React, { useEffect, useRef } from "react";
import YTPlayer from "yt-player";

type Props = {
  videoId: string;
};

const YouTubePlayer = (props: Props) => {
  const { videoId } = props;

  const playerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const player = new YTPlayer(playerRef.current as any, {
      autoplay: true,
      controls: false,
      annotations: false,
      modestBranding: true,
      related: false,
      fullscreen: false,
      keyboard: false,
    });
    player.load(videoId, true);
    player.mute();
    player.play();

    player.on("playing", () => {
      resize();
    });

    const resize = () => {
      if (playerRef.current) {
        const iframe = document.querySelector("iframe") as HTMLIFrameElement;
        const parent = iframe.parentElement as HTMLDivElement;
        console.log(parent);

        // iframeの横幅が画面横幅より小さかったら
        if (parent.offsetWidth > (iframe.offsetHeight * 16) / 9) {
          console.log("iframeの横幅が画面横幅より小さかったら");
          iframe.style.width = `${parent.offsetWidth}px`;
          iframe.style.height = `${(parent.offsetWidth * 9) / 16}px`;
          // player.setSize(iframe.offsetWidth, (iframe.offsetWidth * 9) / 16);
        }

        // iframeの縦幅が画面縦幅より小さかったら
        if (parent.offsetHeight > (iframe.offsetWidth * 9) / 16) {
          console.log("iframeの縦幅が画面縦幅より小さかったら");
          iframe.style.width = `${(parent.offsetHeight * 16) / 9}px`;
          iframe.style.height = `${parent.offsetHeight}px`;
          // player.setSize((iframe.offsetHeight * 16) / 9, iframe.offsetHeight);
        }
      }

      // if (iframe) {
      // console.log(`${(-iframe.offsetHeight * 16) / 9 + iframe.offsetWidth}`);
      // iframe.current.transform = `${(-iframe.offsetHeight * 16) / 9 + iframe.offsetWidth}px}`;
      // }
    };

    window.addEventListener("resize", resize);

    return () => {
      player.destroy();
    };
  }, [videoId]);

  return <div ref={playerRef} />;
};

export default YouTubePlayer;
