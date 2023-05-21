import Styles from "@/styles/orgs/FirstScroll.module.scss";
import { WHATIS } from "@/textDate/first";
import ScrollBox from "../mols/ScrollBox";

const FirstScroll = () => {
  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.body}>
          <div className={Styles.copy}>
            結婚式について考え始めると耳にすることが
            <br className={Styles.br} />
            多くなる”ブライダルフェア”というイベント。
            <br />
            初めてご来館される前に是非ご参考にしてださい。
          </div>
          <ScrollBox scrolls={WHATIS} />
        </div>
      </div>
    </section>
  );
};

export default FirstScroll;
