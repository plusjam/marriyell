import React from "react";
import Styles from "../../styles/mols/Previlege.module.scss";

type Props = {
  title: string;
};

const Previlege = (props: Props) => {
  const { title } = props;

  return (
    <div className={Styles.body}>
      <div className={Styles.title}>{title}</div>

      <div className={Styles.contents}>
        <div className={Styles.block}>
          <div className={Styles.label}>ご来館特典</div>
          <div className={Styles.description}>
            <p>① 国産牛&キャビアなど3万円相当豪華無料試食&1軒目来館で1万円相当来館ギフトプレゼント！</p>
            <p>② 最大100万円相当優待（時期・人数などで変動</p>
          </div>
        </div>
        <div className={Styles.block}>
          <div className={Styles.label}>ご成約特典</div>
          <div className={Styles.description}>
            <p>① 国産牛&キャビアなど3万円相当豪華無料試食&1軒目来館で1万円相当来館ギフトプレゼント！</p>
            <p>② 最大100万円相当優待（時期・人数などで変動</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Previlege;
