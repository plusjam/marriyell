import React from "react";
import Styles from "@/styles/mols/ReportLists.module.scss";
import { ReportLists as List } from "../../../typings/report";

type Props = {
  contents: List["articles"];
  openModal: (id: string) => void;
  isTop?: boolean;
};

const ReportLists = (props: Props) => {
  const { contents, openModal, isTop = false } = props;

  return (
    <div className={Styles.lists}>
      {contents.map((content, index) => {
        // indexが3まで行ったら0に戻すを繰り返す
        const newIndex = index % 4;
        const delay = newIndex * 0.1;

        // dangerouslySetInnerHTMLで文字列をHTMLとして表示する
        const description = { __html: content.description };
        const stringDescription = description.__html.replaceAll("<br>", "");

        // 文字数制限
        const limit = 45;

        // content.descriptionを文字数制限する関数
        const limitText = () => {
          if (stringDescription.length <= limit) {
            return stringDescription;
          } else {
            return stringDescription.slice(0, limit) + "...";
          }
        };

        return (
          <div
            className={isTop ? `${Styles.list} ${Styles.top} fadeinBottom` : `${Styles.list} fadeinBottom`}
            key={`weddingreport${index}`}
            data-id={content.id}
            data-delay={delay}
            data-duration={0.6}
          >
            <div className={Styles.image} onClick={() => openModal(content.id)}>
              <img src={`https://img.youtube.com/vi/${content.id}/hqdefault.jpg`} alt="" />
            </div>
            <div className={Styles.meta}>
              <p className={Styles.category}>{content.place}</p>
            </div>
            <h2 className={Styles.title}>{content.title}</h2>
            <p className={Styles.description}>{limitText()}</p>
            {/* <p className={Styles.member}>人数：{content.member}名</p> */}
          </div>
        );
      })}
    </div>
  );
};

export default ReportLists;
