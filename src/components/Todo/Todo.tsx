import styles from "./todo.module.css";
import add from "../../../public/plus_trx55obojv0m.svg";
import deleteImg from "../../../public/delete_aywxaa67lncc.svg";
import { useDispatch, useSelector } from "react-redux";
import { setCreateTodoOpen } from "../../store/slices/dataSlice";
import { IRootStoreType } from "../../types/types";

type TodoPropsType = {
  date: Date;
};
type TodosElementType = {
  date: Date;
  user: string;
  text: string;
};

export default function Todo({ date }: TodoPropsType) {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: IRootStoreType) => state.calendarReducer.currentUser
  );

  const todos = JSON.parse(localStorage.getItem("events") || "");
  const user = currentUser
    ? currentUser
    : localStorage.getItem("currentUser") !== null
    ? JSON.parse(localStorage.getItem("currentUser") || "")
    : "";

  const filteredEvent = (newDate: Date) => {
    const result: Array<string> = [];
    todos.forEach((element: TodosElementType) => {
      if (element.user === user) {
        new Date(element.date).getTime() === newDate.getTime()
          ? result.push(element.text)
          : "";
      }
    });

    return result;
  };

  return (
    <div className={styles.todo__container}>
      <img
        onClick={() => {
          dispatch(setCreateTodoOpen(JSON.stringify(date)));
        }}
        style={{ width: "20px", height: "20px" }}
        src={add}
        alt="add"
      />

      {filteredEvent(date).map((el) => {
        return (
          <div className={styles.container__todo}>
            <input type="checkbox" />
            <span>{el}</span>
            <img
              style={{ width: "20px", height: "20px" }}
              src={deleteImg}
              alt="delete"
            />
          </div>
        );
      })}
    </div>
  );
}
