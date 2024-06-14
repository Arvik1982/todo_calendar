import styles from "./todo.module.css";
import deleteImg from "../../../public/delete_aywxaa67lncc.svg";
import { useSelector } from "react-redux";
import {
  IRootStoreType,
  TextType,
  TodoPropsType,
  TodosElementType,
} from "../../types/types";
import { useState } from "react";
import { filteredEvent } from "../../helpers/functions/helpers";

export default function Todo({ date }: TodoPropsType) {
  console.log(date)
  const [rerender, setRerender] = useState(0);
  const currentUser = useSelector(
    (state: IRootStoreType) => state.calendarReducer.currentUser
  );

  const todos =
    localStorage.getItem("events") !== null
      ? JSON.parse(localStorage.getItem("events") || "")
      : "";
  const user = currentUser
    ? currentUser
    : localStorage.getItem("currentUser") !== null
    ? JSON.parse(localStorage.getItem("currentUser") || "")
    : "";

  const deleteEvent = (id: number) => {
    let result;
    result = todos.filter((el: TodosElementType) => {
      return el.text.id !== id;
    });
    localStorage.setItem("events", JSON.stringify(result));
    setRerender(rerender + 1);
  };

  const checkEvent = (id: number) => {
    todos.forEach((el: TodosElementType) => {
      if (el.text.id === id) {
        el.text.checked === true
          ? (el.text.checked = false)
          : (el.text.checked = true);
      }
    });
    localStorage.setItem("events", JSON.stringify(todos));
    setRerender(rerender + 1);
  };

  return (
    <div className={styles.todo__container}>
      {filteredEvent(date, todos, user)
        ? filteredEvent(date, todos, user)?.map((el: TextType, index) => {
            return (
              <div key={index} className={styles.container__todo}>
                <input
                  checked={el.checked}
                  onChange={() => {
                    checkEvent(el.id);
                  }}
                  type="checkbox"
                />
                <span
                  style={el.checked ? { textDecoration: "line-through" } : {}}
                  key={rerender}
                >
                  {el.text}
                </span>
                <img
                  onClick={() => {
                    deleteEvent(el.id);
                  }}
                  style={{ width: "20px", height: "20px" }}
                  src={deleteImg}
                  alt="delete"
                />
              </div>
            );
          })
        : ""}
    </div>
  );
}
