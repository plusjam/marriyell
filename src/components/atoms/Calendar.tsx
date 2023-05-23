"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useMediaQuery } from "../../../libs/useMediaQuery";
import Styles from "../../styles/atoms/Calendar.module.scss";
import { useEffect, useRef, useState } from "react";
import { CalendarApi } from "@fullcalendar/core";
import jaLocale from "@fullcalendar/core/locales/ja";

type Props = {
  events: {
    date: string;
  }[];
};

const Calendar = (props: Props) => {
  const { events } = props;

  const calendarRef = useRef<FullCalendar>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isPc = useMediaQuery(768, "max");
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  useEffect(() => {
    if (calendarRef.current) {
      const API: CalendarApi = calendarRef.current.getApi();
      API.changeView(!isPc ? "dayGridMonth" : "dayGridWeek");
    }

    const adjustCalendarHeight = () => {
      setTimeout(() => {
        const fcViewHarness = ref.current?.querySelector(".fc-view-harness") as HTMLElement;
        const fcScrollgridSyncTable = ref.current?.querySelector(".fc-scrollgrid-sync-table") as HTMLElement;

        if (fcViewHarness && isPc) {
          fcViewHarness.style.height = "44px";
          fcScrollgridSyncTable.style.height = "20px";
        }
      }, 100);
    };

    adjustCalendarHeight();

    window.addEventListener("resize", adjustCalendarHeight);

    return () => {
      window.removeEventListener("resize", adjustCalendarHeight);
    };
  }, [isPc]);

  function updateButtonLabels(date: Date): void {
    let prevButton = ref.current?.querySelector(".fc-prev-button");
    let nextButton = ref.current?.querySelector(".fc-next-button");
    if (prevButton) {
      prevButton.textContent = !isPc ? `< ${date.getMonth() === 0 ? 12 : date.getMonth()}月` : ``;
    }
    if (nextButton) {
      nextButton.textContent = !isPc ? `${date.getMonth() === 11 ? 1 : date.getMonth() + 2}月  >` : ``;
    }
  }

  function updateCalendarTitle(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonthは0から始まるので1を加える
    const titleElement = ref.current?.querySelector(".fc-toolbar-title");

    if (titleElement) {
      setMonth(month);
      setYear(year);
      titleElement.textContent = `${year}年${month}月`;
    }
  }

  const updateCalendar = (viewInfo: any) => {
    // prev, nextを書き換え
    let calendarApi = viewInfo.view.calendar;
    const date = new Date(calendarApi.currentData.currentDate);
    // console.log("date", date);

    updateButtonLabels(date);

    // タイトルを書き換え
    updateCalendarTitle(date); // '/'を'年'に置き換えて'月'を追加
  };

  const pagenation = (className: string) => {
    const elem = ref.current?.querySelector(className) as HTMLButtonElement;
    const API: any = calendarRef.current?.getApi() as CalendarApi;
    const date = new Date(API.currentData.currentDate);

    updateCalendarTitle(date);
    elem?.click();
    elem?.click();
    elem?.click();
    elem?.click();
  };

  return (
    <div className={Styles.calendar} ref={ref}>
      <div>
        <FullCalendar
          // locale={jaLocale}
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView={"dayGridMonth"}
          locales={[jaLocale]}
          locale="ja"
          titleFormat={{ year: "numeric", month: "long" }}
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
            const newDate = new Date(cellInfo.date);
            const date = newDate.getDate();

            // cellInfo.date は現在のセルの日付を表す Date オブジェクトです
            if (cellInfo.date.getDay() === 6) {
              // 土曜日
              return { html: `<div class="saturday ${cellInfo.date < now ? "past" : ""}">` + date + "</div>" };
            } else if (cellInfo.date.getDay() === 0) {
              // 日曜日の場合
              return { html: `<div class="sunday ${cellInfo.date < now ? "past" : ""}">` + date + "</div>" };
            } else {
              return { html: `<div class="weekday ${cellInfo.date < now ? "past" : ""}">` + date + "</div>" };
            }
          }}
          events={events}
          dayHeaderContent={function (headerInfo) {
            const daysShort = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
            return { html: daysShort[headerInfo.date.getDay()] };
          }}
        ></FullCalendar>
        <div className={Styles.next} onClick={() => pagenation(".fc-next-button")}>
          {month === 12 ? 1 : month + 1}月 &gt;
        </div>
        <div className={Styles.prev} onClick={() => pagenation(".fc-prev-button")}>
          &lt; {month === 1 ? 12 : month - 1}月
        </div>
      </div>
    </div>
  );
};

export default Calendar;
