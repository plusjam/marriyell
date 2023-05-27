import React, { MouseEvent } from "react";
import { FairCategoriesLists } from "../typings/fair";

type Props = {
  init: FairCategoriesLists["articles"];
};

const first: FairCategoriesLists["articles"][0] & { selected: boolean } = {
  selected: true,
  id: 9999999999,
  code: "aaaaaaaaaaa",
  createdAt: "aaaaaaaaaaa",
  updatedAt: "aaaaaaaaaaa",
  publishedAt: "aaaaaaaaaaa",
  name: "すべて",
  icon: {
    type: "image/svg",
    url: "/images/icon_fair_all.svg",
    attributes: {
      caption: "aaaaaaaaaaa",
      mimeType: "image/svg",
      width: 20,
      height: 20,
    },
  },
  iconFocus: {
    type: "image/svg",
    url: "/images/icon_fair_all-hover.svg",
    attributes: {
      caption: "aaaaaaaaaaa",
      mimeType: "image/svg",
      width: 20,
      height: 20,
    },
  },
};

const useSelectFair = (props: Props) => {
  const { init } = props;
  const original = [first, ...init];
  const [categories, setCategories] = React.useState(
    original.map((category, index) => {
      if (index === 0) {
        return { ...category, selected: true };
      } else {
        return { ...category, selected: false };
      }
    })
  );

  const handleSelect = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const target = e.currentTarget;
    const targetSlug = target.dataset.name;

    // 選択された項目がallだった場合initに戻す
    if (targetSlug === "すべて") {
      const newArray = [...categories];
      newArray[0].selected = true;
      newArray.map((category) => {
        if (category.name !== "すべて") {
          category.selected = false;
        }
      });

      setCategories(newArray);
    } else {
      // 選択された項目がall以外だった場合allをfalseにし、選択された項目のselectedを逆にする
      const newArray = [...categories];
      newArray[0].selected = false;
      newArray.map((category) => {
        if (category.name === targetSlug) {
          category.selected = !category.selected;
        }
      });
      setCategories(newArray);
    }

    // 全て選択されていない状態だった場合"すべて"を選択する
    const allSelected = categories.every((category) => {
      return category.selected === false;
    });
    if (allSelected) {
      const newArray = [...categories];
      newArray[0].selected = true;
      setCategories(newArray);
    }
  };
  return { categories, handleSelect };
};

export default useSelectFair;
