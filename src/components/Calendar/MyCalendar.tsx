import { useEffect, useState } from "react";
import styles from "./myCalendar.module.css";
import { weekIntervals } from "../../helpers/functions/createWeekIntervals";
import dayOffApi from "../../helpers/functions/dayOffApi";
import { daysOffYear } from "../../store/slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarPropsType,
  IRootStoreType,
  WeeksType,
} from "../../types/types";
import PaginateDateButton from "../Buttons/PaginationButton";
import Week from "./Week";
import { useNavigate } from "react-router-dom";

export default function MyCalendar({
  startMonth,
  endMonth,
}: CalendarPropsType) {
  const [weeks, setWeeks] = useState<WeeksType | "">([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataWeekNumber = useSelector(
    (state: IRootStoreType) => state.calendarReducer.data.weekNumber
  );

  const dataSelectedYear = useSelector(
    (state: IRootStoreType) => state.calendarReducer.data.selectedYear
  );

  useEffect(() => {
    localStorage.getItem("currentUser") === null ? navigate("/") : "";
  }, []);

  useEffect(() => {
    startMonth && endMonth ? setWeeks(weekIntervals(startMonth, endMonth)) : "";
  }, [startMonth, endMonth, dataSelectedYear]);

  useEffect(() => {
    dayOffApi(dataSelectedYear, daysOffYear, dispatch);
  }, [dataSelectedYear]);

  return (
    <div key={dataSelectedYear} className={styles.calendar__container}>
      <div className={styles.calendar__container_buttons}>
        <PaginateDateButton type={"prev_week"} />
        <span>Неделя</span>
        <div className={styles.button__week_number}>{dataWeekNumber + 1}</div>
        <PaginateDateButton type={"next_week"} />
      </div>
      <div className={styles.calendar__container_week}>
        <Week weeks={weeks} />
      </div>
    </div>
  );
}
