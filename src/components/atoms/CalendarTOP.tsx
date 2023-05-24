"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useMediaQuery } from "../../../libs/useMediaQuery";
import Styles from "../../styles/atoms/Calendar.module.scss";
import { useEffect, useRef, useState } from "react";
import { CalendarApi } from "@fullcalendar/core";
import jaLocale from "@fullcalendar/core/locales/ja";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { selectFairDate } from "@/pages/_app";

type Props = {
  events: {
    date: string;
  }[];
  toFairLists?: boolean;
};

const mouseover = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  const fcEvent = target.querySelector(".fc-event") as HTMLElement;
  if (target && fcEvent) {
    fcEvent.style.backgroundColor = "#bcbcbc";
    target.style.cursor = "pointer";
  }
};

const mouseout = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  const fcEvent = target.querySelector(".fc-event") as HTMLElement;
  if (target && fcEvent) {
    fcEvent.style.backgroundColor = "";
    target.style.cursor = "";
  }
};

const CalendarTOP = (props: Props) => {
  const { events, toFairLists = false } = props;

  const router = useRouter();
  const calendarRef = useRef<FullCalendar>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isPc = useMediaQuery(768, "max");
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [selectDate, setSelectDate] = useRecoilState<any>(selectFairDate);

  useEffect(() => {
    const dayFuture = ref.current?.querySelectorAll(".fc-day-future") as NodeListOf<HTMLElement>;

    dayFuture.forEach((day) => {
      const fcEvent = day.querySelector(".fc-event") as HTMLElement;

      if (fcEvent) {
        day.addEventListener("mouseover", mouseover);
        day.addEventListener("mouseout", mouseout);
      }
    });

    return () => {
      dayFuture.forEach((day) => {
        const fcEvent = day.querySelector(".fc-event") as HTMLElement;

        if (fcEvent) {
          day.removeEventListener("mouseover", mouseover);
          day.removeEventListener("mouseout", mouseout);
        }
      });
    };
  }, [isPc, events]);

  function updateButtonLabels(date: Date): void {
    let prevButton = ref.current?.querySelector(".fc-prev-button");
    let nextButton = ref.current?.querySelector(".fc-next-button");
    if (prevButton) {
      prevButton.textContent = `< ${date.getMonth() === 0 ? 12 : date.getMonth()}月`;
    }
    if (nextButton) {
      nextButton.textContent = `${date.getMonth() === 11 ? 1 : date.getMonth() + 2}月  >`;
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

  const handleDateClick = (arg: DateClickArg) => {
    const elem = arg.dayEl;
    if (elem.classList.contains("fc-day-past")) return;
    const date = arg.dateStr;
    setSelectDate(date);

    if (!toFairLists) {
      router.push(`/fair/1#reservation`);
    } else {
      router.push(`/fair#bridal-fair?date=${date}`);
    }
  };

  return (
    <div className={`${Styles.calendar} isTop`} ref={ref}>
      <div>
        <FullCalendar
          // locale={jaLocale}
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
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
          events={...events}
          dayHeaderContent={function (headerInfo) {
            const daysShort = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
            return { html: daysShort[headerInfo.date.getDay()] };
          }}
          dateClick={(e) => handleDateClick(e)}
        ></FullCalendar>
      </div>
    </div>
  );
};

export default CalendarTOP;
