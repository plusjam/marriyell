import React from "react";

const useGetWeekend = () => {
  // 現在の週から2週間分の土日を"{date: mm月dd日, selected: false}"の形で抽出
  const getWeekend = () => {
    const weekend = [];
    const today = new Date();
    const thisMonth = today.getMonth();
    const thisDate = today.getDate();
    const thisYear = today.getFullYear();

    for (let i = 0; i < 14; i++) {
      const date = new Date(thisYear, thisMonth, thisDate + i);
      const day = date.getDay();
      const month = date.getMonth();
      const dateNum = date.getDate();

      if (day === 0 || day === 6) {
        weekend.push({
          date: `${month + 1}月${dateNum}日（${day === 6 ? "土" : "日"}）`,
          selected: false,
        });
      }
    }

    weekend[0].selected = true;

    return weekend;
  };

  const [selected, setSelected] = React.useState(getWeekend());

  const handleSelect = (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const target = e.currentTarget;
    const targetIndex = target.dataset.index;

    const newArray = [...selected];
    newArray.map((date, index) => {
      if (index === Number(targetIndex)) {
        date.selected = true;
      } else {
        date.selected = false;
      }
    });

    setSelected(newArray);
  };

  return { selected, handleSelect };
};

export default useGetWeekend;
