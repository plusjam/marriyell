import React from "react";

export type Status = "idle" | "confirm" | "loading" | "error" | "success";

const useApi = () => {
  const [status, setStatus] = React.useState<Status>("idle");

  const handleStatus = (status: Status) => {
    setStatus(status);
  };

  return { status, handleStatus };
};

export default useApi;
