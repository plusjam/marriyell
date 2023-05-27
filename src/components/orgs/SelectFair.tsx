import Image from "next/image";
import React, { MouseEvent, use, useEffect } from "react";
import Styles from "../../styles/orgs/SelectFair.module.scss";
import BridalCategoriesSelected from "../mols/BridalCategoriesSelect";
import { useRouter } from "next/router";
import { FairCategoriesLists } from "../../../typings/fair";

export type FairCategoryArticleWithSelected = FairCategoriesLists["articles"][0] & {
  selected: boolean;
};

type Props = {
  categories: FairCategoryArticleWithSelected[];
  handleSelected: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  getSelectedDateLists: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  getSelectedLists: () => void;
};

// 今日の日付を取得
const today = new Date();
const year = today.getFullYear();
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const day = ("0" + today.getDate()).slice(-2);
const todayDate = year + "-" + month + "-" + day;

const SelectFair = (props: Props) => {
  const { categories, handleSelected, getSelectedLists, getSelectedDateLists } = props;

  const ref = React.useRef<HTMLInputElement | null>(null);
  const [date, setDate] = React.useState("");
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const url = new URL(router.asPath, "http://dummy.com");
      const params = new URLSearchParams(url.hash.split("?")[1]);
      const targetDate = params.get("date");

      if (targetDate) {
        setDate(targetDate);
        getSelectedDateLists();
      } else {
        setDate(todayDate);
      }
    }, 2500);
  }, []);

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.head}>
          ご希望のブライダルフェアを
          <br />
          お選びください。
        </div>
        <div className={Styles.inner}>
          <div className={Styles.block}>
            <div className={Styles.label}>
              <span>カテゴリから選択</span>
            </div>

            <div className={Styles.selectArea}>
              <BridalCategoriesSelected categories={categories} handleSelect={handleSelected} />

              <div className={Styles.submit} onClick={() => getSelectedLists()}>
                このカテゴリーで絞り込み
              </div>
            </div>
          </div>

          <div className={Styles.block}>
            <div className={Styles.label}>
              <span>日付から選択</span>
            </div>
            <div className={Styles.inputWrap}>
              <input
                type="date"
                className={Styles.input}
                onChange={(e) => {
                  getSelectedDateLists(e);
                  setDate(e.currentTarget.value);
                }}
                value={date}
                ref={ref}
              />
              <div className={Styles.inputImage}>
                <Image src="/images/icon_fair_calendar.svg" alt="" width={22} height={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectFair;
