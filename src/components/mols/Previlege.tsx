import React from "react";
import Styles from "../../styles/mols/Previlege.module.scss";
import { FairList } from "../../../typings/fair";

type Props = {
  title: string;
  visit: FairList["visitPrevileges"];
  signing: FairList["signingPrevileges"];
};

const Previlege = (props: Props) => {
  const { title, visit, signing } = props;

  return (
    <div className={Styles.body}>
      <div className={Styles.title}>{title}</div>

      <div className={Styles.contents}>
        {visit && (
          <div className={Styles.block}>
            <div className={Styles.label}>ご来館特典</div>
            <div className={Styles.description}>
              {visit.map((elem, index) => {
                return <p key={index}>{elem.values.previlege}</p>;
              })}
            </div>
          </div>
        )}
        {signing && (
          <div className={Styles.block}>
            <div className={Styles.label}>ご成約特典</div>
            <div className={Styles.description}>
              {signing.map((elem, index) => {
                return <p key={index}>{elem.values.previlege}</p>;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Previlege;
