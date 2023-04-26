import Script from "next/script";
import React from "react";

const GtmHead = () => {
  return (
    <>
      {/* Google Tag Manager */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KCL3KC6');
        `}
      </Script>
      {/* End Google Tag Manager */}
    </>
  );
};

export default GtmHead;
