import { useSelector } from "react-redux";
import { dateToString, dayNames } from "../../helpers/data/lib";
import { dayOffCheck } from "../../helpers/functions/helpers";
import styles from "./myCalendar.module.css";
import { IRootStoreType, WeeksPropsType} from "../../types/types";
import Todo from "../Todo/Todo";

export default function Week ({weeks}:WeeksPropsType){  
  
    const dataWeekNumber = useSelector(
        (state: IRootStoreType) => state.calendarReducer.data.weekNumber
      );
      const yearHolydaysRedux = useSelector(
        (state: IRootStoreType) => state.calendarReducer.daysOffYear
      );
   
      const yearHolydays = yearHolydaysRedux
        ? yearHolydaysRedux
        :localStorage.getItem("yearHolydays")!==null?JSON.parse(localStorage.getItem("yearHolydays")||''):'';


    return(<> {weeks ? weeks[dataWeekNumber]?.map((element, index) => {
            return (
              <div key={index} className={styles.container__week_day}>
                {yearHolydays?
                  <span
                    style={
                      !dayOffCheck(element,yearHolydays)
                        ? { backgroundColor: "#d2ebd8" }
                        : { backgroundColor: "#FF7777" }
                    }
                    className={styles.week__day_name}
                  >
                    {dayNames.map((dayName, index) => {
                      return element.getDay() === dayName.id
                        ? dayNames[index].name
                        : "";
                    })}
                  </span>:''
                }
                <span className={styles.week__day_date}>
                  {dateToString(element)}
                </span>
                <Todo date ={element}/>
              </div>
            );
          })
        : ""}</>
   )
}