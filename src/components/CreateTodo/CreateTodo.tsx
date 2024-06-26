import { useDispatch, useSelector } from "react-redux";
import { IRootStoreType } from "../../types/types";
import styles from "./createTodo.module.css";
import { useState } from "react";
import { setCreateTodoClose } from "../../store/slices/dataSlice";
import { dateToString } from "../../helpers/data/lib";
import Todo from "../Todo/Todo";

export default function CreateTodo() {
  const [textValue, setTextValue] = useState("");
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setCreateTodoClose());
  };

  const currentUser = useSelector(
    (state: IRootStoreType) => state.calendarReducer.currentUser
  );
  const eventDateRedux = useSelector(
    (state: IRootStoreType) => state.calendarReducer.data.event
  );
  const user = currentUser
    ? currentUser
    : localStorage.getItem("currentUser") !== null
    ? JSON.parse(localStorage.getItem("currentUser") || "")
    : "";

  const eventDate = eventDateRedux ? JSON.parse(eventDateRedux) : "";

  const addEvent = () => {
    localStorage.getItem("events") !== null
      ? ""
      : localStorage.setItem("events", JSON.stringify([]));
    const eventsArr = JSON.parse(localStorage.getItem("events") || "");
    const idEvent = new Date().getTime();
    const event = {
      user: user,
      date: eventDate,
      text: {
        id: idEvent,
        text: textValue,
      },
    };
    event.text.text ? eventsArr.push(event) : "";

    localStorage.setItem("events", JSON.stringify(eventsArr));
    dispatch(setCreateTodoClose());
  };
  return (
    <div onClick={closeModal} className={styles.container}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.container__content}
      >
        <span>{user}</span>
        <span>{dateToString(eventDate)}</span>
        <textarea
          value={textValue}
          onChange={(e) => {
            setTextValue(e.target.value);
          }}
          className={styles.container__content_text}
          name=""
          id=""
        />
        <Todo date={new Date(eventDate)} />
        <div className={styles.container__content_buttons}>
          <button
            onClick={() => {
              dispatch(setCreateTodoClose());
            }}
            className={styles.content__buttons_button}
          >
            Закрыть
          </button>

          <button onClick={addEvent} className={styles.content__buttons_button}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
