import React from "react";
import Styles from "@/styles/orgs/ReadyBridal.module.scss";
import Image from "next/image";

const ReadyBridal = () => {
  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <h2 id="ready" className={Styles.head}>
          ブライダルフェアの準備
        </h2>
        <div className={Styles.caption}>
          気軽に参加できるのがフェアの特徴ですが、よりブライダルフェアをお楽しみいただくために、
          <br />
          これだけは準備しておくと良いという項目を作りましたので、参考にしてください。
        </div>
        <div className={Styles.body}>
          <div className={Styles.block}>
            <div className={Styles.blockHead}>
              <div className={Styles.blockHeadImage}>
                <Image src="/images/icon_first_message.svg" alt="" width={32} height={24} />
              </div>
              <div className={Styles.blockHeadTitle}>事前に話し合って頂きたいポイント</div>
            </div>

            <div className={Styles.blockContent}>
              <div className={Styles.woman}>
                <Image src="/images/first_woman.svg" alt="" width={151} height={180} />
              </div>

              <div className={Styles.points}>
                <div className={Styles.point}>
                  <div className={Styles.check}></div>
                  <div className={Styles.pointText}>希望の日取り（季節・曜日・六輝）</div>
                </div>
                <div className={Styles.point}>
                  <div className={Styles.check}></div>
                  <div className={Styles.pointText}>挙式のスタイル</div>
                </div>
                <div className={Styles.point}>
                  <div className={Styles.check}></div>
                  <div className={Styles.pointText}>ゲストの人数</div>
                </div>
                <div className={Styles.point}>
                  <div className={Styles.check}></div>
                  <div className={Styles.pointText}>予算（おふたりのご負担額）</div>
                </div>
                <div className={Styles.point}>
                  <div className={Styles.check}></div>
                  <div className={Styles.pointText}>重視ポイント（料理・衣装・写真 etc...）</div>
                </div>
              </div>

              <div className={Styles.man}>
                <Image src="/images/first_man.svg" alt="" width={35} height={180} />
              </div>
            </div>
            <div className={Styles.note}>おふたりで「理想の結婚式」についてよく話合っていただき、イメージを膨らませてください。上記のポイントを押さえておくと、スムーズに進みます。</div>
          </div>

          <div className={Styles.block}>
            <div className={Styles.blockHead}>
              <div className={Styles.blockHeadImage}>
                <Image src="/images/icon_first_belongings.svg" alt="" width={23} height={28} />
              </div>
              <div className={Styles.blockHeadTitle}>当日の持ち物</div>
              <div className={Styles.blockHeadCaption}>
                ブライダルフェアは会場見学以外にもドレス試着や料理の試食など、体験することがございます。
                <br />
                ブライダルフェアにお出かけの際は是非参考にしてください。
              </div>
            </div>

            <div className={Styles.blockContent}>
              <div className={Styles.belongings}>
                <div className={Styles.belonging}>
                  <div className={Styles.belongingImage}>
                    <Image src="/images/icon_first_bag.svg" alt="" width={48} height={49} />
                  </div>
                  <div className={Styles.belongingText}>大きめのカバン</div>
                </div>
                <div className={Styles.belonging}>
                  <div className={Styles.belongingImage}>
                    <Image src="/images/icon_first_camera.svg" alt="" width={48} height={39} />
                  </div>
                  <div className={Styles.belongingText}>カメラ</div>
                </div>
                <div className={Styles.belonging}>
                  <div className={Styles.belongingImage}>
                    <Image src="/images/icon_first_document.svg" alt="" width={54} height={48} />
                  </div>
                  <div className={Styles.belongingText}>メモ帳・筆記用具</div>
                </div>
                <div className={Styles.belonging}>
                  <div className={Styles.belongingImage}>
                    <Image src="/images/icon_first_shoes.svg" alt="" width={64} height={30} />
                  </div>
                  <div className={Styles.belongingText}>歩きやすい靴</div>
                </div>
              </div>
            </div>

            <div className={Styles.note}>ドレスやタキシードなどの試着付きのブライダルフェアの場合、靴下（ストッキング）や肩紐のない下着などのご用意をお願いすることもございます。</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyBridal;
