import Script from "next/script";
import React from "react";

const GtmBody = () => {
  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TFD2G55" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}
    </>
  );
};

export default GtmBody;
