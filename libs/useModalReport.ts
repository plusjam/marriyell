import React from "react";

const useModalReport = () => {
  const [videoID, setVideoID] = React.useState<string | null>(null);

  const openModal = (videoID: string) => {
    setVideoID(videoID);
  };

  const closeModal = () => {
    setVideoID(null);
  };

  return { videoID, openModal, closeModal };
};

export default useModalReport;
