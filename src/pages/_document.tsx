import GtmBody from "@/components/libs/GtmBody";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(d) {
              var config = {
                kitId: 'ihh4dcr',
                scriptTimeout: 3000,
                async: true
              },
              h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
          `,
          }}
        />

        <meta name="facebook-domain-verification" content="wk8jsl1gz9mkj0k75yy12os2wg5kl3" />
      </Head>
      <body>
        <GtmBody />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
