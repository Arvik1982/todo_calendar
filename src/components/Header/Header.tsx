import styles from "./header.module.css";
import forward from "../../../public/arrow-next-svgrepo-com.svg";
import back from "../../../public/arrow-back-svgrepo-com.svg";
import { IRootStoreType } from "../../types/types";
import { monthNames } from "../../helpers/data/lib";
import { useDispatch, useSelector } from "react-redux";
import {
  changeMonthBack,
  changeMonthForward,
  changeYearBack,
  changeYearForward,
} from "../../helpers/functions/helpers";

export default function Header() {
  const dataSelectedMonth = useSelector(
    (state: IRootStoreType) => state.calendarReducer.data.selectedMonth
  );
  const dataSelectedYear = useSelector(
    (state: IRootStoreType) => state.calendarReducer.data.selectedYear
  );

  const dispatch = useDispatch();

  return (
    <div className={styles.header__container}>
      <div className={styles.header__container_year}>
        <img
          src={back}
          alt="back"
          className={styles.container__button}
          onClick={() => {
            changeYearBack(dispatch, dataSelectedYear);
          }}
        />
        <h2 className={styles.container__names}>{dataSelectedYear}</h2>
        <img
          src={forward}
          alt="forward"
          className={styles.container__button}
          onClick={() => {
            changeYearForward(dispatch, dataSelectedYear);
          }}
        />
      </div>

      <div className={styles.header__container_month}>
        <img
          src={back}
          alt="back"
          className={styles.container__button_month}
          onClick={() => {
            changeMonthBack(dispatch, dataSelectedMonth);
          }}
        />
        <h3 className={styles.container__names}>
          {monthNames[dataSelectedMonth - 1].name}
        </h3>
        <img
          src={forward}
          alt="forward"
          className={styles.container__button_month}
          onClick={() => {
            changeMonthForward(dispatch, dataSelectedMonth);
          }}
        />
      </div>
    </div>
  );
}
