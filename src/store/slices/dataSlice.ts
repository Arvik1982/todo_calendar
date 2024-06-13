import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const currentMonth = new Date().getMonth() + 1;
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
let weekNumber;
const lastDayMonth = new Date(currentYear, currentMonth, 0).getDate();
const startMonth = `${currentYear}-${currentMonth}-01`;
const endMonth = `${currentYear}-${currentMonth}-${lastDayMonth}`;

const currentMonthDates = (start: Date, end: Date) => {
  const result = [];
  while (start <= end) {
    result.push(new Date(String(start)));
    start.setDate(start.getDate() + 1);
  }

  return result;
};
const firstDayNumber =
  currentMonthDates(new Date(startMonth), new Date(endMonth))[0].getDay() - 1;

const currentDay = new Date().getDate();
const weekNumber0 = 7 - firstDayNumber;
const weekNumber1 = 14 - firstDayNumber;
const weekNumber2 = 21 - firstDayNumber;
const weekNumber3 = 28 - firstDayNumber;

if (currentDay <= weekNumber0) {
  weekNumber = 0;
}
if (weekNumber0 < currentDay && currentDay <= weekNumber1) {
  weekNumber = 1;
}
if (weekNumber1 < currentDay && currentDay <= weekNumber2) {
  weekNumber = 2;
}
if (weekNumber2 < currentDay && currentDay <= weekNumber3) {
  weekNumber = 3;
}
if (currentDay >= weekNumber3) {
  weekNumber = 4;
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: {
      weekNumber: weekNumber?weekNumber:0,
      selectedMonth: currentMonth,
      selectedYear: currentYear,
      event: "",
    },
    daysOffYear: "",
    newUser: "",
    users: [],
    currentUser: "",
    createTodoOpen: false,
    weekendsError: "",
  },

  reducers: {
    setDataWeekNumber(state, action) {
      state.data.weekNumber = action.payload;
    },
    setDataSelectedMonth(state, action) {
      state.data.selectedMonth = action.payload;
    },
    setDataSelectedYear(state, action) {
      state.data.selectedYear = action.payload;
    },
    daysOffYear(state, action) {
      state.daysOffYear = JSON.parse(action.payload);
      localStorage.setItem("yearHolydays", action.payload);
    },
    setNewUser(state, action) {
      state.newUser = action.payload;
      state.currentUser = action.payload;
    },

    login(state) {
      const localUsers = JSON.parse(localStorage.getItem("users") || "");
      localUsers.includes(state.newUser) ? "" : localUsers.push(state.newUser);
      localStorage.setItem("users", JSON.stringify(localUsers));
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    setCreateTodoOpen(state, action?) {
      state.createTodoOpen = !state.createTodoOpen;
      state.data.event = action?.payload;
    },

    exit(state) {
      state.currentUser = "";
      localStorage.removeItem("currentUser");
    },
    setCreateTodoClose(state) {
      state.createTodoOpen = false;
    },
    setWeekendsError(state, action: PayloadAction<string>) {
      state.weekendsError = action.payload;
    },
  },
});

export const {
  setDataWeekNumber,
  setDataSelectedMonth,
  setDataSelectedYear,
  daysOffYear,
  setNewUser,
  login,
  exit,
  setCreateTodoOpen,
  setCreateTodoClose,
  setWeekendsError,
} = dataSlice.actions;
export default dataSlice.reducer;
