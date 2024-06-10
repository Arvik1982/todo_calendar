import { Dispatch } from "react";
import {
  setDataSelectedMonth,
  setDataSelectedYear,
  setDataWeekNumber,
} from "../../store/slices/dataSlice";
import { Action, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { TextType, TodosElementType } from "../../types/types";

export const dayOffCheck = (
  el: Date,
  yearHolydays: [{ date: string; dayoff: string }]
) => {
  let result;
  yearHolydays.forEach((element) => {
    const d1 = new Date(element.date).toLocaleString().slice(0, 10);
    const d2 = new Date(el).toLocaleString().slice(0, 10);

    if (d1 === d2) {
      Boolean(Number(element.dayoff)) ? (result = true) : (result = false);
    }
  });

  return result;
};

export const handleWeekChange = (
  type: string,
  dispatch: Dispatch<Action>,
  setDataWeeNumber: ActionCreatorWithPayload<number>,
  dataWeekNumber: number
): void => {
  if (type === "prev_week") {
    dispatch(setDataWeeNumber(dataWeekNumber < 1 ? 4 : dataWeekNumber - 1));
  }
  if (type === "next_week") {
    dispatch(setDataWeeNumber(dataWeekNumber < 4 ? dataWeekNumber + 1 : 0));
  }
};

export const changeMonthBack = (
  dispatch: Dispatch<Action>,
  dataSelectedMonth: number
): void => {
  if (dataSelectedMonth > 1) {
    dispatch(setDataWeekNumber(0));
    dispatch(setDataSelectedMonth(dataSelectedMonth - 1));
  }
};
export const changeMonthForward = (
  dispatch: Dispatch<Action>,
  dataSelectedMonth: number
): void => {
  if (dataSelectedMonth < 12) {
    dispatch(setDataWeekNumber(0));
    dispatch(setDataSelectedMonth(dataSelectedMonth + 1));
  }
};

export const changeYearBack = (
  dispatch: Dispatch<Action>,
  dataSelectedYear: number
): void => {
  dispatch(setDataSelectedMonth(1));
  dispatch(setDataWeekNumber(0));
  dispatch(setDataSelectedYear(dataSelectedYear - 1));
};
export const changeYearForward = (
  dispatch: Dispatch<Action>,
  dataSelectedYear: number
): void => {
  dispatch(setDataSelectedMonth(1));
  dispatch(setDataWeekNumber(0));
  dispatch(setDataSelectedYear(dataSelectedYear + 1));
};

export const filteredEvent = (newDate: Date, todos: [], user: string) => {
  if (todos) {
    const result: TextType[] = [];
    todos.forEach((element: TodosElementType) => {
      if (element.user === user) {
        new Date(element.date).getTime() === newDate.getTime()
          ? result.push(element.text)
          : "";
      }
    });

    return result;
  }
};
