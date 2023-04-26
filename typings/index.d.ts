import YouTubePlayerOptions from "yt-player";

declare module "yt-player" {
  interface YouTubePlayerOptions {
    setLoop(loop: boolean): void;
  }
}
