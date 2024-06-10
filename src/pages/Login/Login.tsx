import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login, setNewUser } from "../../store/slices/dataSlice";
import { IRootStoreType } from "../../types/types";
import { useEffect, useState } from "react";

export default function Login() {
  useEffect(() => {
    dispatch(setNewUser(''))
    localStorage.getItem("users") === null
      ? localStorage.setItem("users", JSON.stringify([]))
      : "";
    localStorage.getItem("currentUser") === null
      ? localStorage.setItem("currentUser", JSON.stringify([]))
      : "";
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const user = useSelector(
    (state: IRootStoreType) => state.calendarReducer.newUser
  );
  const currentUser = useSelector(
    (state: IRootStoreType) => state.calendarReducer.currentUser
  );
  return (
    <div className={styles.login__container}>
      <h1>Список дел</h1>
      <div className={styles.login__container_enter}>
        <input
          value={user}
          onChange={(e) => {
            dispatch(setNewUser(e.target.value));
          }}
          className={styles.container__enter_input}
          type="text"
          placeholder="Введите логин"
        />
        <button
          className={styles.container__enter_button}
          onClick={() => {
            dispatch(login());
            currentUser ? navigate("/user") : setError("Введите имя");
          }}
        >
          Вход
        </button>
        {error?<span className={styles.error}>{error}</span>:''}
      </div>
      
    </div>
  );
}
