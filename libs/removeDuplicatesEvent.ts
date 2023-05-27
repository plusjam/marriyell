import { FairLists } from "../typings/fair";

export const removeDuplicates = (fairLists: FairLists["articles"]) => {
  let filterd: string[] = [];

  fairLists.forEach((article) => {
    article.calendar.values.forEach((calendarItem) => {
      filterd.push(calendarItem.calendar);
    });
  });

  // filterdから重複を削除
  const unique = filterd.filter((element, index, self) => {
    return self.indexOf(element) === index;
  });

  // uniqueを{calendar: string}[]の形に変換
  const uniqueObj = unique.map((item) => {
    return { date: item };
  });

  return uniqueObj;
};
