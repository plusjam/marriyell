"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useMediaQuery } from "../../../libs/useMediaQuery";
import Styles from "../../styles/atoms/Calendar.module.scss";
import { useEffect, useState } from "react";

type Props = {
  events: {
    date: string;
  }[];
};

const Calendar = (props: Props) => {
  const { events } = props;

  const isPc = useMediaQuery(768, "min");

  function updateButtonLabels(date: Date): void {
    let prevButton = document.querySelector(".fc-prev-button");
    let nextButton = document.querySelector(".fc-next-button");
    if (prevButton) {
      prevButton.textContent = `<  ${date.getMonth()}月`;
    }
    if (nextButton) {
      nextButton.textContent = `${date.getMonth() + 2}月  >`;
    }
  }

  function updateCalendarTitle(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonthは0から始まるので1を加える
    const titleElement = document.querySelector(".fc-toolbar-title");

    if (titleElement) {
      titleElement.textContent = `${year}年${month}月`;
    }
  }

  const updateCalendar = (viewInfo: any) => {
    // prev, nextを書き換え
    let calendarApi = viewInfo.view.calendar;
    const date = new Date(calendarApi.currentData.currentDate);

    updateButtonLabels(date);

    // タイトルを書き換え
    updateCalendarTitle(date); // '/'を'年'に置き換えて'月'を追加
  };

  return (
    <div className={Styles.calendar}>
      <div>{isPc}</div>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          firstDay={1}
          datesSet={function (viewInfo) {
            updateCalendar(viewInfo);
          }}
          dayCellContent={function (cellInfo) {
            // 今日の日付を取得
            const now = new Date();
            now.setHours(0, 0, 0, 0);

            // cellInfo.date は現在のセルの日付を表す Date オブジェクトです
            if (cellInfo.date.getDay() === 6) {
              // 土曜日
              return { html: `<div class="saturday ${cellInfo.date < now ? "past" : ""}">` + cellInfo.dayNumberText + "</div>" };
            } else if (cellInfo.date.getDay() === 0) {
              // 日曜日の場合
              return { html: `<div class="sunday ${cellInfo.date < now ? "past" : ""}">` + cellInfo.dayNumberText + "</div>" };
            } else {
              return { html: `<div class="weekday ${cellInfo.date < now ? "past" : ""}">` + cellInfo.dayNumberText + "</div>" };
            }
          }}
          events={events}
        ></FullCalendar>
      </div>
    </div>
  );
};

export default Calendar;
