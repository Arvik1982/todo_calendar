import { Action, ActionCreatorWithPayload, UnknownAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { setWeekendsError } from "../../store/slices/dataSlice";

export default async function dayOffApi(
  year: number,
  daysOffYear: ActionCreatorWithPayload<string>,
  dispatch:Dispatch<Action>,
  
) {
  const currentYearDates = (start: Date, end: Date) => {
    const result = [];
    while (start <= end) {
      result.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return result;
  };

  const yearDates = currentYearDates(
    new Date(`${year}-01-01`),
    new Date(`${year}-12-31`)
  );

  try {
    const response = await fetch(
      `https://isdayoff.ru/api/getdata?year=${year}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Server error!");
    }
    const data = await response.text();
    const newArr: Array<object> = [];
    yearDates.forEach((el, index) => {
      newArr.push({ date: el, dayoff: data[index] });
    });
    dispatch(daysOffYear(JSON.stringify(newArr)));
  } catch (error) {
    dispatch(setWeekendsError('Ошибка соединения'))
    
  }
}
