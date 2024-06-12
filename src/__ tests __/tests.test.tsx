import "@testing-library/jest-dom";
import { weekIntervals } from "../helpers/functions/createWeekIntervals";
import { dayOffCheck, filteredEvent } from "../helpers/functions/helpers";
import { render } from "@testing-library/react";
import Login from "../pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "../store";
import { Provider } from "react-redux";
import App from "../App";
import UserPage from "../pages/User/UserPage";
import MyCalendar from "../components/Calendar/MyCalendar";
import Week from "../components/Calendar/Week";
import CreateTodo from "../components/CreateTodo/CreateTodo";
import Header from "../components/Header/Header";
import PopUpMenu from "../components/PopUp/PopUpMenu";
import Todo from "../components/Todo/Todo";

describe("weekIntervals function test", () => {
  test("should return current date", () => {
    const start = new Date().toString();
    const end = new Date().toString();
    const expected = new Date().toString().slice(0, 10);
    const result = weekIntervals(start, end)[0].toString().slice(0, 10);
    expect(result).toEqual(expected);
  });

  test("should return empty string", () => {
    const start = "";
    const end = "";
    const expected = "";
    const result = weekIntervals(start, end);
    expect(result).toEqual(expected);
  });
});

describe("dayOffCheck function test", () => {
  test("should return true", () => {
    const day = new Date("2024-01-01");
    const holyday = [{ date: "2024-01-01T00:00:00.000Z", dayoff: "1" }];

    const expected = true;
    const result = dayOffCheck(day, holyday);
    expect(result).toEqual(expected);
  });

  test("should return false", () => {
    const day = new Date("2024-01-01");
    const holyday = [{ date: "2024-01-01T00:00:00.000Z", dayoff: "0" }];

    const expected = false;
    const result = dayOffCheck(day, holyday);
    expect(result).toEqual(expected);
  });
});

describe("filteredEvent function test", () => {
  test("should return array user events selected date", () => {
    const day = new Date("2024-06-08T21:00:00.000Z");
    const user = "test_user";
    const todos = [
      {
        user: "test_user",
        date: "2024-06-08T21:00:00.000Z",
        text: { id: 1718114819424, text: "test_ok", checked: true },
      },
    ];

    const expected = [
      {
        id: 1718114819424,
        text: "test_ok",
        checked: true,
      },
    ];

    const result = filteredEvent(day, todos, user);
    expect(result).toEqual(expected);
  });

  test("should return empty array user events selected date", () => {
    const day = new Date("2024-06-08T21:00:00.000Z");
    const user = "test_user_2";
    const todos: any = [
      {
        user: "test_user",
        date: "2024-06-08T21:00:00.000Z",
        text: { id: 1718114819424, text: "test_ok", checked: true },
      },
    ];

    const expected: any = [];

    const result = filteredEvent(day, todos, user);
    expect(result).toEqual(expected);
  });
});

describe("Pages render test", () => {
  test("Renders the login page", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });

  test("Renders the UserPage page", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <UserPage />
        </Provider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });
});

describe("components render test", () => {
  test("Renders App component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });

  test("Renders MyCalendar component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MyCalendar />
        </Provider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });

  test("Renders Weeks component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Week weeks={[[new Date()]]} />
        </Provider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });

  test("Renders CreateTodo component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CreateTodo />
        </Provider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });

  test("Renders Header component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });

  test("Renders PopUpMenu component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <PopUpMenu />
        </Provider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });

  test("Renders PopUpMenu component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Todo date={new Date()} />
        </Provider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });

  test("Renders AppRouts component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });
});
