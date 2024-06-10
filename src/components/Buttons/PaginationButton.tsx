import { handleWeekChange } from "../../helpers/functions/helpers";
import forward from "../../../public/arrow-next-svgrepo-com.svg";
import back from "../../../public/arrow-back-svgrepo-com.svg";
import styles from "./paginationButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setDataWeekNumber } from "../../store/slices/dataSlice";
import { IRootStoreType, PaginateButtonType } from "../../types/types";



export default function PaginateDateButton({type}:PaginateButtonType){

    const prevWeek = type==='prev_week'
    const nextWeek = type==='next_week'

    const dataWeekNumber = useSelector(
        (state: IRootStoreType) => state.calendarReducer.data.weekNumber
      );

    const dispatch = useDispatch()
    return(<>
    {prevWeek&&<img
        src={back}
        alt="back"
        className={styles.container__button}
        onClick={() => {
            handleWeekChange(type,dispatch, setDataWeekNumber,dataWeekNumber);
        }}
      />}
    {nextWeek&&<img
        src={forward}
        alt="back"
        className={styles.container__button}
        onClick={() => {
            handleWeekChange(type,dispatch, setDataWeekNumber,dataWeekNumber);
        }}
      />}



</>
    )
}