import React, { MouseEvent } from "react";
import { set } from "react-hook-form";

const init = [
  {
    selected: true,
    label: "すべて",
    slug: "all",
  },
  {
    selected: false,
    label: "初めての見学",
    slug: "new",
  },
  {
    selected: false,
    label: "試食会つき",
    slug: "food",
  },
  {
    selected: false,
    label: "季節・期間限定",
    slug: "season",
  },
  {
    selected: false,
    label: "挙式体験",
    slug: "ceremony",
  },
  {
    selected: false,
    label: "ドレス試着",
    slug: "dress",
  },
  {
    selected: false,
    label: "土日祝開催",
    slug: "weekends",
  },
  {
    selected: false,
    label: "平日限定開催",
    slug: "weekdays",
  },
  {
    selected: false,
    label: "オンライン相談会",
    slug: "online",
  },
];

const useSelectFair = () => {
  const [categories, setCategories] = React.useState([...init]);

  const handleSelect = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const target = e.currentTarget;
    const targetSlug = target.dataset.slug;

    // 選択された項目がallだった場合initに戻す
    if (targetSlug === "all") {
      const newArray = [...init];
      newArray[0].selected = true;
      newArray.map((category) => {
        if (category.slug !== "all") {
          category.selected = false;
        }
      });

      setCategories(newArray);
    } else {
      // 選択された項目がall以外だった場合allをfalseにし、選択された項目のselectedを逆にする
      const newArray = [...categories];
      newArray[0].selected = false;
      newArray.map((category) => {
        if (category.slug === targetSlug) {
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
